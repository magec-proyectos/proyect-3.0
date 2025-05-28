
import React from 'react';
import { useFootball } from '@/contexts/FootballContext';
import LiveSearch from './LiveSearch';
import AdvancedFilters from './AdvancedFilters';
import SportSelectionCard from './match-selection/SportSelectionCard';
import LeagueSelectionCard from './match-selection/LeagueSelectionCard';
import MatchListCard from './match-selection/MatchListCard';
import ActionButton from './match-selection/ActionButton';

const EnhancedMatchSelection = () => {
  const { 
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMatch,
    setSelectedMatch,
    leagues,
    filteredMatches,
    favoriteTeams,
    favoriteLeagues,
    toggleFavoriteTeam,
    toggleFavoriteLeague,
    isLoading
  } = useFootball();

  const handleFindMatch = () => {
    // This would trigger a refetch or navigate to match details
    console.log('Finding match:', selectedMatch);
  };

  return (
    <div className="space-y-6">
      {/* Sport Selection */}
      <SportSelectionCard
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
      />

      {/* Live Search */}
      <LiveSearch />

      {/* Advanced Filters */}
      <AdvancedFilters />

      {/* League Selection */}
      <LeagueSelectionCard
        selectedLeague={selectedLeague}
        onLeagueChange={setSelectedLeague}
        leagues={leagues}
        favoriteLeagues={favoriteLeagues}
        onToggleFavoriteLeague={toggleFavoriteLeague}
      />

      {/* Enhanced Match List */}
      <MatchListCard
        filteredMatches={filteredMatches}
        selectedMatch={selectedMatch}
        onMatchSelect={setSelectedMatch}
        favoriteTeams={favoriteTeams}
        onToggleFavoriteTeam={toggleFavoriteTeam}
        isLoading={isLoading}
      />

      {/* Action Button */}
      <ActionButton
        selectedMatch={selectedMatch}
        onFindMatch={handleFindMatch}
      />
    </div>
  );
};

export default EnhancedMatchSelection;
