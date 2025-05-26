
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// New simplified components
import FootballSearchBar from '@/components/football/FootballSearchBar';
import PopularPicks from '@/components/football/PopularPicks';
import LiveMatches from '@/components/football/LiveMatches';
import CompetitionsSidebar from '@/components/football/CompetitionsSidebar';
import ImprovedBetBuilder from '@/components/football/ImprovedBetBuilder';
import MatchFeed from '@/components/football/MatchFeed';

const FootballContent = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'live' | 'upcoming' | 'favorites'>('all');

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Top Section - Search Bar */}
        <div className="bg-gradient-to-br from-dark via-dark-lighter to-dark-card py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                AI Football Analytics
              </h1>
              <p className="text-gray-400 text-lg">
                Ask AI anything about football matches, teams, and betting opportunities
              </p>
            </motion.div>
            
            <FootballSearchBar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Competitions */}
            <div className="col-span-12 lg:col-span-3">
              <CompetitionsSidebar />
            </div>

            {/* Center Content */}
            <div className="col-span-12 lg:col-span-6 space-y-8">
              {/* Popular Picks Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <PopularPicks />
              </motion.div>

              {/* Live Matches Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <LiveMatches />
              </motion.div>

              {/* All Matches Feed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MatchFeed />
              </motion.div>
            </div>

            {/* Right Sidebar - Bet Builder */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-24">
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
