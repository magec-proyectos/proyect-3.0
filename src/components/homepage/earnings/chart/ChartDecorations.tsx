
import React from 'react';
import { motion } from 'framer-motion';

interface ChartDecorationsProps {
  percentageChange: number;
}

const ChartDecorations: React.FC<ChartDecorationsProps> = ({ percentageChange }) => {
  return (
    <>
      {/* SVG Background pattern - enhanced visuals */}
      <svg className="absolute inset-0 w-full h-full opacity-5 z-0" width="100%" height="100%">
        <defs>
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
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bg-gradient)" />
      </svg>
      
      {/* Dynamic interactive lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30 z-1" width="100%" height="100%">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1="0%"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="#00f0ff"
            strokeWidth="0.5"
            strokeDasharray="5,10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -15 }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
      
      {/* Performance boost indicator with enhanced styling */}
      <motion.div 
        className="absolute bottom-6 right-8 bg-dark-lighter/80 backdrop-blur-md p-6 rounded-lg border border-neon-blue/30 shadow-xl z-20"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 0 25px rgba(0, 240, 255, 0.3)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="relative"
          animate={{ 
            boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 15px rgba(0, 240, 255, 0.4)", "0 0 0px rgba(0, 240, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Decorative background elements */}
          <motion.div 
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-neon-blue/10"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-neon-blue/20"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          
          <div className="flex items-center gap-3 z-10 relative">
            {/* Animated pulse indicator */}
            <motion.div 
              className="relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="absolute inset-0 w-3 h-3 rounded-full bg-neon-blue"
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="w-3 h-3 rounded-full bg-neon-blue relative z-10"></div>
            </motion.div>
            
            <div>
              <p className="text-sm font-medium text-gray-400">Performance Boost</p>
              <div className="flex items-center">
                <motion.p 
                  className="text-2xl font-bold text-neon-blue"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 10px rgba(0, 240, 255, 1)", "0 0 0px rgba(0, 240, 255, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +{percentageChange}%
                </motion.p>
                
                <motion.div
                  className="ml-2 rounded text-xs px-1.5 py-0.5 bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  vs. standard
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced floating data points with trails */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-neon-blue/70"
              style={{ filter: "blur(1px)" }}
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
            
            {/* Add trailing effect */}
            <motion.div
              className="absolute w-1 h-1 rounded-full bg-neon-blue/40"
              style={{ filter: "blur(2px)" }}
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
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: index * 2 + 0.2,
                ease: "easeInOut"
              }}
            />
          </React.Fragment>
        ))}
        
        {/* Add lime accents for variety */}
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={`lime-${index}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-neon-lime/60"
            style={{ filter: "blur(1px)" }}
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
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{ 
              duration: 7 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Enhanced animated border highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent z-0"
        animate={{ 
          boxShadow: ["inset 0 0 0px rgba(0, 240, 255, 0)", "inset 0 0 30px rgba(0, 240, 255, 0.15)", "inset 0 0 0px rgba(0, 240, 255, 0)"],
          borderColor: ["rgba(0, 240, 255, 0)", "rgba(0, 240, 255, 0.2)", "rgba(0, 240, 255, 0)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-16 -right-16 w-32 h-32 bg-neon-blue/5 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </>
  );
};

export default ChartDecorations;
