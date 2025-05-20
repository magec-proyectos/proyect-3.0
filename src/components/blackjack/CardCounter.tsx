
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, RefreshCcw } from 'lucide-react';

type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
type CountingSystem = 'hi-lo' | 'hi-opt-1' | 'ko' | 'omega-2' | 'red-7';

const cardValues: CardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

interface CountingSystemInfo {
  name: string;
  values: Record<CardValue, number>;
  description: string;
}

const countingSystems: Record<CountingSystem, CountingSystemInfo> = {
  'hi-lo': {
    name: 'Hi-Lo',
    values: {
      '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
      '7': 0, '8': 0, '9': 0,
      '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1
    },
    description: 'The most popular counting system. +1 for 2-6, 0 for 7-9, -1 for 10-A.'
  },
  'hi-opt-1': {
    name: 'Hi-Opt I',
    values: {
      '2': 0, '3': 1, '4': 1, '5': 1, '6': 1,
      '7': 0, '8': 0, '9': 0,
      '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': 0
    },
    description: 'More advanced than Hi-Lo. Doesn\'t count 2s or Aces.'
  },
  'ko': {
    name: 'KO (Knockout)',
    values: {
      '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1,
      '8': 0, '9': 0,
      '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1
    },
    description: 'Unbalanced system. Easier to use as it doesn\'t require a true count conversion.'
  },
  'omega-2': {
    name: 'Omega II',
    values: {
      '2': 1, '3': 1, '4': 2, '5': 2, '6': 2,
      '7': 1, '8': 0, '9': -1,
      '10': -2, 'J': -2, 'Q': -2, 'K': -2, 'A': 0
    },
    description: 'Advanced multilevel system with higher betting correlation.'
  },
  'red-7': {
    name: 'Red 7',
    values: {
      '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
      '7': 0.5, '8': 0, '9': 0,
      '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1
    },
    description: 'Count red 7s as +1, black 7s as 0. (Simplified to +0.5 for all 7s here.)'
  }
};

const CardCounter = () => {
  const [runningCount, setRunningCount] = useState(0);
  const [decksRemaining, setDecksRemaining] = useState(6);
  const [totalDecks, setTotalDecks] = useState(6);
  const [selectedSystem, setSelectedSystem] = useState<CountingSystem>('hi-lo');
  const [recentCards, setRecentCards] = useState<CardValue[]>([]);
  
  const handleCardClick = (card: CardValue) => {
    const countValue = countingSystems[selectedSystem].values[card];
    setRunningCount(prev => prev + countValue);
    setRecentCards(prev => [card, ...prev].slice(0, 10));
  };
  
  const resetCount = () => {
    setRunningCount(0);
    setRecentCards([]);
    setDecksRemaining(totalDecks);
  };
  
  const calculateTrueCount = () => {
    if (decksRemaining <= 0) return 0;
    const trueCount = runningCount / decksRemaining;
    return Math.round(trueCount * 10) / 10; // Round to 1 decimal place
  };
  
  const getCountColor = () => {
    const trueCount = calculateTrueCount();
    if (trueCount >= 2) return 'text-green-500';
    if (trueCount <= -2) return 'text-red-500';
    return 'text-white';
  };
  
  const getBettingAdvice = () => {
    const trueCount = calculateTrueCount();
    
    if (trueCount >= 3) return { text: 'Bet 3-4x your base bet', color: 'text-green-500' };
    if (trueCount >= 2) return { text: 'Bet 2x your base bet', color: 'text-green-400' };
    if (trueCount >= 1) return { text: 'Bet 1.5x your base bet', color: 'text-green-300' };
    if (trueCount > -1) return { text: 'Bet your base bet', color: 'text-gray-400' };
    return { text: 'Minimize your bet', color: 'text-red-500' };
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Card Counting Tool</span>
          <Badge variant="outline" className="bg-dark-lighter">Practice Mode</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="counter">
          <TabsList className="mb-4">
            <TabsTrigger value="counter">Counter</TabsTrigger>
            <TabsTrigger value="systems">Counting Systems</TabsTrigger>
          </TabsList>
          
          <TabsContent value="counter">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Counting System</label>
                  <Select 
                    value={selectedSystem} 
                    onValueChange={(value) => setSelectedSystem(value as CountingSystem)}
                  >
                    <SelectTrigger className="bg-dark-lighter border-dark-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-lighter border-dark-border">
                      {(Object.keys(countingSystems) as CountingSystem[]).map(system => (
                        <SelectItem key={system} value={system}>
                          {countingSystems[system].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Number of Decks</label>
                  <Select 
                    value={totalDecks.toString()} 
                    onValueChange={(value) => {
                      const newValue = parseInt(value);
                      setTotalDecks(newValue);
                      setDecksRemaining(newValue);
                    }}
                  >
                    <SelectTrigger className="bg-dark-lighter border-dark-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-lighter border-dark-border">
                      {[1, 2, 4, 6, 8].map(deck => (
                        <SelectItem key={deck} value={deck.toString()}>
                          {deck} {deck === 1 ? 'Deck' : 'Decks'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-dark-lighter p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-400">Running Count</div>
                    <div className={`text-3xl font-bold ${getCountColor()}`}>{runningCount}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">True Count</div>
                    <div className={`text-3xl font-bold ${getCountColor()}`}>{calculateTrueCount()}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">Decks Remaining</div>
                    <div className="relative">
                      <div className="text-3xl font-bold">{decksRemaining}</div>
                      <div className="absolute top-0 right-0 flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-5 w-5" 
                          onClick={() => setDecksRemaining(prev => Math.min(prev + 0.5, totalDecks))}
                        >
                          <Plus size={12} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-5 w-5" 
                          onClick={() => setDecksRemaining(prev => Math.max(prev - 0.5, 0))}
                        >
                          <Minus size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-center">
                  <div className="text-sm text-gray-400">Recommended Bet</div>
                  <div className={`text-xl font-semibold ${getBettingAdvice().color}`}>{getBettingAdvice().text}</div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="text-sm text-gray-400 mb-2 block">Select Cards as They Appear</label>
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {cardValues.map(card => (
                    <Button
                      key={card}
                      variant="outline"
                      className="h-12 md:h-16 bg-dark-lighter border-dark-border hover:bg-dark hover:border-neon-blue/50 hover:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all duration-300"
                      onClick={() => handleCardClick(card)}
                    >
                      {card}
                      <span className="text-xs absolute top-1 right-1">
                        {countingSystems[selectedSystem].values[card] > 0 && '+'}
                        {countingSystems[selectedSystem].values[card]}
                      </span>
                    </Button>
                  ))}
                </div>
              </motion.div>
              
              {recentCards.length > 0 && (
                <motion.div variants={itemVariants} className="border-t border-dark-border pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Recent Cards</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs text-gray-400"
                      onClick={resetCount}
                    >
                      <RefreshCcw size={14} className="mr-1" />
                      Reset Count
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentCards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-8 h-10 bg-dark-card border border-dark-border rounded flex items-center justify-center"
                      >
                        {card}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="systems">
            <div className="space-y-4">
              {(Object.keys(countingSystems) as CountingSystem[]).map(system => (
                <motion.div 
                  key={system}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-dark-border rounded-lg p-4"
                >
                  <h3 className="text-lg font-medium mb-2">{countingSystems[system].name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{countingSystems[system].description}</p>
                  
                  <div className="grid grid-cols-13 gap-1 mt-3">
                    {cardValues.map(card => (
                      <div key={card} className="text-center">
                        <div className="text-xs text-gray-400">{card}</div>
                        <div className={`font-bold ${countingSystems[system].values[card] > 0 ? 'text-green-500' : countingSystems[system].values[card] < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {countingSystems[system].values[card] > 0 && '+'}
                          {countingSystems[system].values[card]}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t border-dark-border pt-4 text-xs text-gray-500">
        For educational and entertainment purposes only. Card counting may be prohibited in casinos.
      </CardFooter>
    </Card>
  );
};

export default CardCounter;
