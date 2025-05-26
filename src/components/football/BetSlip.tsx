
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Download, Copy, Trash2, Plus, Minus, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BetSlipItem {
  id: string;
  match: string;
  selection: string;
  odds: number;
  stake: number;
}

const BetSlip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [betSlipItems, setBetSlipItems] = useState<BetSlipItem[]>([
    {
      id: '1',
      match: 'Liverpool vs Manchester United',
      selection: 'Liverpool Win',
      odds: 1.85,
      stake: 10
    },
    {
      id: '2',
      match: 'Barcelona vs Real Madrid',
      selection: 'Both Teams to Score',
      odds: 1.65,
      stake: 15
    }
  ]);

  const totalOdds = betSlipItems.reduce((acc, item) => acc * item.odds, 1);
  const totalStake = betSlipItems.reduce((acc, item) => acc + item.stake, 0);
  const potentialWin = totalOdds * totalStake;

  const updateStake = (id: string, newStake: number) => {
    setBetSlipItems(items => 
      items.map(item => 
        item.id === id ? { ...item, stake: Math.max(0, newStake) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setBetSlipItems(items => items.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setBetSlipItems([]);
  };

  const exportToBetfair = () => {
    // Logic to export to Betfair
    console.log('Exporting to Betfair...', betSlipItems);
  };

  const exportToBet365 = () => {
    // Logic to export to Bet365
    console.log('Exporting to Bet365...', betSlipItems);
  };

  const copyToClipboard = () => {
    const betString = betSlipItems.map(item => 
      `${item.match}: ${item.selection} @ ${item.odds} (Stake: £${item.stake})`
    ).join('\n');
    
    navigator.clipboard.writeText(betString);
  };

  return (
    <>
      {/* Floating Bet Slip Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium shadow-lg shadow-neon-blue/25 relative"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          My Slip
          {betSlipItems.length > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1"
            >
              {betSlipItems.length}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Bet Slip Modal/Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Bet Slip Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-dark border-l border-dark-border z-50 overflow-y-auto"
            >
              <Card className="h-full bg-dark border-0 rounded-none">
                <CardHeader className="border-b border-dark-border">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-neon-blue" />
                      My Bet Slip
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {betSlipItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Your bet slip is empty</p>
                      <p className="text-sm">Add some bets to get started</p>
                    </div>
                  ) : (
                    <>
                      {/* Bet Items */}
                      <div className="space-y-4">
                        {betSlipItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-dark-lighter rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-1">
                                  {item.match}
                                </div>
                                <div className="text-neon-blue text-sm">
                                  {item.selection}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  Odds: {item.odds}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-400 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Stake:</span>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateStake(item.id, item.stake - 1)}
                                  className="h-8 w-8 p-0 border-gray-600"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.stake}
                                  onChange={(e) => updateStake(item.id, parseFloat(e.target.value) || 0)}
                                  className="w-20 h-8 text-center bg-dark border-gray-600"
                                  min="0"
                                  step="0.5"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateStake(item.id, item.stake + 1)}
                                  className="h-8 w-8 p-0 border-gray-600"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Separator className="bg-dark-border" />

                      {/* Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Odds:</span>
                          <span className="font-medium">{totalOdds.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Stake:</span>
                          <span className="font-medium">£{totalStake.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-dark-border pt-3">
                          <span>Potential Win:</span>
                          <span className="text-neon-lime">£{potentialWin.toFixed(2)}</span>
                        </div>
                      </div>

                      <Separator className="bg-dark-border" />

                      {/* Export Options */}
                      <div className="space-y-3">
                        <h4 className="font-medium mb-3">Export Bet Slip</h4>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={exportToBetfair}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            size="sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Betfair
                          </Button>
                          
                          <Button
                            onClick={exportToBet365}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Bet365
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Excel
                          </Button>
                        </div>
                      </div>

                      {/* Clear All */}
                      <Button
                        onClick={clearAll}
                        variant="outline"
                        className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        Clear All Bets
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BetSlip;
