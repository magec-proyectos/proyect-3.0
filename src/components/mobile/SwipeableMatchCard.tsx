import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SwipeableContainer } from '@/hooks/useSwipeGestures';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchCardData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  time: string;
  league: string;
  odds?: {
    home: number;
    draw?: number;
    away: number;
  };
  confidence?: number;
  trending?: boolean;
  popular?: boolean;
}

interface SwipeableMatchCardProps {
  match: MatchCardData;
  onFavorite?: (matchId: string) => void;
  onBet?: (matchId: string) => void;
  onView?: (matchId: string) => void;
  className?: string;
}

export const SwipeableMatchCard: React.FC<SwipeableMatchCardProps> = ({
  match,
  onFavorite,
  onBet,
  onView,
  className
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setIsRevealed(true);
    if (onBet) onBet(match.id);
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setIsRevealed(true);
    if (onFavorite) onFavorite(match.id);
  };

  const resetSwipe = () => {
    setIsRevealed(false);
    setSwipeDirection(null);
  };

  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'bg-red-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'finished':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Action Backgrounds */}
      <div className="absolute inset-0 flex">
        {/* Left Action (Bet) */}
        <div className={cn(
          "flex-1 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-start pl-6",
          "transition-all duration-300 rounded-lg",
          swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="text-white text-center">
            <Zap className="h-6 w-6 mb-1 mx-auto" />
            <span className="text-sm font-medium">Apostar</span>
          </div>
        </div>

        {/* Right Action (Favorite) */}
        <div className={cn(
          "flex-1 bg-gradient-to-l from-yellow-500 to-yellow-600 flex items-center justify-end pr-6",
          "transition-all duration-300 rounded-lg",
          swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="text-white text-center">
            <Star className="h-6 w-6 mb-1 mx-auto" />
            <span className="text-sm font-medium">Favorito</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <SwipeableContainer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        threshold={60}
        className={cn(
          "relative z-10 transition-transform duration-300",
          isRevealed && swipeDirection === 'left' && "transform translate-x-20",
          isRevealed && swipeDirection === 'right' && "transform -translate-x-20"
        )}
      >
        <Card className={cn(
          "h-full hover:shadow-lg transition-all duration-300",
          "border border-border/50 hover:border-border",
          "bg-card/50 backdrop-blur-sm hover:bg-card/80",
          "animate-fade-in"
        )}>
          <CardContent className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", getStatusColor())} />
                <span className="text-xs text-muted-foreground capitalize">
                  {match.status}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{match.league}</span>
              </div>

              <div className="flex items-center gap-1">
                {match.trending && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {match.popular && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    <Users className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
            </div>

            {/* Teams and Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm truncate">{match.homeTeam}</div>
                  <div className="text-muted-foreground text-sm truncate">{match.awayTeam}</div>
                </div>

                <div className="text-right">
                  {match.status === 'finished' || match.status === 'live' ? (
                    <div className="text-xl font-bold">
                      {match.homeScore} - {match.awayScore}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {match.time}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Odds and Actions */}
            {match.odds && (
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {match.odds.home.toFixed(2)}
                  </span>
                  {match.odds.draw && (
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                      {match.odds.draw.toFixed(2)}
                    </span>
                  )}
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {match.odds.away.toFixed(2)}
                  </span>
                </div>

                {match.confidence && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Confianza: {match.confidence}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Actions - Visible when revealed */}
            {isRevealed && (
              <div className="flex gap-2 pt-2 animate-fade-in">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetSwipe}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={() => onView?.(match.id)}
                  className="flex-1"
                >
                  Ver Detalles
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}

            {/* Swipe Hints */}
            {!isRevealed && (
              <div className="flex justify-between items-center text-xs text-muted-foreground/60 pt-1">
                <div className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <span>Desliza para favorito</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Desliza para apostar</span>
                  <ChevronLeft className="h-3 w-3" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </SwipeableContainer>
    </div>
  );
};