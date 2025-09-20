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
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="p-1">
        <div className="flex gap-1">
          {filters.map((filterOption) => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "ghost"}
              onClick={() => onFilterChange(filterOption.id)}
              className="flex-1 rounded-full"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Crear post */}
      {user && (
        <Card className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar || 'https://placehold.co/48'} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="¿Qué está pasando?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="border-none resize-none p-0 text-xl placeholder:text-muted-foreground focus-visible:ring-0"
                rows={3}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="text-primary p-2">
                    <Image size={20} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary p-2">
                    <BarChart3 size={20} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary p-2">
                    <Smile size={20} />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleSubmitPost}
                  disabled={!postContent.trim()}
                  className="rounded-full px-6"
                >
                  Postear
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Feed de posts */}
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
  );
};

export default SocialFeed;