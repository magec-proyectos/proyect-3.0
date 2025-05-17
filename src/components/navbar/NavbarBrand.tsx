
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 relative group">
      <div className="relative transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-1">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neon-blue via-white to-white bg-clip-text text-transparent">
            Bet
          </span>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-neon-lime to-neon-blue bg-clip-text text-transparent ml-1">
            <span className="relative top-[-1px]">3.0</span>
          </span>
        </div>
        
        <div className="absolute -inset-1.5 bg-gradient-to-r from-neon-blue to-neon-lime opacity-20 blur-md rounded-lg group-hover:opacity-30 group-hover:blur-lg transition-all duration-300"></div>
        
        <div className="absolute -bottom-1 left-0 right-0 flex">
          <div className="w-1/2 h-0.5 bg-gradient-to-r from-neon-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="w-1/2 h-0.5 bg-gradient-to-l from-neon-lime to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
        </div>
      </div>
    </Link>
  );
};

export default NavbarBrand;
