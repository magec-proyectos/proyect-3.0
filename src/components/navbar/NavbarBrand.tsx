
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <span className="font-bold text-xl bg-gradient-to-r from-neon-blue to-neon-lime bg-clip-text text-transparent animate-pulse">Bet3.0</span>
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-lime opacity-20 blur rounded-lg"></div>
      </div>
    </Link>
  );
};

export default NavbarBrand;
