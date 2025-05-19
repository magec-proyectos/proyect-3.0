
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div 
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['earnings', 'winRate', 'roi'].map((chartType) => (
          <motion.div
            key={chartType}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={activeChart === chartType ? 'default' : 'outline'}
              onClick={() => setActiveChart(chartType as 'earnings' | 'winRate' | 'roi')}
              className={`transition-all duration-300 shadow-lg ${activeChart === chartType 
                ? 'bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon-blue/20' 
                : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/60'}`}
            >
              <motion.span 
                animate={activeChart === chartType ? {
                  textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 2px rgba(0,0,0,0.5)", "0 0 0px rgba(0,0,0,0)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {chartType === 'earnings' ? 'Earnings' : chartType === 'winRate' ? 'Win Rate %' : 'ROI %'}
              </motion.span>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-end gap-2 mb-4">
        {['1m', '3m', '6m', '1y'].map((range) => (
          <motion.div
            key={range}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={timeRange === range ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange(range as '1m' | '3m' | '6m' | '1y')}
              size="sm"
              className={`text-xs transition-all ${timeRange === range ? 'bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30' : 'text-gray-400 hover:text-white'}`}
            >
              {range.toUpperCase()}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChartControls;
