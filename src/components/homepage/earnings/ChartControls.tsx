
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
  // Define chart types with their icons and labels
  const chartTypes = [
    { 
      id: 'earnings', 
      label: 'Earnings', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ) 
    },
    { 
      id: 'winRate', 
      label: 'Win Rate %', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      ) 
    },
    { 
      id: 'roi', 
      label: 'ROI %', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
  ];
  
  // Define time ranges with their label and gradient
  const timeRanges = [
    { id: '1m', label: '1M', gradient: 'from-neon-blue/20 to-neon-blue/5' },
    { id: '3m', label: '3M', gradient: 'from-neon-blue/30 to-neon-blue/10' },
    { id: '6m', label: '6M', gradient: 'from-neon-blue/40 to-neon-blue/20' },
    { id: '1y', label: '1Y', gradient: 'from-neon-blue/50 to-neon-blue/30' },
  ];

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
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-3 mb-8 relative">
          {/* Decorative underline that moves with selection */}
          <motion.div 
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-blue/40 rounded-full"
            layoutId="chart-underline"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{ 
              width: '80px',
              left: activeChart === 'earnings' ? '40px' : 
                    activeChart === 'winRate' ? '165px' : '290px'
            }}
          />
          
          {chartTypes.map((chart) => (
            <motion.div
              key={chart.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative z-10"
            >
              <Button
                variant={activeChart === chart.id ? 'default' : 'outline'}
                onClick={() => setActiveChart(chart.id as 'earnings' | 'winRate' | 'roi')}
                className={`transition-all duration-300 shadow-lg flex items-center gap-2 h-12 px-6 ${
                  activeChart === chart.id 
                  ? 'bg-gradient-to-r from-neon-blue to-neon-blue/70 text-black hover:shadow-neon-blue/30' 
                  : 'bg-dark-card/50 border-neon-blue/20 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/40 hover:text-white'
                }`}
              >
                <motion.span 
                  initial={{ rotate: 0 }}
                  animate={activeChart === chart.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={activeChart === chart.id ? "text-black" : "text-neon-blue"}
                >
                  {chart.icon}
                </motion.span>
                <motion.span 
                  animate={activeChart === chart.id ? {
                    textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 2px rgba(0,0,0,0.5)", "0 0 0px rgba(0,0,0,0)"]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {chart.label}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <div className="flex overflow-hidden rounded-lg border border-dark-border bg-dark-card/50 p-1">
          {timeRanges.map((range) => (
            <motion.div
              key={range.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <Button
                variant="ghost"
                onClick={() => setTimeRange(range.id as '1m' | '3m' | '6m' | '1y')}
                size="sm"
                className={`text-sm px-4 py-1 transition-all relative ${
                  timeRange === range.id 
                  ? 'text-black font-medium' 
                  : 'text-gray-400 hover:text-white'
                }`}
              >
                {timeRange === range.id && (
                  <motion.div 
                    className={`absolute inset-0 rounded-md bg-gradient-to-r ${range.gradient}`}
                    layoutId="timerange-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">{range.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Added badges showing new stats */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        <motion.div 
          className="text-xs text-gray-400 bg-dark-card/50 px-3 py-1 rounded-full border border-dark-border flex items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-neon-blue"></span>
          Latest data: May 2025
        </motion.div>
        
        <motion.div 
          className="text-xs text-gray-400 bg-dark-card/50 px-3 py-1 rounded-full border border-dark-border flex items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-neon-lime"></span>
          22,486 bettors analyzed
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChartControls;
