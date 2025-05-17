
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem as NavItemType } from './navConfig';

interface NavItemProps {
  item: NavItemType;
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || 
    (item.subItems && item.subItems.some(sub => sub.path === location.pathname));
  
  // Render the icon component with its props
  const renderIcon = (icon: any) => {
    if (!icon) return null;
    const IconComponent = icon.type;
    return <IconComponent {...icon.props} />;
  };
  
  return (
    <div className="relative group">
      <Link 
        to={item.path} 
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 group ${
          isActive
            ? 'text-neon-blue bg-dark/20' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {renderIcon(item.icon)}
        </span>
        <span className="relative">
          {item.label}
          <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
        </span>
      </Link>
      
      {item.subItems && (
        <div className="absolute left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
          <div className="py-3 bg-dark-lighter/80 backdrop-blur-md rounded-lg shadow-lg border border-dark-border">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                  location.pathname === subItem.path
                    ? 'text-neon-blue bg-dark/30' 
                    : 'text-gray-400 hover:text-white hover:bg-dark/20'
                }`}
              >
                <span className="transition-transform duration-300 hover:scale-110">
                  {renderIcon(subItem.icon)}
                </span>
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
