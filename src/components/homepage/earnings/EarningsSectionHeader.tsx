
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Badge className="bg-neon-blue/10 hover:bg-neon-blue/10 text-neon-blue font-medium py-1 px-4 rounded-full text-sm border-0">
          PERFORMANCE
        </Badge>
      </motion.div>
      
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight"
      >
        Boost Your Earnings
      </motion.h2>
      
      <p className="text-gray-400 max-w-3xl mx-auto text-lg">
        See the difference our Bet 3.0 prediction system can make to your betting performance
      </p>
    </motion.div>
  );
};

export default EarningsSectionHeader;
