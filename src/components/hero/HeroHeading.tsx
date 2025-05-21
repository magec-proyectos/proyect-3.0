
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
    </>
  );
};

export default HeroHeading;
