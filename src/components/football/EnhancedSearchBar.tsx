
import React, { useState } from 'react';
import SearchInput from './search/SearchInput';
import FilterPanel from './search/FilterPanel';

interface EnhancedSearchBarProps {
  onFilterToggle?: () => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ onFilterToggle }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        placeholder="Search teams, leagues, or matches..."
        isListening={isListening}
        isFilterOpen={isFilterOpen}
        onQueryChange={setQuery}
        onVoiceToggle={() => setIsListening(!isListening)}
        onFilterToggle={handleFilterToggle}
        onSubmit={handleSubmit}
      />

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default EnhancedSearchBar;
