
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import PredictionVisualizer from '@/components/PredictionVisualizer';

interface PredictionResultsProps {
  activeSport: 'football' | 'basketball' | 'americanFootball';
  matchId: string;
  onTryAnother: () => void;
  getAccentColor: () => string;
  getMatchName: (value: string) => string;
  getPredictionConfidence: () => { value: number, label: string, color: string };
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  activeSport,
  matchId,
  onTryAnother,
  getAccentColor,
  getMatchName,
  getPredictionConfidence
}) => {
  const confidenceData = getPredictionConfidence();
  
  return (
    <div>
      <div className="bg-dark/50 rounded-lg p-4 mb-4 flex flex-wrap justify-between items-center">
        <div>
          <Badge className={`bg-${getAccentColor()}/20 text-${getAccentColor()} mb-2`}>
            Match Analysis
          </Badge>
          <h3 className="text-xl font-bold mb-1">
            {getMatchName(matchId)}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">AI Confidence</div>
          <div className={`text-sm font-medium ${confidenceData.color}`}>
            {confidenceData.label} ({confidenceData.value}%)
          </div>
        </div>
      </div>
      
      {/* Enhanced visualization component */}
      <PredictionVisualizer 
        sport={activeSport} 
        matchId={matchId} 
      />
      
      <div className="flex flex-wrap gap-3 mt-6 justify-between">
        <Button 
          variant="outline" 
          className="bg-transparent border-dark-border hover:bg-dark-lighter"
          onClick={onTryAnother}
        >
          Try Another Match
        </Button>
        
        <div className="flex gap-2">
          <Button 
            className={`bg-${getAccentColor()} ${activeSport === 'americanFootball' ? 'text-white' : 'text-black'}`}
          >
            <Star size={16} className="mr-2" />
            Place Bet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
