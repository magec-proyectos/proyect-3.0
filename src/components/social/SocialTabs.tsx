
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowUp, Filter, TrendingUp, Clock, Users, Zap, UserPlus } from 'lucide-react';
import PostFeed from './PostFeed';
import CreatePostForm from './CreatePostForm';
import SuggestedUsers from './SuggestedUsers';
import { Post } from './PostItem';

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
  
  // Filter functions
  const filterPosts = (postsToFilter: Post[]) => {
    switch (activeFilter) {
      case 'trending':
        return [...postsToFilter].sort((a, b) => b.likes - a.likes);
      case 'highest-odds':
        return [...postsToFilter].sort((a, b) => b.bet.odds - a.bet.odds);
      case 'lowest-odds':
        return [...postsToFilter].sort((a, b) => a.bet.odds - b.bet.odds);
      case 'following':
        // Aquí filtrarías por usuarios que sigues
        return postsToFilter.filter(post => {
          // Por ahora simulamos que algunos posts son de usuarios seguidos
          return post.id % 2 === 0;
        });
      case 'all':
      default:
        return postsToFilter;
    }
  };

  // Get trending posts for carousel
  const trendingPosts = posts
    .filter(post => post.likes > 5)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Usuarios sugeridos */}
      <SuggestedUsers />

      {/* Trending carousel - only show if we have trending posts */}
      {trendingPosts.length > 0 && (
        <div className="mb-8 bg-dark-lighter p-4 rounded-lg border border-dark-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-neon-blue" />
            <h3 className="font-medium">Trending Predictions</h3>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
              HOT
            </Badge>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {trendingPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-dark-card p-4 rounded-lg border border-dark-border h-full hover:border-neon-blue/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-neon-blue/10 text-neon-blue border-neon-blue/30">
                        <ArrowUp className="mr-1 h-3 w-3" /> {post.likes} likes
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        🔥 Viral
                      </Badge>
                    </div>
                    <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
                    <div className="text-xs text-gray-400">{post.bet.match}</div>
                    <div className="text-sm font-medium text-neon-blue">{post.bet.prediction}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      By @{post.user.username}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-dark-lighter border-dark-border text-white" />
            <CarouselNext className="-right-4 bg-dark-lighter border-dark-border text-white" />
          </Carousel>
        </div>
      )}
      
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge 
          variant={activeFilter === 'all' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('all')}
        >
          All
        </Badge>
        <Badge 
          variant={activeFilter === 'following' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('following')}
        >
          <UserPlus className="mr-1 h-3 w-3" /> Following
        </Badge>
        <Badge 
          variant={activeFilter === 'trending' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('trending')}
        >
          <TrendingUp className="mr-1 h-3 w-3" /> Most Popular
        </Badge>
        <Badge 
          variant={activeFilter === 'highest-odds' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('highest-odds')}
        >
          <Zap className="mr-1 h-3 w-3" /> Highest Odds
        </Badge>
        <Badge 
          variant={activeFilter === 'lowest-odds' ? "default" : "outline"}
          className="cursor-pointer transition-all hover:bg-neon-blue/20"
          onClick={() => setActiveFilter('lowest-odds')}
        >
          <Filter className="mr-1 h-3 w-3" /> Safe Odds
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
