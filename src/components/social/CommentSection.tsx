
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
    <div className="mt-4 space-y-4 animate-fade-in">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className="bg-dark-lighter border-dark-border hover:border-neon-blue/20 transition-all">
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
              <div className="ml-11 space-y-2">
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs hover:text-red-400">
                    <Heart size={14} className="mr-1" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs hover:text-neon-blue">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-6 bg-dark-lighter/50 rounded-lg border border-dashed border-dark-border">
          <p className="text-gray-400 text-sm">Be the first to comment!</p>
        </div>
      )}
      
      <Card className="bg-dark-lighter border-dark-border">
        <CardContent className="pt-4">
          <Textarea
            placeholder="Add a comment..."
            className="resize-none bg-dark-card border-dark-border min-h-[80px] focus:border-neon-blue"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <p className="text-xs text-gray-400 mt-2">
            Press Ctrl+Enter to submit
          </p>
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
