import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
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
      toast.error('Inicia sesión para dar like', {
        description: 'Crea una cuenta o inicia sesión para interactuar'
      });
      return;
    }
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      
      if (Math.random() > 0.7) {
        toast.success('¡Predicción popular!', {
          description: 'Tu like ayuda a otros usuarios a encontrar buenas predicciones'
        });
      }
    }
  };

  const handleShare = (post: Post) => {
    if (!user) {
      toast.error('Inicia sesión para compartir', {
        description: 'Crea una cuenta o inicia sesión para interactuar'
      });
      return;
    }
    
    toast.success('¡Opciones de compartir abiertas!', {
      description: `Comparte la predicción de ${post.bet.match} con tus amigos`
    });
  };
  
  const handleAddComment = (postId: number, content: string) => {
    if (!user) {
      toast.error('Inicia sesión para comentar', {
        description: 'Crea una cuenta o inicia sesión para interactuar'
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
      timestamp: 'Ahora'
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
    
    toast.success('¡Comentario añadido!');
  };

  const handleCreatePost = (content: string) => {
    if (!user) {
      toast.error('Inicia sesión para crear posts', {
        description: 'Crea una cuenta o inicia sesión para compartir tus predicciones'
      });
      return;
    }
    
    if (!content.trim()) {
      toast.error('Agrega contenido a tu post');
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
        prediction: 'Predicción Personalizada',
        odds: 2.5,
        amount: 25
      },
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Ahora',
      commentList: []
    };
    
    setPosts([newPost, ...posts]);
    
    toast.success('¡Post creado exitosamente!', {
      description: 'Tu predicción ha sido compartida con la comunidad'
    });
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Notificaciones</h2>
            <div className="text-center py-12 text-muted-foreground">
              No tienes notificaciones nuevas
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mensajes</h2>
            <div className="text-center py-12 text-muted-foreground">
              No tienes mensajes nuevos
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mi Perfil</h2>
            <div className="text-center py-12 text-muted-foreground">
              Perfil en desarrollo
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Wallet</h2>
            <div className="text-center py-12 text-muted-foreground">
              Wallet en desarrollo
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
