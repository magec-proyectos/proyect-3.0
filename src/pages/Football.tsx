
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSearchBar from '@/components/football/EnhancedSearchBar';
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
            {/* Sidebar and Bet Builder - Now below search */}
            <div className="flex gap-6 mb-6">
              {/* Left Sidebar - Competitions */}
              <div className="w-80 flex-shrink-0">
                <CompetitionsSidebar />
              </div>

              {/* Right Sidebar - Bet Builder */}
              <div className="w-80 flex-shrink-0">
                <ImprovedBetBuilder />
              </div>
            </div>

            {/* Center Content - Match Feed */}
            <div className="w-full">
              <MatchFeed />
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
