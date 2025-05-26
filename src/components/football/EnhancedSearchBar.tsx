
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedSearchBarProps {
  onFilterToggle?: () => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ onFilterToggle }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Próximos partidos del Real Madrid",
    "Mejores cuotas Champions League",
    "Partidos con más de 2.5 goles",
    "Equipos con mejor racha en casa",
    "Apuestas con mayor probabilidad",
    "Estadísticas Liverpool vs Arsenal"
  ];

  useEffect(() => {
    if (query === '' && !isTyping) {
      const interval = setInterval(() => {
        const currentSuggestion = suggestions[currentSuggestionIndex];
        
        // Typing animation
        setIsTyping(true);
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= currentSuggestion.length) {
            setTypedText(currentSuggestion.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            
            // Wait before erasing
            setTimeout(() => {
              // Erasing animation
              const eraseInterval = setInterval(() => {
                if (charIndex > 0) {
                  charIndex--;
                  setTypedText(currentSuggestion.slice(0, charIndex));
                } else {
                  clearInterval(eraseInterval);
                  setIsTyping(false);
                  setCurrentSuggestionIndex((prev) => 
                    prev === suggestions.length - 1 ? 0 : prev + 1
                  );
                }
              }, 50);
            }, 2000);
          }
        }, 100);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [currentSuggestionIndex, query, isTyping]);

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
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          {/* Search Input */}
          <div className="flex items-center">
            <div className="pl-6 pr-4 py-4 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            
            <Input
              type="text"
              placeholder={query === '' ? typedText : ''}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent text-gray-700 placeholder-gray-500 text-base focus:ring-0 focus:outline-none py-4"
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 px-4">
              {/* Voice Search */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsListening(!isListening)}
                className={`p-2 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>

              {/* Filter Toggle */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFilterToggle}
                className={`p-2 rounded-full transition-all ${
                  isFilterOpen 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Filter className="h-4 w-4" />
              </Button>

              {/* Search Button */}
              <Button
                type="submit"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-2 shadow-md hover:shadow-lg transition-all"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
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
                className="w-0.5 h-5 bg-blue-500"
              />
            </div>
          )}
        </div>
      </form>

      {/* Quick Access Buttons */}
      {query === '' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {['En directo', 'Champions League', 'La Liga', 'Premier League', 'Próximos partidos'].map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuery(tag)}
              className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filtros avanzados</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Competición</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Todas las competiciones</option>
                    <option>Champions League</option>
                    <option>La Liga</option>
                    <option>Premier League</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Cualquier fecha</option>
                    <option>Hoy</option>
                    <option>Mañana</option>
                    <option>Esta semana</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de apuesta</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Todos los tipos</option>
                    <option>1X2</option>
                    <option>Más/Menos goles</option>
                    <option>Ambos equipos marcan</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearchBar;
