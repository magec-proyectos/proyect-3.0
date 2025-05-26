
import React from 'react';
import { motion } from 'framer-motion';
import SportsLogosCarousel from '@/components/SportsLogosCarousel';

const TrustedBySection = React.memo(() => {
  const fadeIn = React.useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }), []);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Trusted Across the <span className="text-white">World's Biggest Leagues</span>
          </h2>
          
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We analyze data from 20+ top competitions so you don't have to
          </p>
          
          {/* Sports Logos Carousel with optimized rendering */}
          <SportsLogosCarousel />
        </motion.div>
      </div>
    </section>
  );
});

TrustedBySection.displayName = 'TrustedBySection';

export default TrustedBySection;
