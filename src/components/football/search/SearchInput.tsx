
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Filter, Mic, X, Search } from 'lucide-react';
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
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative glass-effect rounded-3xl border border-neon-blue/30 overflow-hidden hover:border-neon-blue/50 transition-all duration-300 focus-within:ring-4 focus-within:ring-neon-blue/30 focus-within:border-neon-blue shadow-2xl hover:shadow-neon-blue/30">
        {/* Enhanced Search Input - Made Larger */}
        <div className="flex items-center">
          <div className="pl-8 pr-6 py-6 flex items-center">
            <Search className="h-6 w-6 text-neon-blue" />
          </div>
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 border-0 bg-transparent text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none py-6"
          />

          {/* Clear button */}
          <AnimatePresence>
            {query && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="px-3"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-dark/40 transition-all"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6">
            {/* Voice Search */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceToggle}
              className={`p-3 rounded-full transition-all relative ${
                isListening 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10'
              }`}
            >
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-400/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <Mic className="h-5 w-5 relative z-10" />
            </Button>

            {/* Upload Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-3 rounded-full text-gray-400 hover:text-neon-lime hover:bg-neon-lime/10 transition-all"
            >
              <Upload className="h-5 w-5" />
            </Button>

            {/* Filter Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onFilterToggle}
              className={`p-3 rounded-full transition-all ${
                isFilterOpen 
                  ? 'bg-neon-lime/20 text-neon-lime' 
                  : 'text-gray-400 hover:text-neon-lime hover:bg-neon-lime/10'
              }`}
            >
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Filter className="h-5 w-5" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchInput;
