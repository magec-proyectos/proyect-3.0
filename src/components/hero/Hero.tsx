
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TryItNow from '@/components/homepage/TryItNow';

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-12">
      {/* Background elements */}
      <HeroBackground />
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Simplified hero heading */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeIn}
          >
            <span className="gradient-text">Smarter Predictions</span> <br />
            <span className="text-white">For Smarter Bets</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10"
            variants={fadeIn}
          >
            Our AI analyzes sports and games to give you the edge you need.
          </motion.p>
          
          {/* Single action button */}
          <motion.div 
            className="flex justify-center mb-10"
            variants={fadeIn}
          >
            <Link to="/football">
              <Button 
                size="lg" 
                className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium px-8"
              >
                Get started for FREE
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Try it now section placed directly below the hero */}
          <TryItNow />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
