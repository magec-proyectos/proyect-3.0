
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSearchBar from '@/components/football/EnhancedSearchBar';
import PopularPicks from '@/components/football/PopularPicks';
import LiveMatches from '@/components/football/LiveMatches';
import CompetitionsSidebar from '@/components/football/CompetitionsSidebar';
import ImprovedBetBuilder from '@/components/football/ImprovedBetBuilder';
import MatchFeed from '@/components/football/MatchFeed';

const FootballContent = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'live' | 'upcoming' | 'favorites'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Top Section - Enhanced Search Bar with Dark Theme */}
        <div className="bg-gradient-to-br from-dark via-dark-lighter to-dark-card border-b border-dark-border py-16 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-lime/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                How can I help you today?
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Use our AI to find the best bets and match analysis
              </p>
            </motion.div>
            
            <EnhancedSearchBar onFilterToggle={handleFilterToggle} />
          </div>
        </div>

        {/* Main Content Area - Dark Theme */}
        <div className="bg-dark-darker min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Left Sidebar - Competitions - Dark Theme */}
              <div className="w-80 flex-shrink-0">
                <CompetitionsSidebar />
              </div>

              {/* Center Content */}
              <div className="flex-1 space-y-6">
                {/* Navigation Tabs - Dark Theme */}
                <div className="glass-effect rounded-lg border border-dark-border p-1">
                  <div className="flex gap-1">
                    <button className="px-6 py-2 bg-neon-lime text-black rounded-md font-medium text-sm hover:bg-neon-lime/90 transition-colors">
                      Home
                    </button>
                    <button className="px-6 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Live
                    </button>
                    <button className="px-6 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      My bets
                    </button>
                    <button className="px-6 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Statistics
                    </button>
                  </div>
                </div>

                {/* Match Cards - Dark Theme */}
                <MatchFeed />
              </div>

              {/* Right Sidebar - Bet Builder - Dark Theme */}
              <div className="w-80 flex-shrink-0">
                <ImprovedBetBuilder />
              </div>
            </div>
          </div>
        </div>
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
