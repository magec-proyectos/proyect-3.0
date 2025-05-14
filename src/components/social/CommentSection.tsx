
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

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
      toast.error('Please log in to comment', {
        description: 'Create an account or log in to interact'
      });
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
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="bg-dark-lighter border-dark-border">
          <CardContent className="pt-4">
            <div className="flex gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">{comment.user.name}</span>
                  <span className="text-xs text-gray-400">@{comment.user.username}</span>
                </div>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
            </div>
            <p className="ml-11 text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-dark-lighter border-dark-border">
        <CardContent className="pt-4">
          <Textarea
            placeholder="Add a comment..."
            className="resize-none bg-dark-card border-dark-border min-h-[80px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            className="bg-neon-blue text-black hover:bg-neon-blue/90"
            onClick={handleSubmitComment}
            size="sm"
          >
            Comment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CommentSection;
