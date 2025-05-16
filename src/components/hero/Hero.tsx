
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
          
          {/* Enhanced action button */}
          <motion.div 
            className="flex justify-center mb-10"
            variants={fadeIn}
          >
            <Link to="/football" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-lime rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button 
                  size="lg" 
                  className="relative bg-dark-lighter border-2 border-neon-blue hover:bg-dark-card hover:border-neon-lime hover:text-neon-lime text-neon-blue font-medium px-8 py-6 text-lg shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
                >
                  Get started for FREE
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
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
