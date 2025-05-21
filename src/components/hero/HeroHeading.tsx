
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
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        variants={fadeIn}
      >
        <span className="gradient-text">Smarter Predictions</span> with AI.
      </motion.h1>
      
      <motion.p 
        className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10"
        variants={fadeIn}
      >
        Advanced AI algorithms analyze sports data to give you the winning edge.
      </motion.p>
    </>
  );
};

export default HeroHeading;
