import React, { useState } from 'react';
import { Menu, X, Home, Share2 } from 'lucide-react';
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
    <path d="M8 12c0-4.4 1.8-8 4-8s4 3.6 4 8-1.8 8-4 8-4-3.6-4-8z" />
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
    <path d="m7.5 4.27 9 5.15" />
    <path d="m7.5 19.73 9-5.15" />
    <path d="m4.5 12 15 .01" />
    <path d="M12 2v20" />
    <path d="m12 6 7.5 6-7.5 6-7.5-6Z" />
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
    <path d="M4.93 4.93a20 20 0 0 1 14.14 14.14" />
    <path d="M19.07 4.93a20 20 0 0 0-14.14 14.14" />
    <path d="M12 2a20 20 0 0 0 0 20" />
    <path d="M2 12h20" />
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
    <ellipse cx="12" cy="12" rx="9" ry="6" />
    <path d="M7 12h10" />
    <path d="M8 8.5v7" />
    <path d="M16 8.5v7" />
    <path d="M5 10.5v3" />
    <path d="M19 10.5v3" />
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
    <circle cx="9" cy="9" r="1.5" />
    <circle cx="15" cy="15" r="1.5" />
    <circle cx="15" cy="9" r="1.5" />
    <circle cx="9" cy="15" r="1.5" />
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
    <path d="M7 9h2v6H7z" />
    <path d="M11 9h2v6h-2z" />
    <path d="M15 9h2v6h-2z" />
    <path d="m6 5-2 4" />
    <path d="m18 5 2 4" />
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
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M20 12h-4" />
    <path d="M8 12H4" />
    <path d="m17 12 1.9-1.9" />
    <path d="M5.1 13.9 7 12" />
    <path d="m17 12-1.9-1.9" />
    <path d="M5.1 10.1 7 12" />
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
