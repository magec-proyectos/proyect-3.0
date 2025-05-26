
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell } from 'lucide-react';
import { AddictiveButton } from '@/components/ui/addictive-button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sports', href: '/sports' },
    { name: 'Casino', href: '/casino' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Social', href: '/social' },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-card/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-reward to-energy rounded-lg flex items-center justify-center mr-3">
                <span className="text-black font-bold text-lg">B3</span>
              </div>
              <span className="text-xl font-bold text-white">Bet 3.0</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-reward bg-reward/10 border border-reward/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <AddictiveButton
                variant="ghost"
                size="icon"
                psychology="none"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-urgency text-white text-xs animate-fomo-pulse">
                    {notifications}
                  </Badge>
                )}
              </AddictiveButton>
            </div>

            {/* Profile */}
            <AddictiveButton
              variant="ghost"
              size="icon"
              psychology="none"
            >
              <User className="h-5 w-5" />
            </AddictiveButton>

            {/* Login/Signup */}
            <AddictiveButton
              variant="outline"
              psychology="shimmer"
              className="mr-2"
            >
              Log In
            </AddictiveButton>
            
            <AddictiveButton
              variant="reward"
              psychology="dopamine"
            >
              Sign Up
            </AddictiveButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <AddictiveButton
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              psychology="none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </AddictiveButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-card border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-reward bg-reward/10 border border-reward/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 space-y-2">
                <AddictiveButton
                  variant="outline"
                  psychology="shimmer"
                  className="w-full"
                >
                  Log In
                </AddictiveButton>
                
                <AddictiveButton
                  variant="reward"
                  psychology="dopamine"
                  className="w-full"
                >
                  Sign Up
                </AddictiveButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
