
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Zap } from 'lucide-react';

interface UserTypePresetsProps {
  userType: 'casual' | 'regular' | 'professional';
  applyPreset: (type: 'casual' | 'regular' | 'professional') => void;
}

const UserTypePresets: React.FC<UserTypePresetsProps> = React.memo(({ userType, applyPreset }) => {
  const handleCasualClick = React.useCallback(() => applyPreset('casual'), [applyPreset]);
  const handleRegularClick = React.useCallback(() => applyPreset('regular'), [applyPreset]);
  const handleProfessionalClick = React.useCallback(() => applyPreset('professional'), [applyPreset]);

  return (
    <div className="grid grid-cols-3 gap-2 mb-5">
      <Button 
        variant={userType === 'casual' ? "default" : "outline"}
        size="sm"
        className={userType === 'casual' ? "bg-neon-blue text-black" : ""}
        onClick={handleCasualClick}
      >
        <Users className="h-4 w-4 mr-1" />
        Casual
      </Button>
      <Button 
        variant={userType === 'regular' ? "default" : "outline"}
        size="sm"
        className={userType === 'regular' ? "bg-neon-blue text-black" : ""}
        onClick={handleRegularClick}
      >
        <TrendingUp className="h-4 w-4 mr-1" />
        Regular
      </Button>
      <Button 
        variant={userType === 'professional' ? "default" : "outline"}
        size="sm"
        className={userType === 'professional' ? "bg-neon-blue text-black" : ""}
        onClick={handleProfessionalClick}
      >
        <Zap className="h-4 w-4 mr-1" />
        Pro
      </Button>
    </div>
  );
});

UserTypePresets.displayName = 'UserTypePresets';

export default UserTypePresets;
