
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeader from './embed/SectionHeader';
import PlatformCarousel from './embed/PlatformCarousel';
import { platforms } from './embed/platformsData';

const EmbedSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-lime/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 max-w-6xl mx-auto relative z-10">
        {/* Section Header with Title and CTA Button */}
        <SectionHeader />
        
        {/* Platform Logos Carousel */}
        <PlatformCarousel 
          platforms={platforms} 
        />
      </div>
    </section>
  );
};

export default EmbedSection;
