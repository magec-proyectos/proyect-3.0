import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, Heart, MessageCircle, Share, Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import { toast } from '@/components/ui/sonner';
import LiveBettingOverlay from './LiveBettingOverlay';
import QuickPredictionOverlay from './QuickPredictionOverlay';
import StoryProgressBar from './StoryProgressBar';

export interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
    verified: boolean;
  };
  content: {
    type: 'video' | 'image';
    url: string;
    thumbnail?: string;
    duration?: number;
  };
  match: {
    teams: [string, string];
    sport: string;
    league: string;
    time: string;
    isLive: boolean;
  };
  prediction: {
    type: 'winner' | 'total' | 'spread' | 'custom';
    value: string;
    odds: number;
    confidence: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    predictions: number;
  };
  timestamp: string;
  isLive?: boolean;
}

interface StoriesViewerProps {
  stories: Story[];
  initialIndex?: number;
  onClose: () => void;
  onStoryChange?: (index: number) => void;
}

const StoriesViewer: React.FC<StoriesViewerProps> = ({
  stories,
  initialIndex = 0,
  onClose,
  onStoryChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPredictionOverlay, setShowPredictionOverlay] = useState(false);
  const [showLiveBetting, setShowLiveBetting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout>();

  const currentStory = stories[currentIndex];

  // Handle story navigation
  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
      onStoryChange?.(currentIndex + 1);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose, onStoryChange]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
      onStoryChange?.(currentIndex - 1);
    }
  }, [currentIndex, onStoryChange]);

  // Touch gestures - simplified without useSwipeGestures hook
  const handleTouch = {
    onSwipeUp: () => setShowPredictionOverlay(true),
    onSwipeDown: () => setShowPredictionOverlay(false),
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    onTap: () => setIsPlaying(!isPlaying)
  };

  // Progress timer
  useEffect(() => {
    if (!isPlaying || showPredictionOverlay || showLiveBetting) return;

    const duration = currentStory.content.type === 'video' 
      ? (currentStory.content.duration || 15) * 1000 
      : 5000;

    progressTimerRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          goToNext();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [currentIndex, isPlaying, showPredictionOverlay, showLiveBetting, goToNext, currentStory]);

  // Video controls
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      videoRef.current.muted = isMuted;
    }
  }, [isPlaying, isMuted, currentIndex]);

  // Handle pan gesture for quick actions
  const handlePan = (info: PanInfo) => {
    if (info.velocity.y < -500) { // Quick swipe up
      setShowPredictionOverlay(true);
    } else if (info.velocity.y > 500) { // Quick swipe down
      setShowPredictionOverlay(false);
    } else if (info.velocity.x < -500) { // Quick swipe left
      goToNext();
    } else if (info.velocity.x > 500) { // Quick swipe right
      goToPrevious();
    }
  };

  const handleLike = () => {
    toast.success('¡Te gusta esta predicción!');
  };

  const handleComment = () => {
    setShowPredictionOverlay(true);
  };

  const handleShare = () => {
    toast.success('Predicción compartida');
  };

  const handleQuickBet = () => {
    if (currentStory.match.isLive) {
      setShowLiveBetting(true);
    } else {
      setShowPredictionOverlay(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      onPanEnd={(_, info) => handlePan(info)}
    >
      {/* Story Progress Bars */}
      <div className="absolute top-safe-top left-4 right-4 z-20">
        <StoryProgressBar 
          stories={stories}
          currentIndex={currentIndex}
          progress={progress}
        />
      </div>

      {/* Story Header */}
      <div className="absolute top-safe-top-lg left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={currentStory.user.avatar} 
              alt={currentStory.user.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            {currentStory.isLive && (
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                LIVE
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium text-sm">{currentStory.user.name}</span>
              {currentStory.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            <span className="text-white/70 text-xs">{currentStory.timestamp}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {currentStory.content.type === 'video' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20 p-2"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Story Content */}
      <motion.div
        key={currentStory.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
        onPan={(_, info) => handlePan(info)}
      >
        {currentStory.content.type === 'video' ? (
          <video
            ref={videoRef}
            src={currentStory.content.url}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            poster={currentStory.content.thumbnail}
          />
        ) : (
          <img
            src={currentStory.content.url}
            alt="Story content"
            className="w-full h-full object-cover"
          />
        )}

        {/* Match Info Overlay */}
        <div className="absolute top-1/3 left-4 right-4 z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {currentStory.match.league}
              </Badge>
              {currentStory.match.isLive && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  LIVE
                </Badge>
              )}
            </div>
            
            <div className="text-white font-bold text-lg mb-1">
              {currentStory.match.teams[0]} vs {currentStory.match.teams[1]}
            </div>
            
            <div className="text-white/70 text-sm mb-3">
              {currentStory.match.time}
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-white/80 text-sm mb-1">Predicción</div>
              <div className="text-white font-medium text-lg">
                {currentStory.prediction.value}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-neon-lime font-bold">
                  {currentStory.prediction.odds.toFixed(2)}x
                </span>
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  {currentStory.prediction.confidence}% confianza
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Areas */}
        <div className="absolute left-0 top-0 w-1/3 h-full z-10" onClick={goToPrevious} />
        <div className="absolute right-0 top-0 w-1/3 h-full z-10" onClick={goToNext} />
        <div className="absolute left-1/3 top-0 w-1/3 h-full z-10" onClick={() => setIsPlaying(!isPlaying)} />
      </motion.div>

      {/* Action Buttons */}
      <div className="absolute bottom-safe-bottom right-4 z-20 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
        >
          <Heart size={24} />
          <span className="text-xs mt-1 block">{currentStory.engagement.likes}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleComment}
          className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1 block">{currentStory.engagement.comments}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
        >
          <Share size={24} />
          <span className="text-xs mt-1 block">{currentStory.engagement.shares}</span>
        </motion.button>
      </div>

      {/* Quick Bet Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-safe-bottom left-4 right-20 z-20"
      >
        <Button
          onClick={handleQuickBet}
          className="w-full bg-neon-lime text-black font-bold py-4 rounded-full hover:bg-neon-lime/90 transition-all flex items-center justify-center gap-2"
        >
          {currentStory.match.isLive ? (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live Bet
            </>
          ) : (
            <>
              <Zap size={16} />
              Quick Prediction
            </>
          )}
          <ChevronUp size={16} />
        </Button>
      </motion.div>

      {/* Prediction Overlay */}
      <AnimatePresence>
        {showPredictionOverlay && (
          <QuickPredictionOverlay
            story={currentStory}
            onClose={() => setShowPredictionOverlay(false)}
            onBet={() => {
              setShowPredictionOverlay(false);
              toast.success('¡Predicción realizada!');
            }}
          />
        )}
      </AnimatePresence>

      {/* Live Betting Overlay */}
      <AnimatePresence>
        {showLiveBetting && (
          <LiveBettingOverlay
            story={currentStory}
            onClose={() => setShowLiveBetting(false)}
            onBet={() => {
              setShowLiveBetting(false);
              toast.success('¡Apuesta en vivo realizada!');
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StoriesViewer;