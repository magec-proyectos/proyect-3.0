
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const InteractiveBetField = () => {
  const { filteredMatches, leagues, selectedLeague, setSelectedLeague } = useFootball();
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('today');

  const toggleMatchExpansion = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  const getFormIcon = (form: readonly ('w' | 'l' | 'd' | 'W' | 'L' | 'D')[]) => {
    const recentForm = form.slice(0, 3);
    const wins = recentForm.filter(result => result.toUpperCase() === 'W').length;
    
    if (wins >= 2) return '🔥';
    if (wins === 1) return '📈';
    return '📉';
  };

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Interactive Betting Panel</span>
          <Badge variant="outline" className="text-neon-blue border-neon-blue">
            {filteredMatches.length} matches
          </Badge>
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="bg-dark-lighter border-dark-border">
              <SelectValue placeholder="Select League" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-dark-border text-white">
              <SelectItem value="all">All Leagues</SelectItem>
              {leagues.map((league) => (
                <SelectItem key={league.id} value={league.id}>
                  {league.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="bg-dark-lighter border-dark-border">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-dark-border text-white">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-dark-border">
                <TableHead className="text-gray-300">Match</TableHead>
                <TableHead className="text-gray-300 text-center">Form</TableHead>
                <TableHead className="text-gray-300 text-center">1</TableHead>
                <TableHead className="text-gray-300 text-center">X</TableHead>
                <TableHead className="text-gray-300 text-center">2</TableHead>
                <TableHead className="text-gray-300 text-center">AI</TableHead>
                <TableHead className="text-gray-300 text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <React.Fragment key={match.id}>
                  <TableRow className="border-dark-border hover:bg-dark-lighter/50">
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <img src={match.homeTeam.logo} alt="" className="w-6 h-6" />
                          <span className="font-medium">{match.homeTeam.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={match.awayTeam.logo} alt="" className="w-6 h-6" />
                          <span className="font-medium">{match.awayTeam.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <div className="flex justify-center gap-1">
                          {match.homeTeam.form.slice(0, 3).map((result, idx) => (
                            <div 
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                result.toUpperCase() === 'W' ? 'bg-green-500' :
                                result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs">{getFormIcon(match.homeTeam.form)}</div>
                        <div className="flex justify-center gap-1">
                          {match.awayTeam.form.slice(0, 3).map((result, idx) => (
                            <div 
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                result.toUpperCase() === 'W' ? 'bg-green-500' :
                                result.toUpperCase() === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-dark-lighter border-gray-600 hover:border-neon-blue hover:bg-neon-blue/10"
                      >
                        {match.homeOdds}
                      </Button>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-dark-lighter border-gray-600 hover:border-neon-blue hover:bg-neon-blue/10"
                      >
                        {match.drawOdds}
                      </Button>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-dark-lighter border-gray-600 hover:border-neon-blue hover:bg-neon-blue/10"
                      >
                        {match.awayOdds}
                      </Button>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-neon-lime" />
                        <span className="text-sm font-medium text-neon-lime">
                          {match.predictions.confidence}%
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleMatchExpansion(match.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedMatch === match.id ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  <AnimatePresence>
                    {expandedMatch === match.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-dark-border"
                      >
                        <TableCell colSpan={7} className="bg-dark-lighter/50">
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-neon-blue">
                                  {match.homeTeam.stats.possession}%
                                </div>
                                <div className="text-xs text-gray-400">Avg. Possession</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-neon-lime">
                                  {match.homeTeam.stats.goals.for}
                                </div>
                                <div className="text-xs text-gray-400">Goals For</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-red-400">
                                  {match.homeTeam.stats.goals.against}
                                </div>
                                <div className="text-xs text-gray-400">Goals Against</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-yellow-400">
                                  {match.homeTeam.stats.xG}
                                </div>
                                <div className="text-xs text-gray-400">xG per Game</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-center">
                              <Button 
                                size="sm" 
                                className="bg-neon-blue text-black hover:bg-neon-blue/90"
                              >
                                <Info className="h-4 w-4 mr-2" />
                                View Full Analysis
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveBetField;
