
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChartPie } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface MatchAnalyzerProps {
  getAccentColor: () => string;
}

const MatchAnalyzer: React.FC<MatchAnalyzerProps> = ({ getAccentColor }) => {
  const [progress, setProgress] = useState(0);

  // Effect for the fake analysis progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="py-6"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center bg-dark-lighter rounded-full w-16 h-16 mb-4">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 2, ease: "linear" },
              scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
          >
            <ChartPie size={32} className={`text-${getAccentColor()}`} />
          </motion.div>
        </div>
        <h3 className="text-xl font-medium mb-2">Analyzing Match Data</h3>
        <p className="text-gray-400 mb-4">Our AI is processing thousands of data points...</p>
        
        <div className="max-w-md mx-auto">
          <Progress 
            value={progress} 
            className="h-2 mb-2" 
            indicatorClassName={`bg-${getAccentColor()}`} 
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Analyzing stats</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchAnalyzer;
