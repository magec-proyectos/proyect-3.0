
import React from 'react';
import { motion } from 'framer-motion';
import { Platform } from './types';

interface PlatformCardProps {
  platform: Platform;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-20 transition-all duration-300"
    >
      <div className="flex items-center justify-center h-full w-full p-1">
        <div className="w-16 h-16 relative flex items-center justify-center">
          <img 
            src={platform.logo} 
            alt={platform.name} 
            className="w-full h-full object-contain max-w-[32px] max-h-[32px]" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PlatformCard;
