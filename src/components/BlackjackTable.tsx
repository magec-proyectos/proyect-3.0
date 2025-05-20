
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Minus, RefreshCcw, HelpCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type PlayingCard = { value: CardValue; suit: CardSuit; id: string };

const cardValues: CardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cardSuits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

const getCardColor = (suit: CardSuit) => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-white';
};

const getCardSymbol = (suit: CardSuit) => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
    default: return '';
  }
};

const calculateHandValue = (cards: PlayingCard[]) => {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.value === 'A') {
      aces++;
      value += 11;
    } else if (['K', 'Q', 'J', '10'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }

  // Adjust for aces
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
};

const PlayingCardComponent = ({ 
  card, 
  size = 'medium',
  isNew = false,
  isRemoved = false,
  onClick = () => {}
}: { 
  card: PlayingCard; 
  size?: 'small' | 'medium' | 'large';
  isNew?: boolean;
  isRemoved?: boolean;
  onClick?: () => void;
}) => {
  const color = getCardColor(card.suit);
  const symbol = getCardSymbol(card.suit);
  
  const cardSizeClasses = {
    small: 'w-8 h-12',
    medium: 'w-16 h-24',
    large: 'w-20 h-32'
  };
  
  const valueSizeClasses = {
    small: 'text-xs',
    medium: 'text-base',
    large: 'text-lg'
  };
  
  const symbolSizeClasses = {
    small: 'text-lg',
    medium: 'text-4xl',
    large: 'text-5xl'
  };
  
  return (
    <motion.div
      layout
      initial={isNew ? { scale: 0.5, opacity: 0, rotateY: -90 } : false}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={isRemoved ? { scale: 0.5, opacity: 0, rotateY: 90 } : undefined}
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${cardSizeClasses[size]} bg-white rounded-md shadow-lg flex flex-col items-center justify-center relative cursor-pointer transform`}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`absolute top-1 left-2 ${color} ${valueSizeClasses[size]} font-bold`}>
        {card.value}
      </div>
      <div className={`${color} ${symbolSizeClasses[size]} font-bold`}>
        {symbol}
      </div>
      <div className={`absolute bottom-1 right-2 ${color} ${valueSizeClasses[size]} font-bold rotate-180`}>
        {card.value}
      </div>
    </motion.div>
  );
};

const BlackjackTable = () => {
  const [playerCards, setPlayerCards] = useState<PlayingCard[]>([
    { value: 'A', suit: 'hearts', id: 'p1' },
    { value: '7', suit: 'clubs', id: 'p2' }
  ]);
  
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>([
    { value: '10', suit: 'diamonds', id: 'd1' }
  ]);
  
  const [selectedCard, setSelectedCard] = useState<CardValue>('A');
  const [selectedSuit, setSelectedSuit] = useState<CardSuit>('hearts');
  const [removingCard, setRemovingCard] = useState<string | null>(null);
  
  // Decision and probabilities based on basic strategy
  const getRecommendation = () => {
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    
    // Check for blackjack
    if (playerCards.length === 2 && playerValue === 21) {
      return { 
        action: "BLACKJACK", 
        explanation: "You have Blackjack! You win 3:2 unless dealer also has blackjack.",
        probability: "100%"
      };
    }
    
    // Basic strategy simplified
    if (playerValue === 21) {
      return { 
        action: "STAND", 
        explanation: "You have 21. Stand and take the win!",
        probability: "100%"
      };
    } else if (playerValue > 21) {
      return { 
        action: "BUST", 
        explanation: "Your hand exceeds 21. You lose this round.",
        probability: "0%"
      };
    }
    
    // Hard hands
    const isHard = !playerCards.some(card => card.value === 'A') || playerValue <= 11;
    
    if (isHard) {
      if (playerValue >= 17) {
        return { 
          action: "STAND", 
          explanation: "Your hard hand is strong. Stand.",
          probability: `${Math.round(100 - (dealerValue * 4))}%`
        };
      } else if (playerValue >= 13 && dealerValue <= 6) {
        return { 
          action: "STAND", 
          explanation: "Dealer showing weak card. Stand and let dealer potentially bust.",
          probability: `${Math.round(65 - (dealerValue * 2))}%`
        };
      } else if (playerValue === 12 && dealerValue >= 4 && dealerValue <= 6) {
        return { 
          action: "STAND", 
          explanation: "Dealer likely to bust with 4-6. Stand with your 12.",
          probability: "55%"
        };
      } else if (playerValue === 11) {
        return { 
          action: "DOUBLE", 
          explanation: "Perfect double down situation with 11.",
          probability: "65%"
        };
      } else if (playerValue === 10 && dealerValue <= 9) {
        return { 
          action: "DOUBLE", 
          explanation: "Good double down opportunity with 10.",
          probability: "60%"
        };
      } else if (playerValue === 9 && dealerValue >= 3 && dealerValue <= 6) {
        return { 
          action: "DOUBLE", 
          explanation: "Consider doubling with 9 against dealer's 3-6.",
          probability: "50%"
        };
      } else {
        return { 
          action: "HIT", 
          explanation: "Your hand is weak. Take another card.",
          probability: `${Math.round(50 - (Math.abs(17 - playerValue) * 5))}%`
        };
      }
    } 
    // Soft hands (with Ace counted as 11)
    else {
      if (playerValue >= 19) {
        return { 
          action: "STAND", 
          explanation: "Strong soft hand. Stand.",
          probability: "75%"
        };
      } else if (playerValue === 18 && dealerValue >= 2 && dealerValue <= 8) {
        return { 
          action: "STAND", 
          explanation: "Stand with soft 18 against dealer's 2-8.",
          probability: "65%"
        };
      } else if (playerValue === 18 && (dealerValue === 9 || dealerValue === 10 || dealerValue === 1)) {
        return { 
          action: "HIT", 
          explanation: "Hit soft 18 against dealer's strong card.",
          probability: "40%"
        };
      } else if (playerValue === 17 && dealerValue >= 3 && dealerValue <= 6) {
        return { 
          action: "DOUBLE", 
          explanation: "Double soft 17 against dealer's 3-6.",
          probability: "55%"
        };
      } else {
        return { 
          action: "HIT", 
          explanation: "Improve your soft hand with another card.",
          probability: "60%"
        };
      }
    }
  };
  
  const addCardToPlayer = () => {
    const newCard = { 
      value: selectedCard, 
      suit: selectedSuit,
      id: `p${playerCards.length + 1}-${Date.now()}` 
    };
    setPlayerCards(prev => [...prev, newCard]);
  };
  
  const addCardToDealer = () => {
    const newCard = { 
      value: selectedCard, 
      suit: selectedSuit,
      id: `d${dealerCards.length + 1}-${Date.now()}` 
    };
    setDealerCards(prev => [...prev, newCard]);
  };
  
  const removeCard = (type: 'player' | 'dealer', id: string) => {
    setRemovingCard(id);
    
    setTimeout(() => {
      if (type === 'player') {
        setPlayerCards(prev => prev.filter(card => card.id !== id));
      } else {
        setDealerCards(prev => prev.filter(card => card.id !== id));
      }
      setRemovingCard(null);
    }, 300);
  };
  
  const resetHands = () => {
    setPlayerCards([]);
    setDealerCards([]);
  };
  
  const recommendation = getRecommendation();
  const playerValue = calculateHandValue(playerCards);
  const dealerValue = calculateHandValue(dealerCards);
  
  // Get background color based on recommendation
  const getRecommendationColor = () => {
    if (recommendation.action === "BLACKJACK") return "bg-purple-500/20 border-purple-500";
    if (recommendation.action === "STAND") return "bg-blue-500/20 border-blue-500";
    if (recommendation.action === "HIT") return "bg-amber-500/20 border-amber-500";
    if (recommendation.action === "DOUBLE") return "bg-green-500/20 border-green-500";
    if (recommendation.action === "BUST") return "bg-red-500/20 border-red-500";
    return "bg-dark-lighter border-dark-border";
  };
  
  // Animation variants
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  return (
    <Card className="bg-dark-card border-dark-border overflow-hidden">
      <CardHeader className="relative z-10">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Blackjack Hand Advisor</span>
          <Badge variant="outline" className="bg-dark/30 text-neon-blue border-neon-blue/50">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Table background with enhanced visuals */}
        <div className="absolute inset-0 casino-felt overflow-hidden rounded-md -z-10">
          <div className="absolute w-full h-full bg-gradient-to-b from-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_70%)]"></div>
        </div>
        
        <div className="space-y-8 py-4">
          {/* Dealer's hand */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300 flex items-center">
                <span className="text-neon-blue mr-1">⬤</span> Dealer's Hand
              </h3>
              <Badge variant="outline" className="bg-dark/50 text-white border-gray-700">
                {dealerValue}
              </Badge>
            </div>
            
            <motion.div 
              className="flex gap-3 flex-wrap"
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {dealerCards.map((card) => (
                  <PlayingCardComponent 
                    key={card.id} 
                    card={card} 
                    isNew={false}
                    isRemoved={removingCard === card.id}
                    onClick={() => removeCard('dealer', card.id)} 
                  />
                ))}
              </AnimatePresence>
              
              {dealerCards.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,240,255,0.3)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Button 
                    size="icon" 
                    variant="outline"
                    className="h-24 w-16 border-dashed border-white/30 hover:border-neon-blue/50 bg-dark/40"
                    onClick={addCardToDealer}
                  >
                    <Plus className="h-6 w-6 text-gray-400 group-hover:text-white" />
                  </Button>
                </motion.div>
              )}
              
              {dealerCards.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-24 w-full"
                >
                  <p className="text-gray-400 text-sm">Add dealer's visible card</p>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Player's hand */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300 flex items-center">
                <span className="text-neon-lime mr-1">⬤</span> Your Hand
              </h3>
              <Badge variant="outline" className="bg-dark/50 text-white border-gray-700">
                {playerValue}
              </Badge>
            </div>
            
            <motion.div 
              className="flex gap-3 flex-wrap"
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {playerCards.map((card) => (
                  <PlayingCardComponent 
                    key={card.id} 
                    card={card} 
                    isNew={false}
                    isRemoved={removingCard === card.id}
                    onClick={() => removeCard('player', card.id)} 
                  />
                ))}
              </AnimatePresence>
              
              {playerCards.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(170,255,0,0.3)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Button 
                    size="icon" 
                    variant="outline"
                    className="h-24 w-16 border-dashed border-white/30 hover:border-neon-lime/50 bg-dark/40"
                    onClick={addCardToPlayer}
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                  </Button>
                </motion.div>
              )}
              
              {playerCards.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-24 w-full"
                >
                  <p className="text-gray-400 text-sm">Add your cards</p>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Card selector with improved visuals */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Card Value</label>
              <Select 
                value={selectedCard} 
                onValueChange={(value) => setSelectedCard(value as CardValue)}
              >
                <SelectTrigger className="bg-dark-lighter border-dark-border">
                  <SelectValue placeholder="Select card" />
                </SelectTrigger>
                <SelectContent className="bg-dark-lighter border-dark-border">
                  {cardValues.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Card Suit</label>
              <Select 
                value={selectedSuit} 
                onValueChange={(value) => setSelectedSuit(value as CardSuit)}
              >
                <SelectTrigger className="bg-dark-lighter border-dark-border">
                  <SelectValue placeholder="Select suit" />
                </SelectTrigger>
                <SelectContent className="bg-dark-lighter border-dark-border">
                  {cardSuits.map((suit) => (
                    <SelectItem key={suit} value={suit}>
                      <span className={getCardColor(suit)}>
                        {getCardSymbol(suit)} {suit}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Enhanced Recommendation Box */}
          {(playerCards.length > 0 && dealerCards.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className={`${getRecommendationColor()} p-4 rounded-lg border-l-4 mt-6 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_70%)]"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-neon-blue text-black">AI ADVICE</Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Based on mathematical probabilities and basic strategy. This is advisory only.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Badge variant="outline" className="ml-auto border-white/20 bg-dark/40">
                    Win Probability: {recommendation.probability}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{recommendation.action}</div>
                <p className="text-sm text-gray-300">{recommendation.explanation}</p>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between border-t border-dark-border">
        <Button 
          variant="ghost" 
          onClick={resetHands} 
          className="text-gray-400 hover:text-white"
          disabled={playerCards.length === 0 && dealerCards.length === 0}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs">
                Click on cards to remove them. Use the + button to add new cards with your selected value and suit.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              if (playerCards.length > 0) {
                removeCard('player', playerCards[playerCards.length - 1].id);
              }
            }}
            disabled={playerCards.length === 0}
            className="text-sm"
          >
            <Minus className="mr-2 h-4 w-4" />
            Remove Player Card
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              if (dealerCards.length > 0) {
                removeCard('dealer', dealerCards[dealerCards.length - 1].id);
              }
            }}
            disabled={dealerCards.length === 0}
            className="text-sm"
          >
            <Minus className="mr-2 h-4 w-4" />
            Remove Dealer Card
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlackjackTable;
