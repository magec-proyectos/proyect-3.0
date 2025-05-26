
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

      // Verify credentials using the database function
      const { data: adminData, error: authError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (authError || !adminData) {
        console.error('Authentication failed:', authError);
        return false;
      }

      // Verify password using crypt function
      const { data: passwordCheck, error: passwordError } = await supabase
        .rpc('verify_admin_password', {
          input_username: username,
          input_password: password
        });

      if (passwordError || !passwordCheck) {
        console.error('Password verification failed:', passwordError);
        return false;
      }

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

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      // Store session token and user data
      localStorage.setItem('admin_session_token', sessionToken);
      setAdminUser(adminData);
      
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkSession = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const sessionToken = localStorage.getItem('admin_session_token');
      
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

      if (sessionError || !sessionData) {
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
        return;
      }

      setAdminUser(sessionData.admin_users);
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
