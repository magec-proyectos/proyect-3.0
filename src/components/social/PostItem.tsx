
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, ChevronDown, ChevronUp, BarChart, Award } from 'lucide-react';
import CommentSection, { Comment } from './CommentSection';
import { TrendingIndicator } from './TrendingIndicator';
import { calculateTrendingScore } from '@/utils/trendingAlgorithm';

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

  // Calculate trending score for this post
  const trendingScore = calculateTrendingScore(post);
  const trendingPost = {
    ...post,
    trendingScore,
    isHot: trendingScore.score > 0.4,
    isFresh: post.timestamp === 'Just now' || post.timestamp === 'Ahora' || post.timestamp.includes('min'),
    isViral: (post.likes + post.comments + post.shares) > 50 && trendingScore.score > 0.5
  };

  // Calculate confidence score based on odds and likes
  const confidenceScore = Math.min(95, Math.round((post.likes * 5) + (100 / post.bet.odds)));

  return (
    <Card 
      id={`post-${post.id}`} 
      className="bg-dark-card border-dark-border overflow-hidden hover:border-neon-blue/30 transition-all duration-300"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="hover:ring-2 hover:ring-neon-blue transition-all">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{post.user.name}</h3>
              <TrendingIndicator post={trendingPost} size="sm" />
            </div>
            <p className="text-xs text-gray-400">@{post.user.username} • {post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-3">
        <p>{post.content}</p>
        
        <div className="bg-dark-lighter p-3 rounded-lg border border-dark-border hover:shadow-md hover:shadow-neon-blue/10 transition-all">
          <div className="text-sm text-gray-400">Bet prediction:</div>
          <div className="font-medium">{post.bet.match}</div>
          <div className="font-medium text-neon-blue">{post.bet.prediction}</div>
          <div className="flex justify-between mt-1 text-sm">
            <span>@{post.bet.odds.toFixed(2)}</span>
            <span>${post.bet.amount} stake</span>
          </div>
          <div className="mt-2 pt-2 border-t border-dark-border flex items-center gap-2">
            <BarChart size={14} className="text-neon-blue" />
            <div className="text-xs text-gray-400">Community confidence: </div>
            <div className="flex-1 bg-dark h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-blue rounded-full transition-all duration-500"
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
            <span className="text-xs font-medium">{confidenceScore}%</span>
          </div>
          {post.likes > 20 && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <Award size={14} className="text-yellow-500" />
              <span className="text-yellow-500">Trending prediction</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.content.split(' ').filter(word => word.startsWith('#')).map((tag, index) => (
            <span key={index} className="text-xs bg-dark-lighter px-2 py-1 rounded-full text-neon-blue hover:bg-neon-blue/10 cursor-pointer transition-all">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-5">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-1.5 transition-all ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-400'}`}
              onClick={() => onLike(post.id)}
            >
              <Heart 
                size={18} 
                className={`transition-transform duration-300 ${isLiked ? 'fill-red-500 scale-110' : 'scale-100'}`}
              />
              <span className="transition-all duration-300">{post.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1.5 hover:text-neon-blue transition-all"
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
            className="flex items-center gap-1.5 hover:text-neon-blue transition-all"
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
