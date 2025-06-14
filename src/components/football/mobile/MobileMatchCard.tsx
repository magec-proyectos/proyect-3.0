
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Plus, TrendingUp, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { Match } from '@/types/football';

interface MobileMatchCardProps {
  match: Match;
  onQuickBet: (match: Match, betType: string) => void;
  onAddToFavorites: (match: Match) => void;
  onViewDetails: (match: Match) => void;
  isFavorite?: boolean;
}

const MobileMatchCard: React.FC<MobileMatchCardProps> = ({
  match,
  onQuickBet,
  onAddToFavorites,
  onViewDetails,
  isFavorite = false
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const { elementRef } = useTouchGestures<HTMLDivElement>({
    onSwipe: (swipe) => {
      if (swipe.direction === 'left' && swipe.distance > 120) {
        // Quick bet on home team
        onQuickBet(match, 'home');
      } else if (swipe.direction === 'right' && swipe.distance > 120) {
        // Add to favorites
        onAddToFavorites(match);
      }
    },
    onLongPress: () => {
      setShowQuickActions(true);
    }
  });

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset(info.offset.x);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swipe right - add to favorites
      onAddToFavorites(match);
    } else if (info.offset.x < -threshold) {
      // Swipe left - quick bet
      onQuickBet(match, 'home');
    }
    
    setDragOffset(0);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 70) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (confidence > 50) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <>
      <motion.div
        ref={elementRef}
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: dragOffset }}
        className="relative touch-pan-y"
      >
        {/* Swipe Action Indicators */}
        <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center bg-gradient-to-r from-blue-500/30 to-transparent rounded-l-lg -z-10">
          <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-400 fill-current' : 'text-blue-400'}`} />
        </div>
        <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center bg-gradient-to-l from-green-500/30 to-transparent rounded-r-lg -z-10">
          <Plus className="w-6 h-6 text-green-400" />
        </div>

        <Card 
          className="bg-dark-card/95 backdrop-blur-sm border-dark-border hover:border-neon-blue/50 transition-all touch-manipulation"
          onClick={() => onViewDetails(match)}
        >
          <CardContent className="p-4">
            {/* Match Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {match.league}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {match.time}
                </div>
              </div>
              <Badge 
                className={`text-xs ${getConfidenceColor(match.predictions.confidence)}`}
              >
                {Math.round(match.predictions.confidence)}%
              </Badge>
            </div>

            {/* Teams */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white text-sm truncate">{match.homeTeam.name}</div>
                    <div className="flex gap-1 mt-1">
                      {match.homeTeam.form.slice(0, 3).map((result, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            result.toUpperCase() === 'W' ? 'bg-green-500' :
                            result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 px-3 py-1 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBet(match, 'home');
                  }}
                >
                  {match.homeOdds}
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-xs text-gray-500 bg-dark-lighter px-3 py-1 rounded-full">vs</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white text-sm truncate">{match.awayTeam.name}</div>
                    <div className="flex gap-1 mt-1">
                      {match.awayTeam.form.slice(0, 3).map((result, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            result.toUpperCase() === 'W' ? 'bg-green-500' :
                            result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 px-3 py-1 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBet(match, 'away');
                  }}
                >
                  {match.awayOdds}
                </Button>
              </div>
            </div>

            {/* Quick Odds */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickBet(match, 'home');
                }}
              >
                <span className="text-xs text-gray-400">1</span>
                <span className="text-sm font-bold text-neon-blue">{match.homeOdds}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickBet(match, 'draw');
                }}
              >
                <span className="text-xs text-gray-400">X</span>
                <span className="text-sm font-bold text-neon-blue">{match.drawOdds}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickBet(match, 'away');
                }}
              >
                <span className="text-xs text-gray-400">2</span>
                <span className="text-sm font-bold text-neon-blue">{match.awayOdds}</span>
              </Button>
            </div>

            {/* AI Prediction Indicator */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <TrendingUp className="w-3 h-3 text-neon-lime" />
              <span className="text-gray-400">AI sugiere:</span>
              <span className="text-neon-lime font-medium">{match.predictions.recommended}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Modal */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowQuickActions(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="w-full bg-dark-card rounded-t-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
              
              <div className="space-y-3">
                <h3 className="font-semibold text-white mb-4">Acciones Rápidas</h3>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter"
                  onClick={() => {
                    onQuickBet(match, 'home');
                    setShowQuickActions(false);
                  }}
                >
                  <Plus className="w-5 h-5 mr-3 text-green-400" />
                  Apostar por {match.homeTeam.name}
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter"
                  onClick={() => {
                    onAddToFavorites(match);
                    setShowQuickActions(false);
                  }}
                >
                  <Heart className={`w-5 h-5 mr-3 ${isFavorite ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
                  {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter"
                  onClick={() => {
                    onViewDetails(match);
                    setShowQuickActions(false);
                  }}
                >
                  <TrendingUp className="w-5 h-5 mr-3 text-blue-400" />
                  Ver análisis completo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMatchCard;
