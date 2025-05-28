
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Star, TrendingUp, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';
import { Stack, Inline, Spacing } from '@/components/ui/enhanced-spacing';
import { HoverEffect, ScrollReveal, StateTransition } from '@/components/ui/advanced-micro-interactions';
import { useColorTheme } from '@/hooks/useColorTheme';
import LiveSearch from './LiveSearch';
import AdvancedFilters from './AdvancedFilters';

const EnhancedMatchSelection = () => {
  const { 
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMatch,
    setSelectedMatch,
    leagues,
    filteredMatches,
    favoriteTeams,
    favoriteLeagues,
    toggleFavoriteTeam,
    toggleFavoriteLeague,
    isLoading
  } = useFootball();

  const colorTheme = useColorTheme();

  const handleFindMatch = () => {
    console.log('Finding match:', selectedMatch);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 70) return colorTheme.getStateColor('success');
    if (confidence > 50) return colorTheme.getStateColor('warning');
    return colorTheme.getStateColor('error');
  };

  const getFormBadgeColor = (result: 'W' | 'L' | 'D' | 'w' | 'l' | 'd') => {
    const upperResult = result.toUpperCase();
    switch (upperResult) {
      case 'W': return colorTheme.getStateColor('success');
      case 'L': return colorTheme.getStateColor('error');
      case 'D': return colorTheme.getStateColor('warning');
      default: return 'hsl(0, 0%, 50%)';
    }
  };

  const currentTheme = selectedSport ? colorTheme.getSportTheme(selectedSport as any) : colorTheme.getSportTheme('football');

  return (
    <Stack gap="3xl" className="max-w-4xl mx-auto">
      {/* Sport Selection */}
      <ScrollReveal direction="up" delay={0.1}>
        <Card 
          className="border-0"
          style={colorTheme.getGlassEffect(selectedSport as any)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5" style={{ color: currentTheme.primary }} />
              Select Sport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'football', name: 'Football', icon: '⚽' },
                { id: 'basketball', name: 'Basketball', icon: '🏀' },
                { id: 'americanFootball', name: 'American Football', icon: '🏈' }
              ].map((sport) => (
                <HoverEffect key={sport.id} variant="lift" intensity="moderate">
                  <Button
                    variant={selectedSport === sport.id ? "default" : "outline"}
                    onClick={() => setSelectedSport(sport.id as any)}
                    className="h-16 w-full relative overflow-hidden"
                    style={selectedSport === sport.id ? {
                      backgroundColor: currentTheme.primary,
                      color: currentTheme.background,
                      borderColor: currentTheme.primary
                    } : {
                      backgroundColor: 'transparent',
                      color: currentTheme.text.secondary,
                      borderColor: currentTheme.border
                    }}
                  >
                    <Stack gap="sm" align="center" className="z-10 relative">
                      <span className="text-2xl">{sport.icon}</span>
                      <span className="text-sm font-medium">{sport.name}</span>
                    </Stack>
                  </Button>
                </HoverEffect>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Live Search */}
      <ScrollReveal direction="up" delay={0.2}>
        <LiveSearch />
      </ScrollReveal>

      {/* Advanced Filters */}
      <ScrollReveal direction="up" delay={0.3}>
        <AdvancedFilters />
      </ScrollReveal>

      {/* League Selection */}
      <ScrollReveal direction="up" delay={0.4}>
        <Card 
          className="border-0"
          style={colorTheme.getGlassEffect(selectedSport as any)}
        >
          <CardHeader>
            <Inline justify="between" align="center">
              <Inline gap="sm" align="center">
                <TrendingUp className="h-5 w-5" style={{ color: currentTheme.primary }} />
                <span className="text-white font-semibold">Select League</span>
              </Inline>
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ 
                  borderColor: currentTheme.border,
                  color: currentTheme.text.secondary 
                }}
              >
                {leagues.length} available
              </Badge>
            </Inline>
          </CardHeader>
          <CardContent>
            <HoverEffect variant="glow" intensity="subtle">
              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger 
                  className="h-12 border-0"
                  style={{
                    backgroundColor: currentTheme.surface,
                    borderColor: currentTheme.border,
                    color: currentTheme.text.primary
                  }}
                >
                  <SelectValue placeholder="Choose a league" />
                </SelectTrigger>
                <SelectContent 
                  style={{
                    backgroundColor: currentTheme.background,
                    borderColor: currentTheme.border
                  }}
                >
                  {leagues.map((league) => (
                    <SelectItem 
                      key={league.id} 
                      value={league.id}
                      className="focus:bg-transparent"
                      style={{ color: currentTheme.text.primary }}
                    >
                      <Inline gap="md" align="center" className="w-full">
                        <img src={league.logo} alt={league.name} className="w-5 h-5" />
                        <span>{league.name}</span>
                        <span 
                          className="text-xs"
                          style={{ color: currentTheme.text.muted }}
                        >
                          ({league.country})
                        </span>
                        <HoverEffect variant="scale" intensity="subtle">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavoriteLeague(league.id);
                            }}
                            className="p-1 h-auto ml-auto"
                          >
                            <Star 
                              className={`h-3 w-3 ${
                                favoriteLeagues.includes(league.id) 
                                  ? 'fill-yellow-500 text-yellow-500' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </Button>
                        </HoverEffect>
                      </Inline>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </HoverEffect>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Enhanced Match List */}
      <ScrollReveal direction="up" delay={0.5}>
        <Card 
          className="border-0"
          style={colorTheme.getGlassEffect(selectedSport as any)}
        >
          <CardHeader>
            <Inline justify="between" align="center">
              <Inline gap="sm" align="center">
                <Calendar className="h-5 w-5" style={{ color: currentTheme.primary }} />
                <span className="text-white font-semibold">Available Matches</span>
              </Inline>
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ 
                  borderColor: currentTheme.border,
                  color: currentTheme.text.secondary 
                }}
              >
                {filteredMatches.length} matches
              </Badge>
            </Inline>
          </CardHeader>
          <CardContent>
            <StateTransition state={isLoading ? 'loading' : 'idle'}>
              {isLoading ? (
                <Stack gap="md">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="animate-pulse rounded-lg h-24"
                      style={{ backgroundColor: currentTheme.surface }}
                    />
                  ))}
                </Stack>
              ) : filteredMatches.length === 0 ? (
                <Spacing p="4xl" className="text-center">
                  <Stack gap="md" align="center">
                    <Calendar className="h-12 w-12 opacity-50" style={{ color: currentTheme.text.muted }} />
                    <p style={{ color: currentTheme.text.muted }}>No matches found with current filters</p>
                  </Stack>
                </Spacing>
              ) : (
                <Stack gap="md" className="max-h-96 overflow-y-auto">
                  {filteredMatches.map((match, index) => (
                    <ScrollReveal key={match.id} direction="up" delay={index * 0.1}>
                      <HoverEffect variant="lift" intensity="subtle">
                        <motion.div
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedMatch === match.id ? 'border-opacity-100' : 'border-opacity-30'
                          }`}
                          style={{
                            backgroundColor: currentTheme.surface,
                            borderColor: selectedMatch === match.id 
                              ? currentTheme.primary 
                              : currentTheme.border
                          }}
                          onClick={() => setSelectedMatch(match.id)}
                        >
                          <Stack gap="md">
                            <Inline justify="between" align="center">
                              <Inline gap="md" align="center">
                                <Inline gap="sm" align="center">
                                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
                                  <Stack gap="xs">
                                    <div className="font-medium text-sm" style={{ color: currentTheme.text.primary }}>
                                      {match.homeTeam.name}
                                    </div>
                                    <Inline gap="xs">
                                      {match.homeTeam.form.slice(0, 5).map((result, idx) => (
                                        <div
                                          key={idx}
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: getFormBadgeColor(result) }}
                                        />
                                      ))}
                                    </Inline>
                                  </Stack>
                                </Inline>
                                
                                <div className="text-sm mx-4" style={{ color: currentTheme.text.muted }}>vs</div>
                                
                                <Inline gap="sm" align="center">
                                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
                                  <Stack gap="xs">
                                    <div className="font-medium text-sm" style={{ color: currentTheme.text.primary }}>
                                      {match.awayTeam.name}
                                    </div>
                                    <Inline gap="xs">
                                      {match.awayTeam.form.slice(0, 5).map((result, idx) => (
                                        <div
                                          key={idx}
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: getFormBadgeColor(result) }}
                                        />
                                      ))}
                                    </Inline>
                                  </Stack>
                                </Inline>
                              </Inline>
                              
                              <HoverEffect variant="scale" intensity="subtle">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavoriteTeam(match.homeTeam.id);
                                  }}
                                  className="p-1 h-auto"
                                >
                                  <Heart 
                                    className={`h-4 w-4 ${
                                      favoriteTeams.includes(match.homeTeam.id) 
                                        ? 'fill-red-500 text-red-500' 
                                        : 'text-gray-400'
                                    }`} 
                                  />
                                </Button>
                              </HoverEffect>
                            </Inline>
                            
                            <Inline justify="between" align="center" className="text-xs">
                              <Inline gap="lg" align="center">
                                <Inline gap="xs" align="center">
                                  <Calendar className="h-3 w-3" style={{ color: currentTheme.text.muted }} />
                                  <span style={{ color: currentTheme.text.muted }}>
                                    {match.date} at {match.time}
                                  </span>
                                </Inline>
                                <Inline gap="xs" align="center">
                                  <MapPin className="h-3 w-3" style={{ color: currentTheme.text.muted }} />
                                  <span style={{ color: currentTheme.text.muted }}>{match.league}</span>
                                </Inline>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{ 
                                    borderColor: currentTheme.border,
                                    color: currentTheme.text.secondary 
                                  }}
                                >
                                  {match.league}
                                </Badge>
                              </Inline>
                              
                              <Inline gap="sm" align="center">
                                <span style={{ color: currentTheme.text.secondary }}>
                                  Odds: {match.homeOdds}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{ 
                                    borderColor: getConfidenceColor(match.predictions.confidence),
                                    color: getConfidenceColor(match.predictions.confidence)
                                  }}
                                >
                                  {Math.round(match.predictions.confidence)}% confidence
                                </Badge>
                              </Inline>
                            </Inline>
                          </Stack>
                        </motion.div>
                      </HoverEffect>
                    </ScrollReveal>
                  ))}
                </Stack>
              )}
            </StateTransition>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Action Button */}
      {selectedMatch && (
        <ScrollReveal direction="up" delay={0.6}>
          <HoverEffect variant="lift" intensity="strong">
            <Button 
              onClick={handleFindMatch}
              className="w-full h-12 font-medium text-lg relative overflow-hidden"
              style={{
                backgroundColor: currentTheme.primary,
                color: currentTheme.background
              }}
            >
              View Match Analysis
            </Button>
          </HoverEffect>
        </ScrollReveal>
      )}
    </Stack>
  );
};

export default EnhancedMatchSelection;
