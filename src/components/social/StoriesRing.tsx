import React, { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import CreateStoryModal from './CreateStoryModal';
import StoryViewer from './StoryViewer';
import { formatDistanceToNow } from 'date-fns';

interface Story {
  id: string;
  user_id: string;
  prediction_type: string;
  prediction_content: any;
  background_color: string;
  text_color: string;
  views_count: number;
  expires_at: string;
  created_at: string;
  user_profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

interface StoryGroup {
  user_id: string;
  user_profiles: {
    display_name: string;
    avatar_url: string;
  };
  stories: Story[];
  hasUnviewed: boolean;
  latestStory: string;
}

const StoriesRing: React.FC = () => {
  const { user } = useAuth();
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [myStories, setMyStories] = useState<Story[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewerState, setViewerState] = useState({
    isOpen: false,
    stories: [] as Story[],
    currentIndex: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      setLoading(true);
      
      // Fetch all active stories with user profiles
      const { data: stories, error } = await (supabase as any)
        .from('user_stories')
        .select(`
          *,
          user_profiles!inner(display_name, avatar_url)
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (stories) {
        // Separate my stories from others
        const myStoriesData = stories.filter((story: Story) => story.user_id === user?.id);
        const otherStories = stories.filter((story: Story) => story.user_id !== user?.id);

        setMyStories(myStoriesData);

        // Group stories by user
        const grouped = otherStories.reduce((acc: { [key: string]: StoryGroup }, story: Story) => {
          if (!acc[story.user_id]) {
            acc[story.user_id] = {
              user_id: story.user_id,
              user_profiles: story.user_profiles!,
              stories: [],
              hasUnviewed: false,
              latestStory: story.created_at
            };
          }
          acc[story.user_id].stories.push(story);
          return acc;
        }, {});

        // Check for unviewed stories (simplified - you could enhance this with actual view tracking)
        const groupsArray = Object.values(grouped).map((group: StoryGroup) => {
          return {
            user_id: group.user_id,
            user_profiles: group.user_profiles,
            stories: group.stories,
            hasUnviewed: true, // Simplified - assume all are unviewed for now
            latestStory: group.latestStory
          };
        });

        setStoryGroups(groupsArray);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStories();
    }
  }, [user]);

  // Set up real-time subscription for new stories
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('stories-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_stories'
        } as any,
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleStoryClick = (stories: Story[], startIndex = 0) => {
    setViewerState({
      isOpen: true,
      stories,
      currentIndex: startIndex
    });
  };

  const handleViewerClose = () => {
    setViewerState({
      isOpen: false,
      stories: [],
      currentIndex: 0
    });
  };

  const handleViewerNext = () => {
    setViewerState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.stories.length - 1 
        ? prev.currentIndex + 1 
        : prev.currentIndex
    }));
  };

  const handleViewerPrevious = () => {
    setViewerState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 
        ? prev.currentIndex - 1 
        : prev.currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="flex gap-4 p-4 overflow-x-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border-b border-border pb-4 mb-6">
      <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
        {/* Create Story Button */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-16 h-16 rounded-full p-0 bg-primary/20 border-2 border-dashed border-primary hover:bg-primary/30"
          >
            <Plus className="w-6 h-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Your Story</span>
        </div>

        {/* My Stories */}
        {myStories.length > 0 && (
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={() => handleStoryClick(myStories)}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-500 to-pink-500">
                <Avatar className="w-full h-full border-2 border-background">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {myStories.length}
              </div>
            </button>
            <span className="text-xs text-muted-foreground">You</span>
          </div>
        )}

        {/* Other Users' Stories */}
        {storyGroups.map((group) => (
          <div key={group.user_id} className="flex-shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={() => handleStoryClick(group.stories)}
              className="relative"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                group.hasUnviewed 
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500' 
                  : 'bg-gray-600'
              }`}>
                <Avatar className="w-full h-full border-2 border-background">
                  <AvatarImage src={group.user_profiles.avatar_url} />
                  <AvatarFallback>{group.user_profiles.display_name[0]}</AvatarFallback>
                </Avatar>
              </div>
              {group.stories.length > 1 && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {group.stories.length}
                </div>
              )}
            </button>
            <span className="text-xs text-center max-w-[64px] truncate">
              {group.user_profiles.display_name}
            </span>
          </div>
        ))}

        {/* Empty State */}
        {storyGroups.length === 0 && myStories.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No active stories</p>
              <p className="text-xs">Stories expire after 24 hours</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Story Modal */}
      <CreateStoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onStoryCreated={() => {
          fetchStories();
          setIsCreateModalOpen(false);
        }}
      />

      {/* Story Viewer */}
      <StoryViewer
        stories={viewerState.stories}
        currentIndex={viewerState.currentIndex}
        isOpen={viewerState.isOpen}
        onClose={handleViewerClose}
        onNext={handleViewerNext}
        onPrevious={handleViewerPrevious}
      />
    </div>
  );
};

export default StoriesRing;
