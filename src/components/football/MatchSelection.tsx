
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Filter } from 'lucide-react';

interface MatchSelectionProps {
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  selectedMatch: string;
  setSelectedMatch: (match: string) => void;
  handleFindMatch: () => void;
}

const MatchSelection: React.FC<MatchSelectionProps> = ({
  selectedLeague,
  setSelectedLeague,
  selectedMatch,
  setSelectedMatch,
  handleFindMatch
}) => {
  return (
    <Card className="glass-effect border-dark-border mb-8 shadow-lg shadow-neon-blue/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Match Selection</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">League</label>
            <Select 
              value={selectedLeague} 
              onValueChange={setSelectedLeague}
            >
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select league" />
              </SelectTrigger>
              <SelectContent className="bg-dark-lighter border-dark-border">
                <SelectItem value="premier-league">Premier League</SelectItem>
                <SelectItem value="la-liga">La Liga</SelectItem>
                <SelectItem value="bundesliga">Bundesliga</SelectItem>
                <SelectItem value="serie-a">Serie A</SelectItem>
                <SelectItem value="ligue-1">Ligue 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Match</label>
            <Select 
              value={selectedMatch} 
              onValueChange={setSelectedMatch}
            >
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue placeholder="Select match" />
              </SelectTrigger>
              <SelectContent className="bg-dark-lighter border-dark-border">
                <SelectItem value="liverpool-vs-manchester-united">
                  <div className="flex items-center gap-2">
                    <img src="https://placehold.co/20?text=LIV" alt="Liverpool" className="w-5 h-5" />
                    <span>Liverpool vs</span>
                    <img src="https://placehold.co/20?text=MUN" alt="Manchester United" className="w-5 h-5" />
                    <span>Manchester United</span>
                  </div>
                </SelectItem>
                <SelectItem value="arsenal-vs-chelsea">
                  <div className="flex items-center gap-2">
                    <img src="https://placehold.co/20?text=ARS" alt="Arsenal" className="w-5 h-5" />
                    <span>Arsenal vs</span>
                    <img src="https://placehold.co/20?text=CHE" alt="Chelsea" className="w-5 h-5" />
                    <span>Chelsea</span>
                  </div>
                </SelectItem>
                <SelectItem value="manchester-city-vs-tottenham">
                  <div className="flex items-center gap-2">
                    <img src="https://placehold.co/20?text=MCI" alt="Manchester City" className="w-5 h-5" />
                    <span>Manchester City vs</span>
                    <img src="https://placehold.co/20?text=TOT" alt="Tottenham" className="w-5 h-5" />
                    <span>Tottenham</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Date</label>
            <div className="relative">
              <Input 
                type="date" 
                className="bg-dark-lighter border-dark-border pl-10" 
                defaultValue="2025-05-20" 
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Button className="gap-2 bg-neon-blue hover:bg-neon-blue/90 text-black" onClick={handleFindMatch}>
            <Search size={16} />
            Find Match
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Upcoming Fixtures
          </Button>
          <Button variant="outline" className="gap-2 ml-auto">
            <Filter size={16} />
            Advanced Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchSelection;
