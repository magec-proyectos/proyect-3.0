
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

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
      
      <p className="text-gray-300 max-w-2xl mx-auto">
        Our AI system helps bettors increase winnings by an average of 127% in the first month.
      </p>
      
      <div className="flex items-center justify-center mt-4">
        <BadgeCheck className="text-neon-blue w-5 h-5 mr-2" />
        <span className="text-neon-blue">95% success rate</span>
      </div>
    </motion.div>
  );
};

export default EarningsSectionHeader;
