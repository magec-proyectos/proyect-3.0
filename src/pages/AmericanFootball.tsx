
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from '@/components/ui/tabs';
import { useAmericanFootballMatches } from '@/services/sportsDataApi';
import { BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const AmericanFootball = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { data: matches, isLoading, error } = useAmericanFootballMatches();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading data",
        description: "Could not load American football matches. Please try again later.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    toast({
      title: "Team Selected",
      description: `Analysis loading for selected team`,
    });
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">American Football Predictions</h1>
            <p className="text-gray-400 mb-8">
              AI-powered NFL and college football predictions to improve your betting strategy
            </p>

            {/* Upcoming Games Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-purple-500" />
                <span>Upcoming Games</span>
              </h2>
              
              {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2].map(i => (
                    <Card key={i} className="bg-dark-card border-dark-border h-32 animate-pulse">
                      <CardContent className="p-0"></CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {matches?.map((match) => (
                    <Card 
                      key={match.id}
                      className={`bg-dark-card border-dark-border overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] ${
                        selectedTeam === match.homeTeam.id || selectedTeam === match.awayTeam.id 
                          ? 'ring-1 ring-purple-500' 
                          : ''
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-dark-lighter px-2 py-1 rounded">
                                {match.league}
                              </span>
                              <span className="text-xs text-gray-400">
                                {match.date} - {match.time}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-purple-400">
                              {Math.round(match.predictions.confidence * 100)}% confidence
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <img 
                                src={match.homeTeam.logo} 
                                alt={match.homeTeam.name} 
                                className="w-8 h-8 object-contain"
                              />
                              <div>
                                <p className="font-medium">{match.homeTeam.name}</p>
                                <div className="flex gap-1 mt-1">
                                  {match.homeTeam.recentForm.map((result, i) => (
                                    <span 
                                      key={i} 
                                      className={`text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                                        result === 'W' ? 'bg-green-500/20 text-green-500' : 
                                        result === 'L' ? 'bg-red-500/20 text-red-500' : 
                                        'bg-gray-500/20 text-gray-500'
                                      }`}
                                    >
                                      {result}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="text-lg font-semibold">{match.homeOdds}</span>
                            </div>
                          </div>
                          
                          <div className="my-2 border-t border-dark-border"></div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <img 
                                src={match.awayTeam.logo} 
                                alt={match.awayTeam.name} 
                                className="w-8 h-8 object-contain"
                              />
                              <div>
                                <p className="font-medium">{match.awayTeam.name}</p>
                                <div className="flex gap-1 mt-1">
                                  {match.awayTeam.recentForm.map((result, i) => (
                                    <span 
                                      key={i} 
                                      className={`text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                                        result === 'W' ? 'bg-green-500/20 text-green-500' : 
                                        result === 'L' ? 'bg-red-500/20 text-red-500' : 
                                        'bg-gray-500/20 text-gray-500'
                                      }`}
                                    >
                                      {result}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="text-lg font-semibold">{match.awayOdds}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between gap-2">
                            <Button
                              onClick={() => handleTeamSelect(match.homeTeam.id)} 
                              className="flex-1 bg-dark-lighter hover:bg-dark/70 border border-dark-border"
                            >
                              Home Win
                              <span className={`ml-1 ${
                                match.predictions.recommended === 'home' ? 'text-purple-500' : ''
                              }`}>
                                {Math.round(match.predictions.homeWinProbability * 100)}%
                              </span>
                            </Button>
                            <Button
                              onClick={() => handleTeamSelect(match.awayTeam.id)} 
                              className="flex-1 bg-dark-lighter hover:bg-dark/70 border border-dark-border"
                            >
                              Away Win
                              <span className={`ml-1 ${
                                match.predictions.recommended === 'away' ? 'text-purple-500' : ''
                              }`}>
                                {Math.round(match.predictions.awayWinProbability * 100)}%
                              </span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Analysis Tabs */}
            <Tabs defaultValue="predictions">
              <TabsList className="grid grid-cols-3 bg-dark-lighter mb-4">
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="stats">Team Stats</TabsTrigger>
                <TabsTrigger value="injuries">Injury Report</TabsTrigger>
              </TabsList>
              <TabsContent value="predictions" className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
                {selectedTeam ? (
                  <div>
                    <p className="mb-4">Our AI has analyzed historical data, player performance, and team strengths to provide these insights:</p>
                    <div className="bg-dark-lighter p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Win Probability</span>
                        <span className="text-purple-400 font-semibold">62%</span>
                      </div>
                      <div className="w-full bg-dark/50 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Point Spread</h4>
                        <div className="flex items-center justify-between">
                          <span>Projected Margin</span>
                          <span className="font-semibold">+4.5</span>
                        </div>
                      </div>
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Key Matchup</h4>
                        <p className="text-sm">Defensive line vs offensive line advantage</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Select a team above to see AI predictions</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="stats" className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Team Statistics</h3>
                {selectedTeam ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Offensive Stats</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Points Per Game</span>
                            <span className="font-semibold">26.4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Passing Yards</span>
                            <span className="font-semibold">245.8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Rushing Yards</span>
                            <span className="font-semibold">128.3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">3rd Down %</span>
                            <span className="font-semibold">42.1%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Defensive Stats</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Points Allowed</span>
                            <span className="font-semibold">20.8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Yards Allowed</span>
                            <span className="font-semibold">327.5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Sacks</span>
                            <span className="font-semibold">31</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Takeaways</span>
                            <span className="font-semibold">18</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Team Comparison <span className="text-xs text-gray-400">(League Rank)</span></h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <span className="text-purple-400 text-xl font-bold">#4</span>
                          <p className="text-xs text-gray-400">Offense</p>
                        </div>
                        <div className="text-center">
                          <span className="text-purple-400 text-xl font-bold">#7</span>
                          <p className="text-xs text-gray-400">Defense</p>
                        </div>
                        <div className="text-center">
                          <span className="text-purple-400 text-xl font-bold">#5</span>
                          <p className="text-xs text-gray-400">Overall</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Select a team above to see statistics</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="injuries" className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Injury Report</h3>
                {selectedTeam ? (
                  <div className="space-y-4">
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Out
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Marcus Johnson</span>
                            <span className="text-gray-400 ml-2">WR</span>
                          </div>
                          <span className="text-gray-400">Hamstring</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Chris Thompson</span>
                            <span className="text-gray-400 ml-2">LB</span>
                          </div>
                          <span className="text-gray-400">Knee</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Questionable
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Michael Davis</span>
                            <span className="text-gray-400 ml-2">RB</span>
                          </div>
                          <span className="text-gray-400">Ankle</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Jason Wilson</span>
                            <span className="text-gray-400 ml-2">TE</span>
                          </div>
                          <span className="text-gray-400">Shoulder</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Impact Analysis</h4>
                      <p className="text-sm">The absence of WR Marcus Johnson reduces deep threat options, likely resulting in more short to mid-range passing plays. Defensive scheme may adjust to compensate for Thompson's absence at linebacker.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Select a team above to see injury report</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AmericanFootball;
