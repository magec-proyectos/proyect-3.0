
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

  return (
    <>
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        variants={fadeIn}
      >
        <span className="gradient-text">Smarter Predictions</span> with AI.<br />
        <span className="text-white">Analyze, Predict, Win.</span>
      </motion.h1>
      
      <motion.p 
        className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10"
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
          <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium w-full sm:w-auto">
            Try Sports Analysis
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </Link>
        <Link to="/blackjack">
          <Button size="lg" variant="outline" className="border-neon-lime text-neon-lime hover:bg-neon-lime/10 w-full sm:w-auto">
            Try Casino Advisor
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </Link>
      </motion.div>
    </>
  );
};

export default HeroHeading;
