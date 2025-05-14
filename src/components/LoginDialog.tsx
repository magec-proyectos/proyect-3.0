
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Loader, Apple, Mail } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, socialLogin, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, password, name);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    const success = await socialLogin(provider);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'register');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-dark-card border-dark-border text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Welcome to Bet3.0</DialogTitle>
          <DialogDescription className="text-gray-400">
            Join our community of sports enthusiasts and AI-powered bettors.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mb-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900"
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
          >
            <Apple size={20} />
            Continue with Apple
          </Button>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-600"></div>
            <span className="relative px-4 bg-dark-card text-sm text-gray-400">or</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 bg-dark-lighter">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-dark-lighter border-dark-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-dark-lighter border-dark-border"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-neon-blue hover:bg-neon-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Log In with Email
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input 
                  id="register-name" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="bg-dark-lighter border-dark-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-dark-lighter border-dark-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-dark-lighter border-dark-border"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Create Account with Email
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 pt-4 border-t border-dark-border">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
