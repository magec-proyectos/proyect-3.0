
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const CasinoLogosCarousel = () => {
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  
  const casinoLogos = [
    { name: '1XBet', src: '/lovable-uploads/404fc089-1ec6-447a-b228-424708187698.png' },
    { name: '888casino', src: '/lovable-uploads/a4b5a6bf-eba2-49d0-9d2e-c084094726ff.png' },
    { name: 'bet365', src: '/lovable-uploads/7b0e3981-9449-4433-bfd3-f8b1b08782d6.png' },
    { name: 'Betway', src: '/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png' },
    { name: 'Bwin', src: '/lovable-uploads/57ee4d31-5f2d-4b5d-b546-ad99ab1f37dd.png' },
    { name: 'Bovada', src: '/lovable-uploads/0f96ac67-f58a-4bb6-8eb0-35790175d95e.png' },
    { name: 'Stake', src: '/lovable-uploads/8612b727-d03a-4e04-887c-05e6beeda2b1.png' },
    // Duplicate logos multiple times to create a much longer scrolling space (pitch.com style)
    { name: '1XBet-2', src: '/lovable-uploads/404fc089-1ec6-447a-b228-424708187698.png' },
    { name: '888casino-2', src: '/lovable-uploads/a4b5a6bf-eba2-49d0-9d2e-c084094726ff.png' },
    { name: 'bet365-2', src: '/lovable-uploads/7b0e3981-9449-4433-bfd3-f8b1b08782d6.png' },
    { name: 'Betway-2', src: '/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png' },
    { name: 'Bwin-2', src: '/lovable-uploads/57ee4d31-5f2d-4b5d-b546-ad99ab1f37dd.png' },
    { name: 'Bovada-2', src: '/lovable-uploads/0f96ac67-f58a-4bb6-8eb0-35790175d95e.png' },
    { name: 'Stake-2', src: '/lovable-uploads/8612b727-d03a-4e04-887c-05e6beeda2b1.png' },
    { name: '1XBet-3', src: '/lovable-uploads/404fc089-1ec6-447a-b228-424708187698.png' },
    { name: '888casino-3', src: '/lovable-uploads/a4b5a6bf-eba2-49d0-9d2e-c084094726ff.png' },
    { name: 'bet365-3', src: '/lovable-uploads/7b0e3981-9449-4433-bfd3-f8b1b08782d6.png' },
    { name: 'Betway-3', src: '/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png' },
    { name: 'Bwin-3', src: '/lovable-uploads/57ee4d31-5f2d-4b5d-b546-ad99ab1f37dd.png' },
    { name: 'Bovada-3', src: '/lovable-uploads/0f96ac67-f58a-4bb6-8eb0-35790175d95e.png' },
    { name: 'Stake-3', src: '/lovable-uploads/8612b727-d03a-4e04-887c-05e6beeda2b1.png' },
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
      className="w-full overflow-hidden py-8" // Full width, ensure overflow is hidden
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true, // Enable smooth dragging for pitch.com feel
          duration: 90000, // Very slow continuous movement (much slower for more natural feel)
          containScroll: false, // Allow overscrolling for a more fluid experience
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
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {casinoLogos.map((logo) => (
            <CarouselItem key={logo.name} className="pl-4 basis-1/6 sm:basis-1/8 md:basis-1/10 lg:basis-1/12"> 
              <div className="flex items-center justify-center h-24 transition-all duration-300 hover:scale-110">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="h-16 w-36 object-contain transition-all duration-300 brightness-0 invert hover:brightness-110"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
};

export default CasinoLogosCarousel;
