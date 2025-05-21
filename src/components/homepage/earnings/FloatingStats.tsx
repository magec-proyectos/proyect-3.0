
import React from 'react';
import { motion } from 'framer-motion';

const FloatingStats: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="hidden lg:block absolute left-10 top-1/3 bg-dark-card/80 backdrop-blur-md p-4 border border-neon-blue/20 rounded-lg"
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm">Avg. Profit Increase</p>
          <p className="text-3xl font-bold text-neon-blue">+28%</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:block absolute right-10 top-2/3 bg-dark-card/80 backdrop-blur-md p-4 border border-neon-lime/20 rounded-lg"
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm">Success Rate</p>
          <p className="text-3xl font-bold text-neon-lime">92%</p>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingStats;
