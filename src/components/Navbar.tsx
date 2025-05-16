import React, { useState } from 'react';
import { Menu, X, Home, Dumbbell, Dice1, MenuIcon, Share2, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from '@/components/LoginDialog';
import NavbarBrand from './navbar/NavbarBrand';
import NavItem from './navbar/NavItem';
import MobileNav from './navbar/MobileNav';
import UserMenu from './navbar/UserMenu';
import NotificationTray from './notifications/NotificationTray';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginDialog = () => {
    setDialogMode('login');
    setLoginDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setDialogMode('register');
    setLoginDialogOpen(true);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { 
      path: '/sports', 
      label: 'Sports', 
      icon: <Dumbbell size={18} />,
      subItems: [
        { path: '/basketball', label: 'Basketball', icon: <Dumbbell size={18} /> },
        { path: '/american-football', label: 'American Football', icon: <Dumbbell size={18} /> }
      ]
    },
    { 
      path: '/casino', 
      label: 'Casino', 
      icon: <Dice1 size={18} />,
      subItems: [
        { path: '/blackjack', label: 'Blackjack', icon: <Dice1 size={18} /> },
        { path: '/roulette', label: 'Roulette', icon: <Dice1 size={18} /> }
      ]
    },
    { path: '/social', label: 'Community', icon: <Share2 size={18} /> },
    { path: '/insights', label: 'Insights', icon: <Brain size={18} /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-border">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <NavbarBrand />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>

            {/* User Menu (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {user && <NotificationTray />}
              <UserMenu 
                user={user}
                logout={logout}
                openLoginDialog={openLoginDialog}
                openRegisterDialog={openRegisterDialog}
              />
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav 
            isOpen={isMenuOpen}
            navItems={navItems}
            user={user}
            logout={logout}
            openLoginDialog={openLoginDialog}
            openRegisterDialog={openRegisterDialog}
            toggleMenu={toggleMenu}
          />
        </div>
      </nav>
      
      <LoginDialog 
        isOpen={loginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)} 
        initialTab={dialogMode}
      />
    </>
  );
};

export default Navbar;
