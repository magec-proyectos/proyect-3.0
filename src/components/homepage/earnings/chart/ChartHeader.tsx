
import React from 'react';
import { motion } from 'framer-motion';

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ activeChart }) => {
  const chartTitle = activeChart === 'earnings' 
    ? 'Earnings Performance' 
    : activeChart === 'winRate' 
      ? 'Win Rate %' 
      : 'Return on Investment %';
      
  return (
    <motion.h3 
      className="text-3xl font-semibold mb-6 relative z-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {chartTitle}
    </motion.h3>
  );
};

export default ChartHeader;
