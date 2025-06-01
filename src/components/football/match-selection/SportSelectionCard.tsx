
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { getSportClasses } from '@/utils/colorUtils';

interface SportSelectionCardProps {
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

const SportSelectionCard: React.FC<SportSelectionCardProps> = ({
  selectedSport,
  onSportChange
}) => {
  const sports = [
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'americanFootball', name: 'American Football', icon: '🏈' }
  ];

  const handleSportChange = (sportId: string) => {
    console.log('SportSelectionCard - changing sport from', selectedSport, 'to', sportId);
    onSportChange(sportId);
  };

  console.log('SportSelectionCard - current selectedSport:', selectedSport);

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-blue-600" />
          Select Sport
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sports.map((sport) => {
            const sportClasses = getSportClasses(sport.id as any);
            const isSelected = selectedSport === sport.id;
            
            return (
              <Button
                key={sport.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleSportChange(sport.id)}
                className={`h-16 flex flex-col gap-2 transition-all ${
                  isSelected 
                    ? `${sportClasses.solid} text-white border-0 shadow-lg hover:shadow-xl` 
                    : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-600/20 hover:text-white'
                }`}
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-sm font-medium">{sport.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SportSelectionCard;
