
import React from 'react';
import { motion } from 'framer-motion';

const EarningsSectionBackground: React.FC = () => {
  return (
    <>
      {/* Enhanced Animated Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-lime/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Particle effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon-blue/40"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0.2,
              scale: 0.5
            }}
            animate={{ 
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`lime-${i}`}
            className="absolute w-1 h-1 rounded-full bg-neon-lime/40"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0.2,
              scale: 0.5
            }}
            animate={{ 
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default EarningsSectionBackground;
