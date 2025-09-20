import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Clock, Zap, Target, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface LiveBettingOverlayProps {
  story: any;
  onClose: () => void;
  onBet: (bet: any) => void;
}

const LiveBettingOverlay: React.FC<LiveBettingOverlayProps> = ({
  story,
  onClose,
  onBet
}) => {
  const [betAmount, setBetAmount] = useState([25]);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [liveOdds, setLiveOdds] = useState({
    homeWin: 1.85,
    draw: 3.20,
    awayWin: 2.10,
    nextGoal: 1.75,
    corners: 2.30
  });

  // Simulate live odds updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOdds(prev => ({
        homeWin: prev.homeWin + (Math.random() - 0.5) * 0.1,
        draw: prev.draw + (Math.random() - 0.5) * 0.2,
        awayWin: prev.awayWin + (Math.random() - 0.5) * 0.1,
        nextGoal: prev.nextGoal + (Math.random() - 0.5) * 0.1,
        corners: prev.corners + (Math.random() - 0.5) * 0.15
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const liveMarkets = [
    { 
      id: 'home-win', 
      label: `${story.match.teams[0]} Gana`, 
      odds: liveOdds.homeWin,
      trend: 'up'
    },
    { 
      id: 'draw', 
      label: 'Empate', 
      odds: liveOdds.draw,
      trend: 'down'
    },
    { 
      id: 'away-win', 
      label: `${story.match.teams[1]} Gana`, 
      odds: liveOdds.awayWin,
      trend: 'up'
    },
    { 
      id: 'next-goal', 
      label: 'Próximo Gol', 
      odds: liveOdds.nextGoal,
      trend: 'stable'
    },
    { 
      id: 'corners', 
      label: 'Próximo Corner', 
      odds: liveOdds.corners,
      trend: 'down'
    }
  ];

  const handleBet = () => {
    if (!selectedMarket) return;
    
    const market = liveMarkets.find(m => m.id === selectedMarket);
    onBet({
      market: market?.label,
      odds: market?.odds,
      amount: betAmount[0]
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={12} className="text-green-400" />;
      case 'down': return <TrendingUp size={12} className="text-red-400 rotate-180" />;
      default: return <Activity size={12} className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-dark-card rounded-t-3xl border-t border-dark-border z-30 max-h-[85vh] overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Apuestas en Vivo
            </h3>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock size={14} />
              {story.match.time} • EN VIVO
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Live Match Info */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-4 mb-6 border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-red-500 text-white animate-pulse">
              <Activity size={12} className="mr-1" />
              EN VIVO
            </Badge>
            <span className="text-white font-mono text-lg">{story.match.time}</span>
          </div>
          <div className="text-center">
            <h4 className="text-white font-bold text-lg">
              {story.match.teams[0]} vs {story.match.teams[1]}
            </h4>
            <div className="text-2xl font-bold text-white mt-1">2 - 1</div>
          </div>
        </div>

        {/* Live Markets */}
        <div className="space-y-3 mb-6">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Target size={16} />
            Mercados en Vivo
          </h4>
          {liveMarkets.map((market) => (
            <motion.button
              key={market.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedMarket(market.id)}
              className={`w-full p-4 rounded-xl border transition-all ${
                selectedMarket === market.id
                  ? 'border-neon-lime bg-neon-lime/10'
                  : 'border-dark-border bg-dark-lighter hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{market.label}</span>
                <div className="flex items-center gap-2">
                  {getTrendIcon(market.trend)}
                  <span className="text-neon-lime font-bold text-lg">
                    {market.odds.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bet Amount */}
        <div className="mb-6">
          <label className="text-white font-medium mb-3 block">
            Cantidad: ${betAmount[0]}
          </label>
          <Slider
            value={betAmount}
            onValueChange={setBetAmount}
            max={500}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$5</span>
            <span>$250</span>
            <span>$500</span>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mb-6">
          {[10, 25, 50, 100].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => setBetAmount([amount])}
              className="flex-1 border-dark-border text-gray-400 hover:text-white"
            >
              ${amount}
            </Button>
          ))}
        </div>

        {/* Potential Win */}
        {selectedMarket && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-lighter rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Ganancia Potencial</span>
              <span className="text-neon-lime font-bold text-xl">
                ${(betAmount[0] * (liveMarkets.find(m => m.id === selectedMarket)?.odds || 1)).toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Cuotas actualizándose en tiempo real
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-dark-border text-gray-400 hover:text-white"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleBet}
            disabled={!selectedMarket}
            className="flex-1 bg-red-500 text-white hover:bg-red-600 font-bold animate-pulse hover:animate-none"
          >
            <Zap size={16} className="mr-2" />
            Apostar Ahora
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-3">
          Las cuotas cambian constantemente durante el partido
        </div>
      </div>
    </motion.div>
  );
};

export default LiveBettingOverlay;