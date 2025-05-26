
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Match, League, Team } from '@/types/football';
import { 
  useRealTimeSportsMatches, 
  useTriggerScraping,
  useRealTimeUpdates 
} from '@/services/realTimeSportsApi';
import { useLeagues } from '@/services/updatedSportsDataApi';

interface FootballContextType {
  // Current selections
  selectedSport: 'football' | 'basketball' | 'americanFootball';
  setSelectedSport: (sport: 'football' | 'basketball' | 'americanFootball') => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  selectedMatch: string;
  setSelectedMatch: (match: string) => void;
  
  // Data
  matches: Match[];
  leagues: League[];
  isLoading: boolean;
  error: string | null;
  
  // Filters
  filters: {
    date: string;
    minOdds: number;
    maxOdds: number;
    confidence: number;
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
  const [filters, setFilters] = useState({
    date: '',
    minOdds: 1.0,
    maxOdds: 10.0,
    confidence: 0
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

  // Real-time data hooks
  const sportTypeMap = {
    football: 'football',
    basketball: 'basketball', 
    americanFootball: 'american-football'
  };

  const matchesQuery = useRealTimeSportsMatches(sportTypeMap[selectedSport]);
  const leaguesQuery = useLeagues(selectedSport);
  const { triggerSportsScraping } = useTriggerScraping();
  
  // Listen for real-time updates
  const updates = useRealTimeUpdates('sports_matches');
  
  // Update last update time when new data comes in
  useEffect(() => {
    if (updates.length > 0) {
      console.log('Real-time update received:', updates[updates.length - 1]);
      setLastUpdate(new Date());
      // Invalidate queries to refetch data
      matchesQuery.refetch();
    }
  }, [updates, matchesQuery]);

  // Set initial last update time when data is first loaded
  useEffect(() => {
    if (matchesQuery.data && matchesQuery.data.length > 0 && !lastUpdate) {
      setLastUpdate(new Date());
    }
  }, [matchesQuery.data, lastUpdate]);

  const matches = matchesQuery.data || [];
  const leagues = leaguesQuery.data || [];
  const isLoading = matchesQuery.isLoading || leaguesQuery.isLoading;
  const error = matchesQuery.error?.message || leaguesQuery.error?.message || null;

  // Log data for debugging
  useEffect(() => {
    console.log('FootballContext - matches updated:', matches.length, 'matches');
    console.log('FootballContext - isLoading:', isLoading);
    console.log('FootballContext - error:', error);
  }, [matches, isLoading, error]);

  // Filter matches based on search and filters
  const filteredMatches = React.useMemo(() => {
    let filtered = matches;

    console.log('Filtering matches - total:', filtered.length);

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(match => 
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
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

    return filtered;
  }, [matches, searchQuery, filters]);

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
      console.log('Triggering manual data refresh...');
      await matchesQuery.refetch();
      setLastUpdate(new Date());
      console.log('Data refresh completed');
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const value: FootballContextType = {
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMatch,
    setSelectedMatch,
    matches,
    leagues,
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
    lastUpdate
  };

  return (
    <FootballContext.Provider value={value}>
      {children}
    </FootballContext.Provider>
  );
};
