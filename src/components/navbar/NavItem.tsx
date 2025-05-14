
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavItemProps {
  item: {
    path: string;
    label: string;
    icon: React.ReactNode;
    subItems?: SubItem[];
  };
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const location = useLocation();
  
  return (
    <div className="relative group">
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
  );
};

export default NavItem;
