
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';

const CasinoLogosCarousel = () => {
  const casinoLogos = [
    { name: '1XBet', src: '/lovable-uploads/7e5d05aa-3c36-4eef-9cd8-202104533843.png' },
    { name: 'Bet365', src: '/lovable-uploads/7a61cb64-7378-42fe-86f6-9684b829f00f.png' },
    { name: 'Betway', src: '/lovable-uploads/ef441bef-1632-435d-9221-1c9650713b09.png' },
    { name: 'Bwin', src: '/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png' },
    { name: 'Stake', src: '/lovable-uploads/2d29f278-65a7-4deb-8dd7-0c55d3966762.png' },
    { name: 'Winamax', src: '/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png' },
  ];

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-gray-400 text-sm text-center mb-4">
        Used by players from these casinos
      </h4>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {casinoLogos.map((logo) => (
            <CarouselItem key={logo.name} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6">
              <div className="p-1 flex items-center justify-center h-12">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="max-h-8 max-w-full filter grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2" />
        <CarouselNext className="right-0 translate-x-1/2" />
      </Carousel>
    </motion.div>
  );
};

export default CasinoLogosCarousel;
