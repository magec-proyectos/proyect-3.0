
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SportSelection from '@/components/SportSelection';
import MatchSelection from './tryitnow/MatchSelection';
import MatchAnalyzer from './tryitnow/MatchAnalyzer';
import PredictionResults from './tryitnow/PredictionResults';
import { getButtonStyle, getAccentColor, getBorderColor, getMatchName, getPredictionConfidence } from './tryitnow/utils';

const TryItNow = () => {
  const [activeSport, setActiveSport] = useState<'football' | 'basketball' | 'americanFootball'>('football');
  const [selectedMatches, setSelectedMatches] = useState({
    football: '',
    basketball: '',
    americanFootball: ''
  });
  
  const [showPredictions, setShowPredictions] = useState({
    football: false,
    basketball: false,
    americanFootball: false
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleGetPrediction = () => {
    if (selectedMatches[activeSport]) {
      setIsAnalyzing(true);
      
      // Simulate AI analyzing time
      setTimeout(() => {
        setShowPredictions(prev => ({ ...prev, [activeSport]: true }));
        setIsAnalyzing(false);
        localStorage.setItem('hasSeenPredictionDemo', 'true');
      }, 2000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="my-12 max-w-4xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-dark-card/80 to-dark-card/50 backdrop-blur-lg">
          <CardContent className="p-6">
            {/* Sport selection cards */}
            <SportSelection
              className="mb-8"
              activeSport={activeSport}
              onSelectSport={(sport) => {
                setActiveSport(sport);
                setShowPredictions(prev => ({ ...prev, [sport]: false }));
              }}
            />
            
            <div className="border-t border-dark-border pt-8">
              <AnimatePresence mode="wait">
                {!showPredictions[activeSport] && !isAnalyzing && (
                  <MatchSelection
                    activeSport={activeSport}
                    selectedMatch={selectedMatches[activeSport]}
                    onMatchSelect={(value) => setSelectedMatches(prev => ({ ...prev, [activeSport]: value }))}
                    onGetPrediction={handleGetPrediction}
                    getButtonStyle={() => getButtonStyle(activeSport)}
                  />
                )}
                
                {isAnalyzing && (
                  <MatchAnalyzer
                    getAccentColor={() => getAccentColor(activeSport)}
                  />
                )}
                
                {showPredictions[activeSport] && !isAnalyzing && (
                  <motion.div
                    key="prediction-results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <PredictionResults 
                      activeSport={activeSport}
                      matchId={selectedMatches[activeSport]}
                      onTryAnother={() => setShowPredictions(prev => ({ ...prev, [activeSport]: false }))}
                      getAccentColor={() => getAccentColor(activeSport)}
                      getMatchName={getMatchName}
                      getPredictionConfidence={() => getPredictionConfidence(activeSport)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TryItNow;
