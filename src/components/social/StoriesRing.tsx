import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Camera, Type, Video, Loader2, Play } from 'lucide-react';
import { useStories } from '@/hooks/useStories';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const StoriesRing: React.FC = () => {
  const { user } = useAuth();
  const { stories, myStories, isLoading, createStory, isCreatingStory } = useStories();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [contentType, setContentType] = useState<'text' | 'image' | 'video'>('text');

  const handleCreateStory = async () => {
    if (!user) {
      toast.error('Please sign in to create stories');
      return;
    }

    if (!storyContent.trim()) {
      toast.error('Please add content to your story');
      return;
    }

    createStory({
      content: storyContent,
      contentType
    });

    setStoryContent('');
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-16 h-16 rounded-full bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  // Group stories by user
  const groupedStories = stories.reduce((acc, story) => {
    const userId = story.user_id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(story);
    return acc;
  }, {} as Record<string, typeof stories>);

  const uniqueUsers = Object.keys(groupedStories);

  return (
    <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
      {/* Add Story Button */}
      {user && (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <div className="flex-shrink-0 text-center cursor-pointer group">
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary/60 p-0.5 mb-2">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Plus size={24} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Add Story</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[
                  { type: 'text', icon: Type, label: 'Text' },
                  { type: 'image', icon: Camera, label: 'Image' },
                  { type: 'video', icon: Video, label: 'Video' }
                ].map(({ type, icon: Icon, label }) => (
                  <Button
                    key={type}
                    variant={contentType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setContentType(type as any)}
                    className="flex items-center gap-2"
                  >
                    <Icon size={16} />
                    {label}
                  </Button>
                ))}
              </div>
              
              <Textarea
                placeholder={
                  contentType === 'text' 
                    ? "What's on your mind?"
                    : contentType === 'image'
                    ? "Image URL or caption..."
                    : "Video URL or caption..."
                }
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                className="min-h-[100px]"
              />
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isCreatingStory}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateStory}
                  disabled={!storyContent.trim() || isCreatingStory}
                >
                  {isCreatingStory ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Story'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* User Stories */}
      <AnimatePresence>
        {uniqueUsers.map((userId) => {
          const userStories = groupedStories[userId];
          const firstStory = userStories[0];
          const hasUnviewedStories = userStories.some(story => story.user_id !== user?.id);
          
          return (
            <motion.div
              key={userId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-shrink-0 text-center cursor-pointer group"
            >
              <div className={`relative w-16 h-16 rounded-full p-0.5 mb-2 ${
                hasUnviewedStories 
                  ? 'bg-gradient-to-tr from-pink-500 to-orange-500' 
                  : 'bg-muted'
              }`}>
                <div className="w-full h-full rounded-full bg-background p-0.5">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={firstStory.user_profiles?.avatar_url || 'https://placehold.co/64'} 
                      alt={firstStory.user_profiles?.display_name || 'User'} 
                    />
                    <AvatarFallback className="text-xs">
                      {firstStory.user_profiles?.display_name?.substring(0, 2) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {userStories.length}
                </div>
                {firstStory.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={12} className="text-white drop-shadow-lg" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate w-16">
                {firstStory.user_profiles?.username || 'user'}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* My Active Stories */}
      {myStories.length > 0 && (
        <div className="flex-shrink-0 text-center">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-blue-500 p-0.5 mb-2">
            <div className="w-full h-full rounded-full bg-background p-0.5">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || 'https://placehold.co/64'} 
                  alt="Your story" 
                />
                <AvatarFallback className="text-xs">
                  {user?.user_metadata?.full_name?.substring(0, 2) || 'Y'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {myStories.length}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Your Story</p>
        </div>
      )}
    </div>
  );
};

export default StoriesRing;