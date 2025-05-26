
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Mic, X, Sparkles } from 'lucide-react';
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
      <div className="relative glass-effect rounded-2xl border border-neon-blue/30 overflow-hidden hover:border-neon-blue/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-neon-blue/50 focus-within:border-neon-blue shadow-lg hover:shadow-neon-blue/20">
        {/* Enhanced Search Input */}
        <div className="flex items-center">
          <div className="pl-6 pr-4 py-4 flex items-center">
            <motion.div
              animate={{ 
                scale: query ? [1, 1.2, 1] : 1,
                rotate: query ? [0, 180, 360] : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <Search className="h-5 w-5 text-neon-blue" />
            </motion.div>
          </div>
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={query === '' ? placeholder : ''}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 border-0 bg-transparent text-white placeholder-gray-400 text-base focus:ring-0 focus:outline-none py-4"
          />

          {/* Clear button */}
          <AnimatePresence>
            {query && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="px-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-dark/40 transition-all"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 px-4">
            {/* AI Assistant Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="group-hover:animate-none"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </Button>

            {/* Voice Search */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceToggle}
              className={`p-2 rounded-full transition-all relative ${
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
              <Mic className="h-4 w-4 relative z-10" />
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
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Filter className="h-4 w-4" />
              </motion.div>
            </Button>

            {/* Enhanced Search Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="sm"
                className="bg-gradient-to-r from-neon-blue to-neon-lime hover:from-neon-blue/80 hover:to-neon-lime/80 text-black rounded-xl px-6 py-2 shadow-lg hover:shadow-neon-blue/25 transition-all font-bold relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <Search className="h-4 w-4 mr-2 relative z-10" />
                <span className="relative z-10">Search</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Typing Indicator */}
        {query === '' && (
          <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                scaleY: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-0.5 h-5 bg-gradient-to-t from-neon-blue to-neon-lime rounded-full"
            />
          </div>
        )}

        {/* Search suggestions indicator */}
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-400 text-center"
          >
            Press Enter to search or use filters for better results
          </motion.div>
        )}
      </div>
    </motion.form>
  );
};

export default SearchInput;
