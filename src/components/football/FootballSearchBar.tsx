
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const FootballSearchBar = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    "Show me high-scoring matches today",
    "Find Manchester United matches this week", 
    "Best bets for Champions League",
    "Teams with both teams to score likely"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // AI search logic here
    console.log('AI Search:', query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Ask AI about football matches, teams, or betting opportunities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-20 py-4 border-0 bg-transparent text-gray-900 placeholder-gray-500 text-lg focus:ring-0"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-neon-blue hover:bg-neon-blue/90 text-black rounded-full px-4"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Ask AI
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      {query === '' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setQuery(suggestion)}
              className="text-sm bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              {suggestion}
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FootballSearchBar;
