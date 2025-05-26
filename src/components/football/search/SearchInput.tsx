
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  query: string;
  placeholder: string;
  isListening: boolean;
  isFilterOpen: boolean;
  onQueryChange: (value: string) => void;
  onVoiceToggle: () => void;
  onFilterToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  placeholder,
  isListening,
  isFilterOpen,
  onQueryChange,
  onVoiceToggle,
  onFilterToggle,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative glass-effect rounded-2xl border border-neon-blue/30 overflow-hidden hover:border-neon-blue/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-neon-blue/50 focus-within:border-neon-blue">
        {/* Search Input */}
        <div className="flex items-center">
          <div className="pl-6 pr-4 py-4 flex items-center">
            <Search className="h-5 w-5 text-neon-blue" />
          </div>
          
          <Input
            type="text"
            placeholder={query === '' ? placeholder : ''}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 border-0 bg-transparent text-white placeholder-gray-400 text-base focus:ring-0 focus:outline-none py-4"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 px-4">
            {/* Voice Search */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceToggle}
              className={`p-2 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 animate-pulse' 
                  : 'text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10'
              }`}
            >
              <Mic className="h-4 w-4" />
            </Button>

            {/* Filter Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onFilterToggle}
              className={`p-2 rounded-full transition-all ${
                isFilterOpen 
                  ? 'bg-neon-lime/20 text-neon-lime' 
                  : 'text-gray-400 hover:text-neon-lime hover:bg-neon-lime/10'
              }`}
            >
              <Filter className="h-4 w-4" />
            </Button>

            {/* Search Button */}
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-neon-blue to-neon-lime hover:from-neon-blue/80 hover:to-neon-lime/80 text-black rounded-xl px-6 py-2 shadow-lg hover:shadow-neon-blue/25 transition-all font-bold"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Typing Indicator */}
        {query === '' && (
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-0.5 h-5 bg-neon-blue"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
