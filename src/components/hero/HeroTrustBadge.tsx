
import React from 'react';
import { motion } from 'framer-motion';

const HeroTrustBadge = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="mt-16 flex justify-center"
      variants={fadeIn}
    >
      <div className="bg-dark-card px-6 py-3 rounded-lg border border-dark-border inline-flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-dark-card">
              {i}
            </div>
          ))}
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-400">Trusted by</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroTrustBadge;
