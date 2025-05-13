
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

type User = {
  id: string;
  email: string;
  name: string;
  balance: number;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('bet3_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('bet3_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - would connect to an API in a real app
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation - would be handled by a real auth system
      if (email && password.length >= 6) {
        // Mock user data - would come from the API
        const userData: User = {
          id: '123456',
          email,
          name: email.split('@')[0],
          balance: 100.00
        };
        
        setUser(userData);
        localStorage.setItem('bet3_user', JSON.stringify(userData));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (email && password.length >= 6 && name) {
        // Mock user registration - would be handled by a real auth system
        const userData: User = {
          id: '123456',
          email,
          name,
          balance: 50.00 // New users get $50 bonus
        };
        
        setUser(userData);
        localStorage.setItem('bet3_user', JSON.stringify(userData));
        toast.success('Registration successful! $50 bonus added to your account.');
        return true;
      } else {
        toast.error('Invalid registration information');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('bet3_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
