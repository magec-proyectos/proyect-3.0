
import React from 'react';
import Navbar from '@/components/Navbar';
import BlackjackTable from '@/components/BlackjackTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, Sparkles } from 'lucide-react';

const Blackjack = () => {
  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Blackjack Advisor</h1>
          <p className="text-gray-400 mb-8">
            Enter your cards and get AI-powered recommendations for optimal play.
          </p>
          
          <Tabs defaultValue="advisor" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6">
              <TabsTrigger value="advisor" className="flex items-center gap-2">
                <Sparkles size={16} />
                Advisor
              </TabsTrigger>
              <TabsTrigger value="counter" className="flex items-center gap-2">
                <Calculator size={16} />
                Card Counter
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                <BookOpen size={16} />
                Basic Strategy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="advisor" className="mt-0">
              <BlackjackTable />
            </TabsContent>
            
            <TabsContent value="counter" className="mt-0">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Card Counter Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-4">Card counting assistance would be displayed here.</p>
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Current Count</div>
                      <div className="text-3xl font-bold">+2</div>
                      <div className="text-sm text-gray-400 mt-1">True Count: +0.5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Basic Strategy Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-4">Basic strategy charts would be displayed here.</p>
                    <div className="grid grid-cols-11 gap-1 max-w-lg mx-auto bg-dark-lighter p-4 rounded-lg">
                      {/* This would be a complete strategy chart, showing a simplified version for now */}
                      <div className="bg-dark-lighter"></div>
                      {['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'A'].map(value => (
                        <div key={value} className="bg-dark-card p-2 text-xs font-bold">
                          {value}
                        </div>
                      ))}
                      
                      {['17+', '16', '15', '14', '13', '12', '11', '10', '9', '8'].map(row => (
                        <React.Fragment key={row}>
                          <div className="bg-dark-card p-2 text-xs font-bold">
                            {row}
                          </div>
                          {Array(10).fill(null).map((_, i) => {
                            // Simplified logic for cell colors
                            let bg = 'bg-red-500/70';
                            if (row === '17+') bg = 'bg-blue-500/70';
                            if (row === '11') bg = 'bg-green-500/70';
                            
                            return (
                              <div key={i} className={`p-2 text-xs ${bg}`}>
                                {row === '17+' ? 'S' : row === '11' ? 'D' : i < 5 ? 'S' : 'H'}
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-red-500/70 rounded mr-1"></span>
                        <span className="text-gray-300">Hit</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-blue-500/70 rounded mr-1"></span>
                        <span className="text-gray-300">Stand</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-green-500/70 rounded mr-1"></span>
                        <span className="text-gray-300">Double</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Blackjack Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Basic Strategy</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Always hit hard 8 or less</li>
                    <li>• Always stand on hard 17 or more</li>
                    <li>• Double down on 11 when the dealer has 10 or less</li>
                    <li>• Split Aces and 8s</li>
                    <li>• Never split 10s or 5s</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Card Counting Basics</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Hi-Lo system: +1 for 2-6, 0 for 7-9, -1 for 10-A</li>
                    <li>• True count = Running count ÷ Decks remaining</li>
                    <li>• Increase bets when true count is positive</li>
                    <li>• Adjust strategy based on true count</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-dark-lighter rounded-lg">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Disclaimer:</strong> This tool is for educational and entertainment purposes only.
                  Please be aware of local regulations regarding gambling and gaming applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Blackjack;
