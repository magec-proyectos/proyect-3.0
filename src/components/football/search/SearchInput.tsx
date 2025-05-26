
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearSearch = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.form 
      onSubmit={onSubmit} 
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-white rounded-full border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-lg shadow-lg transition-all duration-300">
        {/* Search Input - Google style */}
        <div className="flex items-center">
          <div className="pl-6 pr-4 py-4 flex items-center">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 border-0 bg-transparent text-gray-800 placeholder-gray-500 text-lg focus:ring-0 focus:outline-none py-4 text-base"
          />

          {/* Action buttons - Google style */}
          <div className="flex items-center gap-2 px-4">
            {/* Clear button */}
            <AnimatePresence>
              {query && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice Search - Google style */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceToggle}
              className={`p-2 rounded-full transition-all relative ${
                isListening 
                  ? 'bg-red-100 text-red-500' 
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-400/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <Mic className="h-4 w-4 relative z-10" />
            </Button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchInput;
