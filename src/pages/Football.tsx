
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { MatchSelectionSkeleton, BetBuilderSkeleton } from '@/components/LoadingStates';
import MatchSelection from '@/components/football/MatchSelection';
import FootballTabs from '@/components/football/FootballTabs';
import BetBuilder from '@/components/football/BetBuilder';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

// Import data
import {
  matchEvents,
  bettingTrends,
  matchNews,
  homeTeam,
  awayTeam,
  prediction
} from '@/data/footballData';

const Football = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('premier-league');
  const [selectedMatch, setSelectedMatch] = useState('liverpool-vs-manchester-united');
  const [showBetPlaced, setShowBetPlaced] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Handler for finding a match
  const handleFindMatch = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Match data loaded successfully');
    }, 800);
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
          <h1 className="text-3xl font-bold mb-8 gradient-text">Football AI Predictions</h1>
          
          {isLoading ? (
            <MatchSelectionSkeleton />
          ) : (
            <MatchSelection
              selectedLeague={selectedLeague}
              setSelectedLeague={setSelectedLeague}
              selectedMatch={selectedMatch}
              setSelectedMatch={setSelectedMatch}
              handleFindMatch={handleFindMatch}
            />
          )}
          
          <FootballTabs
            isLoading={isLoading}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            prediction={prediction}
            matchEvents={matchEvents}
            bettingTrends={bettingTrends}
            matchNews={matchNews}
          />
          
          {isLoading ? (
            <BetBuilderSkeleton />
          ) : (
            <BetBuilder
              prediction={prediction}
              user={user}
              showBetPlaced={showBetPlaced}
              setShowBetPlaced={setShowBetPlaced}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Football;
