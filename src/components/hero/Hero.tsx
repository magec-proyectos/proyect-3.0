
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroHeading from './HeroHeading';
import HeroPredictionCard from './HeroPredictionCard';
import HeroFeatures from './HeroFeatures';
import HeroTrustBadge from './HeroTrustBadge';
import CasinoLogosCarousel from '@/components/CasinoLogosCarousel';

const Hero = () => {
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 min-h-[90vh] flex items-center">
      {/* Background elements */}
      <HeroBackground />
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <HeroHeading />
          
          {/* Test Area */}
          <HeroPredictionCard />
          
          {/* Feature highlights */}
          <HeroFeatures />
          
          {/* Trust badges */}
          <HeroTrustBadge />
          
          {/* Add the casino logos carousel here */}
          <CasinoLogosCarousel />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
