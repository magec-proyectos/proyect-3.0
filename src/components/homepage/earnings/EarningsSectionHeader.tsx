
import React from 'react';
import { motion } from 'framer-motion';

const EarningsSectionHeader: React.FC = () => {
  return (
    <motion.div 
      className="text-center mb-6 md:mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-3 text-white"
      >
        Boost Your <span className="text-neon-blue">Earnings</span>
      </motion.h2>
      
      <p className="text-gray-300 max-w-xl mx-auto">
        See how our AI increases your betting success
      </p>
    </motion.div>
  );
};

export default EarningsSectionHeader;
