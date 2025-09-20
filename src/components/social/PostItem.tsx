
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, ChevronDown, ChevronUp, BarChart, Award } from 'lucide-react';
import CommentSection, { Comment } from './CommentSection';
import { TrendingIndicator } from './TrendingIndicator';
import { calculateTrendingScore } from '@/utils/trendingAlgorithm';
import PostReactions from './PostReactions';
import { usePostReactions } from '@/hooks/usePostReactions';
import ChatButton from './ChatButton';
import TipButton from './TipButton';

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
  const { reactions, userReactions, updateReactions } = usePostReactions({ 
    postId: post.id,
    initialReactions: { like: post.likes }
  });
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleReactionUpdate = (postId: number, newReactions: Record<string, number>, newUserReactions: string[]) => {
    updateReactions(newReactions, newUserReactions);
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
      className="bg-card border-border/50 hover:bg-card/80 transition-all duration-200 overflow-hidden"
    >
      <CardHeader className="pb-3 spacing-sm">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {post.user.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-body-md text-foreground truncate">
                {post.user.name}
              </h3>
              <span className="text-body-sm text-muted-foreground">
                @{post.user.username}
              </span>
              <span className="text-body-sm text-muted-foreground">·</span>
              <span className="text-body-sm text-muted-foreground">
                {post.timestamp}
              </span>
              <TrendingIndicator post={trendingPost} size="sm" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-body-md text-foreground leading-relaxed">{post.content}</p>
        
        <div className="bg-muted/30 p-3 rounded-xl border border-border/30 hover:bg-muted/40 transition-colors">
          <div className="text-body-sm text-muted-foreground mb-1">Prediction</div>
          <div className="font-semibold text-body-md text-foreground">{post.bet.match}</div>
          <div className="font-medium text-body-md text-primary">{post.bet.prediction}</div>
          <div className="flex justify-between mt-2 text-body-sm text-muted-foreground">
            <span>@{post.bet.odds.toFixed(2)}</span>
            <span>${post.bet.amount} stake</span>
          </div>
          <div className="mt-3 pt-2 border-t border-border/30 flex items-center gap-2">
            <BarChart size={14} className="text-primary" />
            <div className="text-body-sm text-muted-foreground">Confidence: </div>
            <div className="flex-1 bg-background h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
            <span className="text-body-sm font-medium text-foreground">{confidenceScore}%</span>
          </div>
          {post.likes > 15 && (
            <div className="mt-2 flex items-center gap-2 text-body-sm">
              <Award size={14} className="text-yellow-500" />
              <span className="text-yellow-500">Hot prediction</span>
            </div>
          )}
        </div>
        
        {post.content.split(' ').filter(word => word.startsWith('#')).length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.content.split(' ').filter(word => word.startsWith('#')).slice(0, 3).map((tag, index) => (
              <span key={index} className="text-body-sm bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col w-full pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-6">
            <PostReactions 
              postId={post.id}
              currentReactions={reactions}
              userReactions={userReactions}
              onReactionUpdate={handleReactionUpdate}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground"
              onClick={toggleComments}
            >
              <MessageCircle size={18} />
              <span className="text-body-sm">{post.comments}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground"
              onClick={() => onShare(post)}
            >
              <Share2 size={18} />
              <span className="text-body-sm">{post.shares}</span>
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full mt-3 pt-3 border-t border-border/30">
            <CommentSection 
              postId={post.id} 
              comments={post.commentList || []} 
              onAddComment={onAddComment}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostItem;
