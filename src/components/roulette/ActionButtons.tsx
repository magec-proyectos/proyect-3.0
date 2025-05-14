
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
    selectedBet, 
    isSpinning, 
    resetBets, 
    chipAmount, 
    betAmount, 
    updateBetAmount,
    spinWheel 
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
        className="text-amber-200 hover:text-white hover:bg-green-800"
        disabled={!selectedBet || isSpinning}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Clear Bet
      </Button>
      
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              disabled={!selectedBet || isSpinning}
              className="border-amber-600 bg-green-800/50 hover:bg-green-800 text-amber-200"
            >
              <Settings className="mr-2 h-4 w-4" />
              Bet Options
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-amber-800/50 text-amber-200">
            <DialogHeader>
              <DialogTitle className="text-amber-100">Adjust Bet Amount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
                    className="bg-dark-lighter border-amber-900/30 text-amber-200"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    id="bet-amount" 
                    value={customBetAmount} 
                    onChange={handleCustomBetChange}
                    type="number" 
                    min="1"
                    className="bg-dark-lighter border-amber-900/30 text-amber-100"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      const current = parseInt(customBetAmount) || 0;
                      setCustomBetAmount((current + 10).toString());
                    }}
                    className="bg-dark-lighter border-amber-900/30 text-amber-200"
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
                    className="bg-dark-lighter border-amber-900/30 text-amber-200 hover:bg-amber-900/30"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={applyCustomBet} 
                className="w-full bg-amber-700 hover:bg-amber-600 text-white"
              >
                Apply Bet Amount
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="default" 
          onClick={spinWheel}
          disabled={!selectedBet || isSpinning}
          className={`bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:from-amber-700 hover:to-amber-600 transition-all
                     ${isSpinning ? 'animate-pulse' : ''}`}
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
