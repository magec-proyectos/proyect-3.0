
import { toast } from '@/hooks/use-toast';
import { evaluateBet, getBetOdds } from '@/components/roulette/rouletteUtils';
import { BetType, PlacedBet } from '@/components/roulette/types';
import { v4 as uuidv4 } from 'uuid';

export const useRouletteActions = (state: any) => {
  const {
    selectedBet,
    setSelectedBet,
    placedBets,
    setPlacedBets,
    previousResults,
    setPreviousResults,
    isSpinning,
    setIsSpinning,
    chipAmount,
    setChipAmount,
    betAmount,
    setBetAmount,
    lastSpinResult,
    setLastSpinResult,
    balance,
    setBalance,
    gameStats,
    setGameStats,
    soundEnabled,
    totalBetAmount,
    activeBettingSystem,
    setActiveBettingSystem
  } = state;
  
  const handleSelectBet = (type: BetType, number?: number) => {
    // Play sound effect for better feedback
    if (soundEnabled) {
      const selectSound = new Audio('/select-bet.mp3');
      selectSound.volume = 0.15;
      selectSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    setSelectedBet({ type, number });
    setBetAmount(chipAmount);
  };
  
  const placeBet = () => {
    if (!selectedBet) return;
    
    if (betAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this bet.",
        variant: "destructive",
      });
      return;
    }
    
    const newBet: PlacedBet = {
      id: uuidv4(),
      type: selectedBet.type,
      number: selectedBet.number,
      amount: betAmount,
    };
    
    setPlacedBets(prev => [...prev, newBet]);
    
    // Update balance immediately when placing bet
    setBalance(prev => prev - betAmount);
    
    // Show toast for placed bet
    toast({
      title: "Bet Placed",
      description: `${betAmount} on ${selectedBet.type}${selectedBet.number !== undefined ? ' ' + selectedBet.number : ''}`,
    });
    
    // Play sound effect for better feedback
    if (soundEnabled) {
      const chipSound = new Audio('/chip-place.mp3');
      chipSound.volume = 0.3;
      chipSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const removeBet = (betId: string) => {
    // Find the bet to restore its amount to balance
    const betToRemove = placedBets.find(bet => bet.id === betId);
    if (betToRemove) {
      setBalance(prev => prev + betToRemove.amount);
      
      // Play sound effect for better feedback
      if (soundEnabled) {
        const removeSound = new Audio('/chip-remove.mp3');
        removeSound.volume = 0.2;
        removeSound.play().catch(e => console.log("Audio play failed:", e));
      }
    }
    
    setPlacedBets(prev => prev.filter(bet => bet.id !== betId));
  };
  
  const resetBets = () => {
    // Restore all bet amounts to balance
    const totalAmount = placedBets.reduce((sum, bet) => sum + bet.amount, 0);
    setBalance(prev => prev + totalAmount);
    
    setSelectedBet(null);
    setPlacedBets([]);
    setBetAmount(0);
    
    // Play sound effect for better feedback
    if (soundEnabled) {
      const clearSound = new Audio('/chips-clear.mp3');
      clearSound.volume = 0.2;
      clearSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const increaseChip = () => {
    const newAmount = chipAmount < 50 ? chipAmount + 10 : chipAmount + 50;
    setChipAmount(Math.min(newAmount, 1000));
    if (selectedBet) setBetAmount(Math.min(newAmount, 1000));
    
    // Play sound effect for better feedback
    if (soundEnabled) {
      const clickSound = new Audio('/button-click.mp3');
      clickSound.volume = 0.1;
      clickSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const decreaseChip = () => {
    const newAmount = chipAmount > 50 ? chipAmount - 50 : chipAmount - 10;
    setChipAmount(Math.max(newAmount, 10));
    if (selectedBet) setBetAmount(Math.max(newAmount, 10));
    
    // Play sound effect for better feedback
    if (soundEnabled) {
      const clickSound = new Audio('/button-click.mp3');
      clickSound.volume = 0.1;
      clickSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const updateBetAmount = (amount: number) => {
    setBetAmount(amount);
  };
  
  const updateGameStats = (winningBets: PlacedBet[], losingBets: PlacedBet[]) => {
    setGameStats(prev => {
      const winAmount = winningBets.reduce((total, bet) => total + bet.amount * getBetOdds(bet.type), 0);
      const lossAmount = losingBets.reduce((total, bet) => total + bet.amount, 0);
      
      return {
        wins: prev.wins + (winningBets.length > 0 ? 1 : 0),
        losses: prev.losses + (losingBets.length > 0 ? 1 : 0),
        totalBets: prev.totalBets + placedBets.length,
        totalWinnings: prev.totalWinnings + winAmount,
        totalLosses: prev.totalLosses + lossAmount
      };
    });
    
    // Update balance - note that we already subtracted the bet amounts when placing bets
    setBalance(prev => {
      const winAmount = winningBets.reduce((total, bet) => {
        // The payout is the original bet amount plus the winnings
        const odds = getBetOdds(bet.type);
        return total + (bet.amount * (1 + odds));
      }, 0);
      
      return prev + winAmount;
    });
  };
  
  const spinWheel = () => {
    if (placedBets.length === 0) {
      toast({
        title: "No bets placed",
        description: "Please place at least one bet before spinning the wheel.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Play sound effect
    if (soundEnabled) {
      const audio = new Audio('/wheel-spin.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Simulate wheel spin
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 37); // 0-36 for European roulette
      setLastSpinResult(newResult);
      setPreviousResults([newResult, ...previousResults.slice(0, 9)]); // Keep last 10 results
      setIsSpinning(false);
      
      // Play result sound
      if (soundEnabled) {
        const resultSound = new Audio('/ball-drop.mp3');
        resultSound.volume = 0.5;
        resultSound.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Evaluate all placed bets
      const winningBets: PlacedBet[] = [];
      const losingBets: PlacedBet[] = [];
      
      placedBets.forEach(bet => {
        const isWin = evaluateBet(bet, newResult);
        if (isWin) {
          winningBets.push(bet);
        } else {
          losingBets.push(bet);
        }
      });
      
      // Update statistics
      updateGameStats(winningBets, losingBets);
      
      // Show result toast
      if (winningBets.length > 0) {
        const winAmount = winningBets.reduce((total, bet) => total + (bet.amount * getBetOdds(bet.type)), 0);
        toast({
          title: "You Won!",
          description: `Congratulations! You won $${winAmount}.`,
          variant: "default",
        });
        
        // Play win sound
        if (soundEnabled) {
          const winSound = new Audio('/win-cheer.mp3');
          winSound.volume = 0.3;
          winSound.play().catch(e => console.log("Audio play failed:", e));
        }
      } else {
        const lossAmount = losingBets.reduce((total, bet) => total + bet.amount, 0);
        toast({
          title: "You Lost",
          description: `Better luck next time. You lost $${lossAmount}.`,
          variant: "destructive",
        });
      }
      
      // Clear placed bets after spin
      setPlacedBets([]);
      
      // Apply betting system if active
      if (activeBettingSystem) {
        if (activeBettingSystem === 'martingale' && losingBets.length > 0) {
          // Double bet amount after loss
          const newAmount = Math.min(chipAmount * 2, balance);
          if (newAmount <= balance) {
            setChipAmount(newAmount);
            toast({
              title: "Martingale System",
              description: `Bet amount doubled to $${newAmount} after loss.`,
            });
          } else {
            toast({
              title: "Martingale System",
              description: "Cannot double bet - insufficient funds.",
              variant: "destructive"
            });
          }
        } else if (activeBettingSystem === 'dalembert' && losingBets.length > 0) {
          // Increase bet by 1 unit after loss
          const unit = 10;
          const newAmount = Math.min(chipAmount + unit, balance);
          setChipAmount(newAmount);
          toast({
            title: "D'Alembert System",
            description: `Bet amount increased to $${newAmount} after loss.`,
          });
        } else if (activeBettingSystem === 'dalembert' && winningBets.length > 0) {
          // Decrease bet by 1 unit after win
          const unit = 10;
          const newAmount = Math.max(chipAmount - unit, unit);
          setChipAmount(newAmount);
          toast({
            title: "D'Alembert System",
            description: `Bet amount decreased to $${newAmount} after win.`,
          });
        } else if (activeBettingSystem === 'fibonacci' && losingBets.length > 0) {
          // Get next Fibonacci number in sequence
          // We'll use a simplified approach to calculate the next number
          const fibonacci = [10, 10, 20, 30, 50, 80, 130, 210, 340, 550, 890];
          const currentIndex = fibonacci.indexOf(chipAmount);
          if (currentIndex >= 0 && currentIndex < fibonacci.length - 1) {
            const newAmount = fibonacci[currentIndex + 1];
            if (newAmount <= balance) {
              setChipAmount(newAmount);
              toast({
                title: "Fibonacci System",
                description: `Bet amount increased to $${newAmount} after loss.`,
              });
            }
          }
        } else if (activeBettingSystem === 'fibonacci' && winningBets.length > 0) {
          // Go back two steps in Fibonacci sequence after a win
          const fibonacci = [10, 10, 20, 30, 50, 80, 130, 210, 340, 550, 890];
          const currentIndex = fibonacci.indexOf(chipAmount);
          if (currentIndex >= 2) {
            const newAmount = fibonacci[currentIndex - 2];
            setChipAmount(newAmount);
            toast({
              title: "Fibonacci System",
              description: `Bet amount decreased to $${newAmount} after win.`,
            });
          }
        }
      }
    }, 3000); // 3 seconds animation
  };
  
  return {
    handleSelectBet,
    placeBet,
    removeBet,
    resetBets,
    increaseChip,
    decreaseChip,
    updateBetAmount,
    spinWheel
  };
};
