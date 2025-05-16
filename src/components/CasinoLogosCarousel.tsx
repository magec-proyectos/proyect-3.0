
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
    { name: 'Bovada', src: '/lovable-uploads/df6b6dde-2b0f-4092-a8e7-9c48eda6b1b2.png' },
    { name: 'Stake', src: '/lovable-uploads/603ecc6b-3a6a-4ba3-8781-14c535e78317.png' },
  ];

  // Effect to ensure continuous movement
  useEffect(() => {
    if (!api) return;

    // Create autoplay plugin instance with faster speed
    const autoplayPlugin = api.plugins()?.autoplay;
    
    // Make sure autoplay is always running
    const interval = setInterval(() => {
      if (autoplayPlugin) {
        autoplayPlugin.play();
      }
    }, 1000);

    // Prevent stopping on interaction
    api.on('pointerUp', () => {
      setTimeout(() => {
        if (autoplayPlugin) {
          autoplayPlugin.play();
        }
      }, 10); // Almost immediately resume
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto mt-8 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
          duration: 25, // Changed from speed to duration for smooth animation
        }}
        plugins={[
          Autoplay({
            delay: 800, // Much faster autoplay
            stopOnInteraction: false,
            stopOnMouseEnter: false,
            playOnInit: true,
            rootNode: (emblaRoot) => emblaRoot,
          }),
        ]}
        setApi={setApi}
        className="w-full px-4"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {casinoLogos.map((logo) => (
            <CarouselItem key={logo.name} className="pl-4 md:pl-6 basis-1/3 sm:basis-1/4 md:basis-1/5">
              <div className="flex items-center justify-center h-28 transition-all duration-300 hover:scale-110">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className={`max-h-20 max-w-[85%] transition-all duration-300 brightness-0 invert hover:brightness-110 ${logo.name === 'Bovada' ? 'max-h-24 max-w-[95%]' : ''}`}
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
