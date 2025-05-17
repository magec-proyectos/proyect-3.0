
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SectionHeader: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
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
    </>
  );
};

export default SectionHeader;
