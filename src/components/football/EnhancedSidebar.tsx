
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Star,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sports icons (using emojis for now)
const sportsData = [
  {
    name: 'Supercuotas',
    icon: '💎',
    isSpecial: true,
    competitions: []
  },
  {
    name: 'Fútbol', 
    icon: '⚽',
    expanded: true,
    competitions: [
      { name: 'Ver todo', hasArrow: true },
      { name: 'Champions League', flag: '🇪🇺', featured: true },
      { name: 'Bundesliga', flag: '🇩🇪', featured: true },
      { name: 'Saudi Pro League', flag: '🇸🇦', featured: true },
      { name: 'Parva Liga', flag: '🇧🇬', featured: true },
      { name: 'Süper Lig', flag: '🇹🇷', featured: true },
      { name: 'Segunda División', flag: '🇪🇸' },
      { name: 'Allsvenskan', flag: '🇸🇪' },
      { name: 'MultiFútbol', icon: '⚽' }
    ]
  },
  {
    name: 'Tenis',
    icon: '🎾',
    competitions: [
      { name: 'ATP - Roland Garros', flag: '🇫🇷' },
      { name: 'WTA - Roland Garros', flag: '🇫🇷' }
    ]
  },
  {
    name: 'Baloncesto',
    icon: '🏀',
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
    competitions: []
  },
  {
    name: 'Balonmano',
    icon: '🤾',
    competitions: []
  },
  {
    name: 'Béisbol',
    icon: '⚾',
    competitions: []
  },
  {
    name: 'Biatlón',
    icon: '🎿',
    competitions: []
  },
  {
    name: 'Boxeo',
    icon: '🥊',
    competitions: []
  },
  {
    name: 'Ciclismo',
    icon: '🚴',
    competitions: []
  },
  {
    name: 'Críquet',
    icon: '🏏',
    competitions: []
  },
  {
    name: 'Dardos',
    icon: '🎯',
    competitions: []
  },
  {
    name: 'Especiales',
    icon: '✨',
    competitions: []
  },
  {
    name: 'ESports',
    icon: '🎮',
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
  const [expandedSports, setExpandedSports] = useState<string[]>(['Fútbol']);
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

        {/* Sports Section */}
        <div className="p-4">
          <h3 className="text-white font-semibold mb-4 text-lg">Deportes</h3>
          
          <div className="space-y-1">
            {sportsData.map((sport) => (
              <div key={sport.name}>
                {/* Sport Header */}
                <Button
                  variant="ghost"
                  onClick={() => sport.competitions.length > 0 && toggleSport(sport.name)}
                  className={`w-full justify-between p-3 h-auto text-left ${
                    sport.isSpecial 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30' 
                      : 'hover:bg-dark-lighter'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{sport.icon}</span>
                    <span className="text-white font-medium">{sport.name}</span>
                  </div>
                  {sport.competitions.length > 0 && (
                    expandedSports.includes(sport.name) ? 
                      <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-400" />
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
                      <div className="pl-4 py-2 space-y-1">
                        {sport.name === 'Fútbol' && (
                          <div className="mb-3">
                            <h4 className="text-gray-300 font-medium mb-2 text-sm">Competiciones destacadas</h4>
                          </div>
                        )}
                        
                        {sport.competitions.map((competition, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-between p-2 h-auto text-left hover:bg-dark/50 group"
                          >
                            <div className="flex items-center gap-2">
                              {competition.flag && (
                                <span className="text-sm">{competition.flag}</span>
                              )}
                              {competition.icon && (
                                <span className="text-sm">{competition.icon}</span>
                              )}
                              <span className="text-gray-300 text-sm group-hover:text-white">
                                {competition.name}
                              </span>
                              {competition.featured && (
                                <Star className="h-3 w-3 text-yellow-500" />
                              )}
                            </div>
                            {competition.hasArrow && (
                              <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-white" />
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

          {/* Countries Section */}
          <div className="mt-6 pt-4 border-t border-dark-border">
            <Button
              variant="ghost"
              onClick={toggleCountries}
              className="w-full justify-between p-3 h-auto text-left hover:bg-dark-lighter"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-white font-medium">Países</span>
              </div>
              {expandedCountries.includes('countries') ? 
                <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                <ChevronDown className="h-4 w-4 text-gray-400" />
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
                  <div className="pl-4 py-2 space-y-1">
                    {countries.map((country, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-left hover:bg-dark/50 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{country.flag}</span>
                          <span className="text-gray-300 text-sm group-hover:text-white">
                            {country.name}
                          </span>
                        </div>
                        <ChevronDown className="h-3 w-3 text-gray-400 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSidebar;
