
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Heart } from 'lucide-react';

export interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onAddComment: (postId: number, content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  postId, 
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const handleSubmitComment = () => {
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    onAddComment(postId, newComment);
    setNewComment('');
  };

  return (
    <div className="mt-4 space-y-4 animate-fade-in">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className="bg-card border-border hover:border-border/80 transition-all">
            <CardContent className="pt-4">
              <div className="flex gap-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground">{comment.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-foreground">{comment.user.name}</span>
                    <span className="text-xs text-muted-foreground">@{comment.user.username}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
              </div>
              <div className="ml-11 space-y-2">
                <p className="text-sm text-foreground">{comment.content}</p>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs text-muted-foreground hover:text-foreground">
                    <Heart size={14} className="mr-1" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs text-muted-foreground hover:text-foreground">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <p className="text-sm">No comments yet</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
