
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowUp, Filter, TrendingUp, Clock, Users, Zap, UserPlus, Flame, BarChart3 } from 'lucide-react';
import PostFeed from './PostFeed';
import CreatePostForm from './CreatePostForm';
import SuggestedUsers from './SuggestedUsers';
import { TrendingIndicator } from './TrendingIndicator';
import { Post } from './PostItem';
import { 
  sortPostsByTrending, 
  getTrendingCarouselPosts, 
  filterTrendingPosts,
  calculateTrendingPosts 
} from '@/utils/trendingAlgorithm';

interface SocialTabsProps {
  posts: Post[];
  likedPosts: number[];
  isCreatingPost: boolean;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onCreatePost: (content: string) => void;
  onCancelPost: () => void;
  onAddComment: (postId: number, content: string) => void;
}

const SocialTabs: React.FC<SocialTabsProps> = ({
  posts,
  likedPosts,
  isCreatingPost,
  onLike,
  onShare,
  onCreatePost,
  onCancelPost,
  onAddComment
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Memoized trending calculations
  const trendingData = useMemo(() => {
    const trendingPosts = calculateTrendingPosts(posts);
    const carouselPosts = getTrendingCarouselPosts(posts, 5);
    
    return {
      trendingPosts,
      carouselPosts
    };
  }, [posts]);
  
  // Enhanced filter functions with trending algorithm
  const filterPosts = (postsToFilter: Post[]) => {
    switch (activeFilter) {
      case 'trending':
        return sortPostsByTrending(postsToFilter);
      case 'hot':
        return filterTrendingPosts(postsToFilter, 'hot');
      case 'viral':
        return filterTrendingPosts(postsToFilter, 'viral');
      case 'fresh':
        return filterTrendingPosts(postsToFilter, 'fresh');
      case 'highest-odds':
        return [...postsToFilter].sort((a, b) => b.bet.odds - a.bet.odds);
      case 'lowest-odds':
        return [...postsToFilter].sort((a, b) => a.bet.odds - b.bet.odds);
      case 'following':
        return postsToFilter.filter(post => post.id % 2 === 0);
      case 'all':
      default:
        return sortPostsByTrending(postsToFilter);
    }
  };

  return (
    <div className="space-y-6">
      {/* Usuarios sugeridos */}
      <SuggestedUsers />

      {/* Enhanced Trending carousel */}
      {trendingData.carouselPosts.length > 0 && (
        <div className="mb-8 bg-gradient-to-r from-dark-lighter to-dark-card p-4 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-red-400 animate-pulse" />
              <h3 className="font-medium">Trending Now</h3>
              <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 animate-pulse">
                LIVE
              </Badge>
            </div>
            <div className="text-xs text-gray-400">
              Updated in real-time
            </div>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {trendingData.carouselPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-dark-card p-4 rounded-lg border border-dark-border h-full hover:border-neon-blue/30 transition-all cursor-pointer relative overflow-hidden group">
                    {/* Trending glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingIndicator post={post} size="sm" />
                        <Badge variant="outline" className="bg-neon-blue/10 text-neon-blue border-neon-blue/30">
                          <BarChart3 className="mr-1 h-3 w-3" />
                          {(post.trendingScore.score * 100).toFixed(0)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
                      <div className="text-xs text-gray-400">{post.bet.match}</div>
                      <div className="text-sm font-medium text-neon-blue">{post.bet.prediction}</div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          By @{post.user.username}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{post.likes} ❤️</span>
                          <span>{post.comments} 💬</span>
                          <span>{post.shares} 🔄</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-dark-lighter border-dark-border text-white hover:bg-dark-card" />
            <CarouselNext className="-right-4 bg-dark-lighter border-dark-border text-white hover:bg-dark-card" />
          </Carousel>
        </div>
      )}
      
      {/* Enhanced Filter bar with trending categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge 
          variant={activeFilter === 'all' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('all')}
        >
          All
        </Badge>
        <Badge 
          variant={activeFilter === 'trending' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('trending')}
        >
          <TrendingUp className="mr-1 h-3 w-3" /> Trending
        </Badge>
        <Badge 
          variant={activeFilter === 'viral' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-red-500/20"
          onClick={() => setActiveFilter('viral')}
        >
          <Flame className="mr-1 h-3 w-3" /> Viral
        </Badge>
        <Badge 
          variant={activeFilter === 'hot' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-orange-500/20"
          onClick={() => setActiveFilter('hot')}
        >
          🔥 Hot
        </Badge>
        <Badge 
          variant={activeFilter === 'fresh' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-green-500/20"
          onClick={() => setActiveFilter('fresh')}
        >
          <Zap className="mr-1 h-3 w-3" /> Fresh
        </Badge>
        <Badge 
          variant={activeFilter === 'following' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('following')}
        >
          <UserPlus className="mr-1 h-3 w-3" /> Following
        </Badge>
        <Badge 
          variant={activeFilter === 'highest-odds' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-yellow-500/20"
          onClick={() => setActiveFilter('highest-odds')}
        >
          <Zap className="mr-1 h-3 w-3" /> High Risk
        </Badge>
        <Badge 
          variant={activeFilter === 'lowest-odds' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-blue-500/20"
          onClick={() => setActiveFilter('lowest-odds')}
        >
          <Filter className="mr-1 h-3 w-3" /> Safe Picks
        </Badge>
      </div>
      
      <Tabs defaultValue="feed" className="mb-8">
        <TabsList className="bg-dark-lighter border-dark-border mb-6">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <TrendingUp size={14} />
            Main Feed
          </TabsTrigger>
          <TabsTrigger value="following" className="flex items-center gap-2">
            <Users size={14} />
            Following
          </TabsTrigger>
          <TabsTrigger value="latest" className="flex items-center gap-2">
            <Clock size={14} />
            Recent
          </TabsTrigger>
        </TabsList>
        
        {isCreatingPost && (
          <CreatePostForm onCreatePost={onCreatePost} onCancel={onCancelPost} />
        )}
        
        <TabsContent value="feed" className="animate-fade-in">
          <PostFeed 
            posts={filterPosts(posts)}
            likedPosts={likedPosts}
            onLike={onLike}
            onShare={onShare}
            onAddComment={onAddComment}
          />
        </TabsContent>
        
        <TabsContent value="following" className="animate-fade-in">
          {activeFilter === 'following' || true ? (
            <PostFeed 
              posts={filterPosts(posts).filter(post => post.id % 2 === 0)}
              likedPosts={likedPosts}
              onLike={onLike}
              onShare={onShare}
              onAddComment={onAddComment}
            />
          ) : (
            <div className="text-center py-10 bg-dark-lighter/50 rounded-lg border border-dashed border-dark-border">
              <UserPlus className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-gray-400 mb-4">Follow other users to see their posts here</p>
              <p className="text-sm text-gray-500">Find expert users in the recommended section</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="latest" className="animate-fade-in">
          <PostFeed 
            posts={filterPosts([...posts].sort((a, b) => {
              if (a.timestamp === "Just now") return -1;
              if (b.timestamp === "Just now") return 1;
              return a.timestamp.localeCompare(b.timestamp);
            }))}
            likedPosts={likedPosts}
            onLike={onLike}
            onShare={onShare}
            onAddComment={onAddComment}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialTabs;
