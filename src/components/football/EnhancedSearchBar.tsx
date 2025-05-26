
import React, { useState } from 'react';
import SearchInput from './search/SearchInput';
import QuickAccessButtons from './search/QuickAccessButtons';
import FilterPanel from './search/FilterPanel';
import { useTypingAnimation } from './search/TypingAnimation';

interface EnhancedSearchBarProps {
  onFilterToggle?: () => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ onFilterToggle }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const suggestions = [
    "Upcoming Real Madrid matches",
    "Best Champions League odds",
    "Matches with over 2.5 goals",
    "Teams with best home form",
    "Highest probability bets",
    "Liverpool vs Arsenal statistics"
  ];

  const { typedText } = useTypingAnimation({
    suggestions,
    isActive: query === ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', query);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
    onFilterToggle?.();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SearchInput
        query={query}
        placeholder={typedText}
        isListening={isListening}
        isFilterOpen={isFilterOpen}
        onQueryChange={setQuery}
        onVoiceToggle={() => setIsListening(!isListening)}
        onFilterToggle={handleFilterToggle}
        onSubmit={handleSubmit}
      />

      {/* Quick Access Buttons */}
      {query === '' && (
        <QuickAccessButtons onTagClick={setQuery} />
      )}

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default EnhancedSearchBar;
