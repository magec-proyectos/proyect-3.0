
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import StatsPanel from '@/components/StatsPanel';
import PredictionBox from '@/components/PredictionBox';
import MatchTimeline from '@/components/MatchTimeline';
import BettingTrends from '@/components/BettingTrends';
import MatchNews from '@/components/MatchNews';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Filter, TrendingUp, News } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { MatchSelectionSkeleton, BetBuilderSkeleton } from '@/components/LoadingStates';
import SkeletonCard from '@/components/SkeletonCard';
import { motion } from 'framer-motion';
import { useFootballMatches, useLeagues } from '@/services/sportsDataApi';

const Football = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('premier-league');
  const [selectedMatch, setSelectedMatch] = useState('liverpool-vs-manchester-united');
  const [showBetPlaced, setShowBetPlaced] = useState(false);
  const { user } = useAuth();
  
  // Sample data for match events
  const matchEvents = [
    { 
      type: 'goal', 
      time: 23, 
      team: 'home', 
      player: 'Mohamed Salah', 
      description: 'Goal from penalty spot after handball' 
    },
    { 
      type: 'yellow-card', 
      time: 38, 
      team: 'away', 
      player: 'Bruno Fernandes', 
      description: 'Late tackle on Henderson' 
    },
    { 
      type: 'goal', 
      time: 45, 
      team: 'away', 
      player: 'Marcus Rashford', 
      description: 'Counter attack, assisted by Fernandes' 
    },
    { 
      type: 'substitution', 
      time: 63, 
      team: 'home', 
      player: 'Roberto Firmino', 
      description: 'Comes on for Diogo Jota' 
    },
    { 
      type: 'red-card', 
      time: 78, 
      team: 'away', 
      player: 'Harry Maguire', 
      description: 'Second yellow card for dangerous play' 
    },
    { 
      type: 'goal', 
      time: 85, 
      team: 'home', 
      player: 'Roberto Firmino', 
      description: 'Header from corner kick' 
    }
  ];

  // Sample data for betting trends
  const bettingTrends = [
    {
      type: 'Match Result',
      homePercentage: 63,
      drawPercentage: 21,
      awayPercentage: 16,
      movement: 'up'
    },
    {
      type: 'Both Teams to Score',
      homePercentage: 74, // Yes
      awayPercentage: 26, // No
      movement: 'stable'
    },
    {
      type: 'Over/Under 2.5 Goals',
      homePercentage: 58, // Over
      awayPercentage: 42, // Under
      movement: 'down'
    }
  ];

  // Sample data for news
  const matchNews = [
    {
      id: 'n1',
      title: 'Thiago ruled out for the weekend clash',
      summary: 'Liverpool's midfielder Thiago Alcantara will miss the big game against Manchester United due to hamstring injury sustained in training.',
      source: 'Sky Sports',
      date: '2 hours ago',
      category: 'injury'
    },
    {
      id: 'n2',
      title: 'Rashford back in full training ahead of Liverpool clash',
      summary: 'Manchester United forward Marcus Rashford has recovered from his minor knock and has been training with the squad since Tuesday.',
      source: 'BBC Sport',
      date: '5 hours ago',
      category: 'injury'
    },
    {
      id: 'n3',
      title: 'Premier League Classic: Liverpool vs Man United - Preview',
      summary: 'This weekend's clash between the arch-rivals could have major implications for the top four race.',
      source: 'Guardian',
      date: '1 day ago',
      category: 'preview'
    }
  ];
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Handler for finding a match
  const handleFindMatch = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Match data loaded successfully');
    }, 800);
  };
  
  // Handler for placing a bet
  const handlePlaceBet = () => {
    if (!user) {
      toast.error('Please log in to place bets', {
        description: 'Create an account or log in to continue'
      });
      return;
    }
    
    setShowBetPlaced(true);
    toast.success('Bet placed successfully!', {
      description: 'Your bet has been placed. Good luck!'
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowBetPlaced(false);
    }, 3000);
  };
  
  // Sample data for the stats panel
  const homeTeam = {
    id: 'liverpool',
    name: 'Liverpool',
    logo: 'https://placehold.co/40?text=LIV',
    form: ['w', 'w', 'd', 'w', 'l'],
    stats: {
      goals: {
        for: 42,
        against: 18,
      },
      possession: 65,
      xG: 45.7,
      shots: 223,
      shotsOnTarget: 98,
      corners: 134,
    }
  };
  
  const awayTeam = {
    id: 'manchester-united',
    name: 'Man United',
    logo: 'https://placehold.co/40?text=MUN',
    form: ['l', 'w', 'l', 'd', 'w'],
    stats: {
      goals: {
        for: 28,
        against: 27,
      },
      possession: 52,
      xG: 30.2,
      shots: 187,
      shotsOnTarget: 72,
      corners: 98,
    }
  };
  
  // Sample prediction data
  const prediction = {
    homeScore: 2,
    awayScore: 1,
    winProbability: {
      home: 60,
      draw: 25,
      away: 15,
    },
    btts: {
      yes: 65,
      no: 35,
    },
    over: {
      value: 2.5,
      probability: 70,
    },
    confidence: 75,
    bets: [
      {
        type: '1X2',
        pick: 'Home Win',
        odds: 1.85,
        confidence: 60,
      },
      {
        type: 'BTTS',
        pick: 'Yes',
        odds: 1.70,
        confidence: 65,
      },
      {
        type: 'Over/Under',
        pick: 'Over 2.5',
        odds: 1.90,
        confidence: 70,
      },
    ],
  };
  
  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 gradient-text">Football AI Predictions</h1>
          
          {isLoading ? (
            <MatchSelectionSkeleton />
          ) : (
            <Card className="glass-effect border-dark-border mb-8 shadow-lg shadow-neon-blue/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Match Selection</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">League</label>
                    <Select 
                      value={selectedLeague} 
                      onValueChange={setSelectedLeague}
                    >
                      <SelectTrigger className="bg-dark-lighter border-dark-border">
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-lighter border-dark-border">
                        <SelectItem value="premier-league">Premier League</SelectItem>
                        <SelectItem value="la-liga">La Liga</SelectItem>
                        <SelectItem value="bundesliga">Bundesliga</SelectItem>
                        <SelectItem value="serie-a">Serie A</SelectItem>
                        <SelectItem value="ligue-1">Ligue 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Match</label>
                    <Select 
                      value={selectedMatch} 
                      onValueChange={setSelectedMatch}
                    >
                      <SelectTrigger className="bg-dark-lighter border-dark-border">
                        <SelectValue placeholder="Select match" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-lighter border-dark-border">
                        <SelectItem value="liverpool-vs-manchester-united">
                          <div className="flex items-center gap-2">
                            <img src="https://placehold.co/20?text=LIV" alt="Liverpool" className="w-5 h-5" />
                            <span>Liverpool vs</span>
                            <img src="https://placehold.co/20?text=MUN" alt="Manchester United" className="w-5 h-5" />
                            <span>Manchester United</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="arsenal-vs-chelsea">
                          <div className="flex items-center gap-2">
                            <img src="https://placehold.co/20?text=ARS" alt="Arsenal" className="w-5 h-5" />
                            <span>Arsenal vs</span>
                            <img src="https://placehold.co/20?text=CHE" alt="Chelsea" className="w-5 h-5" />
                            <span>Chelsea</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="manchester-city-vs-tottenham">
                          <div className="flex items-center gap-2">
                            <img src="https://placehold.co/20?text=MCI" alt="Manchester City" className="w-5 h-5" />
                            <span>Manchester City vs</span>
                            <img src="https://placehold.co/20?text=TOT" alt="Tottenham" className="w-5 h-5" />
                            <span>Tottenham</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Date</label>
                    <div className="relative">
                      <Input 
                        type="date" 
                        className="bg-dark-lighter border-dark-border pl-10" 
                        defaultValue="2025-05-20" 
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <Button className="gap-2 bg-neon-blue hover:bg-neon-blue/90 text-black" onClick={handleFindMatch}>
                    <Search size={16} />
                    Find Match
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar size={16} />
                    Upcoming Fixtures
                  </Button>
                  <Button variant="outline" className="gap-2 ml-auto">
                    <Filter size={16} />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="prediction" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6 w-full md:w-auto">
              <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="timeline">Match Timeline</TabsTrigger>
              <TabsTrigger value="trends">Betting Trends</TabsTrigger>
              <TabsTrigger value="news">Latest News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="prediction" className="mt-0 space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkeletonCard type="stats" />
                  <SkeletonCard type="prediction" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatsPanel homeTeam={homeTeam} awayTeam={awayTeam} />
                  <PredictionBox 
                    prediction={prediction} 
                    homeTeam={homeTeam.name} 
                    awayTeam={awayTeam.name} 
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-dark-border">
                  <CardHeader>
                    <CardTitle>Detailed Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-dark-lighter rounded-lg">
                          <div className="text-sm text-gray-400">Shots on Target</div>
                          <div className="text-2xl font-bold mt-1">
                            <span className="text-neon-blue">{homeTeam.stats.shotsOnTarget}</span>
                            <span className="text-gray-500 mx-1">-</span>
                            <span className="text-neon-lime">{awayTeam.stats.shotsOnTarget}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-dark-lighter rounded-lg">
                          <div className="text-sm text-gray-400">Corners</div>
                          <div className="text-2xl font-bold mt-1">
                            <span className="text-neon-blue">{homeTeam.stats.corners}</span>
                            <span className="text-gray-500 mx-1">-</span>
                            <span className="text-neon-lime">{awayTeam.stats.corners}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-dark-lighter rounded-lg">
                          <div className="text-sm text-gray-400">xG</div>
                          <div className="text-2xl font-bold mt-1">
                            <span className="text-neon-blue">{homeTeam.stats.xG.toFixed(1)}</span>
                            <span className="text-gray-500 mx-1">-</span>
                            <span className="text-neon-lime">{awayTeam.stats.xG.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="space-y-2">
                          <h4 className="font-medium text-center">{homeTeam.name}</h4>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Clean Sheets</span>
                              <span>8</span>
                            </div>
                          </div>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Average Goals</span>
                              <span>2.4</span>
                            </div>
                          </div>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Win Rate</span>
                              <span>68%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-center">{awayTeam.name}</h4>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Clean Sheets</span>
                              <span>5</span>
                            </div>
                          </div>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Average Goals</span>
                              <span>1.7</span>
                            </div>
                          </div>
                          <div className="bg-dark-lighter p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">Win Rate</span>
                              <span>53%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-dark-border">
                  <CardHeader>
                    <CardTitle>Head-to-Head History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-center">
                        <div>
                          <div className="text-3xl font-bold text-neon-blue">15</div>
                          <div className="text-sm text-gray-400">{homeTeam.name} Wins</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">6</div>
                          <div className="text-sm text-gray-400">Draws</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-neon-lime">10</div>
                          <div className="text-sm text-gray-400">{awayTeam.name} Wins</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Last 5 Meetings</h4>
                        <div className="space-y-2">
                          {[
                            { date: '12 Jan 2025', result: '2-1', winner: 'home' },
                            { date: '24 Aug 2024', result: '1-1', winner: 'draw' },
                            { date: '5 Mar 2024', result: '3-0', winner: 'home' },
                            { date: '20 Oct 2023', result: '1-2', winner: 'away' },
                            { date: '4 May 2023', result: '2-1', winner: 'home' }
                          ].map((match, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-dark-lighter p-3 rounded-lg">
                              <span className="text-sm">{match.date}</span>
                              <div className={`font-bold ${
                                match.winner === 'home' ? 'text-neon-blue' : 
                                match.winner === 'away' ? 'text-neon-lime' : ''
                              }`}>
                                {match.result}
                              </div>
                              <span className="text-xs text-gray-400">
                                {match.winner === 'home' ? homeTeam.name : 
                                 match.winner === 'away' ? awayTeam.name : 'Draw'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <Card className="glass-effect border-dark-border">
                <CardHeader>
                  <CardTitle>Match Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <MatchTimeline 
                    events={matchEvents}
                    homeTeam={homeTeam.name}
                    awayTeam={awayTeam.name}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <Card className="glass-effect border-dark-border">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Betting Market Trends</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      <TrendingUp size={14} />
                      <span>Live Updates</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <BettingTrends 
                    trends={bettingTrends}
                    homeTeam={homeTeam.name}
                    awayTeam={awayTeam.name}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className="mt-0">
              <Card className="glass-effect border-dark-border">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Latest News & Updates</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      <News size={14} />
                      <span>See All News</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <MatchNews news={matchNews} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {isLoading ? (
            <BetBuilderSkeleton />
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect border-dark-border p-6 rounded-xl border shadow-lg shadow-neon-blue/5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold gradient-text">Bet Builder</h2>
                <Button variant="outline" size="sm">
                  Advanced Mode
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-400">
                  Select from our AI recommendations to build your bet:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {prediction.bets.map((bet, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="bg-dark p-4 rounded-lg border border-dark-border hover:border-neon-blue/50 transition-colors cursor-pointer"
                    >
                      <div className="text-sm text-gray-400">{bet.type}</div>
                      <div className="font-semibold">{bet.pick}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-neon-blue">@{bet.odds}</span>
                        <span className="text-xs bg-dark-lighter px-2 py-1 rounded">
                          {bet.confidence}% Confidence
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-dark-card p-4 rounded-lg mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-400">Potential Return:</span>
                      <span className="text-xl font-bold ml-2">$125.40</span>
                    </div>
                    <Button 
                      className={`${showBetPlaced ? 'bg-green-500' : 'bg-neon-lime'} text-black hover:bg-neon-lime/90 transition-colors`}
                      onClick={handlePlaceBet}
                    >
                      {showBetPlaced ? 'Bet Placed!' : 'Place Bet'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg items-start mt-4">
                  <div className="text-sm text-neon-blue">
                    <p><strong>AI Insight:</strong> Based on our analysis, combining these three bets offers the best value. Liverpool's strong home record and United's recent defensive struggles make a home win with both teams scoring the most probable outcome.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Football;
