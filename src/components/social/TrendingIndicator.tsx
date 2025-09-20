import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Flame, Zap, Clock } from 'lucide-react';
import { TrendingPost } from '@/utils/trendingAlgorithm';

interface TrendingIndicatorProps {
  post: TrendingPost;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TrendingIndicator: React.FC<TrendingIndicatorProps> = ({ 
  post, 
  showScore = false,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : '';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Viral indicator */}
      {post.isViral && (
        <Badge 
          variant="outline" 
          className={`bg-muted/50 text-muted-foreground border-border ${sizeClass}`}
        >
          <Flame size={iconSize} className="mr-1" />
          Viral
        </Badge>
      )}
      
      {/* Hot indicator */}
      {post.isHot && !post.isViral && (
        <Badge 
          variant="outline" 
          className={`bg-muted/50 text-muted-foreground border-border ${sizeClass}`}
        >
          <TrendingUp size={iconSize} className="mr-1" />
          Hot
        </Badge>
      )}
      
      {/* Fresh indicator */}
      {post.isFresh && !post.isHot && (
        <Badge 
          variant="outline" 
          className={`bg-muted/50 text-muted-foreground border-border ${sizeClass}`}
        >
          <Zap size={iconSize} className="mr-1" />
          Fresh
        </Badge>
      )}
      
      {/* Trending score */}
      {showScore && post.trendingScore.score > 0.3 && (
        <Badge 
          variant="outline" 
          className={`bg-muted/50 text-muted-foreground border-border ${sizeClass}`}
        >
          <Clock size={iconSize} className="mr-1" />
          {(post.trendingScore.score * 100).toFixed(0)}%
        </Badge>
      )}
    </div>
  );
};