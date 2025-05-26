
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      <main className="pt-16">
        {/* Top Section - Enhanced Search Bar */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border-b border-gray-200 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ¿En qué puedo ayudarte hoy?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Utiliza nuestra IA para encontrar las mejores apuestas y análisis de partidos
              </p>
            </motion.div>
            
            <EnhancedSearchBar onFilterToggle={handleFilterToggle} />
          </div>
        </div>

        {/* Main Content Area - Winamax Style */}
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Left Sidebar - Competitions - Winamax Style */}
              <div className="w-80 flex-shrink-0">
                <CompetitionsSidebar />
              </div>

              {/* Center Content */}
              <div className="flex-1 space-y-6">
                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg border border-gray-200 p-1">
                  <div className="flex gap-1">
                    <button className="px-6 py-2 bg-red-500 text-white rounded-md font-medium text-sm">
                      Inicio
                    </button>
                    <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium text-sm">
                      En directo
                    </button>
                    <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium text-sm">
                      Mis apuestas
                    </button>
                    <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium text-sm">
                      Estadísticas
                    </button>
                  </div>
                </div>

                {/* Match Cards - Winamax Style */}
                <MatchFeed />
              </div>

              {/* Right Sidebar - Bet Builder */}
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
