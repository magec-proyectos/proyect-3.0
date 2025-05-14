
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileNavItemProps {
  item: {
    path: string;
    label: string;
    icon: React.ReactNode;
    subItems?: SubItem[];
  };
  onItemClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, onItemClick }) => {
  const location = useLocation();
  
  return (
    <div>
      <Link 
        to={item.path} 
        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          location.pathname === item.path 
            ? 'text-neon-blue bg-dark/70' 
            : 'text-gray-400 hover:bg-dark/40 hover:text-white'
        }`}
        onClick={() => !item.subItems && onItemClick()}
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
              onClick={onItemClick}
            >
              {subItem.icon}
              <span>{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;
