
import React from 'react';
import { motion } from 'framer-motion';

const HeroBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-dark opacity-80"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="absolute w-[500px] h-[500px] rounded-full bg-neon-blue/10 filter blur-[100px] -top-48 -right-28"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-lime/10 filter blur-[80px] bottom-0 left-0"></div>
      </motion.div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 right-[10%] w-12 h-12 rounded-full border border-dark-border"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-[30%] left-[15%] w-6 h-6 rounded-full bg-neon-blue/20"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute bottom-[20%] right-[20%] w-20 h-20 border border-neon-lime/20 rounded-lg"
        animate={{ 
          rotate: 360,
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJmMzM0MiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" style={{ opacity: 0.1 }}></div>
    </div>
  );
};

export default HeroBackground;
