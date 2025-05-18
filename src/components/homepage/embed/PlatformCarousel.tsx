
import React from 'react';
import { motion } from 'framer-motion';
import { Platform } from './types';
import PlatformCard from './PlatformCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface PlatformCarouselProps {
  platforms: Platform[];
}

const PlatformCarousel: React.FC<PlatformCarouselProps> = ({ platforms }) => {
  const [carouselApi, setCarouselApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1]>();
  
  // Create a duplicated list of platforms to ensure continuous looping
  const duplicatedPlatforms = [...platforms, ...platforms, ...platforms];

  // Improved configuration for truly continuous movement
  React.useEffect(() => {
    if (!carouselApi) return;

    // Ensure autoplay always works without stopping
    const autoplayPlugin = carouselApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
      
      // Faster interval for quicker movement
      const interval = setInterval(() => {
        if (autoplayPlugin) {
          autoplayPlugin.reset();
          autoplayPlugin.play();
        }
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <div className="relative px-4 py-6">
        {/* Add gradient overlay effects for better visual appeal */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-dark to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-dark to-transparent z-10"></div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 1,
            duration: 18, // Faster transition between slides
          }}
          plugins={[
            Autoplay({
              delay: 800, // Shorter delay for faster movement
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ]}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {duplicatedPlatforms.map((platform, index) => (
              <CarouselItem key={`${platform.id}-${index}`} className="pl-4 basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
                <PlatformCard platform={platform} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.div>
  );
};

export default PlatformCarousel;
