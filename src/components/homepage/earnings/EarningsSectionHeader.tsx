
import React from 'react';
import { motion } from 'framer-motion';

const EarningsSectionHeader: React.FC = () => {
  return (
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold mb-4 text-white"
      >
        Boost Your <span className="text-neon-blue">Earnings</span>
      </motion.h2>
      
      <p className="text-gray-300 max-w-2xl mx-auto mb-2">
        See how our AI system helps increase your betting success
      </p>
    </motion.div>
  );
};

export default EarningsSectionHeader;
