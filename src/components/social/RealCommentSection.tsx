import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Heart, Reply, Trash2, Loader2 } from 'lucide-react';
import { useComments, Comment } from '@/hooks/useComments';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface RealCommentSectionProps {
  postId: string;
}

const CommentItem: React.FC<{
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  isReply?: boolean;
}> = ({ comment, onReply, onDelete, isReply = false }) => {
  const { user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${isReply ? 'ml-8 border-l-2 border-border/30 pl-4' : ''}`}
    >
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage 
            src={comment.user_profiles?.avatar_url || 'https://placehold.co/32'} 
            alt={comment.user_profiles?.display_name || 'User'} 
          />
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            {(comment.user_profiles?.display_name || 'U').substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-body-sm text-foreground">
              {comment.user_profiles?.display_name || 'Anonymous User'}
            </span>
            <span className="text-body-xs text-muted-foreground">
              @{comment.user_profiles?.username || 'anonymous'}
            </span>
            <span className="text-body-xs text-muted-foreground">·</span>
            <span className="text-body-xs text-muted-foreground">{timeAgo}</span>
          </div>
          
          <p className="text-body-sm text-foreground leading-relaxed">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-4">
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-muted-foreground hover:text-primary"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply size={14} className="mr-1" />
                Reply
              </Button>
            )}
            
            {user && user.id === comment.user_id && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(comment.id)}
              >
                <Trash2 size={14} className="mr-1" />
                Delete
              </Button>
            )}
          </div>
          
          <AnimatePresence>
            {showReplyForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] text-body-sm"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyContent.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Replying...
                      </>
                    ) : (
                      'Reply'
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyContent('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Render replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-3 mt-3">
              <AnimatePresence>
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    onDelete={onDelete}
                    isReply={true}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const RealCommentSection: React.FC<RealCommentSectionProps> = ({ postId }) => {
  const { user } = useAuth();
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await addComment(newComment);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentCommentId: string, content: string) => {
    await addComment(content, parentCommentId);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
              <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add comment form */}
      {user && (
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={'https://placehold.co/32'} alt={user.name || 'User'} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {(user.name || 'U').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isSubmitting}
                    size="sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-body-sm">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onDelete={deleteComment}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default RealCommentSection;