import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Bell, MessageCircle, User, Wallet } from 'lucide-react';
import StrategicNotifications from '@/components/notifications/StrategicNotifications';
import StoriesRing from '@/components/social/StoriesRing';
import SocialSidebar from '@/components/social/SocialSidebar';
import SocialFeed from '@/components/social/SocialFeed';
import SocialDiscovery from '@/components/social/SocialDiscovery';
import MobileBottomNav from '@/components/social/mobile/MobileBottomNav';
import { Post } from '@/components/social/PostItem';
import { Comment } from '@/components/social/CommentSection'; 
import { initialPosts } from '@/data/samplePosts';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const Social = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts.map(post => ({
    ...post,
    commentList: []
  })));
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [feedFilter, setFeedFilter] = useState('foryou');
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleLike = (postId: number) => {
    if (!user) {
      toast.error('Please sign in to like posts', {
        description: 'Create an account or sign in to interact with posts',
        action: { label: 'Sign in', onClick: () => {} }
      });
      return;
    }
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
      toast.success('Removed like 💔');
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      
      toast.success('Prediction liked! 💜', {
        description: 'Your like helps others find great predictions'
      });
      
      if (Math.random() > 0.7) {
        toast.success('🔥 Popular prediction!', {
          description: 'This prediction is trending in the community'
        });
      }
    }
  };

  const handleShare = (post: Post) => {
    if (!user) {
      toast.error('Please sign in to share posts', {
        description: 'Create an account or sign in to share predictions',
        action: { label: 'Sign in', onClick: () => {} }
      });
      return;
    }
    
    toast.success('🚀 Share options opened!', {
      description: `Share ${post.bet.match} prediction with your friends`
    });
  };
  
  const handleAddComment = (postId: number, content: string) => {
    if (!user) {
      toast.error('Please sign in to comment', {
        description: 'Create an account or sign in to join the discussion',
        action: { label: 'Sign in', onClick: () => {} }
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
      timestamp: 'Now'
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
    
    toast.success('💬 Comment added successfully!');
  };

  const handleCreatePost = (content: string) => {
    if (!user) {
      toast.error('Please sign in to create posts', {
        description: 'Create an account or sign in to share your predictions',
        action: { label: 'Sign in', onClick: () => {} }
      });
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
    
    setPosts([newPost, ...posts]);
  };

  // Filter posts based on current filter
  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'following') {
      return post.id % 2 === 0; // Simulate following filter
    }
    return true; // "Para ti" shows all posts
  });

  // Mock data for discovery sidebar
  const suggestedUsers = [
    { id: 1, name: 'Carlos Bet Pro', username: 'carlosbetpro', avatar: 'https://placehold.co/40' },
    { id: 2, name: 'Ana Predictor', username: 'anapredictor', avatar: 'https://placehold.co/40' },
    { id: 3, name: 'José Winners', username: 'josewinners', avatar: 'https://placehold.co/40' },
  ];

  const liveMatches = [
    { teams: 'Barcelona vs Real Madrid', score: '2-1' },
    { teams: 'Liverpool vs Man City', score: '0-0' },
    { teams: 'PSG vs Bayern', score: '1-2' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <SocialFeed
            posts={filteredPosts}
            likedPosts={likedPosts}
            filter={feedFilter}
            onFilterChange={setFeedFilter}
            onLike={handleLike}
            onShare={handleShare}
            onAddComment={handleAddComment}
            onCreatePost={handleCreatePost}
            user={user}
          />
        );
      case 'explore':
        return (
          <div className="space-y-6">
            <StoriesRing />
            <SocialFeed
              posts={posts.filter(post => post.likes > 3)}
              likedPosts={likedPosts}
              filter="trending"
              onFilterChange={setFeedFilter}
              onLike={handleLike}
              onShare={handleShare}
              onAddComment={handleAddComment}
              onCreatePost={handleCreatePost}
              user={user}
            />
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Notifications</h2>
            <div className="text-center py-16 text-muted-foreground">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No new notifications</p>
              <p className="text-sm">We'll notify you when something happens</p>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Messages</h2>
            <div className="text-center py-16 text-muted-foreground">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No new messages</p>
              <p className="text-sm">Start a conversation with other predictors</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My Profile</h2>
            <div className="text-center py-16 text-muted-foreground">
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Profile in development</p>
              <p className="text-sm">Your betting statistics and achievements will appear here</p>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Wallet</h2>
            <div className="text-center py-16 text-muted-foreground">
              <Wallet size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Wallet in development</p>
              <p className="text-sm">Manage your betting funds and earnings here</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <StrategicNotifications />
        
        <main className="pt-16 pb-20 px-4">
          {activeTab === 'home' && <StoriesRing />}
          {renderTabContent()}
        </main>
        
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          notifications={3}
          messages={1}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <StrategicNotifications />
      
      {/* Desktop Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <SocialSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreatePost={() => handleCreatePost('Post desde sidebar')}
          notifications={3}
          messages={1}
        />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen ml-64 mr-80 pt-20 px-6">
          {activeTab === 'home' && <StoriesRing />}
          {renderTabContent()}
        </main>
        
        {/* Right Discovery Sidebar */}
        <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 p-4 overflow-y-auto hidden xl:block">
          <SocialDiscovery
            trendingPosts={posts.filter(post => post.likes > 3)}
            suggestedUsers={suggestedUsers}
            liveMatches={liveMatches}
          />
        </div>
      </div>
    </div>
  );
};

export default Social;
