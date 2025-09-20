import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, DollarSign, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface QuickPredictionOverlayProps {
  story: any;
  onClose: () => void;
  onBet: (prediction: any) => void;
}

const QuickPredictionOverlay: React.FC<QuickPredictionOverlayProps> = ({
  story,
  onClose,
  onBet
}) => {
  const [betAmount, setBetAmount] = useState(10);
  const [selectedPrediction, setSelectedPrediction] = useState('');
  const [confidence, setConfidence] = useState([75]);

  const quickPredictions = [
    { type: 'winner', label: story.match.teams[0], odds: 1.85 },
    { type: 'winner', label: story.match.teams[1], odds: 2.10 },
    { type: 'total', label: 'Over 2.5', odds: 1.90 },
    { type: 'total', label: 'Under 2.5', odds: 1.80 },
    { type: 'spread', label: `${story.match.teams[0]} -1`, odds: 2.25 },
    { type: 'spread', label: `${story.match.teams[1]} +1`, odds: 1.65 }
  ];

  const handleBet = () => {
    if (!selectedPrediction) return;
    
    onBet({
      prediction: selectedPrediction,
      amount: betAmount,
      confidence: confidence[0]
    });
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-dark-card rounded-t-3xl border-t border-dark-border z-30 max-h-[80vh] overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <Zap className="text-neon-lime" size={20} />
              Predicción Rápida
            </h3>
            <p className="text-gray-400 text-sm">
              {story.match.teams[0]} vs {story.match.teams[1]}
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

        {/* Quick Predictions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickPredictions.map((prediction, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPrediction(prediction.label)}
              className={`p-4 rounded-xl border transition-all ${
                selectedPrediction === prediction.label
                  ? 'border-neon-lime bg-neon-lime/10 text-white'
                  : 'border-dark-border bg-dark-lighter text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="text-sm font-medium mb-1">{prediction.label}</div>
              <div className="text-neon-lime font-bold">{prediction.odds.toFixed(2)}x</div>
            </motion.button>
          ))}
        </div>

        {/* Bet Amount */}
        <div className="mb-6">
          <label className="text-white font-medium mb-3 block flex items-center gap-2">
            <DollarSign size={16} />
            Cantidad de Apuesta
          </label>
          <div className="flex gap-2 mb-3">
            {[5, 10, 25, 50, 100].map((amount) => (
              <Button
                key={amount}
                variant={betAmount === amount ? "default" : "outline"}
                size="sm"
                onClick={() => setBetAmount(amount)}
                className={betAmount === amount ? "bg-neon-lime text-black" : ""}
              >
                ${amount}
              </Button>
            ))}
          </div>
          <Input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="bg-dark-lighter border-dark-border text-white"
            placeholder="Cantidad personalizada"
          />
        </div>

        {/* Confidence Level */}
        <div className="mb-6">
          <label className="text-white font-medium mb-3 block flex items-center gap-2">
            <Target size={16} />
            Nivel de Confianza: {confidence[0]}%
          </label>
          <Slider
            value={confidence}
            onValueChange={setConfidence}
            max={100}
            min={1}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Baja</span>
            <span>Media</span>
            <span>Alta</span>
          </div>
        </div>

        {/* Potential Win */}
        {selectedPrediction && (
          <div className="bg-dark-lighter rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Ganancia Potencial</span>
              <span className="text-neon-lime font-bold text-lg">
                ${(betAmount * (quickPredictions.find(p => p.label === selectedPrediction)?.odds || 1)).toFixed(2)}
              </span>
            </div>
          </div>
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
            disabled={!selectedPrediction}
            className="flex-1 bg-neon-lime text-black hover:bg-neon-lime/90 font-bold"
          >
            Confirmar Predicción
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickPredictionOverlay;