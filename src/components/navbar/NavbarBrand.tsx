
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 relative group">
      <div className="relative transition-all duration-300 hover:scale-105">
        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neon-blue via-white to-neon-lime bg-clip-text text-transparent">
          Bet<span className="font-black">3.0</span>
        </span>
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-lime opacity-20 blur-md rounded-lg group-hover:opacity-30 group-hover:blur-lg transition-all duration-300"></div>
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue to-neon-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
};

export default NavbarBrand;
