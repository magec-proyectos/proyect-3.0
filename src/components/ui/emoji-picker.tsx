import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Smile } from 'lucide-react';

interface EmojiCategory {
  name: string;
  icon: string;
  emojis: string[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    name: 'Smileys',
    icon: '😀',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚',
      '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
      '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄',
      '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢'
    ]
  },
  {
    name: 'Sports',
    icon: '⚽',
    emojis: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
      '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳',
      '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️',
      '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺',
      '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆'
    ]
  },
  {
    name: 'Money & Celebration',
    icon: '💰',
    emojis: [
      '💰', '💎', '💸', '💳', '💴', '💵', '💶', '💷', '💲', '🤑',
      '🎉', '🎊', '🎈', '🎁', '🎀', '🎗️', '🏅', '🏆', '🥇', '🥈',
      '🥉', '🔥', '⚡', '💫', '⭐', '🌟', '✨', '💥', '💢', '💯',
      '🎯', '🎲', '🃏', '🀄', '🎰', '🔮', '🎪', '🎭', '🎨', '🎬'
    ]
  },
  {
    name: 'Gestures',
    icon: '👍',
    emojis: [
      '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏',
      '🙌', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶',
      '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️'
    ]
  }
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  isOpen,
  onOpenChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmojis = searchQuery
    ? EMOJI_CATEGORIES.flatMap(cat => cat.emojis).filter(emoji => 
        emoji.includes(searchQuery) || 
        EMOJI_CATEGORIES.some(cat => 
          cat.emojis.includes(emoji) && 
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : EMOJI_CATEGORIES[selectedCategory].emojis;

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onOpenChange(!isOpen)}
        className="p-2"
        aria-label="Open emoji picker"
      >
        <Smile className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => onOpenChange(false)}
            />

            {/* Emoji Picker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-12 right-0 z-50 w-80 h-96 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search emojis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              {!searchQuery && (
                <div className="flex border-b border-border bg-muted/30">
                  {EMOJI_CATEGORIES.map((category, index) => (
                    <Button
                      key={category.name}
                      variant="ghost"
                      size="sm"
                      className={`flex-1 rounded-none border-b-2 transition-colors ${
                        selectedCategory === index
                          ? 'border-primary bg-primary/10'
                          : 'border-transparent hover:bg-muted'
                      }`}
                      onClick={() => setSelectedCategory(index)}
                      title={category.name}
                    >
                      <span className="text-lg">{category.icon}</span>
                    </Button>
                  ))}
                </div>
              )}

              {/* Emoji Grid */}
              <ScrollArea className="flex-1 p-2">
                <div className="grid grid-cols-8 gap-1">
                  {filteredEmojis.map((emoji, index) => (
                    <motion.button
                      key={`${emoji}-${index}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted transition-colors text-lg leading-none"
                    >
                      <span role="img" aria-label="emoji" className="text-lg leading-none">
                        {emoji}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {filteredEmojis.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Smile className="h-8 w-8 mb-2" />
                    <p className="text-sm">No emojis found</p>
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPicker;