
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
      
      // Intervalo moderado para mantener un movimiento constante pero no extremadamente rápido
      const interval = setInterval(() => {
        if (autoplayPlugin) {
          autoplayPlugin.reset();
          autoplayPlugin.play();
        }
      }, 2000);
      
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
      <div className="relative px-4 py-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 1,
            duration: 25, // Moderately fast transition between slides
          }}
          plugins={[
            Autoplay({
              delay: 1000, // Moderate delay for a balanced speed
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
