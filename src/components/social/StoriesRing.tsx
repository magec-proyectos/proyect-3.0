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
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';

const StoriesRing: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { announceToScreenReader, reducedMotion } = useAccessibility();
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

    announceToScreenReader(t('stories.create.success', 'Story created successfully'));
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
    <div 
      className="flex gap-4 p-4 overflow-x-auto scrollbar-hide"
      role="region"
      aria-label={t('stories.title', 'Stories')}
    >
      {/* Add Story Button */}
      {user && (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <div className="flex-shrink-0 text-center cursor-pointer group">
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary/60 p-0.5 mb-2">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Plus 
                    size={24} 
                    className={`text-primary ${!reducedMotion && 'group-hover:scale-110'} transition-transform`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('stories.add', 'Add Story')}
              </p>
              <span className="sr-only">
                {t('a11y.story.create', 'Create new story')}
              </span>
            </div>
          </DialogTrigger>
          <DialogContent
            aria-labelledby="create-story-title"
            aria-describedby="create-story-description"
          >
            <DialogHeader>
              <DialogTitle id="create-story-title">
                {t('stories.create', 'Create Story')}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4" id="create-story-description">
              <div className="flex gap-2" role="radiogroup" aria-label="Content type">
                {[
                  { type: 'text', icon: Type, label: t('stories.text', 'Text') },
                  { type: 'image', icon: Camera, label: t('stories.image', 'Image') },
                  { type: 'video', icon: Video, label: t('stories.video', 'Video') }
                ].map(({ type, icon: Icon, label }) => (
                  <Button
                    key={type}
                    variant={contentType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setContentType(type as any)}
                    className="flex items-center gap-2"
                    role="radio"
                    aria-checked={contentType === type}
                    aria-label={`Select ${label} content type`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </Button>
                ))}
              </div>
              
              <Textarea
                placeholder={
                  contentType === 'text' 
                    ? t('stories.content.placeholder', "What's on your mind?")
                    : contentType === 'image'
                    ? t('stories.image.placeholder', 'Image URL or caption...')
                    : t('stories.video.placeholder', 'Video URL or caption...')
                }
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                className="min-h-[100px]"
                aria-label="Story content"
                aria-required="true"
              />
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isCreatingStory}
                >
                  {t('common.cancel', 'Cancel')}
                </Button>
                <Button
                  onClick={handleCreateStory}
                  disabled={!storyContent.trim() || isCreatingStory}
                  aria-describedby={!storyContent.trim() ? 'content-required' : undefined}
                >
                  {isCreatingStory ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                      {t('stories.creating', 'Creating...')}
                    </>
                  ) : (
                    t('stories.create', 'Create Story')
                  )}
                </Button>
                {!storyContent.trim() && (
                  <span id="content-required" className="sr-only">
                    Content is required to create a story
                  </span>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* User Stories */}
      <AnimatePresence>
        {uniqueUsers.map((userId, index) => {
          const userStories = groupedStories[userId];
          const firstStory = userStories[0];
          const hasUnviewedStories = userStories.some(story => story.user_id !== user?.id);
          
          return (
            <motion.div
              key={userId}
              initial={!reducedMotion ? { opacity: 0, scale: 0.9 } : false}
              animate={!reducedMotion ? { opacity: 1, scale: 1 } : {}}
              exit={!reducedMotion ? { opacity: 0, scale: 0.9 } : {}}
              className="flex-shrink-0 text-center cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={t('a11y.story.view', `View story from {{username}}`, {
                username: firstStory.user_profiles?.username || 'user'
              })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle story view
                  announceToScreenReader(`Opening story from ${firstStory.user_profiles?.username}`);
                }
              }}
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
                      alt=""
                    />
                    <AvatarFallback className="text-xs">
                      {firstStory.user_profiles?.display_name?.substring(0, 2) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  aria-label={`${userStories.length} stories`}
                >
                  {userStories.length}
                </div>
                {firstStory.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play 
                      size={12} 
                      className="text-white drop-shadow-lg" 
                      aria-hidden="true"
                    />
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
        <div 
          className="flex-shrink-0 text-center"
          role="button"
          tabIndex={0}
          aria-label={t('stories.your', 'Your Story')}
        >
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-blue-500 p-0.5 mb-2">
            <div className="w-full h-full rounded-full bg-background p-0.5">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || 'https://placehold.co/64'} 
                  alt=""
                />
                <AvatarFallback className="text-xs">
                  {user?.user_metadata?.full_name?.substring(0, 2) || 'Y'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div 
              className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              aria-label={`${myStories.length} of your stories`}
            >
              {myStories.length}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('stories.your', 'Your Story')}
          </p>
        </div>
      )}
    </div>
  );
};

export default StoriesRing;