
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
        {/* Top Section - Enhanced Search Bar with Dark Theme */}
        <div className="bg-gradient-to-br from-dark via-dark-lighter to-dark-card border-b border-dark-border py-12 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-lime/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Layout: Sidebar left, Search bar right */}
            <div className="flex gap-8 items-start max-w-7xl mx-auto">
              {/* Left Sidebar - Competitions */}
              <div className="w-80 flex-shrink-0">
                <CompetitionsSidebar />
              </div>

              {/* Right Side - Search Bar */}
              <div className="flex-1">
                <EnhancedSearchBar onFilterToggle={handleFilterToggle} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Popular Picks and Match Feed BELOW search bar */}
        <div className="bg-dark-darker min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              {/* Popular Picks Carousel - debajo del buscador */}
              <PopularPicksCarousel />
              
              {/* Match Feed - debajo de Popular Picks */}
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
