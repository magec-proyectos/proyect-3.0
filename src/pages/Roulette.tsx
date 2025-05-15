
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RouletteTable from '@/components/RouletteTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, Sparkles } from 'lucide-react';

const Roulette = () => {
  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Roulette Advisor</h1>
          <p className="text-gray-400 mb-8">
            Play European Roulette with AI-powered betting recommendations and strategy advice.
          </p>
          
          <Tabs defaultValue="advisor" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6">
              <TabsTrigger value="advisor" className="flex items-center gap-2">
                <Sparkles size={16} />
                Advisor
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <Calculator size={16} />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                <BookOpen size={16} />
                Strategies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="advisor" className="mt-0">
              <RouletteTable />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Roulette Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-4">Track previous numbers and analyze trends.</p>
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Recent Numbers</div>
                      <div className="flex justify-center gap-2 mt-2">
                        {[17, 32, 5, 23, 14, 8, 0].map((num, i) => (
                          <div 
                            key={i} 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                              num === 0 ? 'bg-green-600' : 
                              [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) ? 'bg-red-600' : 'bg-black border border-white/20'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-left">
                        <div>
                          <div className="text-sm text-gray-400">Red/Black</div>
                          <div className="text-white">4 Black, 2 Red, 1 Green</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Even/Odd</div>
                          <div className="text-white">3 Even, 3 Odd, 1 Zero</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Roulette Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-4">Popular roulette strategies and their explanations.</p>
                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      <div className="bg-dark-lighter p-4 rounded-lg text-left">
                        <h3 className="font-bold text-white">Martingale System</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          Double your bet after each loss, so when you eventually win, you recover all previous losses plus a profit equal to your original stake.
                        </p>
                      </div>
                      <div className="bg-dark-lighter p-4 rounded-lg text-left">
                        <h3 className="font-bold text-white">D'Alembert Strategy</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          Increase your bet by one unit after a loss, and decrease it by one unit after a win. This is a more gradual progression than Martingale.
                        </p>
                      </div>
                      <div className="bg-dark-lighter p-4 rounded-lg text-left">
                        <h3 className="font-bold text-white">Fibonacci System</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          Follow the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) to determine your bet size, moving one step forward after a loss and two steps back after a win.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Roulette Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">European vs American</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• European roulette has a single zero (0)</li>
                    <li>• American roulette has both zero (0) and double zero (00)</li>
                    <li>• European house edge: 2.7%</li>
                    <li>• American house edge: 5.26%</li>
                    <li>• Always choose European when available</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Betting Tips</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Outside bets (red/black, odd/even) have better odds</li>
                    <li>• Set a loss limit and stick to it</li>
                    <li>• No system can overcome the house edge</li>
                    <li>• The gambler's fallacy: past spins don't affect future spins</li>
                    <li>• Look for "En Prison" or "La Partage" rules for better odds</li>
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
      
      <Footer />
    </div>
  );
};

export default Roulette;
