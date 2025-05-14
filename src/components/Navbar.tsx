
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Soccer, Dices, CircleUser, MenuIcon, Share2, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from '@/components/LoginDialog';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
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
      path: '/football', 
      label: 'Sports', 
      icon: <Soccer size={18} />,
      subItems: [
        { path: '/football', label: 'Football', icon: <Soccer size={18} /> },
        { path: '/basketball', label: 'Basketball', icon: <Dices size={18} /> },
        { path: '/american-football', label: 'American Football', icon: <Dices size={18} /> }
      ]
    },
    { 
      path: '/blackjack', 
      label: 'Casino', 
      icon: <MenuIcon size={18} />,
      subItems: [
        { path: '/blackjack', label: 'Blackjack', icon: <MenuIcon size={18} /> },
        { path: '/roulette', label: 'Roulette', icon: <MenuIcon size={18} /> }
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
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <span className="font-bold text-xl bg-gradient-to-r from-neon-blue to-neon-lime bg-clip-text text-transparent animate-pulse">Bet3.0</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-lime opacity-20 blur rounded-lg"></div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.path} className="relative group">
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-2 px-2 py-1 transition-colors ${
                      location.pathname === item.path || 
                      (item.subItems && item.subItems.some(sub => sub.path === location.pathname))
                        ? 'text-neon-blue' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                  
                  {item.subItems && (
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-2 bg-dark-lighter rounded-md shadow-lg border border-dark-border">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                              location.pathname === subItem.path
                                ? 'text-neon-blue bg-dark/40' 
                                : 'text-gray-400 hover:text-white hover:bg-dark/30'
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

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
                    className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium"
                    onClick={openRegisterDialog}
                  >
                    Get Started
                  </Button>
                </>
              )}
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
          {isMenuOpen && (
            <div className="md:hidden py-4 px-2 space-y-3 bg-dark-lighter rounded-lg mb-4">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path 
                        ? 'text-neon-blue bg-dark/70' 
                        : 'text-gray-400 hover:bg-dark/40 hover:text-white'
                    }`}
                    onClick={() => !item.subItems && setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                  
                  {item.subItems && (
                    <div className="pl-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                            location.pathname === subItem.path
                              ? 'text-neon-blue bg-dark/40' 
                              : 'text-gray-400 hover:text-white hover:bg-dark/30'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link 
                to="/profile"
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === '/profile'
                    ? 'text-neon-blue bg-dark/70' 
                    : 'text-gray-400 hover:bg-dark/40 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CircleUser size={18} />
                <span>Profile</span>
              </Link>
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
                    <Button variant="outline" size="sm" onClick={() => {
                      openLoginDialog();
                      setIsMenuOpen(false);
                    }}>Log In</Button>
                    <Button 
                      className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium"
                      onClick={() => {
                        openRegisterDialog();
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
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
