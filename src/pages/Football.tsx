
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { MatchSelectionSkeleton, BetBuilderSkeleton } from '@/components/LoadingStates';
import FootballTabs from '@/components/football/FootballTabs';
import BetBuilder from '@/components/football/BetBuilder';
import HeroSection from '@/components/football/HeroSection';
import MatchFeed from '@/components/football/MatchFeed';
import InteractiveBetField from '@/components/football/InteractiveBetField';
import SmartFilters from '@/components/football/SmartFilters';
import BetSlip from '@/components/football/BetSlip';
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
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        <div className="container px-4 py-12 space-y-12">
          {/* Smart Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SmartFilters />
          </motion.div>
          
          {/* Match Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MatchFeed />
          </motion.div>
          
          {/* Interactive Bet Field */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <InteractiveBetField />
          </motion.div>
          
          {selectedMatch && selectedMatchData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
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
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Floating Bet Slip */}
      <BetSlip />
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
