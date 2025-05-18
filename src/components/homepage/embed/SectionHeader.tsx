
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
      {/* Integration Badge with enhanced styling */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-6"
      >
        <Badge className="bg-gradient-to-r from-neon-blue/20 to-neon-lime/20 hover:from-neon-blue/30 hover:to-neon-lime/30 text-neon-blue font-medium py-1.5 px-4 rounded-full text-sm border-0 shadow-sm transition-all duration-300">
          INTEGRATIONS
        </Badge>
      </motion.div>
      
      {/* Main Content - Enhanced header with animated elements */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col">
            <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight relative mb-4">
              Export bets to your 
              <div className="relative inline-block ml-2">
                <span className="text-neon-blue">favorite platforms</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-blue to-neon-lime/60 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </div>
            </h2>
          </div>
          
          <div className="flex flex-col items-start">
            <p className="text-lg text-gray-300 max-w-lg mb-6 leading-relaxed">
              Create your betting strategies and export them directly to your favorite casinos and betting platforms to maximize your winning potential.
            </p>
            <Button 
              variant="outline" 
              className="rounded-full border-neon-blue bg-neon-blue/10 text-neon-blue hover:bg-neon-blue hover:text-white px-8 py-6 h-auto text-lg font-medium flex items-center whitespace-nowrap group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-neon-blue/20"
            >
              Explore all integrations 
              <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={22} />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionHeader;
