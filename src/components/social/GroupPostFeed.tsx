import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Crown, 
  Star, 
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface GroupPost {
  id: string;
  content: string;
  prediction_type: string;
  match_info: any;
  prediction_details: any;
  is_vip_content: boolean;
  confidence_level: number;
  stake_amount: number | null;
  potential_return: number | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  user_profiles?: {
    display_name: string | null;
    avatar_url: string | null;
    verification_tier: string | null;
  } | null;
}

interface GroupPostFeedProps {
  groupId: string;
  isVipGroup: boolean;
}

const GroupPostFeed: React.FC<GroupPostFeedProps> = ({ groupId, isVipGroup }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchGroupPosts();
  }, [groupId]);

  const fetchGroupPosts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('group_posts')
        .select(`
          *,
          user_profiles(
            display_name,
            avatar_url,
            verification_tier
          )
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data as any || []);
    } catch (error) {
      console.error('Error fetching group posts:', error);
      toast({
        title: "Error",
        description: "Failed to load group posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async () => {
    if (!user || !newPostContent.trim()) return;

    try {
      const { error } = await supabase
        .from('group_posts')
        .insert([
          {
            group_id: groupId,
            user_id: user.id,
            content: newPostContent,
            prediction_type: 'general',
            match_info: {
              match: 'Liverpool vs Manchester United',
              date: new Date().toISOString(),
              league: 'Premier League'
            },
            prediction_details: {
              prediction: 'Over 2.5 Goals',
              odds: 1.85,
              confidence: 75
            },
            is_vip_content: isVipGroup,
            confidence_level: 75
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "VIP prediction shared with group"
      });

      setNewPostContent('');
      setIsCreatingPost(false);
      fetchGroupPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    }
  };

  const handleLike = async (postId: string) => {
    // Toggle like locally for immediate feedback
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);

    // Update posts count locally
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes_count: likedPosts.has(postId) 
                ? post.likes_count - 1 
                : post.likes_count + 1 
            }
          : post
      )
    );

    toast({
      title: likedPosts.has(postId) ? "Like removed" : "Prediction liked!",
      description: likedPosts.has(postId) ? "" : "Great prediction!"
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getVerificationIcon = (tier: string) => {
    switch (tier) {
      case 'legend': return <Crown className="h-4 w-4 text-purple-500" />;
      case 'expert': return <Star className="h-4 w-4 text-blue-500" />;
      case 'verified': return <Shield className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          {!isCreatingPost ? (
            <Button 
              variant="outline" 
              className="w-full justify-start text-muted-foreground"
              onClick={() => setIsCreatingPost(true)}
            >
              <Target className="h-4 w-4 mr-2" />
              Share a VIP prediction with the group...
            </Button>
          ) : (
            <div className="space-y-4">
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your exclusive prediction analysis..."
                className="min-h-[100px]"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isVipGroup && (
                    <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Crown className="h-3 w-3 mr-1" />
                      VIP Content
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsCreatingPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={createPost}
                    disabled={!newPostContent.trim()}
                  >
                    Share Prediction
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={post.user_profiles?.avatar_url} 
                          alt={post.user_profiles?.display_name} 
                        />
                        <AvatarFallback>
                          {post.user_profiles?.display_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {post.user_profiles?.display_name || 'Anonymous'}
                          </p>
                          {getVerificationIcon(post.user_profiles?.verification_tier || '')}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.is_vip_content && (
                        <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                          <Crown className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                      
                      <Badge 
                        variant="outline" 
                        className={getConfidenceColor(post.confidence_level)}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {post.confidence_level}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  {/* Prediction Details */}
                  {post.prediction_details && (
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Match</p>
                          <p className="font-medium">{post.match_info?.match || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Prediction</p>
                          <p className="font-medium">{post.prediction_details?.prediction || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Odds</p>
                          <p className="font-medium text-primary">
                            {post.prediction_details?.odds || 'N/A'}
                          </p>
                        </div>
                        
                        {post.stake_amount && (
                          <div>
                            <p className="text-muted-foreground">Stake</p>
                            <p className="font-medium text-green-500">
                              ${post.stake_amount}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Interaction Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`gap-2 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        {post.likes_count}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments_count}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    
                    {post.potential_return && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Potential: </span>
                        <span className="font-medium text-green-500">
                          ${post.potential_return}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {posts.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Predictions Yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share a VIP prediction with this group!
          </p>
          <Button onClick={() => setIsCreatingPost(true)} className="gap-2">
            <Target className="h-4 w-4" />
            Share First Prediction
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default GroupPostFeed;