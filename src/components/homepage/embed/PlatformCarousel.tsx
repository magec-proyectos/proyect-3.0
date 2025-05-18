
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

  // Configuración mejorada para asegurar un movimiento continuo
  React.useEffect(() => {
    if (!carouselApi) return;

    // Asegurarse que el autoplay siempre esté funcionando
    const autoplayPlugin = carouselApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
      
      // Intervalo más corto para reiniciar el autoplay y mantener movimiento constante
      const interval = setInterval(() => {
        if (autoplayPlugin) {
          autoplayPlugin.reset(); // Reset para un movimiento más continuo
          autoplayPlugin.play();
        }
      }, 500); // Intervalo más corto para un movimiento más rápido
      
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
            duration: 20, // Reduced duration for faster movement
          }}
          plugins={[
            Autoplay({
              delay: 400, // Shorter delay for faster movement
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ]}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {platforms.map((platform) => (
              <CarouselItem key={platform.id} className="pl-4 basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
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
