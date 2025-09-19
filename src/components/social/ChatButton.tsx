import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import DirectMessaging from './DirectMessaging';

interface ChatButtonProps {
  userId?: string;
  userName?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  userId, 
  userName, 
  variant = 'outline', 
  size = 'sm',
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={`gap-2 ${className}`}>
          <MessageCircle className="h-4 w-4" />
          {size !== 'icon' && (userName ? `Message ${userName}` : 'Message')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Direct Messages</DialogTitle>
        </DialogHeader>
        <DirectMessaging 
          selectedUserId={userId} 
          onClose={() => setIsOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatButton;