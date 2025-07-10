import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Bell, Settings, Menu, X } from 'lucide-react';
import { TouchButton, ResponsiveContainer } from '@/components/ui/mobile-optimized';
import InteractiveButton from '@/components/ui/interactive-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EnhancedSportsHeaderProps {
  onSearchToggle?: () => void;
  onFilterToggle?: () => void;
  onMenuToggle?: () => void;
  activeFilters?: number;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

const EnhancedSportsHeader = ({
  onSearchToggle,
  onFilterToggle,
  onMenuToggle,
  activeFilters = 0,
  showSearch = false,
  searchQuery = '',
  onSearchChange,
  className
}: EnhancedSportsHeaderProps) => {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <ResponsiveContainer className={cn('bg-card border-b border-border', className)}>
      <div className="space-y-4">
        {/* Main Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <TouchButton
                size="sm"
                onClick={onMenuToggle}
                className="bg-transparent hover:bg-accent text-foreground"
              >
                <Menu className="w-5 h-5" />
              </TouchButton>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sports Betting</h1>
              <p className="text-sm text-muted-foreground">Live matches and predictions</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TouchButton
              size="sm"
              onClick={onSearchToggle}
              className={cn(
                'bg-transparent hover:bg-accent text-foreground transition-colors',
                showSearch && 'bg-accent'
              )}
            >
              <Search className="w-5 h-5" />
            </TouchButton>

            <TouchButton
              size="sm"
              onClick={onFilterToggle}
              className="bg-transparent hover:bg-accent text-foreground relative"
            >
              <Filter className="w-5 h-5" />
              {activeFilters > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {activeFilters}
                </motion.div>
              )}
            </TouchButton>

            <TouchButton
              size="sm"
              className="bg-transparent hover:bg-accent text-foreground"
            >
              <Bell className="w-5 h-5" />
            </TouchButton>

            {!isMobile && (
              <TouchButton
                size="sm"
                className="bg-transparent hover:bg-accent text-foreground"
              >
                <Settings className="w-5 h-5" />
              </TouchButton>
            )}
          </div>
        </div>

        {/* Live Data Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-500">Live Data</span>
            <span className="text-xs text-muted-foreground">Updated 2 seconds ago</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Next update in 8s
          </div>
        </motion.div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams, leagues, or matches..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    'w-full h-12 pl-12 pr-4 bg-background border border-border rounded-lg',
                    'text-foreground placeholder-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'transition-all duration-200',
                    isSearchFocused && 'shadow-lg'
                  )}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                
                {searchQuery && (
                  <TouchButton
                    size="sm"
                    onClick={() => onSearchChange?.('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-accent text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </TouchButton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ResponsiveContainer>
  );
};

export default EnhancedSportsHeader;