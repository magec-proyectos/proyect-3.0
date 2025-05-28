
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FootballProvider } from '@/contexts/FootballContext';

// Updated components
import EnhancedSidebar from '@/components/football/EnhancedSidebar';
import MatchFeed from '@/components/football/MatchFeed';
import PopularPicksCarousel from '@/components/football/PopularPicksCarousel';
import ImprovedBetBuilder from '@/components/football/ImprovedBetBuilder';
import RealTimeDataIndicator from '@/components/football/RealTimeDataIndicator';

const SportsContent = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'live' | 'upcoming' | 'favorites'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-16">
        {/* Responsive Layout Container */}
        <div className="min-h-screen">
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
            {/* Real-time Data Indicator - Mobile Optimized */}
            <div className="mb-4 lg:mb-6">
              <RealTimeDataIndicator />
            </div>
            
            {/* Mobile Header with Menu Toggle */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                <h1 className="text-lg font-semibold">Sports Betting</h1>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-md bg-accent text-accent-foreground"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] xl:grid-cols-[360px_1fr_360px] gap-4 lg:gap-6">
              
              {/* Left Sidebar - Hidden on mobile unless toggled */}
              <div className={`
                lg:block lg:sticky lg:top-6 lg:h-fit
                ${sidebarOpen ? 'block' : 'hidden lg:block'}
                ${sidebarOpen ? 'fixed inset-0 z-50 bg-background p-4 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0' : ''}
              `}>
                {sidebarOpen && (
                  <div className="lg:hidden mb-4">
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 rounded-md bg-accent text-accent-foreground ml-auto block"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <EnhancedSidebar />
              </div>

              {/* Center Column - Main Content */}
              <div className="min-w-0 space-y-4 lg:space-y-6">
                {/* Popular Picks Carousel - Mobile Optimized */}
                <div className="w-full">
                  <PopularPicksCarousel />
                </div>
                
                {/* Match Feed - Mobile Optimized */}
                <div className="w-full">
                  <MatchFeed />
                </div>
              </div>

              {/* Right Column - Bet Builder - Desktop Only, Mobile Sheet */}
              <div className="hidden lg:block lg:sticky lg:top-6 lg:h-fit">
                <ImprovedBetBuilder />
              </div>
            </div>

            {/* Mobile Bet Builder - Fixed Bottom Sheet */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
              <div className="bg-card border-t p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bet Builder</span>
                  <button 
                    className="text-xs text-muted-foreground"
                    onClick={() => {
                      // Toggle bet builder sheet
                      console.log('Toggle bet builder');
                    }}
                  >
                    View Details
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Tap to build your bet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </main>
    </div>
  );
};

const Sports = () => {
  return (
    <FootballProvider>
      <SportsContent />
    </FootballProvider>
  );
};

export default Sports;
