
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';

const EmbedSection = () => {
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Updated platforms with new betting platform logos
  const platforms = [
    {
      id: 1,
      name: "Bet365",
      logo: "/lovable-uploads/9a24f074-43c8-4c44-8719-5ecf9a5cca19.png",
    },
    {
      id: 2,
      name: "Betfair",
      logo: "/lovable-uploads/5cb7a958-a0cd-47d6-b207-b5c15c5a5eae.png",
    },
    {
      id: 3,
      name: "Betway Casino",
      logo: "/lovable-uploads/7947049c-9853-47cd-b647-285643900698.png",
    },
    {
      id: 4,
      name: "Bwin",
      logo: "/lovable-uploads/e78cb717-5479-413a-8091-27fbad532a45.png",
    },
    {
      id: 5,
      name: "Stake",
      logo: "/lovable-uploads/ad91f76b-fd88-4cd4-9f40-3ce6de73d1d7.png",
    },
    {
      id: 6,
      name: "William Hill",
      logo: "/lovable-uploads/f88fd10a-c8d3-4baf-a7d4-df010dfa3afa.png",
    },
    {
      id: 7,
      name: "888 Casino",
      logo: "/lovable-uploads/21b9938e-f18f-4379-80b1-9b904248d817.png",
    },
    {
      id: 8,
      name: "1XBet",
      logo: "/lovable-uploads/d76166a8-55ac-4f7c-a038-07d92b6940df.png",
    }
  ];

  // Effect to ensure carousel autoplay continues without stopping
  React.useEffect(() => {
    if (!carouselApi) return;

    // Make sure autoplay is always running and doesn't stop on hover
    const autoplayPlugin = carouselApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
      
      // Reset the autoplay timer regularly to ensure continuous movement
      const interval = setInterval(() => {
        if (autoplayPlugin) {
          autoplayPlugin.play();
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  const handlePlatformClick = (platformName: string) => {
    setSelectedPlatform(platformName);
    // En una aplicación real, aquí se podría abrir un modal con más opciones
    setTimeout(() => setSelectedPlatform(null), 3000);
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-lime/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 max-w-6xl mx-auto relative z-10">
        {/* Integration Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-6"
        >
          <Badge className="bg-neon-blue/10 hover:bg-neon-blue/10 text-neon-blue font-medium py-1 px-4 rounded-full text-sm border-0">
            INTEGRATIONS
          </Badge>
        </motion.div>
        
        {/* Main Content - Header with button next to heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="text-4xl sm:text-4xl font-bold text-white leading-tight relative">
              Export bets to your 
              <span className="relative ml-2">
                <span className="text-neon-blue">favorite platforms</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-blue/30 rounded-full"></span>
              </span>
            </h2>
            
            <div className="flex flex-col items-start">
              <p className="text-base text-gray-300 mb-3 max-w-lg">
                Create your betting strategies and export them directly to your favorite casinos and betting platforms to maximize your winning potential.
              </p>
              <Button variant="outline" className="rounded-full border-neon-blue text-neon-blue hover:bg-neon-blue/20 px-6 py-6 h-auto text-base flex items-center whitespace-nowrap group transition-all duration-300 hover:scale-105">
                Explore all integrations 
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Selected Platform Notification */}
        {selectedPlatform && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <Alert className="bg-neon-blue/10 border-neon-blue/20 text-white">
              <AlertDescription className="flex items-center">
                <span className="mr-2">✓</span> Ready to export your betting strategy to {selectedPlatform}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {/* Platform Logos Carousel with Navigation - Updated for larger, uniform sized logos */}
        <motion.div 
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="relative px-8 py-4">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false, // Never stop on mouse enter
                  stopOnFocusIn: false, // Never stop on focus
                }),
              ]}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {platforms.map((platform) => (
                  <CarouselItem key={platform.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-4">
                    <motion.div 
                      className="flex flex-col items-center justify-center h-48 transition-all duration-300 hover:scale-105 
                      bg-dark-card rounded-xl hover:shadow-lg border border-dark-border hover:border-neon-blue/40 cursor-pointer
                      hover:bg-dark-card group overflow-hidden relative"
                      onClick={() => handlePlatformClick(platform.name)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-center h-full w-full p-6">
                        <img 
                          src={platform.logo} 
                          alt={platform.name} 
                          className="w-full h-full object-contain max-h-28 transition-transform duration-300 group-hover:scale-110" 
                        />
                      </div>
                      <span className="text-sm text-white bg-neon-blue/20 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 flex items-center">
                        Export to {platform.name} <ExternalLink className="ml-1 w-3 h-3" />
                      </span>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {!isMobile && (
                <>
                  <CarouselPrevious className="left-0 bg-dark-card hover:bg-dark-lighter border-dark-border text-gray-400" />
                  <CarouselNext className="right-0 bg-dark-card hover:bg-dark-lighter border-dark-border text-gray-400" />
                </>
              )}
            </Carousel>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(platforms.length / 3) }).map((_, index) => (
              <button
                key={index}
                className="w-3 h-3 rounded-full bg-dark-border transition-all duration-300 focus:outline-none hover:bg-neon-blue/70"
                onClick={() => carouselApi?.scrollTo(index * 3)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmbedSection;
