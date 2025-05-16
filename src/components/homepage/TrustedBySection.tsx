
import React from 'react';
import { motion } from 'framer-motion';
import CasinoLogosCarousel from '@/components/CasinoLogosCarousel';

const TrustedBySection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-12 bg-dark overflow-hidden">
      <div className="container px-0 max-w-full"> {/* Full width container with no horizontal padding */}
        <motion.div 
          className="mx-auto text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center px-4">
            <span className="gradient-text">Trusted by</span> <span className="text-white">3M+ users</span> <span className="gradient-text">of these casinos</span>
          </h2>
          
          {/* Casino Logos Carousel with optimized rendering */}
          <CasinoLogosCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
