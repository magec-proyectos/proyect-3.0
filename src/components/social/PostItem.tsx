
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostUser {
  name: string;
  avatar: string;
  username: string;
}

interface BetInfo {
  match: string;
  prediction: string;
  odds: number;
  amount: number;
}

export interface Post {
  id: number;
  user: PostUser;
  content: string;
  bet: BetInfo;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

interface PostItemProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, isLiked, onLike, onShare }) => {
  return (
    <Card className="bg-dark-card border-dark-border overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.user.name}</h3>
            <p className="text-xs text-gray-400">@{post.user.username} • {post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-3">
        <p>{post.content}</p>
        
        <div className="bg-dark-lighter p-3 rounded-lg border border-dark-border">
          <div className="text-sm text-gray-400">Bet prediction:</div>
          <div className="font-medium">{post.bet.match}</div>
          <div className="font-medium text-neon-blue">{post.bet.prediction}</div>
          <div className="flex justify-between mt-1 text-sm">
            <span>@{post.bet.odds.toFixed(2)}</span>
            <span>${post.bet.amount} stake</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-5">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : ''}`}
              onClick={() => onLike(post.id)}
            >
              <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
              <MessageCircle size={18} />
              {post.comments}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={() => onShare(post)}
          >
            <Share2 size={18} />
            {post.shares}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
