
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Attempting admin login for username:', username);

      // Verify credentials using the database function
      const { data: passwordCheck, error: passwordError } = await supabase
        .rpc('verify_admin_password', {
          input_username: username,
          input_password: password
        });

      console.log('Password check result:', passwordCheck, 'Error:', passwordError);

      if (passwordError || !passwordCheck) {
        console.error('Password verification failed:', passwordError);
        return false;
      }

      // Get the admin user data
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (adminError || !adminData) {
        console.error('Failed to fetch admin user data:', adminError);
        return false;
      }

      console.log('Admin user data retrieved:', adminData);

      // Create session
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 hour session

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

      console.log('Session created successfully');

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      // Store session token and user data
      localStorage.setItem('admin_session_token', sessionToken);
      setAdminUser(adminData);
      
      console.log('Admin login successful');
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
      if (sessionToken) {
        // Delete session from database
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }
      
      localStorage.removeItem('admin_session_token');
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
      
      console.log('Checking admin session, token:', sessionToken ? 'found' : 'not found');
      
      if (!sessionToken) {
        setAdminUser(null);
        return;
      }

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

      console.log('Session check result:', sessionData, 'Error:', sessionError);

      if (sessionError || !sessionData) {
        console.log('Session invalid or expired, clearing local storage');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
        return;
      }

      setAdminUser(sessionData.admin_users);
      console.log('Admin session restored successfully');
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem('admin_session_token');
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
