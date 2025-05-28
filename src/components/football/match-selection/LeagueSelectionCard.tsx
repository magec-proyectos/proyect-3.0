
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Star } from 'lucide-react';
import { League } from '@/types/football';

interface LeagueSelectionCardProps {
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
  leagues: League[];
  favoriteLeagues: string[];
  onToggleFavoriteLeague: (leagueId: string) => void;
}

const LeagueSelectionCard: React.FC<LeagueSelectionCardProps> = ({
  selectedLeague,
  onLeagueChange,
  leagues,
  favoriteLeagues,
  onToggleFavoriteLeague
}) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-neon-blue" />
            Select League
          </div>
          <Badge variant="outline" className="text-xs">
            {leagues.length} available
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedLeague} onValueChange={onLeagueChange}>
          <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
            <SelectValue placeholder="Choose a league" />
          </SelectTrigger>
          <SelectContent className="bg-dark border-dark-border text-white">
            {leagues.map((league) => (
              <SelectItem key={league.id} value={league.id}>
                <div className="flex items-center gap-3 w-full">
                  <img src={league.logo} alt={league.name} className="w-5 h-5" />
                  <span>{league.name}</span>
                  <span className="text-xs text-gray-400">({league.country})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoriteLeague(league.id);
                    }}
                    className="p-1 h-auto ml-auto"
                  >
                    <Star 
                      className={`h-3 w-3 ${
                        favoriteLeagues.includes(league.id) 
                          ? 'fill-yellow-500 text-yellow-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LeagueSelectionCard;
