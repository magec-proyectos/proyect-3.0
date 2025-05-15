
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };

  const title = "Smarter Predictions".split("");

  return (
    <>
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center"
        variants={fadeIn}
      >
        <span className="inline-block">
          {title.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="gradient-text inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <span className="inline-block"> with AI.</span><br />
        <motion.span 
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Analyze, Predict, Win.
        </motion.span>
      </motion.h1>
      
      <motion.p 
        className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10 text-center"
        variants={fadeIn}
      >
        Advanced AI algorithms analyze sports data and card games to give you the winning edge.
        Make informed decisions backed by real-time statistics.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        variants={fadeIn}
      >
        <Link to="/football">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium w-full sm:w-auto shadow-lg shadow-neon-blue/20">
              Try Sports Analysis
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        </Link>
        <Link to="/blackjack">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" variant="outline" className="border-neon-lime text-neon-lime hover:bg-neon-lime/10 w-full sm:w-auto">
              Try Casino Advisor
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
};

export default HeroHeading;
