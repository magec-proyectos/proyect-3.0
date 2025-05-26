
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const SmartFilters = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    leagues 
  } = useFootball();
  
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [smartSearchSuggestions] = useState([
    "Find me matches where underdogs often win",
    "High-scoring games this weekend",
    "Teams with strong home form",
    "Matches with both teams to score likely",
    "Low-risk high-confidence bets"
  ]);

  const handleSmartSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const clearAllFilters = () => {
    setFilters({
      date: '',
      minOdds: 1.0,
      maxOdds: 10.0,
      confidence: 0
    });
    setSearchQuery('');
    setActiveFilters([]);
  };

  const addFilter = (filterType: string, value: string) => {
    const filterTag = `${filterType}: ${value}`;
    if (!activeFilters.includes(filterTag)) {
      setActiveFilters([...activeFilters, filterTag]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-neon-lime" />
          AI Smart Filters & Search
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* AI Smart Search */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Ask AI to find specific matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-lighter border-dark-border text-white placeholder-gray-400"
            />
            <Button 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neon-lime text-black hover:bg-neon-lime/90"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Smart Search Suggestions */}
          <div className="flex flex-wrap gap-2">
            {smartSearchSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSmartSearch(suggestion)}
                  className="text-xs bg-dark-lighter border-gray-600 hover:border-neon-lime hover:bg-neon-lime/10 text-gray-300"
                >
                  {suggestion}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traditional Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* League Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">League</label>
            <Select onValueChange={(value) => addFilter('League', value)}>
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select League" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                {leagues.map((league) => (
                  <SelectItem key={league.id} value={league.name}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bet Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Bet Type</label>
            <Select onValueChange={(value) => addFilter('Bet Type', value)}>
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select Bet Type" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                <SelectItem value="1x2">Match Winner (1X2)</SelectItem>
                <SelectItem value="over-under">Over/Under Goals</SelectItem>
                <SelectItem value="btts">Both Teams to Score</SelectItem>
                <SelectItem value="handicap">Asian Handicap</SelectItem>
                <SelectItem value="corners">Corners</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Risk Level Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Risk Level</label>
            <Select onValueChange={(value) => addFilter('Risk', value)}>
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select Risk" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Date Range</label>
            <Select onValueChange={(value) => addFilter('Date', value)}>
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="weekend">This Weekend</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Odds Range Slider */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Odds Range</label>
          <div className="px-3">
            <Slider
              value={[filters.minOdds, filters.maxOdds]}
              onValueChange={([min, max]) => setFilters({ ...filters, minOdds: min, maxOdds: max })}
              max={10}
              min={1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{filters.minOdds.toFixed(1)}</span>
              <span>{filters.maxOdds.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Confidence Slider */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Minimum AI Confidence: {filters.confidence}%
          </label>
          <div className="px-3">
            <Slider
              value={[filters.confidence]}
              onValueChange={([value]) => setFilters({ ...filters, confidence: value })}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">Active Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-gray-400 hover:text-white"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-neon-blue/10 border-neon-blue text-neon-blue"
                >
                  {filter}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter)}
                    className="ml-2 h-auto p-0 text-neon-blue hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartFilters;
