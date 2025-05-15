
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
    { name: 'Mr Vegas', src: '/lovable-uploads/6b37fcd7-ac29-4070-89cd-c4b2992991fe.png' },
    { name: 'Stake', src: '/lovable-uploads/603ecc6b-3a6a-4ba3-8781-14c535e78317.png' },
  ];

  // Effect to handle manual scrolling interruption
  useEffect(() => {
    if (!api) return;

    // Reset to autoplay when user interaction ends
    api.on('pointerUp', () => {
      setTimeout(() => {
        api.plugins()?.autoplay?.reset();
      }, 50);
    });
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
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={setApi}
        className="w-full px-4"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {casinoLogos.map((logo) => (
            <CarouselItem key={logo.name} className="pl-4 md:pl-6 basis-1/3 sm:basis-1/4 md:basis-1/5">
              <div className="flex items-center justify-center h-28 transition-all duration-300">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="max-h-20 max-w-[85%] transition-all duration-300 brightness-0 invert hover:brightness-110"
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
