
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, SoccerBall, User, Brain, Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/football', label: 'Football', icon: <SoccerBall size={18} /> },
    { path: '/blackjack', label: 'Blackjack', icon: <MenuIcon size={18} /> },
    { path: '/insights', label: 'Insights', icon: <Brain size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl gradient-text">Bet3.0</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-2 px-2 py-1 transition-colors ${
                  location.pathname === item.path 
                    ? 'text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">Log In</Button>
            <Button className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium">
              Get Started
            </Button>
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
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path 
                    ? 'text-neon-blue bg-dark/70' 
                    : 'text-gray-400 hover:bg-dark/40 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-dark-border">
              <Button variant="outline" size="sm">Log In</Button>
              <Button className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
