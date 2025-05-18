
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeader from './embed/SectionHeader';
import PlatformCarousel from './embed/PlatformCarousel';
import { platforms } from './embed/platformsData';
import { motion } from 'framer-motion';

const EmbedSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Enhanced background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-30"></div>
      <motion.div 
        className="absolute -top-60 -right-60 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-60 -left-60 w-96 h-96 bg-neon-lime/5 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      <div className="container px-4 max-w-7xl mx-auto relative z-10">
        {/* Section Header with Title and CTA Button */}
        <SectionHeader />
        
        {/* Platform Logos Carousel */}
        <PlatformCarousel 
          platforms={platforms} 
        />

        {/* Add subtle animated indicators at the bottom */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-500"
              animate={{
                backgroundColor: ['rgba(100,100,100,0.3)', 'rgba(0,240,255,0.7)', 'rgba(100,100,100,0.3)'],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmbedSection;
