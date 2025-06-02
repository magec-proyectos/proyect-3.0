
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MatchSelectionProps {
  activeSport: 'football' | 'basketball' | 'americanFootball';
  selectedMatch: string;
  onMatchSelect: (value: string) => void;
  onGetPrediction: () => void;
  getButtonStyle: () => string;
}

const MatchSelection: React.FC<MatchSelectionProps> = ({
  activeSport,
  selectedMatch,
  onMatchSelect,
  onGetPrediction,
  getButtonStyle
}) => {
  // Get match options based on active sport
  const getMatchOptions = () => {
    switch (activeSport) {
      case 'football':
        return (
          <>
            <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
            <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
            <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
          </>
        );
      case 'basketball':
        return (
          <>
            <SelectItem value="lakers_vs_celtics">Lakers vs Celtics</SelectItem>
            <SelectItem value="bulls_vs_heat">Bulls vs Heat</SelectItem>
            <SelectItem value="warriors_vs_nets">Warriors vs Nets</SelectItem>
          </>
        );
      case 'americanFootball':
        return (
          <>
            <SelectItem value="chiefs_vs_eagles">Chiefs vs Eagles</SelectItem>
            <SelectItem value="cowboys_vs_giants">Cowboys vs Giants</SelectItem>
            <SelectItem value="packers_vs_bears">Packers vs Bears</SelectItem>
          </>
        );
      default:
        return null;
    }
  };

  const getSolidButtonClass = () => {
    switch (activeSport) {
      case 'football':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'basketball':
        return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'americanFootball':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <motion.div 
      key="selection-form"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row gap-4 mb-6"
    >
      <div className="flex-1">
        <label className="text-sm text-gray-400 mb-1.5 block">Select Match</label>
        <Select 
          onValueChange={onMatchSelect} 
          value={selectedMatch}
        >
          <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
            <SelectValue placeholder={`Choose a ${activeSport === 'americanFootball' ? 'football' : activeSport} match`} />
          </SelectTrigger>
          <SelectContent className="bg-dark border-dark-border text-white">
            {getMatchOptions()}
          </SelectContent>
        </Select>
      </div>
      <div className="sm:w-1/3">
        <label className="text-sm text-gray-400 mb-1.5 block">AI Prediction</label>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={onGetPrediction}
            className={`w-full ${getSolidButtonClass()} font-medium h-12 transition-all shadow-lg`}
            disabled={!selectedMatch}
          >
            Get Prediction
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MatchSelection;
