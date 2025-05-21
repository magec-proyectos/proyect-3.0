
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartPie, Star } from 'lucide-react';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PredictionVisualizerProps {
  sport: 'football' | 'basketball' | 'americanFootball';
  matchId: string;
}

const PredictionVisualizer: React.FC<PredictionVisualizerProps> = ({ sport, matchId }) => {
  const [selectedTab, setSelectedTab] = useState('summary');

  // Get colors based on sport
  const getAccentColor = () => {
    switch (sport) {
      case 'football': return { primary: '#00f0ff', secondary: '#00a0aa', rgb: '0, 240, 255' };
      case 'basketball': return { primary: '#aaff00', secondary: '#88cc00', rgb: '170, 255, 0' };
      case 'americanFootball': return { primary: '#a855f7', secondary: '#8844cc', rgb: '168, 85, 247' };
      default: return { primary: '#00f0ff', secondary: '#00a0aa', rgb: '0, 240, 255' };
    }
  };

  // Mock score prediction based on sport
  const getScorePrediction = () => {
    switch (sport) {
      case 'football': return { home: 2, away: 1 };
      case 'basketball': return { home: 102, away: 98 };
      case 'americanFootball': return { home: 27, away: 21 };
      default: return { home: 1, away: 0 };
    }
  };

  // Mock team names based on match ID
  const getTeamNames = () => {
    const matchMap: Record<string, {home: string, away: string}> = {
      'liverpool_vs_arsenal': { home: 'Liverpool', away: 'Arsenal' },
      'mancity_vs_chelsea': { home: 'Man City', away: 'Chelsea' },
      'barcelona_vs_realmadrid': { home: 'Barcelona', away: 'Real Madrid' },
      'lakers_vs_celtics': { home: 'Lakers', away: 'Celtics' },
      'bulls_vs_heat': { home: 'Bulls', away: 'Heat' },
      'warriors_vs_nets': { home: 'Warriors', away: 'Nets' },
      'chiefs_vs_eagles': { home: 'Chiefs', away: 'Eagles' },
      'cowboys_vs_giants': { home: 'Cowboys', away: 'Giants' },
      'packers_vs_bears': { home: 'Packers', away: 'Bears' }
    };
    
    return matchMap[matchId] || { home: 'Home Team', away: 'Away Team' };
  };

  // Win probability data for doughnut chart
  const getWinProbabilityData = () => {
    let homeWin, draw, awayWin;
    
    switch (sport) {
      case 'football':
        homeWin = 65;
        draw = 15;
        awayWin = 20;
        break;
      case 'basketball':
        homeWin = 55;
        draw = 0;
        awayWin = 45;
        break;
      case 'americanFootball':
        homeWin = 72;
        draw = 0;
        awayWin = 28;
        break;
      default:
        homeWin = 50;
        draw = 20;
        awayWin = 30;
    }
    
    return {
      labels: sport === 'football' ? ['Home Win', 'Draw', 'Away Win'] : ['Home Win', 'Away Win'],
      datasets: [{
        data: sport === 'football' ? [homeWin, draw, awayWin] : [homeWin, awayWin],
        backgroundColor: [
          getAccentColor().primary,
          '#6b7280',
          '#e5e7eb'
        ],
        borderColor: [
          '#18181b',
          '#18181b',
          '#18181b'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }]
    };
  };

  // Key stats data for bar chart
  const getKeyStatsData = () => {
    return {
      labels: ['Possession', 'Shots', 'Shots on Target', 'Corners'],
      datasets: [
        {
          label: getTeamNames().home,
          data: sport === 'football' ? [58, 14, 6, 8] : sport === 'basketball' ? [55, 86, 45, 12] : [62, 24, 15, 5],
          backgroundColor: getAccentColor().primary,
        },
        {
          label: getTeamNames().away,
          data: sport === 'football' ? [42, 9, 4, 5] : sport === 'basketball' ? [45, 78, 40, 8] : [38, 18, 10, 2],
          backgroundColor: '#6b7280',
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#f3f4f6',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#1c1c1f',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4
      }
    },
    scales: {
      y: {
        grid: {
          color: '#282830'
        },
        ticks: {
          color: '#d1d5db'
        }
      },
      x: {
        grid: {
          color: '#282830'
        },
        ticks: {
          color: '#d1d5db'
        }
      }
    }
  };

  // Recommended bet based on sport
  const getRecommendedBet = () => {
    switch (sport) {
      case 'football': 
        return { bet: 'Over 2.5 Goals', odds: '1.95', confidence: 78 };
      case 'basketball': 
        return { bet: 'Under 220.5 Points', odds: '1.85', confidence: 65 };
      case 'americanFootball': 
        return { bet: 'Home Team -3.5', odds: '2.10', confidence: 82 };
      default: 
        return { bet: 'Home Win', odds: '1.75', confidence: 70 };
    }
  };

  // Value bet based on sport
  const getValueBet = () => {
    switch (sport) {
      case 'football': 
        return { bet: 'BTTS & Home Win', odds: '3.25', value: 'High' };
      case 'basketball': 
        return { bet: 'Home Team First to 20pts', odds: '2.75', value: 'Medium' };
      case 'americanFootball': 
        return { bet: 'Over 6.5 TDs Total', odds: '3.50', value: 'Very High' };
      default: 
        return { bet: 'Home Win', odds: '2.25', value: 'Medium' };
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="prediction-visualizer"
    >
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full bg-dark-lighter mb-4 p-1">
          <TabsTrigger 
            value="summary" 
            className="flex-1 data-[state=active]:bg-dark-card data-[state=active]:text-white"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="stats" 
            className="flex-1 data-[state=active]:bg-dark-card data-[state=active]:text-white"
          >
            Stats
          </TabsTrigger>
          <TabsTrigger 
            value="bets" 
            className="flex-1 data-[state=active]:bg-dark-card data-[state=active]:text-white"
          >
            Best Bets
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="summary" className="m-0">
            <motion.div
              variants={containerVariants}
              key="summary"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Card className={`border border-${sport}-300/20 bg-dark-lighter/50 overflow-hidden`}>
                <CardContent className="p-6">
                  {/* Score prediction with highlight animation */}
                  <motion.div 
                    className="flex items-center justify-center gap-8 mb-6"
                    variants={itemVariants}
                  >
                    <div className="text-center">
                      <div className="text-lg text-gray-400 mb-1">{getTeamNames().home}</div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className={`text-4xl font-bold text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'}`}
                      >
                        {getScorePrediction().home}
                      </motion.div>
                    </div>
                    
                    <div className="text-xl text-gray-400">vs</div>
                    
                    <div className="text-center">
                      <div className="text-lg text-gray-400 mb-1">{getTeamNames().away}</div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-4xl font-bold text-gray-200"
                      >
                        {getScorePrediction().away}
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Win probability visualization */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4"
                    variants={itemVariants}
                  >
                    <div className="bg-dark/40 rounded-lg p-4 h-64">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <ChartPie size={16} className="mr-2" />
                        Win Probability
                      </h3>
                      <div className="h-52 flex items-center justify-center">
                        <Doughnut data={getWinProbabilityData()} options={{
                          ...chartOptions,
                          cutout: '65%',
                          maintainAspectRatio: false
                        }} />
                      </div>
                    </div>
                    
                    <div className="bg-dark/40 rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">Most Likely Outcome</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Home Win</span>
                            <span className={`text-${getAccentColor().primary}`}>
                              {sport === 'football' ? '65%' : sport === 'basketball' ? '55%' : '72%'}
                            </span>
                          </div>
                          <Progress 
                            value={sport === 'football' ? 65 : sport === 'basketball' ? 55 : 72} 
                            className="h-2" 
                            indicatorClassName={`bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}`}
                          />
                        </div>
                        
                        {sport === 'football' && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Draw</span>
                              <span className="text-gray-400">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                          </div>
                        )}
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Away Win</span>
                            <span className="text-gray-400">
                              {sport === 'football' ? '20%' : sport === 'basketball' ? '45%' : '28%'}
                            </span>
                          </div>
                          <Progress 
                            value={sport === 'football' ? 20 : sport === 'basketball' ? 45 : 28} 
                            className="h-2"
                          />
                        </div>
                        
                        {/* Additional outcome */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>
                              {sport === 'football' ? 'Both Teams to Score' : 
                               sport === 'basketball' ? 'Over 200 Points' : 
                               'Over 45 Points'}
                            </span>
                            <span className="text-gray-400">
                              {sport === 'football' ? '75%' : sport === 'basketball' ? '60%' : '65%'}
                            </span>
                          </div>
                          <Progress 
                            value={sport === 'football' ? 75 : sport === 'basketball' ? 60 : 65} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Key insights */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    variants={itemVariants}
                  >
                    <div className="bg-dark/40 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Key Factor</div>
                      <div className="font-medium">
                        {sport === 'football' ? 'Home Team Form' : 
                         sport === 'basketball' ? 'Rebounding Edge' : 
                         'QB Rating Difference'}
                      </div>
                    </div>
                    
                    <div className={`bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}/10 p-3 rounded-lg`}>
                      <div className="text-xs text-gray-400 mb-1">AI Recommendation</div>
                      <div className={`font-medium text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'}`}>
                        {sport === 'football' ? 'Home Win or Draw' : 
                         sport === 'basketball' ? 'Under 220.5 Points' : 
                         'Home -3.5 Points'}
                      </div>
                    </div>
                    
                    <div className="bg-dark/40 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Edge Factor</div>
                      <div className="font-medium flex items-center">
                        <Star size={14} className={`mr-1 text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'}`} />
                        {sport === 'football' ? '8.7%' : 
                         sport === 'basketball' ? '6.2%' : 
                         '10.5%'}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="stats" className="m-0">
            <motion.div
              variants={containerVariants}
              key="stats"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Card className="border border-dark-border bg-dark-lighter/50 overflow-hidden">
                <CardContent className="p-6">
                  <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-medium mb-4">Key Performance Stats</h3>
                    <div className="h-72">
                      <Bar 
                        data={getKeyStatsData()} 
                        options={{
                          ...chartOptions,
                          indexAxis: 'y' as const,
                          maintainAspectRatio: false,
                        }} 
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    variants={itemVariants}
                  >
                    <div className="bg-dark/40 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-2">Head to Head</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>{getTeamNames().home} Wins</span>
                          <span className="font-medium">
                            {sport === 'football' ? '5' : sport === 'basketball' ? '8' : '7'}
                          </span>
                        </div>
                        {sport === 'football' && (
                          <div className="flex justify-between">
                            <span>Draws</span>
                            <span className="font-medium">3</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>{getTeamNames().away} Wins</span>
                          <span className="font-medium">
                            {sport === 'football' ? '2' : sport === 'basketball' ? '7' : '3'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark/40 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-2">Recent Form (Last 5)</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="block mb-1">{getTeamNames().home}</span>
                          <div className="flex gap-1">
                            {['W', 'W', 'L', 'W', 'W'].map((result, i) => (
                              <Badge 
                                key={i}
                                className={`${result === 'W' ? `bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'} text-black` : 'bg-gray-700 text-white'}`}
                              >
                                {result}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="block mb-1">{getTeamNames().away}</span>
                          <div className="flex gap-1">
                            {['W', 'L', 'W', 'L', 'D'].map((result, i) => (
                              <Badge 
                                key={i}
                                className={`${result === 'W' ? 'bg-gray-300 text-black' : result === 'D' ? 'bg-gray-500 text-white' : 'bg-gray-700 text-white'}`}
                              >
                                {result}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark/40 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-2">Key Factors</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className={`inline-block w-2 h-2 mt-1.5 rounded-full bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}`}></span>
                          {sport === 'football' ? 'Home team unbeaten in last 8 home games' : 
                           sport === 'basketball' ? 'Home team has 3rd best offense in league' : 
                           'Home QB has 115.8 rating (top 5)'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-gray-500"></span>
                          {sport === 'football' ? 'Away team missing key defender' : 
                           sport === 'basketball' ? 'Away team on 2nd night of back-to-back' : 
                           'Away team allowing 28+ pts in last 3 games'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className={`inline-block w-2 h-2 mt-1.5 rounded-full bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}`}></span>
                          {sport === 'football' ? '67% of matches between these teams have seen over 2.5 goals' : 
                           sport === 'basketball' ? '7 of last 10 meetings went under total' : 
                           'Home team 5-0 ATS as favorites this season'}
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="bets" className="m-0">
            <motion.div
              variants={containerVariants}
              key="bets"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Card className="border border-dark-border bg-dark-lighter/50 overflow-hidden">
                <CardContent className="p-6">
                  <motion.div
                    variants={itemVariants} 
                    className={`p-5 mb-6 rounded-xl border bg-gradient-to-br from-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}/20 to-dark-card/60 border-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}/30`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <Badge className={`bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}/30 text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'} mb-2`}>
                          AI Top Pick
                        </Badge>
                        <h3 className="text-2xl font-bold mb-1">{getRecommendedBet().bet}</h3>
                        <p className="text-gray-400">Best odds: <span className="font-medium text-white">{getRecommendedBet().odds}</span></p>
                      </div>
                      <div className="text-center self-center">
                        <div className="text-sm text-gray-400 mb-1">Confidence</div>
                        <div className={`inline-block rounded-full w-16 h-16 border-4 border-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'} flex items-center justify-center`}>
                          <span className={`text-xl font-bold text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'}`}>
                            {getRecommendedBet().confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                  >
                    <div className="bg-dark/40 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-3">Value Bet</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium mb-1">{getValueBet().bet}</p>
                          <p className="text-gray-400 text-sm">Odds: {getValueBet().odds}</p>
                        </div>
                        <Badge className={`bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}/20 text-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-400' : 'neon-blue'}`}>
                          {getValueBet().value} Value
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-dark/40 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-3">Also Consider</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>{getTeamNames().home} {sport === 'football' ? 'to win to nil' : sport === 'basketball' ? '+5.5 pts' : '-7.5 pts'}</span>
                          <span className="font-medium">{sport === 'football' ? '3.50' : sport === 'basketball' ? '1.90' : '2.10'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>
                            {sport === 'football' ? 'Under 3.5 goals' : 
                             sport === 'basketball' ? 'First quarter over 55.5' : 
                             'First half under 24.5'}
                          </span>
                          <span className="font-medium">{sport === 'football' ? '1.85' : sport === 'basketball' ? '2.00' : '1.95'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    className="bg-dark/40 p-4 rounded-lg"
                  >
                    <h4 className="text-sm text-gray-400 mb-3">AI Reasoning</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      {sport === 'football' ? 
                        'Our AI has detected a strong pattern in home team performances with 80% of their recent home matches seeing over 2.5 goals. The away team has also conceded in 7 of their last 8 away fixtures.' : 
                        sport === 'basketball' ? 
                        'Based on pace metrics and defensive efficiency ratings, this matchup projects to go under the total. The home team plays at a bottom-5 pace, and the away team is missing their starting shooting guard.' : 
                        'Home team has been consistently covering spreads under 7 points at home (6-1 ATS). Their defensive line has allowed just 16.3 points per game at home this season compared to 27.8 points on the road.'}
                    </p>
                    <div className="text-xs text-gray-400">
                      <span className="block mb-1">Data points analyzed: {sport === 'football' ? '5,428' : sport === 'basketball' ? '7,831' : '4,652'}</span>
                      <div className={`h-1 w-full bg-dark-border overflow-hidden rounded-full mb-1`}>
                        <div className={`h-full bg-${sport === 'basketball' ? 'neon-lime' : sport === 'americanFootball' ? 'purple-500' : 'neon-blue'}`} style={{ width: `${getRecommendedBet().confidence}%` }}></div>
                      </div>
                      <span>Last updated: 2 hours ago</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default PredictionVisualizer;
