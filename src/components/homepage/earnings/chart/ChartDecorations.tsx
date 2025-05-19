
import React from 'react';
import { motion } from 'framer-motion';

interface ChartDecorationsProps {
  percentageChange: number;
}

const ChartDecorations: React.FC<ChartDecorationsProps> = ({ percentageChange }) => {
  return (
    <>
      {/* SVG Background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5 z-0" width="100%" height="100%">
        <pattern id="graph-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <motion.path 
            d="M 0 10 L 20 10 M 10 0 L 10 20" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
      </svg>
      
      {/* Performance boost indicator */}
      <motion.div 
        className="absolute bottom-6 right-8 bg-dark-lighter/80 backdrop-blur-sm p-6 rounded-lg border border-neon-blue/30 shadow-xl z-20"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          animate={{ 
            boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 15px rgba(0, 240, 255, 0.4)", "0 0 0px rgba(0, 240, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <div>
            <p className="text-sm font-medium text-gray-400">Performance Boost</p>
            <motion.p 
              className="text-2xl font-bold text-neon-blue"
              animate={{ 
                textShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 10px rgba(0, 240, 255, 1)", "0 0 0px rgba(0, 240, 255, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +{percentageChange}%
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating data points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-neon-blue/70"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Animated border highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent z-0"
        animate={{ 
          boxShadow: ["inset 0 0 0px rgba(0, 240, 255, 0)", "inset 0 0 30px rgba(0, 240, 255, 0.15)", "inset 0 0 0px rgba(0, 240, 255, 0)"],
          borderColor: ["rgba(0, 240, 255, 0)", "rgba(0, 240, 255, 0.2)", "rgba(0, 240, 255, 0)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </>
  );
};

export default ChartDecorations;
