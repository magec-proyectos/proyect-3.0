
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
  
  // Create a duplicated list of platforms for smoother continuous scrolling
  const extendedPlatforms = [...platforms, ...platforms, ...platforms];

  React.useEffect(() => {
    if (!carouselApi) return;

    // Configure continuous autoplay with no stops
    const autoplayPlugin = carouselApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
      
      // Ensure continuous scrolling by preventing any pauses
      const interval = setInterval(() => {
        if (autoplayPlugin) {
          autoplayPlugin.play();
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  return (
    <motion.div 
      className="w-full overflow-hidden"
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
            duration: 60, // Longer duration for slower, more continuous movement
          }}
          plugins={[
            Autoplay({
              delay: 0, // No delay between scrolls for continuous motion
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ]}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {extendedPlatforms.map((platform, index) => (
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
