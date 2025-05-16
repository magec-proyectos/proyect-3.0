
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
    <section className="py-12 bg-dark">
      <div className="container px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center whitespace-nowrap">
            <span className="gradient-text">Trusted by</span> <span className="text-white">3M+ users of these casinos</span>
          </h2>
          
          {/* Casino Logos Carousel */}
          <CasinoLogosCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
