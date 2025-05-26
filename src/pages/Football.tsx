
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { MatchSelectionSkeleton, BetBuilderSkeleton } from '@/components/LoadingStates';
import EnhancedMatchSelection from '@/components/football/EnhancedMatchSelection';
import FootballTabs from '@/components/football/FootballTabs';
import BetBuilder from '@/components/football/BetBuilder';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { FootballProvider, useFootball } from '@/contexts/FootballContext';
import { motion } from 'framer-motion';

// Import data (will be replaced by dynamic data from context)
import {
  matchEvents,
  bettingTrends,
  matchNews,
  homeTeam,
  awayTeam,
  prediction
} from '@/data/footballData';

const FootballContent = () => {
  const [showBetPlaced, setShowBetPlaced] = useState(false);
  const { user } = useAuth();
  const { isLoading, error, selectedMatch, filteredMatches } = useFootball();
  
  // Get selected match data
  const selectedMatchData = filteredMatches.find(match => match.id === selectedMatch);
  
  useEffect(() => {
    if (error) {
      toast.error('Failed to load match data');
    }
  }, [error]);

  // Handler for finding a match
  const handleFindMatch = () => {
    if (selectedMatch) {
      toast.success('Match data loaded successfully');
    } else {
      toast.error('Please select a match first');
    }
  };
  
  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 gradient-text">
              Advanced Football AI Predictions
            </h1>
            <p className="text-gray-400">
              Get real-time predictions with advanced filtering and analysis
            </p>
          </div>
          
          {isLoading ? (
            <MatchSelectionSkeleton />
          ) : (
            <EnhancedMatchSelection />
          )}
          
          {selectedMatch && selectedMatchData && (
            <>
              <FootballTabs
                isLoading={false}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                prediction={prediction}
                matchEvents={matchEvents}
                bettingTrends={bettingTrends}
                matchNews={matchNews}
              />
              
              <BetBuilder
                prediction={prediction}
                user={user}
                showBetPlaced={showBetPlaced}
                setShowBetPlaced={setShowBetPlaced}
              />
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const Football = () => {
  return (
    <FootballProvider>
      <FootballContent />
    </FootballProvider>
  );
};

export default Football;
