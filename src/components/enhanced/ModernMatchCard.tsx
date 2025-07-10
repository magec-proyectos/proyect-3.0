import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Clock, Users } from 'lucide-react';
import { Match } from '@/types/football';
import EnhancedCard from '@/components/ui/enhanced-card';
import InteractiveButton from '@/components/ui/interactive-button';
import { TouchButton } from '@/components/ui/mobile-optimized';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ModernMatchCardProps {
  match: Match;
  onQuickBet?: (match: Match, betType: 'home' | 'draw' | 'away') => void;
  onAddToFavorites?: (match: Match) => void;
  onViewDetails?: (match: Match) => void;
  isFavorite?: boolean;
  className?: string;
}

const ModernMatchCard = ({
  match,
  onQuickBet,
  onAddToFavorites,
  onViewDetails,
  isFavorite = false,
  className
}: ModernMatchCardProps) => {
  const isMobile = useIsMobile();

  const getFormColor = (form: readonly ('w' | 'l' | 'd' | 'W' | 'L' | 'D')[]) => {
    const recentForm = form.slice(0, 3);
    const wins = recentForm.filter(result => result.toUpperCase() === 'W').length;
    
    if (wins >= 2) return 'text-green-500';
    if (wins === 1) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getFormStreak = (form: readonly ('w' | 'l' | 'd' | 'W' | 'L' | 'D')[]) => {
    const recentForm = form.slice(0, 3);
    const wins = recentForm.filter(result => result.toUpperCase() === 'W').length;
    
    if (wins >= 2) return '🔥';
    if (wins === 1) return '📈';
    return '📉';
  };

  return (
    <EnhancedCard
      variant="glass"
      hover="lift"
      className={cn('relative overflow-hidden', className)}
    >
      <div className="space-y-4">
        {/* Match Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              {match.league}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <TouchButton
              size="sm"
              onClick={() => onAddToFavorites?.(match)}
              className={cn(
                'p-2 bg-transparent hover:bg-accent',
                isFavorite && 'text-yellow-500'
              )}
            >
              <Star className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </TouchButton>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{match.time}</span>
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {match.homeTeam.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {match.homeTeam.form.slice(0, 3).map((result, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          result.toUpperCase() === 'W' ? 'bg-green-500' :
                          result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                        )}
                      />
                    ))}
                  </div>
                  <span className={cn('text-xs', getFormColor(match.homeTeam.form))}>
                    {getFormStreak(match.homeTeam.form)}
                  </span>
                </div>
              </div>
            </div>
            
            <InteractiveButton
              size="sm"
              variant="outline"
              onClick={() => onQuickBet?.(match, 'home')}
              className="min-w-[60px] text-sm font-bold"
              glow
            >
              {match.homeOdds}
            </InteractiveButton>
          </div>

          {/* VS and Draw */}
          <div className="flex items-center justify-between py-2">
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground font-medium">VS</span>
              <InteractiveButton
                size="sm"
                variant="outline"
                onClick={() => onQuickBet?.(match, 'draw')}
                className="min-w-[60px] text-sm font-bold"
              >
                {match.drawOdds}
              </InteractiveButton>
            </div>
            <div className="flex-1" />
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {match.awayTeam.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {match.awayTeam.form.slice(0, 3).map((result, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          result.toUpperCase() === 'W' ? 'bg-green-500' :
                          result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                        )}
                      />
                    ))}
                  </div>
                  <span className={cn('text-xs', getFormColor(match.awayTeam.form))}>
                    {getFormStreak(match.awayTeam.form)}
                  </span>
                </div>
              </div>
            </div>
            
            <InteractiveButton
              size="sm"
              variant="outline"
              onClick={() => onQuickBet?.(match, 'away')}
              className="min-w-[60px] text-sm font-bold"
              glow
            >
              {match.awayOdds}
            </InteractiveButton>
          </div>
        </div>

        {/* AI Prediction Highlight */}
        <motion.div 
          className="bg-primary/10 border border-primary/20 rounded-lg p-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Prediction</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-primary">
                {match.predictions.confidence}% confidence
              </span>
              <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${match.predictions.confidence}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            {match.predictions.recommended && (
              <span>Recommended: <strong>{match.predictions.recommended}</strong></span>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <TouchButton
            onClick={() => onViewDetails?.(match)}
            className="flex-1 bg-transparent border border-border hover:bg-accent text-foreground"
          >
            <Users className="w-4 h-4 mr-2" />
            View Details
          </TouchButton>
        </div>
      </div>
    </EnhancedCard>
  );
};

export default ModernMatchCard;