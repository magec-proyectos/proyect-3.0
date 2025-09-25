
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobilePerformance } from '@/hooks/use-mobile-performance';
import { toast } from '@/components/ui/sonner';

// Real-time sports data
import { useRealTimeSportsMatches, useLiveSportsData, useRefreshSportsData } from '@/services/realTimeSportsApi';

// Enhanced components
import ModernMatchCard from '@/components/enhanced/ModernMatchCard';
import EnhancedSportsHeader from '@/components/enhanced/EnhancedSportsHeader';
import { ResponsiveContainer, ResponsiveGrid, MobileSheet } from '@/components/ui/mobile-optimized';

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
      id: 'rm',
      name: 'Real Madrid',
      logo: '/lovable-uploads/203ad21a-9517-4ce9-9322-87450ea71fef.png',
      form: ['W', 'W', 'D', 'W', 'L'] as const,
      stats: {
        goals: { for: 25, against: 10 },
        possession: 65,
        xG: 2.1,
        shots: 15,
        shotsOnTarget: 8,
        corners: 6
      }
    },
    awayTeam: {
      id: 'fcb',
      name: 'Barcelona',
      logo: '/lovable-uploads/7947049c-9853-47cd-b647-285643900698.png',
      form: ['W', 'L', 'W', 'W', 'D'] as const,
      stats: {
        goals: { for: 22, against: 12 },
        possession: 68,
        xG: 1.9,
        shots: 13,
        shotsOnTarget: 7,
        corners: 5
      }
    },
    date: '2024-01-15',
    time: '20:00',
    league: 'La Liga',
    homeOdds: 2.45,
    drawOdds: 3.20,
    awayOdds: 2.80,
    predictions: {
      homeScore: 2,
      awayScore: 1,
      winProbability: { home: 45, draw: 25, away: 30 },
      btts: { yes: 65, no: 35 },
      over: { value: 2.5, probability: 70 },
      confidence: 78,
      bets: [],
      recommended: 'Real Madrid'
    },
    status: 'upcoming' as const
  },
  {
    id: '2',
    homeTeam: {
      id: 'lfc',
      name: 'Liverpool',
      logo: '/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png',
      form: ['W', 'W', 'W', 'D', 'W'] as const,
      stats: {
        goals: { for: 28, against: 8 },
        possession: 62,
        xG: 2.3,
        shots: 16,
        shotsOnTarget: 9,
        corners: 7
      }
    },
    awayTeam: {
      id: 'mcfc',
      name: 'Manchester City',
      logo: '/lovable-uploads/57ee4d31-5f2d-4b5d-b546-ad99ab1f37dd.png',
      form: ['W', 'W', 'L', 'W', 'W'] as const,
      stats: {
        goals: { for: 26, against: 9 },
        possession: 70,
        xG: 2.0,
        shots: 14,
        shotsOnTarget: 8,
        corners: 6
      }
    },
    date: '2024-01-16',
    time: '17:30',
    league: 'Premier League',
    homeOdds: 2.10,
    drawOdds: 3.45,
    awayOdds: 3.20,
    predictions: {
      homeScore: 1,
      awayScore: 1,
      winProbability: { home: 40, draw: 30, away: 30 },
      btts: { yes: 75, no: 25 },
      over: { value: 2.5, probability: 80 },
      confidence: 85,
      bets: [],
      recommended: 'Liverpool'
    },
    status: 'upcoming' as const
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
  
  // Real-time sports data with SportsGameOdds API
  const { data: liveMatches, isLoading, error, refetch } = useLiveSportsData('football');
  const { refreshData } = useRefreshSportsData();
  
  // Use real data or fallback to sample data
  const matches = liveMatches && liveMatches.length > 0 ? liveMatches : sampleMatches;
  
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

  const filteredMatches = matches.filter(match => {
    switch (activeFilter) {
      case 'favorites':
        return favoriteMatches.includes(match.id);
      case 'live':
        return match.status === 'live';
      case 'upcoming':
        return match.status === 'upcoming';
      default:
        return true;
    }
  });

  // Handle manual refresh
  const handleRefreshData = async () => {
    try {
      await refreshData('football');
      await refetch();
      toast.success('Sports data refreshed!');
    } catch (error) {
      toast.error('Failed to refresh data');
    }
  };

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
          
          {/* Real-time indicator with refresh */}
          <div className="px-4 py-2 flex items-center justify-between">
            <RealTimeDataIndicator />
            <button
              onClick={handleRefreshData}
              disabled={isLoading}
              className="text-primary text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Refresh Live Data'}
            </button>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="px-4 py-8 text-center">
              <div className="text-primary">Loading live sports data...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="px-4 py-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="text-red-400 text-sm">
                  Failed to load live data. Showing cached results.
                </div>
              </div>
            </div>
          )}

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
        {/* Enhanced Sports Header */}
        <EnhancedSportsHeader
          onSearchToggle={() => setShowSearch(!showSearch)}
          onFilterToggle={() => console.log('Filter toggle')}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showSearch={showSearch}
          activeFilters={activeFilter !== 'all' ? 1 : 0}
        />

        {/* Main Content */}
        <ResponsiveContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Sidebar */}
            <MobileSheet isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
              <EnhancedSidebar />
            </MobileSheet>
            
            <div className="hidden lg:block">
              <EnhancedSidebar />
            </div>

            {/* Match Cards Grid */}
            <div className="space-y-6">
              <ResponsiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
                {matchesToRender.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ModernMatchCard
                      match={match}
                      onQuickBet={handleQuickBet}
                      onAddToFavorites={handleAddToFavorites}
                      onViewDetails={handleViewDetails}
                      isFavorite={favoriteMatches.includes(match.id)}
                    />
                  </motion.div>
                ))}
              </ResponsiveGrid>
              
              {filteredMatches.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No matches found for this filter</p>
                </div>
              )}
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </div>
  );
};

export default Sports;
