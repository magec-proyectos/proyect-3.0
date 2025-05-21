
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SportSelection from '@/components/SportSelection';
import MatchSelection from './tryitnow/MatchSelection';
import MatchAnalyzer from './tryitnow/MatchAnalyzer';
import PredictionResults from './tryitnow/PredictionResults';
import { 
  getButtonStyle, 
  getAccentColor, 
  getBorderColor, 
  getMatchName, 
  getPredictionConfidence,
  containerVariants,
  itemVariants
} from './tryitnow/utils';

const TryItNow = () => {
  // Simplified state management
  const [activeSport, setActiveSport] = useState<'football' | 'basketball' | 'americanFootball'>('football');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [uiState, setUiState] = useState<'selection' | 'analyzing' | 'results'>('selection');
  
  const handleGetPrediction = () => {
    if (selectedMatch) {
      setUiState('analyzing');
      
      // Simulate AI analyzing time
      setTimeout(() => {
        setUiState('results');
        localStorage.setItem('hasSeenPredictionDemo', 'true');
      }, 2000);
    }
  };

  const handleSportChange = (sport: 'football' | 'basketball' | 'americanFootball') => {
    setActiveSport(sport);
    setUiState('selection');
    setSelectedMatch('');
  };

  const handleTryAnother = () => {
    setUiState('selection');
  };

  // Helper functions that use the current state
  const currentAccentColor = () => getAccentColor(activeSport);
  const currentButtonStyle = () => getButtonStyle(activeSport);
  const currentConfidence = () => getPredictionConfidence(activeSport);

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
              onSelectSport={handleSportChange}
            />
            
            <div className="border-t border-dark-border pt-8">
              <AnimatePresence mode="wait">
                {uiState === 'selection' && (
                  <MatchSelection
                    activeSport={activeSport}
                    selectedMatch={selectedMatch}
                    onMatchSelect={setSelectedMatch}
                    onGetPrediction={handleGetPrediction}
                    getButtonStyle={currentButtonStyle}
                  />
                )}
                
                {uiState === 'analyzing' && (
                  <MatchAnalyzer
                    getAccentColor={currentAccentColor}
                  />
                )}
                
                {uiState === 'results' && (
                  <PredictionResults 
                    activeSport={activeSport}
                    matchId={selectedMatch}
                    onTryAnother={handleTryAnother}
                    getAccentColor={currentAccentColor}
                    getMatchName={getMatchName}
                    getPredictionConfidence={currentConfidence}
                  />
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
