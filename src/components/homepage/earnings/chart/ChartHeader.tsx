
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ activeChart }) => {
  // Function to get title and description based on active chart
  const getChartInfo = () => {
    switch (activeChart) {
      case 'earnings':
        return {
          title: 'Earnings Comparison',
          description: 'Compare your potential earnings with and without Bet 3.0 AI prediction system',
          badgeText: 'Revenue'
        };
      case 'winRate':
        return {
          title: 'Win Rate Analysis',
          description: 'See the percentage improvement in successful bets with Bet 3.0',
          badgeText: 'Success Rate'
        };
      case 'roi':
        return {
          title: 'Return on Investment',
          description: 'Track the efficiency of your betting capital with enhanced predictions',
          badgeText: 'ROI'
        };
      default:
        return {
          title: 'Performance Analytics',
          description: 'Track your betting performance metrics',
          badgeText: 'Analytics'
        };
    }
  };

  const { title, description, badgeText } = getChartInfo();

  return (
    <div className="flex justify-between items-start mb-6 z-10 relative">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={badgeText}
          >
            <Badge
              className="bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/30 px-2"
            >
              {badgeText}
            </Badge>
          </motion.div>
          
          {/* Decorative element */}
          <motion.div 
            className="w-4 h-0.5 bg-neon-blue/40"
            animate={{ width: [4, 16, 4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <motion.h3
          className="text-xl sm:text-2xl font-bold text-white"
          layout
          layoutId="chart-title"
          key={title}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-gray-400 max-w-md mt-1"
          key={description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Chart type indicator with icon */}
      <motion.div
        className="hidden sm:flex items-center gap-2 bg-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-dark-border"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-neon-blue"
          animate={{ 
            rotate: activeChart === 'earnings' ? [0, 180, 360] : 0,
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            rotate: { duration: 2, repeat: activeChart === 'earnings' ? Infinity : 0, ease: "easeInOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } 
          }}
        >
          {activeChart === 'earnings' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ) : activeChart === 'winRate' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          )}
        </motion.div>
        <span className="text-xs font-medium text-gray-300">
          {activeChart === 'earnings' ? 'Monetary View' : 
           activeChart === 'winRate' ? 'Success Rate' : 
           'Return on Investment'}
        </span>
      </motion.div>
    </div>
  );
};

export default ChartHeader;
