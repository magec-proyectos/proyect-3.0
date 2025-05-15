
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowRight, Settings, Plus, Minus } from 'lucide-react';
import { useRoulette } from '@/contexts/RouletteContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ActionButtons: React.FC = () => {
  const { 
    placedBets,
    isSpinning, 
    resetBets, 
    chipAmount, 
    betAmount, 
    updateBetAmount,
    spinWheel,
    totalBetAmount 
  } = useRoulette();
  
  const [customBetAmount, setCustomBetAmount] = useState(betAmount.toString());
  
  const handleCustomBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomBetAmount(value);
  };
  
  const applyCustomBet = () => {
    const amount = parseInt(customBetAmount);
    if (!isNaN(amount) && amount > 0) {
      updateBetAmount(amount);
    }
  };
  
  return (
    <div className="flex justify-between items-center w-full">
      <Button 
        variant="ghost" 
        onClick={resetBets} 
        className="text-amber-200 hover:text-white hover:bg-green-800/50 border border-amber-500/0 hover:border-amber-500/30"
        disabled={placedBets.length === 0 || isSpinning}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Clear All Bets
      </Button>
      
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              disabled={isSpinning}
              className="border-amber-500/30 bg-black/40 hover:bg-black/60 text-amber-200 shadow-md"
            >
              <Settings className="mr-2 h-4 w-4" />
              Bet Options
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-green-900 to-green-950 border-amber-500/50 text-amber-200 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-[url('/felt-texture.png')] bg-repeat opacity-10 z-0 rounded-lg"></div>
            <DialogHeader className="relative z-10">
              <DialogTitle className="text-amber-100">Adjust Bet Amount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="bet-amount">Custom Bet Amount</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      const current = parseInt(customBetAmount) || 0;
                      setCustomBetAmount(Math.max(current - 10, 1).toString());
                    }}
                    className="bg-black/40 border-amber-500/30 text-amber-200 hover:bg-black/60"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    id="bet-amount" 
                    value={customBetAmount} 
                    onChange={handleCustomBetChange}
                    type="number" 
                    min="1"
                    className="bg-black/40 border-amber-500/30 text-amber-100 focus-visible:ring-amber-500/50"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      const current = parseInt(customBetAmount) || 0;
                      setCustomBetAmount((current + 10).toString());
                    }}
                    className="bg-black/40 border-amber-500/30 text-amber-200 hover:bg-black/60"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[25, 50, 100, 200, 500, 1000].map(amount => (
                  <Button 
                    key={amount}
                    variant="outline" 
                    onClick={() => setCustomBetAmount(amount.toString())}
                    className="bg-black/40 border-amber-500/30 text-amber-200 hover:bg-amber-700/30 transition-all"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={applyCustomBet} 
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white border border-amber-400/20 shadow-lg"
              >
                Apply Bet Amount
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="default" 
          onClick={spinWheel}
          disabled={placedBets.length === 0 || isSpinning}
          className={`bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold border border-amber-400/20 shadow-lg transition-all
                     ${isSpinning ? 'animate-pulse' : 'hover:scale-105'}`}
        >
          {isSpinning ? 'Spinning...' : `Spin Wheel ${totalBetAmount > 0 ? '($'+totalBetAmount+')' : ''}`}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
