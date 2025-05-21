
import React from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';

interface ChartSectionProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '3m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: any;
  getPercentageChange: () => number;
}

const ChartSection: React.FC<ChartSectionProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData, 
  chartConfig,
  getPercentageChange 
}) => {
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
      className="relative w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <ChartDisplay 
        activeChart={activeChart}
        timeRange={timeRange}
        chartKey={chartKey}
        animateChart={animateChart}
        activeData={activeData}
        chartConfig={chartConfig}
        getPercentageChange={getPercentageChange}
      />
    </motion.div>
  );
};

export default ChartSection;
