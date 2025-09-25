import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, BarChart, Award } from 'lucide-react';
import { TrendingIndicator } from './TrendingIndicator';
import PostReactions from './PostReactions';
import { RealPost } from '@/hooks/useRealSocialData';
import { formatDistanceToNow } from 'date-fns';
import RealCommentSection from './RealCommentSection';

interface RealPostItemProps {
  post: RealPost;
  userReactions?: string[];
  onReaction: (postId: string, reactionType: string) => void;
  onShare: (post: RealPost) => void;
}

const RealPostItem: React.FC<RealPostItemProps> = ({ 
  post, 
  userReactions = [],
  onReaction, 
  onShare 
}) => {
  const [showComments, setShowComments] = useState(false);
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleReactionUpdate = (postId: number, newReactions: Record<string, number>, newUserReactions: string[]) => {
    // Convert string postId to number for compatibility
    onReaction(post.id, 'like');
  };

  // Calculate confidence score based on likes and other metrics
  const confidenceScore = Math.min(95, post.confidence_level || post.confidence_score || 70);

  // Format timestamp
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  // Create trending post object for TrendingIndicator
  const trendingPost = {
    ...post,
    id: parseInt(post.id) || 0, // Convert string ID to number for compatibility
    user: {
      name: post.user_profiles?.display_name || 'Anonymous',
      avatar: post.user_profiles?.avatar_url || 'https://placehold.co/40',
      username: post.user_profiles?.username || 'anonymous'
    },
    bet: {
      match: post.match_info?.match || 'Custom Prediction',
      prediction: post.prediction_details?.prediction || post.prediction_type,
      odds: 2.0,
      amount: post.stake_amount || 25
    },
    likes: post.likes_count,
    comments: post.comments_count,
    shares: post.shares_count || 0,
    timestamp: timeAgo,
    trendingScore: { 
      score: 0.3,
      breakdown: {
        engagementScore: 0.1,
        timeScore: 0.1,
        velocityScore: 0.1,
        qualityScore: 0.0
      }
    },
    isHot: post.likes_count > 10,
    isFresh: new Date(post.created_at) > new Date(Date.now() - 60 * 60 * 1000), // within 1 hour
    isViral: post.likes_count > 50
  };

  return (
    <Card 
      id={`post-${post.id}`} 
      className="bg-card border-border/50 hover:bg-card/80 transition-all duration-200 overflow-hidden"
    >
      <CardHeader className="pb-3 spacing-sm">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage 
              src={post.user_profiles?.avatar_url || 'https://placehold.co/40'} 
              alt={post.user_profiles?.display_name || 'User'} 
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {(post.user_profiles?.display_name || 'U').substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-body-md text-foreground truncate">
                {post.user_profiles?.display_name || 'Anonymous User'}
              </h3>
              <span className="text-body-sm text-muted-foreground">
                @{post.user_profiles?.username || 'anonymous'}
              </span>
              <span className="text-body-sm text-muted-foreground">·</span>
              <span className="text-body-sm text-muted-foreground">
                {timeAgo}
              </span>
              <TrendingIndicator post={trendingPost} size="sm" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-body-md text-foreground leading-relaxed">{post.content}</p>
        
        {(post.match_info || post.prediction_details) && (
          <div className="bg-muted/30 p-3 rounded-xl border border-border/30 hover:bg-muted/40 transition-colors">
            <div className="text-body-sm text-muted-foreground mb-1">Prediction</div>
            <div className="font-semibold text-body-md text-foreground">
              {post.match_info?.match || 'Custom Prediction'}
            </div>
            <div className="font-medium text-body-md text-primary">
              {post.prediction_details?.prediction || post.prediction_type}
            </div>
            {(post.stake_amount || post.potential_return) && (
              <div className="flex justify-between mt-2 text-body-sm text-muted-foreground">
                <span>@{(post.potential_return && post.stake_amount) ? (post.potential_return / post.stake_amount).toFixed(2) : '2.00'}</span>
                <span>${post.stake_amount || 25} stake</span>
              </div>
            )}
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
            {post.likes_count > 15 && (
              <div className="mt-2 flex items-center gap-2 text-body-sm">
                <Award size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Hot prediction</span>
              </div>
            )}
          </div>
        )}
        
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
              postId={parseInt(post.id) || 0}
              currentReactions={post.reactions_summary || { like: post.likes_count }}
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
              <span className="text-body-sm">{post.comments_count}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground"
              onClick={() => onShare(post)}
            >
              <Share2 size={18} />
              <span className="text-body-sm">{post.shares_count}</span>
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full mt-3 pt-3 border-t border-border/30">
            <RealCommentSection postId={post.id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RealPostItem;