
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
  Zap,
  Calendar,
  Award
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
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
            <Input
              type="text"
              placeholder="Buscar deportes, ligas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 rounded-xl focus:border-blue-400 transition-all duration-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Menu */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/40 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-xl p-4 cursor-pointer group hover:from-blue-600/30 hover:to-blue-700/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Próximos partidos</span>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-xl p-4 cursor-pointer group hover:from-purple-600/30 hover:to-purple-700/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">Promos</span>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-xl p-4 cursor-pointer group hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-red-400" />
                  <span className="text-white font-medium">Live</span>
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                    24
                  </Badge>
                </div>
                <ArrowRight className="h-4 w-4 text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Competitions */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 px-1">Competiciones destacadas</h3>
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/40 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="space-y-2">
              {featuredCompetitions.map((competition, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-700/40 hover:bg-slate-600/50 border border-slate-600/30 rounded-lg p-3 cursor-pointer group transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚽</span>
                        <span className="text-sm">{competition.flag}</span>
                      </div>
                      <span className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                        {competition.name}
                      </span>
                      {competition.isLive && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                          Live
                        </Badge>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sports Section */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 px-1">Deportes</h3>
        
        <div className="space-y-3">
          {sportsData.map((sport) => (
            <Card key={sport.name} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/40 backdrop-blur-md overflow-hidden">
              <CardContent className="p-0">
                {/* Sport Header */}
                <Button
                  variant="ghost"
                  onClick={() => sport.competitions.length > 0 && toggleSport(sport.name)}
                  className="w-full justify-between p-4 h-auto text-left hover:bg-slate-700/50 rounded-none border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{sport.icon}</span>
                    <span className="text-white text-sm font-semibold">{sport.name}</span>
                  </div>
                  {sport.competitions.length > 0 && (
                    expandedSports.includes(sport.name) ? 
                      <ChevronUp className="h-4 w-4 text-slate-400" /> : 
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </Button>

                {/* Competitions and Countries */}
                <AnimatePresence>
                  {expandedSports.includes(sport.name) && sport.competitions.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-800/30"
                    >
                      <div className="p-4 pt-0 space-y-2">
                        {/* Competitions */}
                        {sport.competitions.map((competition, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-between p-3 h-auto text-left hover:bg-slate-700/30 rounded-lg group"
                          >
                            <div className="flex items-center gap-3">
                              {competition.flag && (
                                <span className="text-sm">{competition.flag}</span>
                              )}
                              {competition.icon && (
                                <span className="text-sm">{competition.icon}</span>
                              )}
                              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                                {competition.name}
                              </span>
                            </div>
                            {competition.hasArrow && (
                              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            )}
                          </Button>
                        ))}
                        
                        {/* Countries Section for sports that have it */}
                        {sport.hasCountries && (
                          <>
                            <Separator className="my-3 bg-slate-600/50" />
                            <Button
                              variant="ghost"
                              onClick={() => toggleCountries(sport.name)}
                              className="w-full justify-between p-3 h-auto text-left hover:bg-slate-700/30 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-300 text-sm font-medium">Countries</span>
                              </div>
                              {expandedCountries.includes(`${sport.name}-countries`) ? 
                                <ChevronUp className="h-3 w-3 text-slate-400" /> : 
                                <ChevronDown className="h-3 w-3 text-slate-400" />
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
                                  <div className="pl-4 space-y-1">
                                    {countries.map((country, index) => (
                                      <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-between p-2 h-auto text-left hover:bg-slate-700/20 rounded-md group"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs">{country.flag}</span>
                                          <span className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
                                            {country.name}
                                          </span>
                                        </div>
                                        <ChevronDown className="h-3 w-3 text-slate-500" />
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSidebar;
