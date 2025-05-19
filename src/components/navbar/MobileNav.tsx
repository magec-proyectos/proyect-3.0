
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import MobileNavItem from './MobileNavItem';
import UserMenu from './UserMenu';
import { User } from '@/contexts/AuthContext';
import { navItems, NavItem } from './navConfig';

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  user: User | null;
  logout: () => void;
  openLoginDialog: () => void;
  openRegisterDialog: () => void;
  toggleMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  navItems,
  user,
  logout,
  openLoginDialog,
  openRegisterDialog,
  toggleMenu
}) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden py-4 px-2 space-y-3 bg-dark-lighter rounded-lg mb-4">
      {navItems.map((item) => (
        <MobileNavItem key={item.path} item={item} onItemClick={toggleMenu} />
      ))}

      <Link 
        to="/profile"
        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          location.pathname === '/profile'
            ? 'text-neon-blue bg-dark/70' 
            : 'text-gray-400 hover:bg-dark/40 hover:text-white'
        }`}
        onClick={toggleMenu}
      >
        <CircleUser size={18} />
        <span>Profile</span>
      </Link>
      <UserMenu 
        user={user} 
        logout={logout} 
        openLoginDialog={() => {
          openLoginDialog();
          toggleMenu();
        }}
        openRegisterDialog={() => {
          openRegisterDialog();
          toggleMenu();
        }}
        isMobile={true}
      />
    </div>
  );
};

export default MobileNav;
