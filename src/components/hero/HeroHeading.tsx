
import React from 'react';
import { motion } from 'framer-motion';

const HeroHeading = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <motion.h1 
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
        variants={fadeIn}
      >
        Smarter Predictions For Smarter Bets
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-gray-300 mb-8"
        variants={fadeIn}
      >
        Our AI analyzes sports and games to give you the edge you need.
      </motion.p>
    </>
  );
};

export default HeroHeading;
