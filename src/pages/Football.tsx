
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSearchBar from '@/components/football/EnhancedSearchBar';
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
              className="text-center mb-8"
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
                {/* Navigation Tabs - Updated based on the image */}
                <div className="glass-effect rounded-lg border border-dark-border p-1">
                  <div className="flex gap-1">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition-colors">
                      Partidos
                    </button>
                    <button className="px-6 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Competición
                    </button>
                  </div>
                </div>

                {/* Sub Navigation - from the image */}
                <div className="glass-effect rounded-lg border border-dark-border p-1">
                  <div className="flex gap-1 flex-wrap">
                    <button className="px-4 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Goleadores
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Estad. jugadores
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Estad. equipos
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Resultado
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:bg-dark-lighter hover:text-white rounded-md font-medium text-sm transition-colors">
                      Rincón
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
