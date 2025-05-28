
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Match } from '@/types/football';
import MatchListItem from './MatchListItem';

interface MatchListCardProps {
  filteredMatches: Match[];
  selectedMatch: string;
  onMatchSelect: (matchId: string) => void;
  favoriteTeams: string[];
  onToggleFavoriteTeam: (teamId: string) => void;
  isLoading: boolean;
}

const MatchListCard: React.FC<MatchListCardProps> = ({
  filteredMatches,
  selectedMatch,
  onMatchSelect,
  favoriteTeams,
  onToggleFavoriteTeam,
  isLoading
}) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-neon-blue" />
            Available Matches
          </div>
          <Badge variant="outline" className="text-xs">
            {filteredMatches.length} matches
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-dark-lighter h-24 rounded-lg" />
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No matches found with current filters</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMatches.map((match) => (
              <MatchListItem
                key={match.id}
                match={match}
                isSelected={selectedMatch === match.id}
                onSelect={() => onMatchSelect(match.id)}
                isFavorite={favoriteTeams.includes(match.homeTeam.id)}
                onToggleFavorite={() => onToggleFavoriteTeam(match.homeTeam.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchListCard;
