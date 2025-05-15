
import React from 'react';
import { motion } from 'framer-motion';

const HeroBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-neon-lime/10 rounded-full filter blur-3xl"
      ></motion.div>
    </div>
  );
};

export default HeroBackground;
