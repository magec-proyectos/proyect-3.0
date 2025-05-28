
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Match } from '@/types/football';

interface MatchListItemProps {
  match: Match;
  isSelected: boolean;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MatchListItem: React.FC<MatchListItemProps> = ({
  match,
  isSelected,
  onSelect,
  isFavorite,
  onToggleFavorite
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 70) return 'text-green-500 border-green-500';
    if (confidence > 50) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  const getFormBadgeColor = (result: 'W' | 'L' | 'D' | 'w' | 'l' | 'd') => {
    const upperResult = result.toUpperCase();
    switch (upperResult) {
      case 'W': return 'bg-green-500';
      case 'L': return 'bg-red-500';
      case 'D': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 bg-dark-lighter rounded-lg border transition-all cursor-pointer hover:border-neon-blue/50 ${
        isSelected ? 'border-neon-blue' : 'border-dark-border'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
            <div>
              <div className="font-medium text-sm">{match.homeTeam.name}</div>
              <div className="flex gap-1 mt-1">
                {match.homeTeam.form.slice(0, 5).map((result, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${getFormBadgeColor(result)}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm mx-4">vs</div>
          
          <div className="flex items-center gap-2">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
            <div>
              <div className="font-medium text-sm">{match.awayTeam.name}</div>
              <div className="flex gap-1 mt-1">
                {match.awayTeam.form.slice(0, 5).map((result, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${getFormBadgeColor(result)}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="p-1 h-auto"
        >
          <Heart 
            className={`h-4 w-4 ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400'
            }`} 
          />
        </Button>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {match.date} at {match.time}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {match.league}
          </div>
          <Badge variant="outline" className="text-xs">
            {match.league}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Odds: {match.homeOdds}</span>
          <Badge 
            variant="outline" 
            className={`text-xs ${getConfidenceColor(match.predictions.confidence)}`}
          >
            {Math.round(match.predictions.confidence)}% confidence
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchListItem;
