
import React from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';
import { Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const percentageChange = getPercentageChange();

  return (
    <motion.div 
      className="relative w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-r from-neon-blue/10 to-transparent p-4 rounded-lg border border-neon-blue/30 mb-2 flex items-center gap-3">
          <TrendingUp className="text-neon-blue w-5 h-5" />
          <div className="flex-1">
            <span className="text-white">With our AI predictions, you could have increased your {activeChart === 'earnings' ? 'earnings' : activeChart === 'winRate' ? 'win rate' : 'ROI'} by</span>{' '}
            <span className="text-neon-blue font-bold">{percentageChange}%</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-dark border-neon-blue/50 text-neon-blue hover:bg-neon-blue hover:text-dark transition-all duration-300"
          >
            <Calculator className="w-4 h-4 mr-2" /> Try the Calculator
          </Button>
        </div>

        <ChartDisplay 
          activeChart={activeChart}
          timeRange={timeRange}
          chartKey={chartKey}
          animateChart={animateChart}
          activeData={activeData}
          chartConfig={chartConfig}
          getPercentageChange={getPercentageChange}
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <div className="bg-dark-card/80 p-3 rounded-lg border border-dark-border flex items-center gap-3 min-w-[180px]">
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <span className="text-white text-sm">With Bet 3.0</span>
        </div>
        
        <motion.div 
          className="text-3xl font-bold text-white flex items-center"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {percentageChange}% better
        </motion.div>
        
        <div className="bg-dark-card/80 p-3 rounded-lg border border-dark-border flex items-center gap-3 min-w-[180px]">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-white text-sm">Without Bet 3.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChartSection;
