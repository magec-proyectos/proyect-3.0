
import { createContext, useContext, ReactNode, useState } from 'react';
import { toast } from "@/components/ui/use-toast"
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  profileImage?: string;
  socialProvider?: 'google' | 'apple' | 'email';
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'apple') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  const { mutateAsync: loginMutateAsync, isPending: isLoginLoading } = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'test@example.com' && password === 'password') {
        return {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          balance: 100.00,
          socialProvider: 'email' as const
        };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Login successful!",
        description: `Welcome back, ${data.name}.`,
      })
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Authentication failed.",
        description: error.message,
      })
    },
  });

  const { mutateAsync: registerMutateAsync, isPending: isRegisterLoading } = useMutation({
    mutationFn: async ({ email, password, name }: { email: string, password: string, name: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        id: '2',
        name: name,
        email: email,
        balance: 50.00,
        socialProvider: 'email' as const
      };
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Registration successful!",
        description: `Welcome, ${data.name}.`,
      })
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Registration failed.",
        description: error.message,
      })
    },
  });

  const { mutateAsync: socialLoginMutateAsync, isPending: isSocialLoginLoading } = useMutation({
    mutationFn: async (provider: 'google' | 'apple') => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful social login
      return {
        id: provider === 'google' ? 'g-123' : 'a-456',
        name: provider === 'google' ? 'Google User' : 'Apple User',
        email: provider === 'google' ? 'google@example.com' : 'apple@example.com',
        balance: 75.00,
        profileImage: `https://placehold.co/100/2f3136/fff?text=${provider === 'google' ? 'G' : 'A'}`,
        socialProvider: provider
      };
    },
    onSuccess: (data) => {
      setUser(data);
      toast({
        title: "Social login successful!",
        description: `Welcome, ${data.name}.`,
      })
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Social authentication failed.",
        description: error.message,
      })
    },
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginMutateAsync({ email, password });
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      await registerMutateAsync({ email, password, name });
      return true;
    } catch (error) {
      return false;
    }
  };

  const socialLogin = async (provider: 'google' | 'apple'): Promise<boolean> => {
    try {
      await socialLoginMutateAsync(provider);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    navigate('/');
  };

  const isLoading = isLoginLoading || isRegisterLoading || isSocialLoginLoading;

  return (
    <AuthContext.Provider value={{ user, login, register, socialLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
export { useAuth };
