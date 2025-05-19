
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
import { useBasketballMatches } from '@/services/sportsDataApi';
import { basketball } from 'lucide-react'; // Changed from Basketball to lowercase basketball
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { BasketballIcon } from '@/components/navbar/NavbarIcons'; // Import from our custom icons

const Basketball = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { data: matches, isLoading, error } = useBasketballMatches();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading data",
        description: "Could not load basketball matches. Please try again later.",
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
            <h1 className="text-3xl font-bold mb-2">Basketball Predictions</h1>
            <p className="text-gray-400 mb-8">
              AI-powered basketball predictions and analysis to boost your betting strategy
            </p>

            {/* Upcoming Games Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BasketballIcon size={20} className="text-neon-lime" />
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
                      className={`bg-dark-card border-dark-border overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.2)] ${
                        selectedTeam === match.homeTeam.id || selectedTeam === match.awayTeam.id 
                          ? 'ring-1 ring-neon-lime' 
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
                            <span className="text-xs font-medium text-neon-lime">
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
                                match.predictions.recommended === 'home' ? 'text-neon-lime' : ''
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
                                match.predictions.recommended === 'away' ? 'text-neon-lime' : ''
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
                <TabsTrigger value="trends">Betting Trends</TabsTrigger>
              </TabsList>
              <TabsContent value="predictions" className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
                {selectedTeam ? (
                  <div>
                    <p className="mb-4">Our AI has analyzed the recent performance, player statistics, and historical matchup data to provide the following insights:</p>
                    <div className="bg-dark-lighter p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Win Probability</span>
                        <span className="text-neon-lime font-semibold">68%</span>
                      </div>
                      <div className="w-full bg-dark/50 rounded-full h-2.5">
                        <div className="bg-neon-lime h-2.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Scoring Projection</h4>
                        <div className="flex items-center justify-between">
                          <span>Projected Points</span>
                          <span className="font-semibold">108.5</span>
                        </div>
                      </div>
                      <div className="bg-dark-lighter p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Key Factor</h4>
                        <p className="text-sm">Superior three-point shooting (42% vs 36%)</p>
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
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Offense</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">PPG</span>
                          <span className="font-semibold">112.4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">FG%</span>
                          <span className="font-semibold">46.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">3P%</span>
                          <span className="font-semibold">38.2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Defense</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Opp PPG</span>
                          <span className="font-semibold">104.6</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Steals</span>
                          <span className="font-semibold">8.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Blocks</span>
                          <span className="font-semibold">5.1</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Other</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Rebounds</span>
                          <span className="font-semibold">43.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assists</span>
                          <span className="font-semibold">24.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Turnovers</span>
                          <span className="font-semibold">13.2</span>
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
              <TabsContent value="trends" className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Betting Trends</h3>
                {selectedTeam ? (
                  <div className="space-y-4">
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Against The Spread</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Home</span>
                          <span className="font-semibold">16-12</span>
                        </div>
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Away</span>
                          <span className="font-semibold">14-14</span>
                        </div>
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Overall</span>
                          <span className="font-semibold">30-26</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-lighter p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Over/Under Record</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Over</span>
                          <span className="font-semibold">33</span>
                        </div>
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Under</span>
                          <span className="font-semibold">25</span>
                        </div>
                        <div className="bg-dark/30 p-2 rounded">
                          <span className="block text-sm text-gray-400">Push</span>
                          <span className="font-semibold">2</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">• Team has covered the spread in 6 of last 8 games</p>
                      <p className="text-sm">• Team has hit the OVER in 7 of last 10 home games</p>
                      <p className="text-sm">• Team is 8-2 ATS when favored by 5+ points</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Select a team above to see betting trends</p>
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

export default Basketball;
