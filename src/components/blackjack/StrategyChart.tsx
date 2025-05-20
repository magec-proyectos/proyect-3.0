
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Chart legend components
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 ${color} rounded mr-1`}></div>
    <span className="text-gray-300 text-sm">{label}</span>
  </div>
);

const StrategyChart = () => {
  const [handType, setHandType] = useState('hard');
  
  // Generate the chart data based on basic strategy
  const generateChart = () => {
    const dealerCards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'A'];
    let playerRows: string[] = [];
    
    switch (handType) {
      case 'hard':
        playerRows = ['20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5'];
        break;
      case 'soft':
        playerRows = ['A,9', 'A,8', 'A,7', 'A,6', 'A,5', 'A,4', 'A,3', 'A,2'];
        break;
      case 'pairs':
        playerRows = ['A,A', 'T,T', '9,9', '8,8', '7,7', '6,6', '5,5', '4,4', '3,3', '2,2'];
        break;
    }
    
    return { dealerCards, playerRows };
  };
  
  const { dealerCards, playerRows } = generateChart();
  
  // Determine action for a specific hand based on basic strategy
  const getAction = (playerHand: string, dealerCard: string): { action: string; color: string } => {
    // This is a simplified version of basic strategy
    // A more comprehensive implementation would use proper strategy tables
    
    if (handType === 'hard') {
      const playerValue = parseInt(playerHand);
      
      if (playerValue >= 17) return { action: 'S', color: 'bg-blue-500/70' };
      if (playerValue === 11) return { action: 'D', color: 'bg-green-500/70' };
      if (playerValue >= 13 && ['2', '3', '4', '5', '6'].includes(dealerCard)) {
        return { action: 'S', color: 'bg-blue-500/70' };
      }
      if (playerValue === 12 && ['4', '5', '6'].includes(dealerCard)) {
        return { action: 'S', color: 'bg-blue-500/70' };
      }
      if (playerValue === 10 && ['2', '3', '4', '5', '6', '7', '8', '9'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (playerValue === 9 && ['3', '4', '5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      return { action: 'H', color: 'bg-red-500/70' };
    }
    
    if (handType === 'soft') {
      const [_, secondCard] = playerHand.split(',');
      const secondValue = secondCard === 'A' ? 1 : parseInt(secondCard);
      
      if (secondValue >= 8) return { action: 'S', color: 'bg-blue-500/70' };
      if (secondValue === 7 && ['2', '3', '4', '5', '6'].includes(dealerCard)) {
        return { action: 'Ds', color: 'bg-purple-500/70' };
      }
      if (secondValue === 7 && ['7', '8'].includes(dealerCard)) {
        return { action: 'S', color: 'bg-blue-500/70' };
      }
      if (secondValue === 6 && ['3', '4', '5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (secondValue === 5 && ['4', '5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (secondValue === 4 && ['5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (secondValue === 3 && ['5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (secondValue === 2 && ['5', '6'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      return { action: 'H', color: 'bg-red-500/70' };
    }
    
    if (handType === 'pairs') {
      const [card] = playerHand.split(',');
      
      if (card === 'A') return { action: 'SP', color: 'bg-yellow-500/70' };
      if (card === 'T') return { action: 'S', color: 'bg-blue-500/70' };
      if (card === '9' && ['2', '3', '4', '5', '6', '8', '9'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      if (card === '8') return { action: 'SP', color: 'bg-yellow-500/70' };
      if (card === '7' && ['2', '3', '4', '5', '6', '7'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      if (card === '6' && ['2', '3', '4', '5', '6'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      if (card === '5' && ['2', '3', '4', '5', '6', '7', '8', '9'].includes(dealerCard)) {
        return { action: 'D', color: 'bg-green-500/70' };
      }
      if (card === '4' && ['5', '6'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      if (card === '3' && ['2', '3', '4', '5', '6', '7'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      if (card === '2' && ['2', '3', '4', '5', '6', '7'].includes(dealerCard)) {
        return { action: 'SP', color: 'bg-yellow-500/70' };
      }
      
      if (card === '5' && dealerCard === 'T') return { action: 'H', color: 'bg-red-500/70' };
      if (card === '5') return { action: 'D', color: 'bg-green-500/70' };
      if (card === 'T') return { action: 'S', color: 'bg-blue-500/70' };
      return { action: 'H', color: 'bg-red-500/70' };
    }
    
    return { action: 'H', color: 'bg-red-500/70' };
  };
  
  const chartMotion = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const cellMotion = {
    initial: { scale: 1 },
    hover: { scale: 1.1, boxShadow: '0 0 10px rgba(255,255,255,0.2)' }
  };

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Basic Strategy Chart</span>
          <Badge variant="outline" className="ml-2 bg-neon-blue/10 text-neon-blue">Interactive</Badge>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Learn optimal plays for any blackjack hand
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <ToggleGroup type="single" value={handType} onValueChange={(value) => value && setHandType(value)} className="justify-center">
            <ToggleGroupItem value="hard" className="text-sm">Hard Hands</ToggleGroupItem>
            <ToggleGroupItem value="soft" className="text-sm">Soft Hands</ToggleGroupItem>
            <ToggleGroupItem value="pairs" className="text-sm">Pairs</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <motion.div 
          key={handType}
          variants={chartMotion}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto"
        >
          <div className="grid grid-cols-11 gap-1 min-w-[600px]">
            {/* Chart header */}
            <div className="p-2 text-center font-bold bg-dark-lighter">
              {handType === 'hard' ? 'Hard' : handType === 'soft' ? 'Soft' : 'Pairs'}
            </div>
            
            {/* Dealer cards */}
            {dealerCards.map(card => (
              <div key={card} className="p-2 text-center font-bold bg-dark-lighter">
                {card}
              </div>
            ))}
            
            {/* Player hands and actions */}
            {playerRows.map(playerHand => (
              <React.Fragment key={playerHand}>
                <div className="p-2 text-center font-bold bg-dark-lighter">
                  {playerHand}
                </div>
                
                {dealerCards.map(dealerCard => {
                  const { action, color } = getAction(playerHand, dealerCard);
                  return (
                    <motion.div
                      key={`${playerHand}-${dealerCard}`}
                      variants={cellMotion}
                      initial="initial"
                      whileHover="hover"
                      className={`p-2 text-center ${color} cursor-help`}
                      title={`Player: ${playerHand}, Dealer: ${dealerCard}`}
                    >
                      {action}
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <LegendItem color="bg-red-500/70" label="Hit (H)" />
          <LegendItem color="bg-blue-500/70" label="Stand (S)" />
          <LegendItem color="bg-green-500/70" label="Double (D)" />
          <LegendItem color="bg-yellow-500/70" label="Split (SP)" />
          <LegendItem color="bg-purple-500/70" label="Double/Stand (Ds)" />
        </div>
        
        <div className="mt-6 text-sm text-gray-400">
          <p><strong className="text-white">How to use:</strong> Find your hand value in the left column, then follow across to the dealer's upcard to determine the optimal play.</p>
          <p className="mt-2"><strong className="text-white">Note:</strong> This chart follows standard basic strategy. House rules variations may require slight adjustments.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyChart;
