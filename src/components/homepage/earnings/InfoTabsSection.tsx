
import React from 'react';
import { motion } from 'framer-motion';
import InfoTabs from './InfoTabs';

const InfoTabsSection: React.FC = () => {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <InfoTabs />
    </motion.div>
  );
};

export default InfoTabsSection;
