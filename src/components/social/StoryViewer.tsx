import React, { useState, useEffect } from 'react';
import { X, Eye, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
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

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const predictionTypeLabels: { [key: string]: string } = {
  'match_result': 'Match Result',
  'goals': 'Goals',
  'cards': 'Cards',
  'corners': 'Corners',
  'btts': 'Both Teams to Score',
  'quick_tip': 'Quick Tip'
};

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious 
}) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentIndex];
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            onNext();
          } else {
            onClose();
          }
          return 0;
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isOpen, isPaused, currentStory, onNext, onClose, stories.length]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    // Mark story as viewed
    if (currentStory && user && currentStory.user_id !== user.id) {
      const markAsViewed = async () => {
        try {
          await (supabase as any)
            .from('story_views')
            .upsert({
              story_id: currentStory.id,
              viewer_id: user.id
            }, { onConflict: 'story_id,viewer_id' });
        } catch (error) {
          console.error('Error marking story as viewed:', error);
        }
      };
      markAsViewed();
    }
  }, [currentStory, user]);

  if (!isOpen || !currentStory) return null;

  const timeRemaining = formatDistanceToNow(new Date(currentStory.expires_at), { addSuffix: true });

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={currentStory.user_profiles?.avatar_url} />
            <AvatarFallback>{currentStory.user_profiles?.display_name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-medium text-sm">
              {currentStory.user_profiles?.display_name}
            </div>
            <div className="text-white/70 text-xs">
              {timeRemaining}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {currentStory.user_id === user?.id && (
            <div className="flex items-center gap-1 text-white/80">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{currentStory.views_count}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Story Content */}
      <div 
        className="w-full max-w-sm aspect-[9/16] relative flex flex-col justify-center items-center text-center p-6"
        style={{ 
          backgroundColor: currentStory.background_color,
          color: currentStory.text_color 
        }}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerLeave={() => setIsPaused(false)}
      >
        {/* Prediction Type Badge */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
            {predictionTypeLabels[currentStory.prediction_type] || currentStory.prediction_type}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 mt-16">
          {currentStory.prediction_content.teams && (
            <div className="text-lg font-bold">
              {currentStory.prediction_content.teams}
            </div>
          )}
          
          <div className="text-base leading-relaxed">
            {currentStory.prediction_content.content}
          </div>
          
          {currentStory.prediction_content.prediction && (
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              {currentStory.prediction_content.prediction}
            </div>
          )}
          
          {currentStory.prediction_content.odds && (
            <div className="text-sm opacity-80">
              Odds: {currentStory.prediction_content.odds}
            </div>
          )}
        </div>

        {/* Time indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Clock className="w-3 h-3" />
            <span>Expires {timeRemaining}</span>
          </div>
        </div>
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div 
          className="flex-1 cursor-pointer"
          onClick={onPrevious}
        />
        <div 
          className="flex-1 cursor-pointer"
          onClick={onNext}
        />
      </div>

      {/* Navigation Buttons (Mobile) */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex === stories.length - 1}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default StoryViewer;