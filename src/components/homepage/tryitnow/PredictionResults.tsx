
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronDown, ArrowRight, TrendingUp } from 'lucide-react';
import PredictionVisualizer from '@/components/PredictionVisualizer';
import { resultVariants, getSportGradient } from './utils';
import { AnimatedCard, PulsatingElement } from '@/components/ui/micro-interaction';

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
  const gradientClasses = getSportGradient(activeSport);
  
  return (
    <motion.div
      initial={resultVariants.initial}
      animate={resultVariants.animate}
      exit={resultVariants.exit}
      className="relative"
    >
      {/* Enhanced background decorations */}
      <motion.div 
        className={`absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-b ${gradientClasses} blur-xl opacity-60`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <AnimatedCard intensity="moderate" className="relative z-10">
        <div className="bg-dark-card/90 backdrop-blur-md rounded-xl p-6 border border-dark-border shadow-2xl relative overflow-hidden">
          
          {/* Header section with enhanced styling */}
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className={`bg-${accentColor}/20 text-${accentColor} px-3 py-1.5 text-sm font-medium border border-${accentColor}/30`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  AI Analysis Complete
                </Badge>
                <PulsatingElement>
                  <div className={`h-3 w-3 rounded-full bg-${accentColor}`} />
                </PulsatingElement>
              </div>
              
              <h3 className="text-2xl font-bold text-white leading-tight">
                {matchName}
              </h3>
            </div>
            
            <motion.div 
              className={`bg-dark-lighter border border-${accentColor}/30 py-3 px-4 rounded-xl`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
              <div className={`text-lg font-bold ${confidenceData.color} flex items-center`}>
                {confidenceData.label} 
                <span className="text-sm ml-2 opacity-80">({confidenceData.value}%)</span>
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced visualization with better spacing */}
          <div className="relative mb-6">
            <PredictionVisualizer 
              sport={activeSport} 
              matchId={matchId} 
            />
            
            {/* Sport-specific overlay decoration */}
            <motion.div
              className={`absolute bottom-3 right-3 w-20 h-20 opacity-20 bg-${accentColor} rounded-full filter blur-xl`}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          
          {/* Collapsible details with enhanced animation */}
          <motion.div 
            className="mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showDetails ? 'auto' : 0, 
              opacity: showDetails ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            {showDetails && (
              <motion.div 
                className="bg-dark/60 backdrop-blur-sm p-5 rounded-xl border border-dark-border"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-white">Key Match Factors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-dark-lighter/80 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-gray-400 text-sm mb-2">Recent Form</div>
                    <div className={`text-${accentColor} font-semibold`}>Strong Performance</div>
                    <div className="text-xs text-gray-500 mt-1">Last 5 matches analyzed</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-dark-lighter/80 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-gray-400 text-sm mb-2">Head-to-Head</div>
                    <div className={`text-${accentColor} font-semibold`}>Favors Home Team</div>
                    <div className="text-xs text-gray-500 mt-1">Won 3 of last 5 meetings</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-dark-lighter/80 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-gray-400 text-sm mb-2">Team Health</div>
                    <div className={`text-${accentColor} font-semibold`}>All Players Available</div>
                    <div className="text-xs text-gray-500 mt-1">No key injuries reported</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Enhanced action buttons */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <EnhancedButton 
              variant="outline" 
              size="default"
              onClick={onTryAnother}
              className="bg-transparent border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-300"
            >
              Try Another Match
            </EnhancedButton>
            
            <div className="flex gap-3">
              <EnhancedButton 
                variant="ghost" 
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-400 hover:text-white"
                icon={<ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />}
                iconPosition="right"
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </EnhancedButton>
              
              <EnhancedButton 
                variant={activeSport === 'basketball' ? 'sport' : activeSport === 'americanFootball' ? 'sport' : 'sport'}
                size="default"
                animation="glow"
                icon={<Star className="w-4 h-4" />}
                className={`${
                  activeSport === 'basketball' 
                    ? 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/25' 
                    : activeSport === 'americanFootball'
                    ? 'bg-purple-500 hover:bg-purple-600 shadow-lg hover:shadow-purple-500/25'
                    : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25'
                } text-white font-semibold`}
              >
                Place Bet
                <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
              </EnhancedButton>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </motion.div>
  );
};

export default PredictionResults;
