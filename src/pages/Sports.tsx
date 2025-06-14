
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobilePerformance } from '@/hooks/use-mobile-performance';
import { toast } from '@/components/ui/sonner';

// Desktop components
import EnhancedSidebar from '@/components/football/EnhancedSidebar';
import MatchFeed from '@/components/football/MatchFeed';
import PopularPicksCarousel from '@/components/football/PopularPicksCarousel';
import ImprovedBetBuilder from '@/components/football/ImprovedBetBuilder';
import RealTimeDataIndicator from '@/components/football/RealTimeDataIndicator';

// Mobile components
import MobileSportsNavigation from '@/components/football/mobile/MobileSportsNavigation';
import MobileMatchCard from '@/components/football/mobile/MobileMatchCard';
import MobileBetBuilder from '@/components/football/mobile/MobileBetBuilder';
import MobileOddsDisplay from '@/components/football/mobile/MobileOddsDisplay';

// Sample data
const sampleMatches = [
  {
    id: '1',
    homeTeam: {
      name: 'Real Madrid',
      logo: '/lovable-uploads/203ad21a-9517-4ce9-9322-87450ea71fef.png',
      form: ['W', 'W', 'D', 'W', 'L']
    },
    awayTeam: {
      name: 'Barcelona',
      logo: '/lovable-uploads/7947049c-9853-47cd-b647-285643900698.png',
      form: ['W', 'L', 'W', 'W', 'D']
    },
    date: '2024-01-15',
    time: '20:00',
    league: 'La Liga',
    homeOdds: 2.45,
    drawOdds: 3.20,
    awayOdds: 2.80,
    predictions: {
      confidence: 78,
      recommended: 'Real Madrid'
    }
  },
  {
    id: '2',
    homeTeam: {
      name: 'Liverpool',
      logo: '/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png',
      form: ['W', 'W', 'W', 'D', 'W']
    },
    awayTeam: {
      name: 'Manchester City',
      logo: '/lovable-uploads/57ee4d31-5f2d-4b5d-b546-ad99ab1f37dd.png',
      form: ['W', 'W', 'L', 'W', 'W']
    },
    date: '2024-01-16',
    time: '17:30',
    league: 'Premier League',
    homeOdds: 2.10,
    drawOdds: 3.45,
    awayOdds: 3.20,
    predictions: {
      confidence: 85,
      recommended: 'Liverpool'
    }
  }
];

const Sports = () => {
  const [selectedView, setSelectedView] = useState<'all' | 'live' | 'upcoming' | 'favorites'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMobileBetBuilder, setShowMobileBetBuilder] = useState(false);
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>([]);
  const [betSlip, setBetSlip] = useState<any[]>([]);
  
  const isMobile = useIsMobile();
  
  const {
    getItemsToRender,
    observeElement,
    shouldOptimize
  } = useMobilePerformance({
    batchSize: isMobile ? 5 : 10,
    enableVirtualization: isMobile,
    lazyLoadOffset: 200
  });

  const handleQuickBet = (match: any, betType: string) => {
    const newBet = {
      id: Math.random().toString(36).substr(2, 9),
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      bet: betType === 'home' ? match.homeTeam.name : 
           betType === 'away' ? match.awayTeam.name : 'Empate',
      odds: betType === 'home' ? match.homeOdds : 
            betType === 'away' ? match.awayOdds : match.drawOdds
    };
    
    setBetSlip(prev => [...prev, newBet]);
    setShowMobileBetBuilder(true);
    
    toast.success('Apuesta añadida', {
      description: `${newBet.bet} - Cuota ${newBet.odds}`
    });
  };

  const handleAddToFavorites = (match: any) => {
    const isFavorite = favoriteMatches.includes(match.id);
    
    if (isFavorite) {
      setFavoriteMatches(prev => prev.filter(id => id !== match.id));
      toast.success('Eliminado de favoritos');
    } else {
      setFavoriteMatches(prev => [...prev, match.id]);
      toast.success('Añadido a favoritos');
    }
  };

  const handleViewDetails = (match: any) => {
    toast.info('Ver detalles del partido', {
      description: `${match.homeTeam.name} vs ${match.awayTeam.name}`
    });
  };

  const filteredMatches = sampleMatches.filter(match => {
    switch (activeFilter) {
      case 'favorites':
        return favoriteMatches.includes(match.id);
      case 'live':
        return false; // No live matches in sample data
      default:
        return true;
    }
  });

  const matchesToRender = shouldOptimize 
    ? getItemsToRender(filteredMatches.length).map(index => filteredMatches[index])
    : filteredMatches;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="pt-16 pb-20">
          <MobileSportsNavigation
            onFilterChange={setActiveFilter}
            onSearchToggle={() => setShowSearch(!showSearch)}
            activeFilter={activeFilter}
            matchCount={filteredMatches.length}
          />
          
          {/* Real-time indicator */}
          <div className="px-4 py-2">
            <RealTimeDataIndicator />
          </div>
          
          {/* Match Cards */}
          <div className="px-4 py-4 space-y-4">
            {matchesToRender.map((match, index) => (
              <motion.div
                key={match.id}
                ref={(el) => shouldOptimize && el && observeElement(el, index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MobileMatchCard
                  match={match}
                  onQuickBet={handleQuickBet}
                  onAddToFavorites={handleAddToFavorites}
                  onViewDetails={handleViewDetails}
                  isFavorite={favoriteMatches.includes(match.id)}
                />
              </motion.div>
            ))}
          </div>
          
          {filteredMatches.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="text-gray-400">
                No hay partidos disponibles para este filtro
              </div>
            </div>
          )}
        </main>

        {/* Mobile Bet Builder */}
        <MobileBetBuilder
          isOpen={showMobileBetBuilder}
          onClose={() => setShowMobileBetBuilder(false)}
          initialBets={betSlip}
        />

        {/* Fixed Bottom Bet Slip */}
        {betSlip.length > 0 && !showMobileBetBuilder && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-16 left-4 right-4 z-30"
          >
            <div 
              className="bg-neon-blue text-black rounded-lg p-3 shadow-lg cursor-pointer"
              onClick={() => setShowMobileBetBuilder(true)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold">{betSlip.length} selección{betSlip.length !== 1 ? 'es' : ''}</span>
                  <span className="text-sm ml-2">Toca para ver</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">Cuota Total</div>
                  <div className="text-sm">
                    {betSlip.reduce((total, bet) => total * bet.odds, 1).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

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

export default Sports;
