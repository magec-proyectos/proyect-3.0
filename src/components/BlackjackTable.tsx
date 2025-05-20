
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Minus, RefreshCcw, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type PlayingCard = { value: CardValue; suit: CardSuit };

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

const PlayingCardComponent = ({ card, size = 'medium' }: { card: PlayingCard; size?: 'small' | 'medium' | 'large' }) => {
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
    <div className={`${cardSizeClasses[size]} bg-white rounded-md shadow-md flex flex-col items-center justify-center relative`}>
      <div className={`absolute top-1 left-2 ${color} ${valueSizeClasses[size]} font-bold`}>
        {card.value}
      </div>
      <div className={`${color} ${symbolSizeClasses[size]} font-bold`}>
        {symbol}
      </div>
      <div className={`absolute bottom-1 right-2 ${color} ${valueSizeClasses[size]} font-bold rotate-180`}>
        {card.value}
      </div>
    </div>
  );
};

const BlackjackTable = () => {
  const [playerCards, setPlayerCards] = useState<PlayingCard[]>([
    { value: 'A', suit: 'hearts' },
    { value: '7', suit: 'clubs' }
  ]);
  
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>([
    { value: '10', suit: 'diamonds' }
  ]);
  
  const [selectedCard, setSelectedCard] = useState<CardValue>('A');
  const [selectedSuit, setSelectedSuit] = useState<CardSuit>('hearts');
  
  // Decision and probabilities based on basic strategy
  const getRecommendation = () => {
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    
    // Very simplified basic strategy example
    if (playerValue === 21) {
      return { action: "STAND", explanation: "You have Blackjack!" };
    } else if (playerValue >= 17) {
      return { action: "STAND", explanation: "Your hand is strong. Stand." };
    } else if (playerValue >= 12 && dealerValue >= 7) {
      return { action: "HIT", explanation: "Dealer showing strong card. Hit." };
    } else if (playerValue >= 12 && dealerValue <= 6) {
      return { action: "STAND", explanation: "Dealer likely to bust. Stand." };
    } else {
      return { action: "HIT", explanation: "Your hand is weak. Hit." };
    }
  };
  
  const addCardToPlayer = () => {
    setPlayerCards([...playerCards, { value: selectedCard, suit: selectedSuit }]);
  };
  
  const addCardToDealer = () => {
    setDealerCards([...dealerCards, { value: selectedCard, suit: selectedSuit }]);
  };
  
  const resetHands = () => {
    setPlayerCards([]);
    setDealerCards([]);
  };
  
  const recommendation = getRecommendation();
  const playerValue = calculateHandValue(playerCards);
  const dealerValue = calculateHandValue(dealerCards);
  
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="text-lg">Blackjack Advisor</CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Table background */}
        <div className="absolute inset-0 bg-green-900/30 rounded-md -z-10"></div>
        
        <div className="space-y-8 py-4">
          {/* Dealer's hand */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300">Dealer's Hand</h3>
              <Badge variant="outline" className="bg-dark/50">{dealerValue}</Badge>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              {dealerCards.map((card, index) => (
                <PlayingCardComponent key={index} card={card} />
              ))}
              
              {dealerCards.length > 0 && (
                <Button 
                  size="icon" 
                  variant="outline"
                  className="h-24 w-16 border-dashed border-white/20"
                  onClick={addCardToDealer}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                </Button>
              )}
              
              {dealerCards.length === 0 && (
                <div className="flex items-center justify-center h-24 w-full">
                  <p className="text-gray-400 text-sm">Add dealer's visible card</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Player's hand */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300">Your Hand</h3>
              <Badge variant="outline" className="bg-dark/50">{playerValue}</Badge>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              {playerCards.map((card, index) => (
                <PlayingCardComponent key={index} card={card} />
              ))}
              
              {playerCards.length > 0 && (
                <Button 
                  size="icon" 
                  variant="outline"
                  className="h-24 w-16 border-dashed border-white/20"
                  onClick={addCardToPlayer}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                </Button>
              )}
              
              {playerCards.length === 0 && (
                <div className="flex items-center justify-center h-24 w-full">
                  <p className="text-gray-400 text-sm">Add your cards</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Card selector */}
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
          
          {/* Recommendation Box */}
          {(playerCards.length > 0 && dealerCards.length > 0) && (
            <div className="bg-dark-lighter p-4 rounded-lg border-l-4 border-neon-blue mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-neon-blue text-black">AI ADVICE</Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Based on mathematical probabilities and basic strategy. This is advisory only.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-2xl font-bold mb-1">{recommendation.action}</div>
              <p className="text-sm text-gray-400">{recommendation.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Button 
          variant="ghost" 
          onClick={resetHands} 
          className="text-gray-400 hover:text-white"
          disabled={playerCards.length === 0 && dealerCards.length === 0}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              if (playerCards.length > 0) {
                setPlayerCards(playerCards.slice(0, -1));
              }
            }}
            disabled={playerCards.length === 0}
          >
            <Minus className="mr-2 h-4 w-4" />
            Remove Player Card
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              if (dealerCards.length > 0) {
                setDealerCards(dealerCards.slice(0, -1));
              }
            }}
            disabled={dealerCards.length === 0}
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
