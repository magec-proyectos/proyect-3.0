
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import CommentSection, { Comment } from './CommentSection';

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
  commentList?: Comment[];
}

interface PostItemProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, isLiked, onLike, onShare, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
      
      <CardFooter className="flex flex-col w-full">
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={toggleComments}
            >
              <MessageCircle size={18} />
              {post.comments}
              {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
        
        {showComments && (
          <CommentSection 
            postId={post.id} 
            comments={post.commentList || []} 
            onAddComment={onAddComment}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default PostItem;
