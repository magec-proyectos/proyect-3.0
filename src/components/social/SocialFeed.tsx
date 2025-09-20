import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Image, Smile, BarChart3 } from 'lucide-react';
import VirtualizedPostFeed from './VirtualizedPostFeed';
import { Post } from './PostItem';

interface SocialFeedProps {
  posts: Post[];
  likedPosts: number[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
  onCreatePost: (content: string) => void;
  user?: any;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  likedPosts,
  filter,
  onFilterChange,
  onLike,
  onShare,
  onAddComment,
  onCreatePost,
  user
}) => {
  const [postContent, setPostContent] = React.useState('');

  const filters = [
    { id: 'foryou', label: 'Para ti' },
    { id: 'following', label: 'Siguiendo' },
  ];

  const handleSubmitPost = () => {
    if (postContent.trim()) {
      onCreatePost(postContent);
      setPostContent('');
    }
  };

  return (
    <div className="space-y-0">
      {/* Crear post - Siempre visible arriba */}
      {user && (
        <div className="border-b border-border pb-4 mb-6">
          <div className="flex gap-3 p-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar || 'https://placehold.co/48'} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="¿Qué está pasando?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="border-none resize-none p-0 text-xl placeholder:text-muted-foreground focus-visible:ring-0 min-h-[60px]"
                rows={1}
              />
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="text-primary p-2 hover:bg-primary/10">
                    <Image size={20} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary p-2 hover:bg-primary/10">
                    <BarChart3 size={20} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary p-2 hover:bg-primary/10">
                    <Smile size={20} />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleSubmitPost}
                  disabled={!postContent.trim()}
                  className="rounded-full px-6 font-semibold"
                  size="sm"
                >
                  Postear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex">
          {filters.map((filterOption) => (
            <Button
              key={filterOption.id}
              variant="ghost"
              onClick={() => onFilterChange(filterOption.id)}
              className={`flex-1 rounded-none border-b-2 py-4 font-semibold transition-colors ${
                filter === filterOption.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Feed de posts */}
      <div className="pt-6">
        <VirtualizedPostFeed 
          posts={posts}
          likedPosts={likedPosts}
          onLike={onLike}
          onShare={onShare}
          onAddComment={onAddComment}
          onLoadMore={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }}
        />
      </div>
    </div>
  );
};

export default SocialFeed;