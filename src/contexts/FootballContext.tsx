
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Match, League, Team } from '@/types/football';
import { 
  useRealTimeSportsMatches, 
  useTriggerScraping,
  useRealTimeUpdates,
  useEnhancedCompetitions,
  useBettingMarkets
} from '@/services/realTimeSportsApi';

interface FootballContextType {
  // Current selections
  selectedSport: 'football' | 'basketball' | 'americanFootball';
  setSelectedSport: (sport: 'football' | 'basketball' | 'americanFootball') => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  selectedMatch: string;
  setSelectedMatch: (match: string) => void;
  
  // Enhanced data
  matches: Match[];
  leagues: League[];
  competitions: any[];
  bettingMarkets: any[];
  isLoading: boolean;
  error: string | null;
  
  // Filters
  filters: {
    date: string;
    minOdds: number;
    maxOdds: number;
    confidence: number;
    competition: string;
    priority: number;
  };
  setFilters: (filters: any) => void;
  
  // Favorites
  favoriteTeams: string[];
  favoriteLeagues: string[];
  toggleFavoriteTeam: (teamId: string) => void;
  toggleFavoriteLeague: (leagueId: string) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMatches: Match[];
  
  // Predictions tracking
  userPredictions: any[];
  addUserPrediction: (prediction: any) => void;
  
  // Real-time features
  triggerDataRefresh: () => Promise<void>;
  lastUpdate: Date | null;
  
  // Auto-sync status
  isAutoSyncActive: boolean;
}

const FootballContext = createContext<FootballContextType | undefined>(undefined);

export const useFootball = () => {
  const context = useContext(FootballContext);
  if (!context) {
    throw new Error('useFootball must be used within a FootballProvider');
  }
  return context;
};

export const FootballProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSport, setSelectedSport] = useState<'football' | 'basketball' | 'americanFootball'>('football');
  const [selectedLeague, setSelectedLeague] = useState('premier-league');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isAutoSyncActive, setIsAutoSyncActive] = useState(true);
  const [filters, setFilters] = useState({
    date: '',
    minOdds: 1.0,
    maxOdds: 10.0,
    confidence: 0,
    competition: '',
    priority: 0
  });
  
  // Load favorites from localStorage
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(() => {
    const saved = localStorage.getItem('footballFavoriteTeams');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favoriteLeagues, setFavoriteLeagues] = useState<string[]>(() => {
    const saved = localStorage.getItem('footballFavoriteLeagues');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [userPredictions, setUserPredictions] = useState<any[]>(() => {
    const saved = localStorage.getItem('footballUserPredictions');
    return saved ? JSON.parse(saved) : [];
  });

  // Enhanced data hooks with corrected sport mapping
  const sportTypeMap = {
    football: 'football',
    basketball: 'basketball', 
    americanFootball: 'american-football'
  };

  console.log('FootballContext - selectedSport:', selectedSport);
  console.log('FootballContext - mapped sport type:', sportTypeMap[selectedSport]);

  const matchesQuery = useRealTimeSportsMatches(sportTypeMap[selectedSport]);
  const competitionsQuery = useEnhancedCompetitions(sportTypeMap[selectedSport]);
  const bettingMarketsQuery = useBettingMarkets(sportTypeMap[selectedSport]);
  const { triggerSportsScraping } = useTriggerScraping();
  
  // Listen for real-time updates on multiple tables
  const matchUpdates = useRealTimeUpdates('sports_matches');
  const competitionUpdates = useRealTimeUpdates('sports_competitions');

  // Custom setSelectedSport with logging
  const handleSetSelectedSport = (sport: 'football' | 'basketball' | 'americanFootball') => {
    console.log('FootballContext - setSelectedSport called with:', sport);
    setSelectedSport(sport);
    // Reset selected league when sport changes
    setSelectedLeague('');
    setSelectedMatch('');
  };
  
  // Auto-initialize data on mount with enhanced logic
  useEffect(() => {
    const autoInitialize = async () => {
      console.log('Enhanced Football context initializing for sport:', selectedSport);
      
      if (!matchesQuery.data || matchesQuery.data.length === 0) {
        console.log('No initial data found, triggering enhanced auto-sync...');
        try {
          await triggerSportsScraping();
          setTimeout(() => {
            matchesQuery.refetch();
            competitionsQuery.refetch();
          }, 3000);
        } catch (error) {
          console.error('Enhanced auto-initialization failed:', error);
        }
      }
    };

    autoInitialize();
  }, [selectedSport]);

  // Enhanced periodic auto-sync
  useEffect(() => {
    if (!isAutoSyncActive) return;

    const interval = setInterval(async () => {
      console.log('Performing enhanced periodic auto-sync for sport:', selectedSport);
      try {
        await triggerSportsScraping();
        setTimeout(() => {
          matchesQuery.refetch();
          competitionsQuery.refetch();
        }, 2000);
      } catch (error) {
        console.error('Enhanced periodic sync failed:', error);
      }
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [isAutoSyncActive, selectedSport, triggerSportsScraping, matchesQuery, competitionsQuery]);

  // Enhanced real-time update handling
  useEffect(() => {
    if (matchUpdates.length > 0 || competitionUpdates.length > 0) {
      console.log('Enhanced real-time update received:', { 
        matches: matchUpdates.length, 
        competitions: competitionUpdates.length 
      });
      setLastUpdate(new Date());
      matchesQuery.refetch();
      competitionsQuery.refetch();
    }
  }, [matchUpdates, competitionUpdates, matchesQuery, competitionsQuery]);

  // Set initial last update time when data is first loaded
  useEffect(() => {
    if (matchesQuery.data && matchesQuery.data.length > 0 && !lastUpdate) {
      setLastUpdate(new Date());
    }
  }, [matchesQuery.data, lastUpdate]);

  const matches = matchesQuery.data || [];
  const competitions = competitionsQuery.data || [];
  const bettingMarkets = bettingMarketsQuery.data || [];
  const isLoading = matchesQuery.isLoading || competitionsQuery.isLoading;
  const error = matchesQuery.error?.message || competitionsQuery.error?.message || null;

  console.log('FootballContext - matches loaded:', matches.length);
  console.log('FootballContext - competitions loaded:', competitions.length);

  // Create enhanced leagues from competitions data
  const leagues: League[] = competitions.map(comp => ({
    id: comp.external_id,
    name: comp.name,
    country: comp.country,
    logo: comp.logo_url || `https://placehold.co/50x50?text=${comp.name.substring(0, 2).toUpperCase()}`,
    season: comp.season
  }));

  // Enhanced filtering with new database fields
  const filteredMatches = React.useMemo(() => {
    let filtered = matches;

    console.log('Enhanced filtering matches - total:', filtered.length, 'for sport:', selectedSport);

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(match => 
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
    }

    // Competition filter
    if (filters.competition) {
      filtered = filtered.filter(match => 
        match.league.toLowerCase().includes(filters.competition.toLowerCase())
      );
      console.log('After competition filter:', filtered.length);
    }

    // Date filter
    if (filters.date) {
      filtered = filtered.filter(match => match.date === filters.date);
      console.log('After date filter:', filtered.length);
    }

    // Odds filter
    filtered = filtered.filter(match => 
      match.homeOdds >= filters.minOdds && match.homeOdds <= filters.maxOdds
    );
    console.log('After odds filter:', filtered.length);

    // Confidence filter
    filtered = filtered.filter(match => 
      (match.predictions.confidence) >= filters.confidence
    );
    console.log('After confidence filter:', filtered.length);

    // Priority filter (using enhanced data)
    if (filters.priority > 0) {
      filtered = filtered.filter(match => 
        match.predictions.confidence >= (filters.priority * 20) // Convert priority to confidence threshold
      );
      console.log('After priority filter:', filtered.length);
    }

    return filtered;
  }, [matches, searchQuery, filters, selectedSport]);

  // Favorites management
  const toggleFavoriteTeam = (teamId: string) => {
    const newFavorites = favoriteTeams.includes(teamId)
      ? favoriteTeams.filter(id => id !== teamId)
      : [...favoriteTeams, teamId];
    
    setFavoriteTeams(newFavorites);
    localStorage.setItem('footballFavoriteTeams', JSON.stringify(newFavorites));
  };

  const toggleFavoriteLeague = (leagueId: string) => {
    const newFavorites = favoriteLeagues.includes(leagueId)
      ? favoriteLeagues.filter(id => id !== leagueId)
      : [...favoriteLeagues, leagueId];
    
    setFavoriteLeagues(newFavorites);
    localStorage.setItem('footballFavoriteLeagues', JSON.stringify(newFavorites));
  };

  const addUserPrediction = (prediction: any) => {
    const newPredictions = [...userPredictions, { ...prediction, timestamp: Date.now() }];
    setUserPredictions(newPredictions);
    localStorage.setItem('footballUserPredictions', JSON.stringify(newPredictions));
  };

  const triggerDataRefresh = async () => {
    try {
      console.log('Triggering enhanced manual data refresh for sport:', selectedSport);
      await matchesQuery.refetch();
      await competitionsQuery.refetch();
      setLastUpdate(new Date());
      console.log('Enhanced data refresh completed');
    } catch (error) {
      console.error('Error refreshing enhanced data:', error);
    }
  };

  const value: FootballContextType = {
    selectedSport,
    setSelectedSport: handleSetSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMatch,
    setSelectedMatch,
    matches,
    leagues,
    competitions,
    bettingMarkets,
    isLoading,
    error,
    filters,
    setFilters,
    favoriteTeams,
    favoriteLeagues,
    toggleFavoriteTeam,
    toggleFavoriteLeague,
    searchQuery,
    setSearchQuery,
    filteredMatches,
    userPredictions,
    addUserPrediction,
    triggerDataRefresh,
    lastUpdate,
    isAutoSyncActive
  };

  return (
    <FootballContext.Provider value={value}>
      {children}
    </FootballContext.Provider>
  );
};
