
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSidebar from '@/components/football/EnhancedSidebar';
import MatchFeed from '@/components/football/MatchFeed';
import PopularPicksCarousel from '@/components/football/PopularPicksCarousel';
import ImprovedBetBuilder from '@/components/football/ImprovedBetBuilder';

const FootballContent = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'live' | 'upcoming' | 'favorites'>('all');

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Three Column Layout */}
        <div className="bg-dark-darker min-h-screen">
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6 max-w-full mx-auto">
              {/* Left Sidebar - Fixed Width */}
              <div className="w-80 flex-shrink-0">
                <EnhancedSidebar />
              </div>

              {/* Center Column - Popular Picks and Match Feed */}
              <div className="flex-1 max-w-4xl">
                {/* Popular Picks Carousel */}
                <PopularPicksCarousel />
                
                {/* Match Feed */}
                <MatchFeed />
              </div>

              {/* Right Column - Bet Builder */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-6">
                  <ImprovedBetBuilder />
                </div>
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
