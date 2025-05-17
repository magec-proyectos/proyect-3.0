
import React, { useState } from 'react';
import { Menu, X, Home, Share2, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from '@/components/LoginDialog';
import NavbarBrand from './navbar/NavbarBrand';
import NavItem from './navbar/NavItem';
import MobileNav from './navbar/MobileNav';
import UserMenu from './navbar/UserMenu';
import NotificationTray from './notifications/NotificationTray';

// Custom Sport Icon
const SportIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

// Custom Football Icon
const FootballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m7.92 7.92 8.16 8.16" />
    <path d="m7.92 16.08 8.16-8.16" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Custom Basketball Icon
const BasketballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M4.93 4.93a19 19 0 0 1 14.14 14.14" />
    <path d="M19.07 4.93a19 19 0 0 1-14.14 14.14" />
    <path d="M12 2a20 20 0 0 0 0 20" />
    <path d="M2 12a20 20 0 0 0 20 0" />
  </svg>
);

// Custom American Football Icon
const AmericanFootballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929A9.96 9.96 0 0 0 2 12a9.96 9.96 0 0 0 2.929 7.071A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929A9.96 9.96 0 0 0 22 12a9.96 9.96 0 0 0-2.929-7.071A9.96 9.96 0 0 0 12 2Z" />
    <path d="M19 5 5 19" />
    <path d="M17 7 7 17" />
    <path d="M15 9 9 15" />
  </svg>
);

// Custom Casino Icon
const CasinoIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
    <path d="M9 15h.01" />
    <path d="M15 15h.01" />
    <path d="M12 12h.01" />
  </svg>
);

// Custom Blackjack Icon
const BlackjackIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M8 10h.01" />
    <path d="M12 10h.01" />
    <path d="M16 10h.01" />
    <path d="m9 14 3-3 3 3" />
  </svg>
);

// Custom Roulette Icon
const RouletteIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 7.76 2.83-2.83" />
  </svg>
);

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
    { path: '/', label: 'Home', icon: <Home size={18} className="text-neon-blue" /> },
    { 
      path: '/sports', 
      label: 'Sports', 
      icon: <SportIcon size={18} className="text-neon-blue" />,
      subItems: [
        { path: '/football', label: 'Football', icon: <FootballIcon size={18} className="text-neon-blue" /> },
        { path: '/basketball', label: 'Basketball', icon: <BasketballIcon size={18} className="text-neon-blue" /> },
        { path: '/american-football', label: 'American Football', icon: <AmericanFootballIcon size={18} className="text-neon-blue" /> }
      ]
    },
    { 
      path: '/casino', 
      label: 'Casino', 
      icon: <CasinoIcon size={18} className="text-neon-blue" />,
      subItems: [
        { path: '/blackjack', label: 'Blackjack', icon: <BlackjackIcon size={18} className="text-neon-blue" /> },
        { path: '/roulette', label: 'Roulette', icon: <RouletteIcon size={18} className="text-neon-blue" /> }
      ]
    },
    { path: '/social', label: 'Community', icon: <Share2 size={18} className="text-neon-blue" /> },
    { path: '/insights', label: 'Insights', icon: <Brain size={18} className="text-neon-blue" /> },
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
