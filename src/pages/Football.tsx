
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSearchBar from '@/components/football/EnhancedSearchBar';
import CompetitionsSidebar from '@/components/football/CompetitionsSidebar';
import MatchFeed from '@/components/football/MatchFeed';
import PopularPicksCarousel from '@/components/football/PopularPicksCarousel';

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
        {/* Single Flex Container for entire layout */}
        <div className="bg-dark-darker min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-8 max-w-7xl mx-auto">
              {/* Left Sidebar - Fixed Width */}
              <div className="w-80 flex-shrink-0">
                <CompetitionsSidebar />
              </div>

              {/* Right Column - Search Bar, Popular Picks, and Match Feed */}
              <div className="flex-1">
                {/* Enhanced Search Bar */}
                <div className="bg-gradient-to-br from-dark via-dark-lighter to-dark-card border border-dark-border rounded-lg p-6 mb-6 relative overflow-hidden">
                  {/* Background glow effects */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-lime/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <EnhancedSearchBar onFilterToggle={handleFilterToggle} />
                  </div>
                </div>

                {/* Popular Picks Carousel */}
                <PopularPicksCarousel />
                
                {/* Match Feed */}
                <MatchFeed />
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
