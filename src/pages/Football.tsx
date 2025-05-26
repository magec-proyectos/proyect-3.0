
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
import FootballStatsNavigation from '@/components/football/FootballStatsNavigation';

const FootballContent = () => {
  const [selectedView, setSelectedView] = useState<'goalscorers' | 'players' | 'corners' | 'fouls'>('goalscorers');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleTabChange = (tab: 'goalscorers' | 'players' | 'corners' | 'fouls') => {
    setSelectedView(tab);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Top Section - Enhanced Search Bar with Dark Theme */}
        <div className="bg-gradient-to-br from-dark via-dark-lighter to-dark-card border-b border-dark-border py-20 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-lime/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
                Football
              </h1>
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
                {/* Enhanced Football Statistics Navigation */}
                <FootballStatsNavigation 
                  selectedTab={selectedView}
                  onTabChange={handleTabChange}
                />

                {/* Content based on selected tab */}
                <div className="space-y-6">
                  {selectedView === 'goalscorers' && (
                    <div className="glass-effect rounded-lg border border-dark-border p-6">
                      <h2 className="text-2xl font-bold mb-4 text-neon-blue">Top Goalscorers</h2>
                      <p className="text-gray-400">Leading goalscorers across all competitions</p>
                      {/* Goalscorers content will be added here */}
                    </div>
                  )}
                  
                  {selectedView === 'players' && (
                    <div className="glass-effect rounded-lg border border-dark-border p-6">
                      <h2 className="text-2xl font-bold mb-4 text-neon-lime">Player Statistics</h2>
                      <p className="text-gray-400">Comprehensive player performance data</p>
                      {/* Players stats content will be added here */}
                    </div>
                  )}
                  
                  {selectedView === 'corners' && (
                    <div className="glass-effect rounded-lg border border-dark-border p-6">
                      <h2 className="text-2xl font-bold mb-4 text-purple-400">Corner Statistics</h2>
                      <p className="text-gray-400">Corner kicks analysis and trends</p>
                      {/* Corners content will be added here */}
                    </div>
                  )}
                  
                  {selectedView === 'fouls' && (
                    <div className="glass-effect rounded-lg border border-dark-border p-6">
                      <h2 className="text-2xl font-bold mb-4 text-orange-400">Foul Statistics</h2>
                      <p className="text-gray-400">Disciplinary records and foul analysis</p>
                      {/* Fouls content will be added here */}
                    </div>
                  )}
                </div>

                {/* Match Cards - Always visible below stats */}
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
