
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Platform } from './types';

interface PlatformCardProps {
  platform: Platform;
  onClick: (platformName: string) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onClick }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-40 transition-all duration-300 hover:scale-105 
      cursor-pointer relative"
      onClick={() => onClick(platform.name)}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex items-center justify-center h-full w-full p-2">
        <div className="w-32 h-32 relative flex items-center justify-center">
          <img 
            src={platform.logo} 
            alt={platform.name} 
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" 
          />
        </div>
      </div>
      <span className="text-sm text-white bg-neon-blue/20 py-2 px-4 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 absolute bottom-0 flex items-center">
        Export to {platform.name} <ExternalLink className="ml-1 w-3 h-3" />
      </span>
    </motion.div>
  );
};

export default PlatformCard;
