
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronDown, ArrowRight } from 'lucide-react';
import PredictionVisualizer from '@/components/PredictionVisualizer';
import { resultVariants } from './utils';

interface PredictionResultsProps {
  activeSport: 'football' | 'basketball' | 'americanFootball';
  matchId: string;
  onTryAnother: () => void;
  getAccentColor: () => string;
  getMatchName: (value: string) => string;
  getPredictionConfidence: () => { value: number, label: string, color: string };
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  activeSport,
  matchId,
  onTryAnother,
  getAccentColor,
  getMatchName,
  getPredictionConfidence
}) => {
  const confidenceData = getPredictionConfidence();
  const [showDetails, setShowDetails] = useState(false);
  
  const accentColor = getAccentColor();
  const matchName = getMatchName(matchId);
  
  // Simplified gradient styles based on sport
  const getGradientStyle = () => {
    switch (activeSport) {
      case 'football':
        return 'from-blue-500/30 to-blue-500/5';
      case 'basketball':
        return 'from-green-500/30 to-green-500/5';
      case 'americanFootball':
        return 'from-blue-500/30 to-blue-500/5';
      default:
        return 'from-blue-500/30 to-blue-500/5';
    }
  };

  return (
    <motion.div
      initial={resultVariants.initial}
      animate={resultVariants.animate}
      transition={resultVariants.transition}
      className="relative"
    >
      {/* Background decorations */}
      <motion.div 
        className={`absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-b ${getGradientStyle()} blur-xl opacity-60`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="bg-dark-card/90 backdrop-blur-md rounded-lg p-6 border border-dark-border mb-4 shadow-lg relative overflow-hidden z-10">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`bg-${accentColor}/20 text-${accentColor} px-3 py-1 text-xs`}>
                Match Analysis
              </Badge>
              <motion.div 
                className={`h-2 w-2 rounded-full bg-${accentColor}`}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h3 className="text-xl font-bold mb-1">
              {matchName}
            </h3>
          </div>
          
          <motion.div 
            className="flex items-center gap-2 bg-dark-lighter py-2 px-3 rounded-lg border border-dark-border"
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-sm text-gray-400">AI Confidence</div>
            <div className={`text-sm font-medium ${confidenceData.color} flex items-center`}>
              {confidenceData.label} 
              <span className="text-xs ml-1.5">({confidenceData.value}%)</span>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced visualization component */}
        <div className="relative mb-4">
          <PredictionVisualizer 
            sport={activeSport} 
            matchId={matchId} 
          />
          
          {/* Sport-specific overlay decoration */}
          <motion.div
            className={`absolute bottom-2 right-2 w-16 h-16 opacity-20 bg-${accentColor} rounded-full filter blur-xl`}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
        
        {/* Collapsible additional info */}
        <motion.div 
          className="mb-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {showDetails && (
            <div className="bg-dark/50 p-4 rounded-lg border border-dark-border mt-2">
              <h4 className="text-sm font-medium mb-2">Key Match Factors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-dark-lighter p-2 rounded text-xs">
                  <div className="text-gray-400 mb-1">Form</div>
                  <div className={`text-${accentColor}`}>Strong recent performance</div>
                </div>
                <div className="bg-dark-lighter p-2 rounded text-xs">
                  <div className="text-gray-400 mb-1">H2H</div>
                  <div className={`text-${accentColor}`}>Won 3 of last 5</div>
                </div>
                <div className="bg-dark-lighter p-2 rounded text-xs">
                  <div className="text-gray-400 mb-1">Injuries</div>
                  <div className={`text-${accentColor}`}>No key players missing</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <Button 
            variant="outline" 
            className="bg-transparent border-dark-border hover:bg-dark-lighter text-sm"
            onClick={onTryAnother}
          >
            Try Another Match
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-400 hover:text-white"
            >
              <span className="text-xs mr-1">{showDetails ? 'Hide' : 'Show'} details</span>
              <motion.div
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </Button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className={`${activeSport === 'basketball' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <Star size={16} className="mr-2" />
                Place Bet
                <ArrowRight size={14} className="ml-2 opacity-70" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResults;
