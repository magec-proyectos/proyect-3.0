
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Star,
  MapPin,
  TrendingUp,
  Save,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Featured competitions data
const featuredCompetitions = [
  { name: 'Champions League', flag: '🇪🇺', isLive: true },
  { name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', isLive: false },
  { name: 'La Liga', flag: '🇪🇸', isLive: true },
  { name: 'Bundesliga', flag: '🇩🇪', isLive: false },
  { name: 'Serie A', flag: '🇮🇹', isLive: true }
];

// Countries data
const countries = [
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Italy', flag: '🇮🇹' }
];

// Sports data with their competitions
const sportsData = [
  {
    name: 'Football', 
    icon: '⚽',
    expanded: false,
    competitions: [
      { name: 'View all', hasArrow: true },
      { name: 'Champions League', flag: '🇪🇺' },
      { name: 'Bundesliga', flag: '🇩🇪' },
      { name: 'Saudi Pro League', flag: '🇸🇦' },
      { name: 'Parva Liga', flag: '🇧🇬' },
      { name: 'Süper Lig', flag: '🇹🇷' },
      { name: 'Segunda División', flag: '🇪🇸' },
      { name: 'Allsvenskan', flag: '🇸🇪' },
      { name: 'MultiFootball', icon: '⚽' }
    ],
    hasCountries: true
  },
  {
    name: 'Tennis',
    icon: '🎾',
    expanded: false,
    competitions: [
      { name: 'ATP - Roland Garros', flag: '🇫🇷' },
      { name: 'WTA - Roland Garros', flag: '🇫🇷' }
    ],
    hasCountries: false
  },
  {
    name: 'Basketball',
    icon: '🏀',
    expanded: false,
    competitions: [
      { name: 'View all', hasArrow: true },
      { name: 'NBA', flag: '🇺🇸' },
      { name: 'Liga ABA', flag: '🇪🇺' },
      { name: 'BNXT League', flag: '🇪🇺' },
      { name: 'BBL', flag: '🇩🇪' },
      { name: 'Pro A', flag: '🇫🇷' },
      { name: 'LegaBasket Serie A', flag: '🇮🇹' }
    ],
    hasCountries: true
  },
  {
    name: 'Motor Racing',
    icon: '🏎️',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Handball',
    icon: '🤾',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Baseball',
    icon: '⚾',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Biathlon',
    icon: '🎿',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Boxing',
    icon: '🥊',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Cycling',
    icon: '🚴',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Cricket',
    icon: '🏏',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Darts',
    icon: '🎯',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'Specials',
    icon: '✨',
    expanded: false,
    competitions: [],
    hasCountries: false
  },
  {
    name: 'ESports',
    icon: '🎮',
    expanded: false,
    competitions: [],
    hasCountries: false
  }
];

const EnhancedSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSports, setExpandedSports] = useState<string[]>([]);
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

  const toggleSport = (sportName: string) => {
    setExpandedSports(prev => 
      prev.includes(sportName) 
        ? prev.filter(name => name !== sportName)
        : [...prev, sportName]
    );
  };

  const toggleCountries = (sportName: string) => {
    const countryKey = `${sportName}-countries`;
    setExpandedCountries(prev => 
      prev.includes(countryKey) 
        ? prev.filter(name => name !== countryKey)
        : [...prev, countryKey]
    );
  };

  return (
    <Card className="bg-dark-card border-dark-border h-fit sticky top-6">
      <CardContent className="p-0">
        {/* Search Bar */}
        <div className="p-4 border-b border-dark-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search sports, leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-lighter border-dark-border text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Quick Access Menu */}
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-white font-semibold mb-3 text-sm">Quick access</h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto text-left hover:bg-dark-lighter group"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm group-hover:text-white">Trending</span>
              </div>
              <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white ml-auto" />
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto text-left hover:bg-dark-lighter group"
            >
              <div className="flex items-center gap-3">
                <Save className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm group-hover:text-white">Favorites</span>
              </div>
              <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white ml-auto" />
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto text-left hover:bg-dark-lighter group"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-red-400" />
                <span className="text-gray-300 text-sm group-hover:text-white">Live</span>
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5 ml-1">
                  24
                </Badge>
              </div>
              <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white ml-auto" />
            </Button>
          </div>
        </div>

        {/* Featured Competitions */}
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-white font-semibold mb-3 text-sm">Featured competitions</h3>
          <div className="space-y-1">
            {featuredCompetitions.map((competition, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between p-2 h-auto text-left hover:bg-dark-lighter group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{competition.flag}</span>
                  <span className="text-gray-300 text-sm group-hover:text-white">
                    {competition.name}
                  </span>
                  {competition.isLive && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      Live
                    </Badge>
                  )}
                </div>
                <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white" />
              </Button>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div className="p-4">
          <h3 className="text-white font-semibold mb-3 text-sm">Sports</h3>
          
          <div className="space-y-1">
            {sportsData.map((sport) => (
              <div key={sport.name}>
                {/* Sport Header */}
                <Button
                  variant="ghost"
                  onClick={() => sport.competitions.length > 0 && toggleSport(sport.name)}
                  className="w-full justify-between p-2 h-auto text-left hover:bg-dark-lighter"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{sport.icon}</span>
                    <span className="text-gray-300 text-sm font-medium">{sport.name}</span>
                  </div>
                  {sport.competitions.length > 0 && (
                    expandedSports.includes(sport.name) ? 
                      <ChevronUp className="h-3 w-3 text-gray-400" /> : 
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                  )}
                </Button>

                {/* Competitions and Countries */}
                <AnimatePresence>
                  {expandedSports.includes(sport.name) && sport.competitions.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-0.5">
                        {/* Competitions */}
                        {sport.competitions.map((competition, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-between p-1.5 h-auto text-left hover:bg-dark/50 group"
                          >
                            <div className="flex items-center gap-2">
                              {competition.flag && (
                                <span className="text-xs">{competition.flag}</span>
                              )}
                              {competition.icon && (
                                <span className="text-xs">{competition.icon}</span>
                              )}
                              <span className="text-gray-400 text-xs group-hover:text-gray-300">
                                {competition.name}
                              </span>
                            </div>
                            {competition.hasArrow && (
                              <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-gray-300" />
                            )}
                          </Button>
                        ))}
                        
                        {/* Countries Section for sports that have it */}
                        {sport.hasCountries && (
                          <>
                            <Separator className="my-2 bg-dark-border" />
                            <Button
                              variant="ghost"
                              onClick={() => toggleCountries(sport.name)}
                              className="w-full justify-between p-1.5 h-auto text-left hover:bg-dark/50"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-gray-400 text-xs font-medium">Countries</span>
                              </div>
                              {expandedCountries.includes(`${sport.name}-countries`) ? 
                                <ChevronUp className="h-3 w-3 text-gray-400" /> : 
                                <ChevronDown className="h-3 w-3 text-gray-400" />
                              }
                            </Button>

                            <AnimatePresence>
                              {expandedCountries.includes(`${sport.name}-countries`) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 space-y-0.5">
                                    {countries.map((country, index) => (
                                      <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-between p-1 h-auto text-left hover:bg-dark/30 group"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs">{country.flag}</span>
                                          <span className="text-gray-500 text-xs group-hover:text-gray-400">
                                            {country.name}
                                          </span>
                                        </div>
                                        <ChevronDown className="h-2 w-2 text-gray-500" />
                                      </Button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSidebar;
