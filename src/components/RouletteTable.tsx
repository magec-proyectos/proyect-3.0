
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowRight, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

import RouletteWheel from './roulette/RouletteWheel';
import BettingBoard from './roulette/BettingBoard';
import GameStats from './roulette/GameStats';
import PreviousResults from './roulette/PreviousResults';
import SelectedBet from './roulette/SelectedBet';
import BetRecommendation from './roulette/BetRecommendation';
import ChipSelector from './roulette/ChipSelector';
import { BetType, GameStats as GameStatsType } from './roulette/types';
import { evaluateBet, getBetOdds, getRecommendation } from './roulette/rouletteUtils';

const RouletteTable = () => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [previousResults, setPreviousResults] = useState<number[]>([14, 7, 32, 5, 19]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [chipAmount, setChipAmount] = useState<number>(10);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [lastSpinResult, setLastSpinResult] = useState<number | undefined>(undefined);
  const [gameStats, setGameStats] = useState<GameStatsType>({
    wins: 0,
    losses: 0,
    totalBets: 0,
    totalWinnings: 0,
    totalLosses: 0
  });
  
  const handleSelectBet = (type: BetType, number?: number) => {
    setSelectedBet({ type, number });
    setBetAmount(chipAmount);
  };
  
  const resetBets = () => {
    setSelectedBet(null);
    setBetAmount(0);
  };
  
  const increaseChip = () => {
    const newAmount = chipAmount < 50 ? chipAmount + 10 : chipAmount + 50;
    setChipAmount(Math.min(newAmount, 1000));
  };
  
  const decreaseChip = () => {
    const newAmount = chipAmount > 50 ? chipAmount - 50 : chipAmount - 10;
    setChipAmount(Math.max(newAmount, 10));
  };
  
  const updateGameStats = (isWin: boolean) => {
    setGameStats(prev => {
      const winAmount = isWin ? betAmount * getBetOdds(selectedBet!.type) : 0;
      
      return {
        wins: isWin ? prev.wins + 1 : prev.wins,
        losses: !isWin ? prev.losses + 1 : prev.losses,
        totalBets: prev.totalBets + 1,
        totalWinnings: prev.totalWinnings + winAmount,
        totalLosses: prev.totalLosses + (isWin ? 0 : betAmount)
      };
    });
  };
  
  const spinWheel = () => {
    if (!selectedBet) {
      toast({
        title: "No hay apuesta seleccionada",
        description: "Por favor, haga una apuesta antes de girar la ruleta.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Simular el giro de la ruleta
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 38); // 0-37 (including 00)
      setLastSpinResult(newResult);
      setPreviousResults([newResult, ...previousResults.slice(0, 4)]);
      setIsSpinning(false);
      
      // Determinar si la apuesta ganó
      const isWin = evaluateBet(selectedBet, newResult);
      
      // Actualizar estadísticas
      updateGameStats(isWin);
      
      // Mostrar resultado en toast
      if (isWin) {
        const winAmount = betAmount * getBetOdds(selectedBet.type);
        toast({
          title: "¡Has Ganado!",
          description: `¡Felicitaciones! Has ganado $${winAmount}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Has Perdido",
          description: `Mejor suerte la próxima vez. Has perdido $${betAmount}.`,
          variant: "destructive",
        });
      }
    }, 3000); // 3 segundos de animación
  };
  
  const recommendation = selectedBet ? getRecommendation(selectedBet) : null;
  
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 to-dark opacity-80 z-0"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gradient">Ruleta VIP</CardTitle>
          <Badge variant="outline" className="bg-dark-card/50 backdrop-blur-sm border border-neon-blue/30 font-medium">
            Balance: $1000
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        {/* Fondo de mesa */}
        <div className="absolute inset-0 casino-felt rounded-md -z-10"></div>
        
        <div className="space-y-8 py-4">
          {/* Estadísticas de sesión */}
          <GameStats stats={gameStats} />
          
          {/* Resultados previos */}
          <PreviousResults results={previousResults} />
          
          {/* Ruleta */}
          <div className="flex justify-center">
            <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
          </div>
          
          {/* Selección de fichas */}
          <ChipSelector 
            chipAmount={chipAmount}
            decreaseChip={decreaseChip}
            increaseChip={increaseChip}
          />
          
          {/* Tablero de apuestas */}
          <div className="space-y-3">
            <h3 className="text-gray-300 font-semibold">Selecciona tu Apuesta</h3>
            <BettingBoard onSelectBet={handleSelectBet} />
          </div>
          
          {/* Apuesta seleccionada */}
          {selectedBet && (
            <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
          )}
          
          {/* Cuadro de recomendaciones */}
          {selectedBet && recommendation && (
            <BetRecommendation recommendation={recommendation} />
          )}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between relative z-10 border-t border-dark-lighter/50">
        <Button 
          variant="ghost" 
          onClick={resetBets} 
          className="text-gray-400 hover:text-white hover:bg-dark-lighter"
          disabled={!selectedBet || isSpinning}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Borrar Apuesta
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedBet(prevBet => {
                if (!prevBet) return null;
                setBetAmount(chipAmount);
                return prevBet;
              });
            }}
            disabled={!selectedBet || isSpinning}
            className="border-gray-600 bg-dark-lighter hover:bg-dark/50"
          >
            <Settings className="mr-2 h-4 w-4" />
            Cambiar Apuesta
          </Button>
          
          <Button 
            variant="default" 
            onClick={spinWheel}
            disabled={!selectedBet || isSpinning}
            className={`bg-gradient-to-r from-neon-blue to-blue-500 text-black font-semibold hover:from-neon-blue/90 hover:to-blue-500/90 transition-all
                       ${isSpinning ? 'animate-pulse' : ''}`}
          >
            {isSpinning ? 'Girando...' : 'Girar Ruleta'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RouletteTable;
