
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { Prediction } from '@/types/football';

interface BetBuilderProps {
  prediction: Prediction;
  user: any;
  showBetPlaced: boolean;
  setShowBetPlaced: (value: boolean) => void;
}

const BetBuilder: React.FC<BetBuilderProps> = ({
  prediction,
  user,
  showBetPlaced,
  setShowBetPlaced
}) => {
  const handlePlaceBet = () => {
    if (!user) {
      toast.error('Please log in to place bets', {
        description: 'Create an account or log in to continue'
      });
      return;
    }
    
    setShowBetPlaced(true);
    toast.success('Bet placed successfully!', {
      description: 'Your bet has been placed. Good luck!'
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowBetPlaced(false);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-effect border-dark-border p-6 rounded-xl border shadow-lg shadow-neon-blue/5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold gradient-text">Bet Builder</h2>
        <Button variant="outline" size="sm">
          Advanced Mode
        </Button>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-400">
          Select from our AI recommendations to build your bet:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prediction.bets.map((bet, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-dark p-4 rounded-lg border border-dark-border hover:border-neon-blue/50 transition-colors cursor-pointer"
            >
              <div className="text-sm text-gray-400">{bet.type}</div>
              <div className="font-semibold">{bet.pick}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-neon-blue">@{bet.odds}</span>
                <span className="text-xs bg-dark-lighter px-2 py-1 rounded">
                  {bet.confidence}% Confidence
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-dark-card p-4 rounded-lg mt-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-400">Potential Return:</span>
              <span className="text-xl font-bold ml-2">$125.40</span>
            </div>
            <Button 
              className={`${showBetPlaced ? 'bg-green-500' : 'bg-neon-lime'} text-black hover:bg-neon-lime/90 transition-colors`}
              onClick={handlePlaceBet}
            >
              {showBetPlaced ? 'Bet Placed!' : 'Place Bet'}
            </Button>
          </div>
        </div>
        
        <div className="flex p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg items-start mt-4">
          <div className="text-sm text-neon-blue">
            <p><strong>AI Insight:</strong> Based on our analysis, combining these three bets offers the best value. Liverpool's strong home record and United's recent defensive struggles make a home win with both teams scoring the most probable outcome.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BetBuilder;
