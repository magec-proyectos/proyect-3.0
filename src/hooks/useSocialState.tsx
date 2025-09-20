import { useState, useCallback } from 'react';
import { Post } from '@/components/social/PostItem';
import { Comment } from '@/components/social/CommentSection';
import { initialPosts } from '@/data/samplePosts';
import { toast } from '@/components/ui/sonner';

export const useSocialState = () => {
  const [posts, setPosts] = useState<Post[]>(
    initialPosts.map(post => ({ ...post, commentList: [] }))
  );
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [feedFilter, setFeedFilter] = useState('foryou');

  const handleLike = useCallback((postId: number, user: any) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
      toast.success('Removed like');
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      toast.success('Prediction liked');
    }
  }, [likedPosts]);

  const handleShare = useCallback((post: Post, user: any) => {
    if (!user) {
      toast.error('Please sign in to share posts');
      return;
    }
    toast.success('Share options opened');
  }, []);
  
  const handleAddComment = useCallback((postId: number, content: string, user: any) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }
    
    const newComment: Comment = {
      id: Math.floor(Math.random() * 1000),
      user: {
        name: user.name,
        avatar: 'https://placehold.co/40',
        username: user.name.toLowerCase().replace(' ', '')
      },
      content: content,
      timestamp: 'Now'
    };
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const updatedCommentList = [...(post.commentList || []), newComment];
        return {
          ...post,
          comments: post.comments + 1,
          commentList: updatedCommentList
        };
      }
      return post;
    }));
    
    toast.success('Comment added successfully');
  }, []);

  const handleCreatePost = useCallback((content: string, user: any) => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please add content to your post');
      return;
    }
    
    const newPost: Post = {
      id: posts.length + 1,
      user: {
        name: user.name,
        avatar: 'https://placehold.co/40',
        username: user.name.toLowerCase().replace(' ', '')
      },
      content: content,
      bet: {
        match: 'Liverpool vs Manchester United',
        prediction: 'Custom Prediction',
        odds: 2.5,
        amount: 25
      },
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Now',
      commentList: []
    };
    
    setPosts(prev => [newPost, ...prev]);
  }, [posts.length]);

  const getFilteredPosts = useCallback((filter: string) => {
    if (filter === 'following') {
      return posts.filter(post => post.id % 2 === 0);
    }
    return posts;
  }, [posts]);

  return {
    posts,
    likedPosts,
    activeTab,
    feedFilter,
    setActiveTab,
    setFeedFilter,
    handleLike,
    handleShare,
    handleAddComment,
    handleCreatePost,
    getFilteredPosts
  };
};