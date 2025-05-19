
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart } from "lucide-react";

interface ChartControlsProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  setActiveChart: (chart: 'earnings' | 'winRate' | 'roi') => void;
  timeRange: '1m' | '3m' | '6m' | '1y';
  setTimeRange: (range: '1m' | '3m' | '6m' | '1y') => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({ 
  activeChart, 
  setActiveChart, 
  timeRange, 
  setTimeRange 
}) => {
  // Chart types configuration
  const chartTypes = [
    { id: 'earnings', label: 'Earnings', icon: BarChart3 },
    { id: 'winRate', label: 'Win Rate %', icon: LineChart },
    { id: 'roi', label: 'ROI %', icon: PieChart }
  ];
  
  // Time range options
  const timeRanges = [
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '6m', label: '6M' },
    { id: '1y', label: '1Y' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        variants={containerVariants}
      >
        {chartTypes.map(({ id, label, icon: Icon }) => (
          <motion.div
            key={id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={activeChart === id ? 'default' : 'outline'}
              onClick={() => setActiveChart(id as 'earnings' | 'winRate' | 'roi')}
              className={`transition-all duration-300 shadow-lg flex items-center gap-2 ${activeChart === id 
                ? 'bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon-blue/20' 
                : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/60'}`}
            >
              <Icon className="w-4 h-4" />
              <motion.span 
                animate={activeChart === id ? {
                  textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 2px rgba(0,0,0,0.5)", "0 0 0px rgba(0,0,0,0)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {label}
              </motion.span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap justify-end gap-2 mb-4"
        variants={containerVariants}
      >
        {timeRanges.map(({ id, label }) => (
          <motion.div
            key={id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={timeRange === id ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange(id as '1m' | '3m' | '6m' | '1y')}
              size="sm"
              className={`text-xs transition-all ${timeRange === id 
                ? 'bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30' 
                : 'text-gray-400 hover:text-white'}`}
            >
              {label}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChartControls;
