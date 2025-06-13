
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Flag } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { Post } from '../PostItem';

interface MobilePostCardProps {
  post: Post;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark?: () => void;
  onReport?: () => void;
}

const MobilePostCard: React.FC<MobilePostCardProps> = ({
  post,
  isLiked,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onReport
}) => {
  const [showActions, setShowActions] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { elementRef } = useTouchGestures({
    onSwipe: (swipe) => {
      if (swipe.direction === 'left' && swipe.distance > 100) {
        // Quick like gesture
        if (!isLiked) {
          onLike();
        }
      } else if (swipe.direction === 'right' && swipe.distance > 100) {
        // Quick bookmark gesture
        setIsBookmarked(!isBookmarked);
        if (onBookmark) onBookmark();
      }
    },
    onLongPress: () => {
      setShowActions(true);
    }
  });

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset(info.offset.x);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    
    if (info.offset.x > threshold) {
      // Swipe right - bookmark
      setIsBookmarked(!isBookmarked);
      if (onBookmark) onBookmark();
    } else if (info.offset.x < -threshold) {
      // Swipe left - like
      if (!isLiked) {
        onLike();
      }
    }
    
    setDragOffset(0);
  };

  return (
    <>
      <motion.div
        ref={elementRef}
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: dragOffset }}
        className="relative"
      >
        {/* Swipe Indicators */}
        <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center bg-red-500/20 rounded-l-lg -z-10">
          <Heart className="w-6 h-6 text-red-400" />
        </div>
        <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center bg-blue-500/20 rounded-r-lg -z-10">
          <Bookmark className="w-6 h-6 text-blue-400" />
        </div>

        <Card className="bg-dark-card border-dark-border hover:border-neon-blue/30 transition-all touch-manipulation">
          <CardContent className="p-4">
            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white text-sm">{post.user.name}</h4>
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      PRO
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">@{post.user.username} • {post.timestamp}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(true)}
                className="p-2 hover:bg-dark-lighter"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-white text-sm leading-relaxed mb-3">{post.content}</p>
              
              {/* Bet Info Card */}
              <div className="bg-dark-lighter border border-neon-blue/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Predicción</span>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                    Cuota {post.bet.odds}x
                  </Badge>
                </div>
                <h5 className="font-medium text-white text-sm mb-1">{post.bet.match}</h5>
                <p className="text-neon-blue text-sm font-medium">{post.bet.prediction}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Apuesta: ${post.bet.amount}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLike}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isLiked 
                      ? 'bg-red-500/10 text-red-400' 
                      : 'text-gray-400 hover:bg-dark-lighter hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComment}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-lighter hover:text-blue-400 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </motion.button>
              </div>
              
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onShare}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-lighter hover:text-green-400 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{post.shares}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    if (onBookmark) onBookmark();
                  }}
                  className={`p-2 rounded-lg transition-all ${
                    isBookmarked 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-400 hover:bg-dark-lighter hover:text-blue-400'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions Modal */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowActions(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="w-full bg-dark-card rounded-t-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
              
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter"
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    if (onBookmark) onBookmark();
                    setShowActions(false);
                  }}
                >
                  <Bookmark className="w-5 h-5 mr-3" />
                  {isBookmarked ? 'Quitar de guardados' : 'Guardar post'}
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter"
                  onClick={() => {
                    onShare();
                    setShowActions(false);
                  }}
                >
                  <Share2 className="w-5 h-5 mr-3" />
                  Compartir post
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 hover:bg-dark-lighter text-red-400"
                  onClick={() => {
                    if (onReport) onReport();
                    setShowActions(false);
                  }}
                >
                  <Flag className="w-5 h-5 mr-3" />
                  Reportar post
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobilePostCard;
