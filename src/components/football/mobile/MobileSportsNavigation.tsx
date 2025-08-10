
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Search, Filter, Star, TrendingUp, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
}

interface MobileSportsNavigationProps {
  onFilterChange: (filter: string) => void;
  onSearchToggle: () => void;
  activeFilter: string;
  matchCount: number;
}

const MobileSportsNavigation: React.FC<MobileSportsNavigationProps> = ({
  onFilterChange,
  onSearchToggle,
  activeFilter,
  matchCount
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: 'all', label: 'Todos', icon: <Calendar className="w-4 h-4" />, count: matchCount },
    { id: 'live', label: 'En Vivo', icon: <Clock className="w-4 h-4" />, count: 5 },
    { id: 'favorites', label: 'Favoritos', icon: <Star className="w-4 h-4" />, count: 12 },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" />, count: 8 }
  ];

  const { elementRef } = useTouchGestures<HTMLDivElement>({
    onSwipe: (swipe) => {
      if (swipe.direction === 'left' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  });

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="sticky top-16 z-30 bg-dark/95 backdrop-blur-md border-b border-dark-border">
        <div className="px-4 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-dark-lighter"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Deportes</h1>
                <p className="text-xs text-gray-400">{matchCount} partidos disponibles</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearchToggle}
                className="p-2 hover:bg-dark-lighter"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-dark-lighter relative"
              >
                <Filter className="w-5 h-5" />
                {activeFilter !== 'all' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-blue rounded-full" />
                )}
              </Button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <Badge
                key={item.id}
                variant={activeFilter === item.id ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all touch-manipulation ${
                  activeFilter === item.id
                    ? 'bg-neon-blue text-black'
                    : 'text-gray-300 hover:text-white hover:border-neon-blue/50'
                }`}
                onClick={() => onFilterChange(item.id)}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
                {item.count && (
                  <span className="ml-1 text-xs opacity-75">
                    {item.count}
                  </span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              ref={elementRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-dark-card border-r border-dark-border z-50 overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-border/50">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Menu Content */}
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeFilter === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 p-3 ${
                      activeFilter === item.id
                        ? 'bg-neon-blue text-black'
                        : 'text-gray-300 hover:text-white hover:bg-dark-lighter'
                    }`}
                    onClick={() => {
                      onFilterChange(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count && (
                      <Badge variant="outline" className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-dark-border/50">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Acciones Rápidas</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      onSearchToggle();
                      setIsMenuOpen(false);
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar partidos
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Mis favoritos
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSportsNavigation;
