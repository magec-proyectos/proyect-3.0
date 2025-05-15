
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
    { name: '1XBet', src: '/lovable-uploads/7e5d05aa-3c36-4eef-9cd8-202104533843.png' },
    { name: 'Bet365', src: '/lovable-uploads/7a61cb64-7378-42fe-86f6-9684b829f00f.png' },
    { name: 'Betway', src: '/lovable-uploads/ef441bef-1632-435d-9221-1c9650713b09.png' },
    { name: 'Bwin', src: '/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png' },
    { name: 'Stake', src: '/lovable-uploads/2d29f278-65a7-4deb-8dd7-0c55d3966762.png' },
    { name: 'Winamax', src: '/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png' },
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
      className="w-full max-w-5xl mx-auto mt-8 mb-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-gray-400 text-lg text-center mb-6 font-medium">
        Used by players from these casinos
      </h4>
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
                  className="max-h-20 max-w-[85%] transition-all duration-300"
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
