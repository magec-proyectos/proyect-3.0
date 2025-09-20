
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, ArrowLeft, MoreHorizontal, Trophy, TrendingUp, Zap, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';

interface MobileSocialHeaderProps {
  onCreatePost: () => void;
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
  showBack?: boolean;
  onBack?: () => void;
}

const MobileSocialHeader: React.FC<MobileSocialHeaderProps> = ({
  onCreatePost,
  onSearch,
  onFilterChange,
  activeFilter,
  showBack = false,
  onBack
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All', count: null },
    { id: 'following', label: 'Following', count: 12 },
    { id: 'trending', label: 'Trending', count: 5 },
    { id: 'live', label: 'Live', count: 3 }
  ];

  const { elementRef } = useTouchGestures<HTMLDivElement>({
    onSwipe: (swipe) => {
      if (swipe.direction === 'down' && showFilters) {
        setShowFilters(false);
      }
    }
  });

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
    setShowSearch(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div className="px-4 py-3">
        {/* Main Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-dark-lighter"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-lg font-bold text-white">Social</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-dark-lighter"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-dark-lighter relative"
            >
              <Filter className="w-5 h-5" />
              {activeFilter !== 'all' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-blue rounded-full" />
              )}
            </Button>
            
            <Button
              onClick={onCreatePost}
              size="sm"
              className="bg-neon-blue text-black hover:bg-neon-blue/90 px-3 py-2 rounded-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-3 overflow-hidden"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts, users..."
                  className="flex-1 bg-dark-lighter border border-dark-border rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
                <Button
                  onClick={handleSearchSubmit}
                  size="sm"
                  className="bg-neon-blue text-black hover:bg-neon-blue/90"
                >
                  Search
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap transition-all touch-manipulation ${
                activeFilter === filter.id
                  ? 'bg-neon-blue text-black'
                  : 'text-gray-300 hover:text-white hover:border-neon-blue/50'
              }`}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
              {filter.count && (
                <span className="ml-1 text-xs opacity-75">
                  {filter.count}
                </span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Extended Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={elementRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-dark-border bg-dark-lighter/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Advanced Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="p-1"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button variant="outline" size="sm" className="justify-start text-muted-foreground">
                  <Trophy className="w-3 h-3 mr-1" />
                  Best Predictions
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-muted-foreground">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  High Odds
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-muted-foreground">
                  <Zap className="w-3 h-3 mr-1" />
                  Breaking News
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-muted-foreground">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  With Analysis
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSocialHeader;
