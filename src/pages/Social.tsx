
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import SocialTabs from '@/components/social/SocialTabs';
import { Post } from '@/components/social/PostItem';
import { Comment } from '@/components/social/CommentSection'; 
import { initialPosts } from '@/data/samplePosts';

const Social = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts.map(post => ({
    ...post,
    commentList: []
  })));
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { user } = useAuth();

  const handleLike = (postId: number) => {
    if (!user) {
      toast.error('Please log in to like posts', {
        description: 'Create an account or log in to interact'
      });
      return;
    }
    
    if (likedPosts.includes(postId)) {
      // Unlike post
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
      
      // Animate the like change
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.classList.add('animate-pulse');
        setTimeout(() => {
          postElement.classList.remove('animate-pulse');
        }, 500);
      }
    } else {
      // Like post
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      
      // Animate the like change
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.classList.add('animate-pulse');
        setTimeout(() => {
          postElement.classList.remove('animate-pulse');
        }, 500);
      }
    }
  };

  const handleShare = (post: Post) => {
    if (!user) {
      toast.error('Please log in to share posts', {
        description: 'Create an account or log in to interact'
      });
      return;
    }
    
    toast.success('Sharing options opened!', {
      description: `Share ${post.bet.match} prediction with your friends`
    });
  };
  
  const handleAddComment = (postId: number, content: string) => {
    if (!user) {
      toast.error('Please log in to comment', {
        description: 'Create an account or log in to interact'
      });
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
      timestamp: 'Just now'
    };
    
    setPosts(posts.map(post => {
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
    
    toast.success('Comment added!');
  };

  const handleCreatePost = (content: string) => {
    if (!user) {
      toast.error('Please log in to create posts', {
        description: 'Create an account or log in to share your bets'
      });
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please add some content to your post');
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
        prediction: 'Custom Bet',
        odds: 2.5,
        amount: 25
      },
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Just now',
      commentList: []
    };
    
    setPosts([newPost, ...posts]);
    setIsCreatingPost(false);
    
    toast.success('Post created successfully!', {
      description: 'Your bet prediction has been shared'
    });
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Betting Social</h1>
            <Button 
              className="bg-neon-lime text-black hover:bg-neon-lime/90 animate-pulse hover:animate-none transition-all"
              onClick={() => setIsCreatingPost(true)}
            >
              Share a Prediction
            </Button>
          </div>
          
          <SocialTabs 
            posts={posts}
            likedPosts={likedPosts}
            isCreatingPost={isCreatingPost}
            onLike={handleLike}
            onShare={handleShare}
            onCreatePost={handleCreatePost}
            onCancelPost={() => setIsCreatingPost(false)}
            onAddComment={handleAddComment}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Social;
