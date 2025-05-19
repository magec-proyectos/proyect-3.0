
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem, Icons } from './navConfig';

interface MobileNavItemProps {
  item: NavItem;
  onItemClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, onItemClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || 
    (item.subItems && item.subItems.some(sub => sub.path === location.pathname));
  
  // Render the icon component
  const IconComponent = item.icon ? Icons[item.icon] : null;
  
  return (
    <div>
      <Link 
        to={item.path} 
        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ${
          isActive
            ? 'text-neon-blue bg-dark/60 shadow-[0_0_8px_rgba(0,240,255,0.2)]' 
            : 'text-gray-400 hover:bg-dark/40 hover:text-white'
        }`}
        onClick={() => !item.subItems && onItemClick()}
      >
        <span className="transform transition-all duration-300 hover:scale-110">
          {IconComponent && <IconComponent size={18} className="text-neon-blue" />}
        </span>
        <span className="relative">
          {item.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue"></span>
          )}
        </span>
      </Link>
      
      {item.subItems && (
        <div className="pl-8 mt-2 space-y-1.5">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 ${
                location.pathname === subItem.path
                  ? 'text-neon-blue bg-dark/40 shadow-[0_0_5px_rgba(0,240,255,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-dark/30'
              }`}
              onClick={onItemClick}
            >
              {/* Adjust subitem icon rendering */}
              <span className="transform transition-all duration-300 hover:scale-110">
                {subItem.icon}
              </span>
              <span>{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;
