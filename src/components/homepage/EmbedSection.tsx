
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

  const platforms = [
    {
      id: 1,
      name: "Articulate",
      logo: "/lovable-uploads/203ad21a-9517-4ce9-9322-87450ea71fef.png",
    },
    {
      id: 2,
      name: "Moodle",
      logo: "/lovable-uploads/b19080fb-48a4-4114-8520-b3033bbbe7a1.png",
    },
    {
      id: 3,
      name: "Docebo",
      logo: "/lovable-uploads/b9e2b507-bfec-46fe-888f-427d89cef701.png",
    },
    {
      id: 4,
      name: "HubSpot",
      logo: "/lovable-uploads/77e0ad3f-f163-4ddc-9071-88dad9b24d85.png",
    },
    {
      id: 5,
      name: "Intercom",
      logo: "/lovable-uploads/816d62f4-7b52-4389-afd5-03dcab68d2da.png",
    },
    {
      id: 6,
      name: "Notion",
      logo: "/lovable-uploads/efa1c156-ae65-4515-ac2c-74c0b344448a.png",
    },
    {
      id: 7,
      name: "PowerPoint",
      logo: "/lovable-uploads/bfa1d35c-5296-491e-bb0c-712ddd509eeb.png",
    },
    {
      id: 8,
      name: "360 Learning",
      logo: "/lovable-uploads/30282de9-4cf4-47e2-b4ad-909d23f8d222.png",
    },
    {
      id: 9,
      name: "Nifty",
      logo: "/lovable-uploads/4ce1582f-5533-44d6-b843-2acb317db4fe.png",
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
    <section className="py-20 bg-white">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Integration Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-6"
        >
          <Badge className="bg-blue-50 hover:bg-blue-50 text-blue-600 font-medium py-1 px-4 rounded-full text-sm border-0">
            INTEGRATIONS
          </Badge>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900 leading-tight">
              Embed your videos on your favorite platforms
            </h2>
          </motion.div>
          
          {/* Right Column - Text and CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col gap-8"
          >
            <p className="text-lg text-gray-600">
              Embed videos in your favorite creation tool, LMS, LXP and many others to streamline the video generation process.
            </p>
            
            <div>
              <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-6 h-auto text-base flex items-center">
                Explore all integrations 
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Platform Logos Carousel */}
        <motion.div 
          className="mt-16 w-full"
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
                  <div className="p-2 flex items-center justify-center h-24 transition-all duration-300 hover:scale-105">
                    <img 
                      src={platform.logo} 
                      alt={platform.name} 
                      className="max-h-16 max-w-full object-contain" 
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
