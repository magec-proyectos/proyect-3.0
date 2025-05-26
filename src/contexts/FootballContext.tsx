
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Match, League, Team } from '@/types/football';
import { 
  useFootballMatches, 
  useBasketballMatches, 
  useAmericanFootballMatches, 
  useLeagues 
} from '@/services/sportsDataApi';

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

  // Data queries based on selected sport
  const footballQuery = useFootballMatches();
  const basketballQuery = useBasketballMatches();
  const americanFootballQuery = useAmericanFootballMatches();
  const leaguesQuery = useLeagues(selectedSport);

  // Get current data based on sport
  const getCurrentQuery = () => {
    switch (selectedSport) {
      case 'football':
        return footballQuery;
      case 'basketball':
        return basketballQuery;
      case 'americanFootball':
        return americanFootballQuery;
      default:
        return footballQuery;
    }
  };

  const currentQuery = getCurrentQuery();
  const matches = currentQuery.data || [];
  const leagues = leaguesQuery.data || [];
  const isLoading = currentQuery.isLoading || leaguesQuery.isLoading;
  const error = currentQuery.error?.message || leaguesQuery.error?.message || null;

  // Filter matches based on search and filters
  const filteredMatches = React.useMemo(() => {
    let filtered = matches;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(match => 
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (filters.date) {
      filtered = filtered.filter(match => match.date === filters.date);
    }

    // Odds filter
    filtered = filtered.filter(match => 
      match.homeOdds >= filters.minOdds && match.homeOdds <= filters.maxOdds
    );

    // Confidence filter
    filtered = filtered.filter(match => 
      (match.predictions.confidence * 100) >= filters.confidence
    );

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
    addUserPrediction
  };

  return (
    <FootballContext.Provider value={value}>
      {children}
    </FootballContext.Provider>
  );
};
