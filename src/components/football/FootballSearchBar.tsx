
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const FootballSearchBar = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    "Próximos partidos (calendario)",
    "Competiciones destacadas", 
    "Partidos en directo",
    "Mis apuestas favoritas"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AI Search:', query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow">
          <Input
            type="text"
            placeholder="Pregunta lo que quieras"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-14 pr-20 py-4 border-0 bg-transparent text-gray-700 placeholder-gray-500 text-base focus:ring-0 focus:outline-none"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Plus className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
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
              className="bg-black hover:bg-gray-800 text-white rounded-full px-3 py-2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions - ChatGPT Style */}
      {query === '' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setQuery(suggestion)}
              className="text-left justify-start h-auto p-4 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                  <Search className="h-3 w-3 text-gray-600" />
                </div>
                <span className="text-sm">{suggestion}</span>
              </div>
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FootballSearchBar;
