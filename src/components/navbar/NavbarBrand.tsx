
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
        <span className="font-bold text-xl text-white">
          Bet
        </span>
        <span className="font-black text-xl text-neon-blue ml-1 group-hover:animate-pulse">
          3.0
        </span>
      </div>
    </Link>
  );
};

export default NavbarBrand;
