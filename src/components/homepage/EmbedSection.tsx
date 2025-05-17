
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmbedSection = () => {
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
      name: "Platform 1",
      logo: "/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png",
    },
    {
      id: 2,
      name: "Platform 2",
      logo: "/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png",
    },
    {
      id: 3,
      name: "Platform 3",
      logo: "/lovable-uploads/7524a565-21ca-4ac3-827b-23a205a694d2.png",
    },
    {
      id: 4,
      name: "Platform 4",
      logo: "/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png",
    },
    {
      id: 5,
      name: "Platform 5",
      logo: "/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png",
    },
    {
      id: 6,
      name: "Platform 6",
      logo: "/lovable-uploads/7524a565-21ca-4ac3-827b-23a205a694d2.png",
    },
    {
      id: 7,
      name: "Platform 7",
      logo: "/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png",
    },
    {
      id: 8,
      name: "Platform 8",
      logo: "/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png",
    },
    {
      id: 9,
      name: "Platform 9",
      logo: "/lovable-uploads/7524a565-21ca-4ac3-827b-23a205a694d2.png",
    }
  ];

  return (
    <section className="py-20 bg-white text-dark">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Integration Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-6"
        >
          <span className="bg-blue-50 text-blue-600 font-medium py-1 px-4 rounded-full text-sm">
            INTEGRACIONES
          </span>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Heading and Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-5xl font-bold mb-8 text-gray-900 leading-tight">
              Inserta tus videos en tus plataformas favoritas
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
              Inserta los videos en tu herramienta de creación favorita, LMS, LXP y muchas otras para agilizar el proceso de generación de videos.
            </p>
            
            <div>
              <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-6 h-auto text-base flex items-center">
                Explora todas las integraciones (en ing.) 
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Platform Logos */}
        <motion.div 
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {platforms.map((platform) => (
            <div 
              key={platform.id} 
              className="p-2 flex items-center justify-center"
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="w-12 h-12 object-contain" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EmbedSection;
