
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
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text whitespace-nowrap">
            Trusted by <span className="text-white">3M+ users</span> of these casinos
          </h2>
          
          <div className="w-full max-w-3xl">
            <CasinoLogosCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
