
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TryItNow from '@/components/homepage/TryItNow';
import HeroHeading from './HeroHeading';

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
    <div className="relative overflow-hidden pt-20 pb-0 md:pt-24">
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
          {/* Use HeroHeading component for main heading */}
          <HeroHeading />
          
          {/* Enhanced action button */}
          <motion.div 
            className="flex justify-center mb-2" 
            variants={fadeIn}
          >
            <Link to="/sports" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="absolute -inset-0.5 bg-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button 
                  size="lg" 
                  className="relative bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white font-medium px-8 py-6 text-lg shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
                >
                  Get started for FREE
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Dedicated section for the TryItNow component with smooth transition */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-10"
      >
        <TryItNow />
      </motion.div>
    </div>
  );
};

export default Hero;
