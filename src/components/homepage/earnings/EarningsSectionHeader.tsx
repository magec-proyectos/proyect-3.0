
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

const EarningsSectionHeader: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div 
      className="text-center mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <motion.div className="flex items-center justify-center gap-2 mb-3">
        <BadgeCheck className="text-neon-blue w-6 h-6" />
        <span className="text-neon-blue font-medium">95% success rate</span>
      </motion.div>
      
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold mb-5 text-white leading-tight"
      >
        See Your Earnings <span className="text-neon-blue">Multiply</span>
      </motion.h2>
      
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        Our Bet 3.0 AI system has helped bettors increase winnings by an average of 127% in the first month alone. See the proof below.
      </p>
    </motion.div>
  );
};

export default EarningsSectionHeader;
