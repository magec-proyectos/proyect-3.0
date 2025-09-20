import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Image, 
  BarChart, 
  Calendar
} from 'lucide-react';
import { Post } from './PostItem';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import VirtualizedPostFeed from './VirtualizedPostFeed';

interface SocialFeedProps {
  posts: Post[];
  likedPosts: number[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
  onCreatePost: (content: string) => void;
  user: any;
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
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280;

  const handlePostSubmit = () => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }

    if (!postContent.trim()) {
      toast.error('Please add content to your post');
      return;
    }

    onCreatePost(postContent);
    setPostContent('');
    setIsExpanded(false);
    
    toast.success('Post shared successfully');
  };

  const expandedVariants = {
    collapsed: { height: 'auto' },
    expanded: { 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const actionButtonsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, staggerChildren: 0.05 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-1">
      {/* Post Creation */}
      <Card className="bg-card border-border/50 hover:bg-card/80 transition-colors">
        <CardContent className="spacing-md">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar || 'https://placehold.co/40'} />
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                {user?.name?.substring(0, 2) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <motion.div
                variants={expandedVariants}
                animate={isExpanded ? 'expanded' : 'collapsed'}
              >
                <Textarea
                  placeholder="What's happening?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  className="border-0 bg-transparent resize-none text-body-lg placeholder:text-muted-foreground focus:ring-0 min-h-[50px] p-0"
                  rows={isExpanded ? 3 : 1}
                  maxLength={maxLength}
                />
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    variants={actionButtonsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex items-center justify-between mt-3 pt-3 border-t border-border/30"
                  >
                    <div className="flex gap-1">
                      {[
                         { icon: Image },
                         { icon: BarChart },
                         { icon: Calendar }
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          variants={buttonVariants}
                          className="p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <item.icon size={18} />
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${postContent.length > maxLength * 0.8 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {postContent.length}/{maxLength}
                      </span>
                      <Button
                        onClick={handlePostSubmit}
                        disabled={!postContent.trim() || postContent.length > maxLength}
                        size="sm"
                        className="rounded-full px-4 disabled:opacity-50"
                      >
                        Post
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Filter Tabs */}
      <div className="border-b border-border/30">
        <div className="flex">
          {[
            { id: 'foryou', label: 'For you' },
            { id: 'following', label: 'Following' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`
                relative px-4 py-3 text-body-md font-medium transition-colors
                ${filter === tab.id 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              {tab.label}
              {filter === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <VirtualizedPostFeed
        posts={posts}
        likedPosts={likedPosts}
        onLike={onLike}
        onShare={onShare}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default SocialFeed;