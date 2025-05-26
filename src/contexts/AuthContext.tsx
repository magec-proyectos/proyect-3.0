
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

// Extended User type with custom properties
export interface User extends SupabaseUser {
  name: string;
  balance: number;
  profileImage?: string;
  socialProvider?: 'google' | 'apple' | 'email';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'apple') => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Convert Supabase user to our extended User type
        const extendedUser: User = {
          ...session.user,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          balance: 1000, // Default balance
          profileImage: session.user.user_metadata?.avatar_url,
          socialProvider: session.user.app_metadata?.provider === 'google' ? 'google' : 
                          session.user.app_metadata?.provider === 'apple' ? 'apple' : 'email'
        };
        setUser(extendedUser);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const extendedUser: User = {
            ...session.user,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            balance: 1000, // Default balance
            profileImage: session.user.user_metadata?.avatar_url,
            socialProvider: session.user.app_metadata?.provider === 'google' ? 'google' : 
                            session.user.app_metadata?.provider === 'apple' ? 'apple' : 'email'
          };
          setUser(extendedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });
      if (error) throw error;
      toast.success('Account created successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'apple'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Social login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    login,
    register,
    socialLogin,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
