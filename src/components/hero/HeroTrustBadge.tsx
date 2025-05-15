
import React from 'react';
import { motion } from 'framer-motion';

const HeroTrustBadge = () => {
  const avatars = [1, 2, 3, 4];

  return (
    <motion.div 
      className="mt-16 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="bg-dark-card/40 backdrop-blur-lg px-6 py-3 rounded-lg border border-dark-border/50 inline-flex items-center gap-3"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex -space-x-2">
          {avatars.map((i) => (
            <motion.div 
              key={i} 
              className="w-8 h-8 rounded-full bg-dark-lighter flex items-center justify-center text-xs text-white border-2 border-dark-card"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {i}
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-gray-400">Trusted by</p>
          <p className="text-white font-medium">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="inline-block"
            >
              10,000+ users
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroTrustBadge;
