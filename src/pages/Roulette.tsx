
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RouletteTable from '@/components/RouletteTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, Sparkles, Award, BarChart3 } from 'lucide-react';

const Roulette = () => {
  return (
    <div className="min-h-screen bg-dark text-white pb-16 bg-gradient-to-b from-dark to-dark-darker">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300">Roulette Advisor</h1>
            <p className="text-gray-400 max-w-2xl mx-auto md:mx-0">
              Experience European Roulette with AI-powered betting advice, trend analysis, and personalized strategy recommendations.
            </p>
          </div>
          
          <Tabs defaultValue="advisor" className="mb-8">
            <TabsList className="bg-dark-lighter border border-amber-500/20 rounded-xl overflow-hidden backdrop-blur-sm mb-6 p-1 w-full">
              <TabsTrigger value="advisor" className="flex items-center gap-2 flex-1 data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-200">
                <Sparkles size={16} />
                Advisor
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2 flex-1 data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-200">
                <BarChart3 size={16} />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2 flex-1 data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-200">
                <Award size={16} />
                Strategies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="advisor" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <RouletteTable />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="bg-dark-card border-amber-500/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gradient bg-gradient-to-r from-amber-200 to-amber-300">Roulette Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-400 mb-6">Track previous numbers and analyze trends to inform your betting strategy.</p>
                    <div className="bg-dark-lighter p-4 rounded-lg border border-amber-500/20">
                      <div className="text-sm text-gray-400 mb-3">Recent Numbers</div>
                      <div className="flex justify-center gap-2 mt-2">
                        {[17, 32, 5, 23, 14, 8, 0].map((num, i) => (
                          <div 
                            key={i} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border shadow-lg ${
                              num === 0 ? 'bg-green-600 border-green-400/30' : 
                              [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) 
                                ? 'bg-red-600 border-red-400/30' 
                                : 'bg-black border-gray-600/30'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-6 text-left">
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/10">
                          <div className="text-sm text-amber-200/80 mb-2">Red/Black Distribution</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                              <span className="text-white">4 Red (57%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-black rounded-full border border-white/20"></div>
                              <span className="text-white">2 Black (29%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                              <span className="text-white">1 Zero (14%)</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-amber-500/10">
                          <div className="text-sm text-amber-200/80 mb-2">Even/Odd Distribution</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-amber-600/70 rounded-full"></div>
                              <span className="text-white">3 Even (43%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-amber-400/70 rounded-full"></div>
                              <span className="text-white">3 Odd (43%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                              <span className="text-white">1 Zero (14%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="bg-dark-card border-amber-500/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gradient bg-gradient-to-r from-amber-200 to-amber-300">Roulette Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6">
                    <p className="text-gray-400 mb-6 text-center">Popular roulette strategies and their explanations to improve your gameplay.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 p-5 rounded-lg border border-amber-500/20 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="font-bold text-amber-200 text-lg mb-2">Martingale System</h3>
                        <p className="text-sm text-gray-300">
                          Double your bet after each loss, so when you eventually win, you recover all previous losses plus a profit equal to your original stake. Best used for outside bets with close to 50% probability.
                        </p>
                        <div className="mt-3 bg-black/20 p-2 rounded text-xs text-amber-200/80">
                          Risk Level: <span className="text-red-400 font-medium">High</span> | Win Probability: <span className="text-amber-400 font-medium">Medium</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-5 rounded-lg border border-amber-500/20 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="font-bold text-amber-200 text-lg mb-2">D'Alembert Strategy</h3>
                        <p className="text-sm text-gray-300">
                          Increase your bet by one unit after a loss, and decrease it by one unit after a win. This system provides a more gradual progression than the Martingale and can help preserve your bankroll.
                        </p>
                        <div className="mt-3 bg-black/20 p-2 rounded text-xs text-amber-200/80">
                          Risk Level: <span className="text-yellow-400 font-medium">Medium</span> | Win Probability: <span className="text-amber-400 font-medium">Medium</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-5 rounded-lg border border-amber-500/20 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="font-bold text-amber-200 text-lg mb-2">Fibonacci System</h3>
                        <p className="text-sm text-gray-300">
                          Follow the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) to determine bet size, moving one step forward after a loss and two steps back after a win. This creates a balanced approach to recover losses.
                        </p>
                        <div className="mt-3 bg-black/20 p-2 rounded text-xs text-amber-200/80">
                          Risk Level: <span className="text-yellow-400 font-medium">Medium</span> | Win Probability: <span className="text-amber-400 font-medium">Medium</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-5 rounded-lg border border-amber-500/20 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="font-bold text-amber-200 text-lg mb-2">James Bond Strategy</h3>
                        <p className="text-sm text-gray-300">
                          A flat betting strategy that covers more than half of the table with $200. Place $140 on high numbers (19-36), $50 on six line (13-18), and $10 on zero for insurance. This covers 25 numbers on the wheel.
                        </p>
                        <div className="mt-3 bg-black/20 p-2 rounded text-xs text-amber-200/80">
                          Risk Level: <span className="text-green-400 font-medium">Low</span> | Win Probability: <span className="text-green-400 font-medium">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="bg-dark-card border-amber-500/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-amber-200">Roulette Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-amber-100">European vs American</h3>
                  <ul className="text-sm text-gray-300 space-y-2 bg-black/30 p-4 rounded-lg border border-amber-500/10">
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      European roulette has a single zero (0)
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      American roulette has both zero (0) and double zero (00)
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      European house edge: <span className="text-red-400">2.7%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      American house edge: <span className="text-red-400">5.26%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">•</span> 
                      <span className="font-medium text-amber-200">Always choose European when available</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-amber-100">Betting Tips</h3>
                  <ul className="text-sm text-gray-300 space-y-2 bg-black/30 p-4 rounded-lg border border-amber-500/10">
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      Outside bets (red/black, odd/even) have better odds
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      Set a loss limit and stick to it
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      No system can overcome the house edge
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      The gambler's fallacy: past spins don't affect future spins
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span> 
                      Look for "En Prison" or "La Partage" rules for better odds
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-amber-500/10">
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
