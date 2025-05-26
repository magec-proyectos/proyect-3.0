
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SportsLogosCarousel = () => {
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  
  const sportsLogos = [
    { name: 'Premier League', src: '/lovable-uploads/85dbbc49-2af9-4086-94bf-3bafcf426b5c.png' },
    { name: 'Indian Premier League', src: '/lovable-uploads/096710cc-8897-405e-93b7-5a5659000837.png' },
    { name: 'La Liga', src: '/lovable-uploads/a635c3fb-7139-42ce-ad1f-dc11a3d2220f.png' },
    { name: 'UEFA', src: '/lovable-uploads/fb6792ea-d7e4-47d1-a163-ae10bf1c87bf.png' },
    { name: 'NBA', src: '/lovable-uploads/6c02ec1c-f845-435e-87a1-549d1d438e47.png' },
    { name: 'NFL', src: '/lovable-uploads/3b5566bd-3e33-4241-ba35-8a1ba54969d9.png' },
    { name: 'MLS', src: '/lovable-uploads/47a02565-17b2-48ae-8b66-2a7dd7bb0e06.png' },
    { name: 'Olympics', src: '/lovable-uploads/8b78455d-84ca-4608-b036-0be9c351f504.png' },
    { name: 'Serie A', src: '/lovable-uploads/6d2ada63-b264-4432-851c-554425c783bf.png' },
    { name: 'Ligue 1', src: '/lovable-uploads/12cc0f4c-9fbf-48dd-822c-37559bddf487.png' },
    // Duplicate logos to create more scrolling space
    { name: 'Premier League-2', src: '/lovable-uploads/85dbbc49-2af9-4086-94bf-3bafcf426b5c.png' },
    { name: 'Indian Premier League-2', src: '/lovable-uploads/096710cc-8897-405e-93b7-5a5659000837.png' },
    { name: 'La Liga-2', src: '/lovable-uploads/a635c3fb-7139-42ce-ad1f-dc11a3d2220f.png' },
    { name: 'UEFA-2', src: '/lovable-uploads/fb6792ea-d7e4-47d1-a163-ae10bf1c87bf.png' },
    { name: 'NBA-2', src: '/lovable-uploads/6c02ec1c-f845-435e-87a1-549d1d438e47.png' },
  ];

  // Effect to ensure continuous movement
  useEffect(() => {
    if (!api) return;

    // Create autoplay plugin instance
    const autoplayPlugin = api.plugins()?.autoplay;
    
    // Make sure autoplay is always running
    const interval = setInterval(() => {
      if (autoplayPlugin) {
        autoplayPlugin.play();
      }
    }, 500); // Check frequently to ensure it's always running

    // Prevent stopping on interaction
    api.on('pointerDown', () => false); // Disable pointer interaction
    api.on('pointerUp', () => {
      if (autoplayPlugin) {
        autoplayPlugin.play();
      }
    });

    // Restart autoplay if it somehow stops
    api.on('settle', () => {
      setTimeout(() => {
        if (autoplayPlugin) {
          autoplayPlugin.play();
        }
      }, 10);
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto mt-8 mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          duration: 5000,
        }}
        plugins={[
          Autoplay({
            delay: 0,
            stopOnInteraction: false, 
            stopOnMouseEnter: false,
            stopOnFocusIn: false,
            playOnInit: true,
            rootNode: (emblaRoot) => emblaRoot,
          }),
        ]}
        setApi={setApi}
        className="w-full px-4"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {sportsLogos.map((logo) => (
            <CarouselItem key={logo.name} className="pl-4 md:pl-6 basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/7">
              <div className="flex items-center justify-center h-28 transition-all duration-300 hover:scale-110">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="max-h-16 w-24 object-contain transition-all duration-300 brightness-0 invert hover:brightness-110 filter grayscale hover:grayscale-0"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
};

export default SportsLogosCarousel;
