
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Zap } from 'lucide-react';

interface UserTypePresetsProps {
  userType: 'casual' | 'regular' | 'professional';
  applyPreset: (type: 'casual' | 'regular' | 'professional') => void;
}

const UserTypePresets: React.FC<UserTypePresetsProps> = ({ userType, applyPreset }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-5">
      <Button 
        variant={userType === 'casual' ? "default" : "outline"}
        size="sm"
        className={userType === 'casual' ? "bg-neon-blue text-black" : ""}
        onClick={() => applyPreset('casual')}
      >
        <Users className="h-4 w-4 mr-1" />
        Casual
      </Button>
      <Button 
        variant={userType === 'regular' ? "default" : "outline"}
        size="sm"
        className={userType === 'regular' ? "bg-neon-blue text-black" : ""}
        onClick={() => applyPreset('regular')}
      >
        <TrendingUp className="h-4 w-4 mr-1" />
        Regular
      </Button>
      <Button 
        variant={userType === 'professional' ? "default" : "outline"}
        size="sm"
        className={userType === 'professional' ? "bg-neon-blue text-black" : ""}
        onClick={() => applyPreset('professional')}
      >
        <Zap className="h-4 w-4 mr-1" />
        Pro
      </Button>
    </div>
  );
};

export default UserTypePresets;
