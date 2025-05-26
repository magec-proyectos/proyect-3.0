
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Filter, ChevronDown, Star, Heart, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const AdvancedFilters = () => {
  const { 
    filters, 
    setFilters, 
    favoriteTeams, 
    favoriteLeagues, 
    toggleFavoriteTeam, 
    toggleFavoriteLeague,
    leagues,
    filteredMatches 
  } = useFootball();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      minOdds: 1.0,
      maxOdds: 10.0,
      confidence: 0
    });
    setShowFavoritesOnly(false);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== 1.0 && value !== 10.0 && value !== 0
  ).length + (showFavoritesOnly ? 1 : 0);

  return (
    <Card className="bg-dark-card border-dark-border mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-dark-lighter transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-neon-blue" />
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
                {activeFiltersCount > 0 && (
                  <Badge variant="outline" className="bg-neon-blue text-black">
                    {activeFiltersCount} active
                  </Badge>
                )}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="text-xs"
              >
                <Heart className="h-3 w-3 mr-1" />
                Favorites Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Filter */}
              <div className="space-y-2">
                <Label htmlFor="date-filter">Match Date</Label>
                <Input
                  id="date-filter"
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="bg-dark-lighter border-dark-border"
                />
              </div>

              {/* League Filter */}
              <div className="space-y-2">
                <Label>League</Label>
                <Select onValueChange={(value) => handleFilterChange('league', value)}>
                  <SelectTrigger className="bg-dark-lighter border-dark-border">
                    <SelectValue placeholder="All leagues" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark border-dark-border">
                    <SelectItem value="all">All leagues</SelectItem>
                    {leagues.map((league) => (
                      <SelectItem key={league.id} value={league.id}>
                        <div className="flex items-center gap-2">
                          {favoriteLeagues.includes(league.id) && (
                            <Star className="h-3 w-3 text-yellow-500" />
                          )}
                          {league.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Odds Range */}
              <div className="space-y-2">
                <Label>Odds Range</Label>
                <div className="px-3">
                  <Slider
                    value={[filters.minOdds, filters.maxOdds]}
                    onValueChange={([min, max]) => {
                      handleFilterChange('minOdds', min);
                      handleFilterChange('maxOdds', max);
                    }}
                    min={1.0}
                    max={20.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{filters.minOdds}</span>
                    <span>{filters.maxOdds}</span>
                  </div>
                </div>
              </div>

              {/* Confidence Filter */}
              <div className="space-y-2">
                <Label>Min Confidence</Label>
                <div className="px-3">
                  <Slider
                    value={[filters.confidence]}
                    onValueChange={([value]) => handleFilterChange('confidence', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    {filters.confidence}%
                  </div>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="pt-4 border-t border-dark-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Showing {filteredMatches.length} matches
                </span>
                {activeFiltersCount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdvancedFilters;
