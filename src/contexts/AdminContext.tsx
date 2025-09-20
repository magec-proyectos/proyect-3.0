
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, validateUsername } from '@/utils/passwordValidation';

interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateSessionToken = () => {
    // Use crypto.getRandomValues for secure token generation
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Sanitize and validate inputs
      const sanitizedUsername = sanitizeInput(username);
      const usernameValidation = validateUsername(sanitizedUsername);
      
      if (!usernameValidation.isValid) {
        console.error('Invalid username format');
        return false;
      }

      // Get user's IP for rate limiting (simplified - in production, this should be done server-side)
      const clientIP = '127.0.0.1'; // This should come from server-side in production

      // Check rate limiting before attempting login
      const { data: rateLimitCheck } = await supabase.rpc('check_admin_rate_limit', {
        input_ip: clientIP,
        input_username: sanitizedUsername
      });

      // Type assertion for the rate limit response
      const rateLimitResult = rateLimitCheck as { 
        allowed: boolean; 
        reason?: string; 
        blocked_until?: string; 
      } | null;

      if (!rateLimitResult?.allowed) {
        if (rateLimitResult.reason === 'blocked' || rateLimitResult.reason === 'rate_limited') {
          const blockedUntil = new Date(rateLimitResult.blocked_until || '');
          console.error(`Too many failed attempts. Account blocked until ${blockedUntil.toLocaleTimeString()}`);
          return false;
        }
      }

      // Remove sensitive logging in production
      if (process.env.NODE_ENV === 'development') {
        console.log('Attempting admin login for username:', sanitizedUsername);
      }

      // Verify credentials using the edge function (more secure)
      const { data: passwordCheck, error: passwordError } = await supabase.functions.invoke('verify-admin-password', {
        body: { 
          username: sanitizedUsername, 
          password 
        }
      });

      // Record login attempt for rate limiting
      await supabase.rpc('record_admin_login_attempt', {
        input_ip: clientIP,
        input_username: sanitizedUsername,
        success: !passwordError && passwordCheck?.success
      });

      if (passwordError || !passwordCheck?.success) {
        console.error('Password verification failed:', passwordError);
        return false;
      }

      // Clean up expired sessions
      await supabase.rpc('cleanup_expired_admin_sessions');

      // Get the admin user data
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', sanitizedUsername)
        .eq('is_active', true)
        .single();

      if (adminError || !adminData) {
        console.error('Failed to fetch admin user data:', adminError);
        return false;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Admin user data retrieved:', adminData);
      }

      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Reduced to 1 hour session for better security

      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_user_id: adminData.id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString()
        });

      if (sessionError) {
        console.error('Session creation failed:', sessionError);
        return false;
      }

      // Log security event
      await supabase
        .from('admin_audit_log')
        .insert({
          admin_user_id: adminData.id,
          action: 'LOGIN',
          table_name: 'admin_sessions',
          ip_address: clientIP,
          user_agent: navigator.userAgent,
          security_event: true,
          risk_level: 'medium',
          session_id: sessionToken
        });

      if (process.env.NODE_ENV === 'development') {
        console.log('Session created successfully');
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      // Store session token and user data with expiration
      localStorage.setItem('admin_session_token', sessionToken);
      localStorage.setItem('admin_session_expires', expiresAt.toISOString());
      localStorage.setItem('admin_user_id', adminData.id);
      setAdminUser(adminData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Admin login successful');
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      const userId = localStorage.getItem('admin_user_id');
      
      if (sessionToken) {
        // Log security event
        if (userId) {
          await supabase
            .from('admin_audit_log')
            .insert({
              admin_user_id: userId,
              action: 'LOGOUT',
              table_name: 'admin_sessions',
              ip_address: '127.0.0.1',
              user_agent: navigator.userAgent,
              security_event: true,
              risk_level: 'low',
              session_id: sessionToken
            });
        }

        // Delete session from database
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }
      
      // Clear all admin-related localStorage items
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_session_expires');
      localStorage.removeItem('admin_user_id');
      setAdminUser(null);
      console.log('Admin logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkSession = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const sessionToken = localStorage.getItem('admin_session_token');
      const sessionExpires = localStorage.getItem('admin_session_expires');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Checking admin session, token:', sessionToken ? 'found' : 'not found');
      }
      
      if (!sessionToken) {
        setAdminUser(null);
        return;
      }

      // Check local expiration first
      if (sessionExpires) {
        const expiresAt = new Date(sessionExpires);
        if (expiresAt <= new Date()) {
          console.log('Session expired locally, clearing storage');
          localStorage.removeItem('admin_session_token');
          localStorage.removeItem('admin_session_expires');
          localStorage.removeItem('admin_user_id');
          setAdminUser(null);
          return;
        }
      }

      // Clean up expired sessions
      await supabase.rpc('cleanup_expired_admin_sessions');

      // Verify session is valid and not expired
      const { data: sessionData, error: sessionError } = await supabase
        .from('admin_sessions')
        .select(`
          *,
          admin_users!inner(*)
        `)
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (process.env.NODE_ENV === 'development') {
        console.log('Session check result:', sessionData, 'Error:', sessionError);
      }

      if (sessionError || !sessionData) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Session invalid or expired, clearing local storage');
        }
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_session_expires');
        localStorage.removeItem('admin_user_id');
        setAdminUser(null);
        return;
      }

      setAdminUser(sessionData.admin_users);
      if (process.env.NODE_ENV === 'development') {
        console.log('Admin session restored successfully');
      }
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_session_expires');
      localStorage.removeItem('admin_user_id');
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value: AdminContextType = {
    adminUser,
    isLoading,
    login,
    logout,
    checkSession
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
