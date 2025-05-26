
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

// Sports data with their competitions
const sportsData = [
  {
    name: 'Fútbol', 
    icon: '⚽',
    expanded: false,
    competitions: [
      { name: 'Ver todo', hasArrow: true },
      { name: 'Champions League', flag: '🇪🇺' },
      { name: 'Bundesliga', flag: '🇩🇪' },
      { name: 'Saudi Pro League', flag: '🇸🇦' },
      { name: 'Parva Liga', flag: '🇧🇬' },
      { name: 'Süper Lig', flag: '🇹🇷' },
      { name: 'Segunda División', flag: '🇪🇸' },
      { name: 'Allsvenskan', flag: '🇸🇪' },
      { name: 'MultiFútbol', icon: '⚽' }
    ]
  },
  {
    name: 'Tenis',
    icon: '🎾',
    expanded: false,
    competitions: [
      { name: 'ATP - Roland Garros', flag: '🇫🇷' },
      { name: 'WTA - Roland Garros', flag: '🇫🇷' }
    ]
  },
  {
    name: 'Baloncesto',
    icon: '🏀',
    expanded: false,
    competitions: [
      { name: 'Ver todo', hasArrow: true },
      { name: 'NBA', flag: '🇺🇸' },
      { name: 'Liga ABA', flag: '🇪🇺' },
      { name: 'BNXT League', flag: '🇪🇺' },
      { name: 'BBL', flag: '🇩🇪' },
      { name: 'Pro A', flag: '🇫🇷' },
      { name: 'LegaBasket Serie A', flag: '🇮🇹' }
    ]
  },
  {
    name: 'Automovilismo',
    icon: '🏎️',
    expanded: false,
    competitions: []
  },
  {
    name: 'Balonmano',
    icon: '🤾',
    expanded: false,
    competitions: []
  },
  {
    name: 'Béisbol',
    icon: '⚾',
    expanded: false,
    competitions: []
  },
  {
    name: 'Biatlón',
    icon: '🎿',
    expanded: false,
    competitions: []
  },
  {
    name: 'Boxeo',
    icon: '🥊',
    expanded: false,
    competitions: []
  },
  {
    name: 'Ciclismo',
    icon: '🚴',
    expanded: false,
    competitions: []
  },
  {
    name: 'Críquet',
    icon: '🏏',
    expanded: false,
    competitions: []
  },
  {
    name: 'Dardos',
    icon: '🎯',
    expanded: false,
    competitions: []
  },
  {
    name: 'Especiales',
    icon: '✨',
    expanded: false,
    competitions: []
  },
  {
    name: 'ESports',
    icon: '🎮',
    expanded: false,
    competitions: []
  }
];

const countries = [
  { name: 'Alemania', flag: '🇩🇪' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'España', flag: '🇪🇸' },
  { name: 'Francia', flag: '🇫🇷' },
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Italia', flag: '🇮🇹' }
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

  const toggleCountries = () => {
    setExpandedCountries(prev => 
      prev.length > 0 ? [] : ['countries']
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
              placeholder="Buscar deportes, ligas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-lighter border-dark-border text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-white font-semibold mb-3 text-sm">Accesos rápidos</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 bg-dark-lighter hover:bg-dark text-gray-300 hover:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 bg-dark-lighter hover:bg-dark text-gray-300 hover:text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 bg-dark-lighter hover:bg-dark text-gray-300 hover:text-white"
            >
              <Zap className="h-4 w-4 mr-2" />
              Live
            </Button>
          </div>
        </div>

        {/* Featured Competitions */}
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-white font-semibold mb-3 text-sm">Competiciones destacadas</h3>
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
                      En vivo
                    </Badge>
                  )}
                </div>
                <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white" />
              </Button>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-white font-semibold mb-3 text-sm">Deportes</h3>
          
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

                {/* Competitions */}
                <AnimatePresence>
                  {expandedSports.includes(sport.name) && sport.competitions.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-0.5">
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Countries Section */}
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={toggleCountries}
            className="w-full justify-between p-2 h-auto text-left hover:bg-dark-lighter mb-3"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm font-medium">Países</span>
            </div>
            {expandedCountries.includes('countries') ? 
              <ChevronUp className="h-3 w-3 text-gray-400" /> : 
              <ChevronDown className="h-3 w-3 text-gray-400" />
            }
          </Button>

          <AnimatePresence>
            {expandedCountries.includes('countries') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-0.5">
                  {countries.map((country, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-between p-1.5 h-auto text-left hover:bg-dark/50 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{country.flag}</span>
                        <span className="text-gray-400 text-xs group-hover:text-gray-300">
                          {country.name}
                        </span>
                      </div>
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSidebar;
