
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface OddsData {
  home: number;
  draw: number;
  away: number;
  movement?: {
    home: 'up' | 'down' | 'stable';
    draw: 'up' | 'down' | 'stable';
    away: 'up' | 'down' | 'stable';
  };
}

interface MobileOddsDisplayProps {
  odds: OddsData;
  homeTeam: string;
  awayTeam: string;
  onBetSelect: (betType: 'home' | 'draw' | 'away', odds: number) => void;
  compact?: boolean;
  showMovement?: boolean;
}

const MobileOddsDisplay: React.FC<MobileOddsDisplayProps> = ({
  odds,
  homeTeam,
  awayTeam,
  onBetSelect,
  compact = false,
  showMovement = true
}) => {
  const getMovementIcon = (movement?: 'up' | 'down' | 'stable') => {
    if (!movement || !showMovement) return null;
    
    switch (movement) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getMovementColor = (movement?: 'up' | 'down' | 'stable') => {
    if (!movement || !showMovement) return '';
    
    switch (movement) {
      case 'up':
        return 'border-green-400/50 bg-green-400/10';
      case 'down':
        return 'border-red-400/50 bg-red-400/10';
      default:
        return '';
    }
  };

  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-1">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className={`w-full flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50 text-xs ${getMovementColor(odds.movement?.home)}`}
            onClick={() => onBetSelect('home', odds.home)}
          >
            <div className="flex items-center gap-1">
              <span className="text-gray-400">1</span>
              {getMovementIcon(odds.movement?.home)}
            </div>
            <span className="font-bold text-neon-blue">{odds.home.toFixed(2)}</span>
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className={`w-full flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50 text-xs ${getMovementColor(odds.movement?.draw)}`}
            onClick={() => onBetSelect('draw', odds.draw)}
          >
            <div className="flex items-center gap-1">
              <span className="text-gray-400">X</span>
              {getMovementIcon(odds.movement?.draw)}
            </div>
            <span className="font-bold text-neon-blue">{odds.draw.toFixed(2)}</span>
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className={`w-full flex flex-col items-center p-2 h-auto border-dark-border hover:border-neon-blue/50 text-xs ${getMovementColor(odds.movement?.away)}`}
            onClick={() => onBetSelect('away', odds.away)}
          >
            <div className="flex items-center gap-1">
              <span className="text-gray-400">2</span>
              {getMovementIcon(odds.movement?.away)}
            </div>
            <span className="font-bold text-neon-blue">{odds.away.toFixed(2)}</span>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          size="sm"
          className={`w-full flex items-center justify-between p-3 border-dark-border hover:border-neon-blue/50 ${getMovementColor(odds.movement?.home)}`}
          onClick={() => onBetSelect('home', odds.home)}
        >
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">1</Badge>
            <span className="font-medium text-white truncate">{homeTeam}</span>
          </div>
          <div className="flex items-center gap-2">
            {getMovementIcon(odds.movement?.home)}
            <span className="font-bold text-neon-blue text-lg">{odds.home.toFixed(2)}</span>
          </div>
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          size="sm"
          className={`w-full flex items-center justify-between p-3 border-dark-border hover:border-neon-blue/50 ${getMovementColor(odds.movement?.draw)}`}
          onClick={() => onBetSelect('draw', odds.draw)}
        >
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">X</Badge>
            <span className="font-medium text-white">Empate</span>
          </div>
          <div className="flex items-center gap-2">
            {getMovementIcon(odds.movement?.draw)}
            <span className="font-bold text-neon-blue text-lg">{odds.draw.toFixed(2)}</span>
          </div>
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          size="sm"
          className={`w-full flex items-center justify-between p-3 border-dark-border hover:border-neon-blue/50 ${getMovementColor(odds.movement?.away)}`}
          onClick={() => onBetSelect('away', odds.away)}
        >
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">2</Badge>
            <span className="font-medium text-white truncate">{awayTeam}</span>
          </div>
          <div className="flex items-center gap-2">
            {getMovementIcon(odds.movement?.away)}
            <span className="font-bold text-neon-blue text-lg">{odds.away.toFixed(2)}</span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default MobileOddsDisplay;
