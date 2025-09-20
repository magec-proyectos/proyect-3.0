import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StoriesViewer, { Story } from './stories/StoriesViewer';

// Sample stories data
const sampleStories: Story[] = [
  {
    id: '1',
    user: {
      name: 'ProTipster',
      avatar: 'https://placehold.co/100',
      username: 'protipster',
      verified: true
    },
    content: {
      type: 'video',
      url: '/lovable-uploads/08212846-590e-4578-b016-bf0a01f14455.png',
      thumbnail: '/lovable-uploads/08212846-590e-4578-b016-bf0a01f14455.png',
      duration: 15
    },
    match: {
      teams: ['Real Madrid', 'Barcelona'],
      sport: 'Football',
      league: 'La Liga',
      time: '67\'',
      isLive: true
    },
    prediction: {
      type: 'winner',
      value: 'Real Madrid Gana',
      odds: 2.15,
      confidence: 85
    },
    engagement: {
      likes: 1247,
      comments: 89,
      shares: 156,
      predictions: 340
    },
    timestamp: '2 min',
    isLive: true
  },
  {
    id: '2',
    user: {
      name: 'BetExpert',
      avatar: 'https://placehold.co/100',
      username: 'betexpert',
      verified: true
    },
    content: {
      type: 'image',
      url: '/lovable-uploads/096710cc-8897-405e-93b7-5a5659000837.png'
    },
    match: {
      teams: ['Lakers', 'Warriors'],
      sport: 'Basketball',
      league: 'NBA',
      time: '20:30',
      isLive: false
    },
    prediction: {
      type: 'total',
      value: 'Over 225.5 Puntos',
      odds: 1.90,
      confidence: 78
    },
    engagement: {
      likes: 892,
      comments: 45,
      shares: 67,
      predictions: 234
    },
    timestamp: '15 min'
  },
  {
    id: '3',
    user: {
      name: 'SoccerPro',
      avatar: 'https://placehold.co/100',
      username: 'soccerpro',
      verified: false
    },
    content: {
      type: 'video',
      url: '/lovable-uploads/0f96ac67-f58a-4bb6-8eb0-35790175d95e.png',
      thumbnail: '/lovable-uploads/0f96ac67-f58a-4bb6-8eb0-35790175d95e.png',
      duration: 12
    },
    match: {
      teams: ['Liverpool', 'Chelsea'],
      sport: 'Football',
      league: 'Premier League',
      time: '45\' + 2',
      isLive: true
    },
    prediction: {
      type: 'spread',
      value: 'Liverpool -1.5',
      odds: 2.45,
      confidence: 72
    },
    engagement: {
      likes: 654,
      comments: 23,
      shares: 89,
      predictions: 167
    },
    timestamp: '5 min',
    isLive: true
  }
];

interface StoriesRingProps {
  className?: string;
}

const StoriesRing: React.FC<StoriesRingProps> = ({ className = '' }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setShowViewer(true);
  };

  return (
    <>
      <div className={`mb-6 ${className}`}>
        <div className="flex items-center gap-4 px-4 pb-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 text-center cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-purple-500 rounded-full flex items-center justify-center border-2 border-dark-border mb-2">
              <Plus size={24} className="text-white" />
            </div>
            <span className="text-xs text-gray-400">Tu Story</span>
          </motion.div>

          {/* Stories */}
          {sampleStories.map((story, index) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStoryClick(index)}
              className="flex-shrink-0 text-center cursor-pointer relative"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 mb-2 ${
                story.isLive 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                  : 'bg-gradient-to-r from-neon-lime to-neon-blue'
              }`}>
                <div className="w-full h-full rounded-full border-2 border-dark bg-dark-card flex items-center justify-center overflow-hidden">
                  <img 
                    src={story.content.url} 
                    alt={story.user.name}
                    className="w-full h-full object-cover"
                  />
                  {story.content.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={16} className="text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
                
                {/* Live indicator */}
                {story.isLive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                    LIVE
                  </div>
                )}

                {/* Verified badge */}
                {story.user.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              
              <span className="text-xs text-gray-400 block truncate w-16">
                {story.user.username}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stories Viewer */}
      <AnimatePresence>
        {showViewer && (
          <StoriesViewer
            stories={sampleStories}
            initialIndex={selectedStoryIndex}
            onClose={() => setShowViewer(false)}
            onStoryChange={setSelectedStoryIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StoriesRing;
