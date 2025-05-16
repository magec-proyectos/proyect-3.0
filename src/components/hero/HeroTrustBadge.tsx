import React from 'react';
import { motion } from 'framer-motion';

const HeroTrustBadge = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="mt-16 flex justify-center"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* He eliminado el div que contenía los círculos negros y el recuadro */}
    </motion.div>
  );
};

export default HeroTrustBadge;
