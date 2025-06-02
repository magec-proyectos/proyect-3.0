
import React from 'react';
import { Link } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/contexts/AuthContext';

interface UserMenuProps {
  user: User | null;
  logout: () => void;
  openLoginDialog: () => void;
  openRegisterDialog: () => void;
  isMobile?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  user, 
  logout, 
  openLoginDialog, 
  openRegisterDialog, 
  isMobile = false 
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 pt-4 border-t border-dark-border">
        {user ? (
          <>
            <div className="flex justify-between items-center px-4 py-2">
              <span className="text-sm text-gray-400">Balance</span>
              <span className="font-medium">${user.balance.toFixed(2)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={openLoginDialog}>Log In</Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={openRegisterDialog}
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    );
  }
  
  return (
    <div className="hidden md:flex items-center gap-4">
      {user ? (
        <>
          <div className="text-sm text-gray-400 mr-2">
            <span className="block text-right text-white">${user.balance.toFixed(2)}</span>
            Balance
          </div>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
              <CircleUser size={20} />
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={logout}>Log Out</Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" onClick={openLoginDialog}>Log In</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={openRegisterDialog}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
