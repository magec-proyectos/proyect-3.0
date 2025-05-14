import { createContext, useContext, ReactNode, useState } from 'react';
import { toast } from "@/components/ui/use-toast"
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
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
  
  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
    async ({ email, password }: { email: string, password: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'test@example.com' && password === 'password') {
        return {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          balance: 100.00,
        };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    {
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
    }
  );

  const { mutate: registerMutate, isLoading: isRegisterLoading } = useMutation(
    async ({ email, password, name }: { email: string, password: string, name: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        id: '2',
        name: name,
        email: email,
        balance: 50.00,
      };
    },
    {
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
    }
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginMutate({ email, password });
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      await registerMutate({ email, password, name });
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

  const isLoading = isLoginLoading || isRegisterLoading;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
