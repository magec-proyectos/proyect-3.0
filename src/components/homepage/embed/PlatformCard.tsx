
import React from 'react';
import { motion } from 'framer-motion';
import { Platform } from './types';

interface PlatformCardProps {
  platform: Platform;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-24 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center h-full w-full p-1 rounded-xl bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/20 group">
        <div className="w-24 h-24 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img 
            src={platform.logo} 
            alt={platform.name} 
            className="w-full h-full object-contain max-w-[80px] max-h-[80px] filter group-hover:brightness-110 transition-all duration-300" 
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {platform.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlatformCard;
