
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const EmbedSection = () => {
  const [carouselApi, setCarouselApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1]>();
  
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

  // Effect to ensure carousel autoplay continues
  React.useEffect(() => {
    if (!carouselApi) return;

    // Make sure autoplay is always running
    const autoplayPlugin = carouselApi.plugins()?.autoplay;
    if (autoplayPlugin) {
      autoplayPlugin.play();
    }
  }, [carouselApi]);

  return (
    <section className="py-20 bg-dark">
      <div className="container px-4 max-w-6xl mx-auto">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-4xl sm:text-4xl font-bold text-white leading-tight">
              Export bets to your favorite platforms
            </h2>
            
            <div className="flex flex-col items-start">
              <p className="text-base text-gray-400 mb-3">
                Create your betting strategies and export them directly to your favorite casinos and betting platforms to maximize your winning potential.
              </p>
              <Button variant="outline" className="rounded-full border-neon-blue text-neon-blue hover:bg-neon-blue/20 px-6 py-6 h-auto text-base flex items-center whitespace-nowrap">
                Explore all integrations 
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Platform Logos Carousel */}
        <motion.div 
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {platforms.map((platform) => (
                <CarouselItem key={platform.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                  <div className="p-4 flex items-center justify-center h-24 transition-all duration-300 hover:scale-110 bg-dark-lighter rounded-lg hover:shadow-lg border border-dark-border">
                    <img 
                      src={platform.logo} 
                      alt={platform.name} 
                      className="max-h-16 max-w-full object-contain filter brightness-100" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default EmbedSection;
