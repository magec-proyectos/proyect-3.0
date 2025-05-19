
import React from 'react';
import { motion } from 'framer-motion';

interface ChartDecorationsProps {
  percentageChange: number;
}

const ChartDecorations: React.FC<ChartDecorationsProps> = ({ percentageChange }) => {
  // Particle animation configuration
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: i * 0.5
  }));
  
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
        
        {/* Dynamic grid accent elements */}
        <motion.circle 
          cx="20%" cy="30%" r="5" 
          fill="#00f0ff" 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.circle 
          cx="70%" cy="20%" r="4" 
          fill="#a1fc40" 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />
        <motion.circle 
          cx="80%" cy="60%" r="6" 
          fill="#00f0ff" 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
      
      {/* Performance boost indicator */}
      <motion.div 
        className="absolute bottom-6 right-8 bg-dark-lighter/80 backdrop-blur-sm p-6 rounded-lg border border-neon-blue/30 shadow-xl z-20"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 240, 255, 0.3)" }}
      >
        <motion.div 
          className="flex items-center gap-3"
          animate={{ 
            boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 15px rgba(0, 240, 255, 0.4)", "0 0 0px rgba(0, 240, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-3 h-3 rounded-full bg-neon-blue"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
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
      
      {/* Floating data points with improved animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-neon-blue/70"
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`, 
              opacity: 0 
            }}
            animate={{ 
              x: [
                `${particle.x}%`, 
                `${(particle.x + 20) % 100}%`, 
                `${(particle.x + 10) % 100}%`
              ],
              y: [
                `${particle.y}%`, 
                `${(particle.y + 30) % 100}%`, 
                `${(particle.y + 15) % 100}%`
              ],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Enhanced animated border highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent z-0"
        animate={{ 
          boxShadow: [
            "inset 0 0 0px rgba(0, 240, 255, 0)", 
            "inset 0 0 30px rgba(0, 240, 255, 0.15)", 
            "inset 0 0 0px rgba(0, 240, 255, 0)"
          ],
          borderColor: [
            "rgba(0, 240, 255, 0)", 
            "rgba(0, 240, 255, 0.2)", 
            "rgba(0, 240, 255, 0)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </>
  );
};

export default ChartDecorations;
