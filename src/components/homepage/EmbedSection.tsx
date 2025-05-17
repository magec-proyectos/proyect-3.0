
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeader from './embed/SectionHeader';
import PlatformCarousel from './embed/PlatformCarousel';
import NotificationAlert from './embed/NotificationAlert';
import { platforms } from './embed/platformsData';

const EmbedSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  const handlePlatformClick = (platformName: string) => {
    setSelectedPlatform(platformName);
    // In a real application, here we could open a modal with more options
    setTimeout(() => setSelectedPlatform(null), 3000);
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-lime/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 max-w-6xl mx-auto relative z-10">
        {/* Section Header with Title and CTA Button */}
        <SectionHeader />
        
        {/* Selected Platform Notification */}
        <NotificationAlert platformName={selectedPlatform} />
        
        {/* Platform Logos Carousel */}
        <PlatformCarousel 
          platforms={platforms} 
          onSelectPlatform={handlePlatformClick} 
        />
      </div>
    </section>
  );
};

export default EmbedSection;
