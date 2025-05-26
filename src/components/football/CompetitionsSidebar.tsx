
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const CompetitionsSidebar = () => {
  const { leagues, selectedLeague, setSelectedLeague } = useFootball();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['featured']);

  const featuredCompetitions = [
    { id: 'premier-league', name: 'Premier League', country: 'England', matches: 8 },
    { id: 'la-liga', name: 'La Liga', country: 'Spain', matches: 12 },
    { id: 'champions-league', name: 'Champions League', country: 'Europe', matches: 4 },
    { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', matches: 9 }
  ];

  const competitionsByCountry = {
    'England': ['Premier League', 'Championship', 'FA Cup'],
    'Spain': ['La Liga', 'Copa del Rey', 'Segunda División'],
    'Germany': ['Bundesliga', 'DFB-Pokal', '2. Bundesliga'],
    'France': ['Ligue 1', 'Coupe de France', 'Ligue 2'],
    'Italy': ['Serie A', 'Coppa Italia', 'Serie B']
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filteredCompetitions = featuredCompetitions.filter(comp =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="bg-dark-card border-dark-border h-full">
      <CardHeader className="pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search competitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-lighter border-dark-border text-white"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Featured Competitions */}
        <div>
          <Button
            variant="ghost"
            onClick={() => toggleSection('featured')}
            className="w-full justify-between p-2 text-left hover:bg-dark-lighter"
          >
            <span className="font-medium text-white">Featured</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${
              expandedSections.includes('featured') ? 'rotate-180' : ''
            }`} />
          </Button>

          <AnimatePresence>
            {expandedSections.includes('featured') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-1 mt-2">
                  {filteredCompetitions.map((comp) => (
                    <Button
                      key={comp.id}
                      variant="ghost"
                      onClick={() => setSelectedLeague(comp.id)}
                      className={`w-full justify-between p-3 text-left hover:bg-dark-lighter ${
                        selectedLeague === comp.id ? 'bg-neon-blue/10 border-l-2 border-l-neon-blue' : ''
                      }`}
                    >
                      <div>
                        <div className="font-medium text-white">{comp.name}</div>
                        <div className="text-xs text-gray-400">{comp.country}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {comp.matches}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Competitions by Country */}
        {Object.entries(competitionsByCountry).map(([country, competitions]) => (
          <div key={country}>
            <Button
              variant="ghost"
              onClick={() => toggleSection(country)}
              className="w-full justify-between p-2 text-left hover:bg-dark-lighter"
            >
              <span className="font-medium text-white">{country}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${
                expandedSections.includes(country) ? 'rotate-180' : ''
              }`} />
            </Button>

            <AnimatePresence>
              {expandedSections.includes(country) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 mt-2">
                    {competitions.map((comp) => (
                      <Button
                        key={comp}
                        variant="ghost"
                        className="w-full text-left p-2 pl-6 hover:bg-dark-lighter text-gray-300"
                      >
                        {comp}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Favorites */}
        <div className="border-t border-dark-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-white">My Favorites</span>
          </div>
          <div className="text-sm text-gray-400 text-center py-4">
            No favorites yet. Click the star icon on competitions to add them here.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionsSidebar;
