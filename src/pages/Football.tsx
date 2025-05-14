
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsPanel from '@/components/StatsPanel';
import PredictionBox from '@/components/PredictionBox';
import { Button } from '@/components/ui/button';
import { Search, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { MatchSelectionSkeleton, BetBuilderSkeleton } from '@/components/LoadingStates';
import SkeletonCard from '@/components/SkeletonCard';

const Football = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('premier-league');
  const [selectedMatch, setSelectedMatch] = useState('liverpool-vs-manchester-united');
  const [showBetPlaced, setShowBetPlaced] = useState(false);
  const { user } = useAuth();
  
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
    logo: 'https://placehold.co/40',
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
    logo: 'https://placehold.co/40',
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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Football AI Predictions</h1>
          
          {isLoading ? (
            <MatchSelectionSkeleton />
          ) : (
            <Card className="bg-dark-card border-dark-border mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Match Selection</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="liverpool-vs-manchester-united">Liverpool vs Manchester United</SelectItem>
                        <SelectItem value="arsenal-vs-chelsea">Arsenal vs Chelsea</SelectItem>
                        <SelectItem value="manchester-city-vs-tottenham">Manchester City vs Tottenham</SelectItem>
                        <SelectItem value="newcastle-vs-aston-villa">Newcastle vs Aston Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button className="gap-2" onClick={handleFindMatch}>
                    <Search size={16} />
                    Find Match
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar size={16} />
                    Upcoming Fixtures
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="prediction" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6">
              <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="history">H2H History</TabsTrigger>
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
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Detailed Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">More detailed statistics would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle>Head-to-Head History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Historical matchup data would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {isLoading ? (
            <BetBuilderSkeleton />
          ) : (
            <div className="bg-dark-lighter p-6 rounded-xl border border-dark-border">
              <h2 className="text-xl font-semibold mb-4">Bet Builder</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Select from our AI recommendations to build your bet:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {prediction.bets.map((bet, index) => (
                    <div key={index} className="bg-dark p-4 rounded-lg border border-dark-border hover:border-neon-blue/50 transition-colors cursor-pointer">
                      <div className="text-sm text-gray-400">{bet.type}</div>
                      <div className="font-semibold">{bet.pick}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-neon-blue">@{bet.odds}</span>
                        <span className="text-xs bg-dark-lighter px-2 py-1 rounded">
                          {bet.confidence}% Confidence
                        </span>
                      </div>
                    </div>
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
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Football;
