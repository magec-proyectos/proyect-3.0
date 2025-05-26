
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, Trophy, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const CompetitionsSidebar = () => {
  const { leagues, selectedLeague, setSelectedLeague } = useFootball();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCompetitions = [
    { id: 'champions-league', name: 'Champions League', flag: '🇪🇺', matches: 8, hot: true },
    { id: 'premier-league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 12 },
    { id: 'la-liga', name: 'La Liga', flag: '🇪🇸', matches: 10 },
    { id: 'bundesliga', name: 'Bundesliga', flag: '🇩🇪', matches: 9 },
    { id: 'serie-a', name: 'Serie A', flag: '🇮🇹', matches: 8 },
    { id: 'ligue-1', name: 'Ligue 1', flag: '🇫🇷', matches: 7 }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Próximos partidos (calendario)', active: false },
    { icon: Trophy, label: 'Swipe', active: false },
    { icon: Trophy, label: 'Promos', active: false }
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 text-gray-700 rounded-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-0">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-between p-4 text-left hover:bg-gray-50 rounded-none first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">{action.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Featured Competitions */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h3 className="font-semibold text-gray-800">Competiciones destacadas</h3>
        </CardHeader>
        <CardContent className="p-0">
          {featuredCompetitions.map((comp, index) => (
            <Button
              key={comp.id}
              variant="ghost"
              onClick={() => setSelectedLeague(comp.id)}
              className={`w-full justify-between p-4 text-left hover:bg-gray-50 rounded-none ${
                selectedLeague === comp.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{comp.flag}</span>
                <div>
                  <div className="font-medium text-gray-800">{comp.name}</div>
                  {comp.hot && (
                    <Badge className="bg-red-500 text-white text-xs px-1 py-0 mt-1">
                      HOT ({comp.matches})
                    </Badge>
                  )}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Sports Categories */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h3 className="font-semibold text-gray-800">Deportes</h3>
        </CardHeader>
        <CardContent className="p-0">
          {['Fútbol', 'Baloncesto', 'Tenis', 'Hockey', 'Balonmano'].map((sport, index) => (
            <Button
              key={sport}
              variant="ghost"
              className="w-full justify-between p-4 text-left hover:bg-gray-50 rounded-none"
            >
              <span className="text-gray-700 font-medium">{sport}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitionsSidebar;
