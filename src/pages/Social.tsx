import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import SocialTabs from '@/components/social/SocialTabs';
import StrategicNotifications from '@/components/notifications/StrategicNotifications';
import MobileSocialHeader from '@/components/social/mobile/MobileSocialHeader';
import MobilePostCard from '@/components/social/mobile/MobilePostCard';
import { Post } from '@/components/social/PostItem';
import { Comment } from '@/components/social/CommentSection'; 
import { initialPosts } from '@/data/samplePosts';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobilePerformance } from '@/hooks/use-mobile-performance';
import { motion, AnimatePresence } from 'framer-motion';

const Social = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts.map(post => ({
    ...post,
    commentList: []
  })));
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const {
    getItemsToRender,
    observeElement,
    shouldOptimize,
    measurePerformance
  } = useMobilePerformance({
    batchSize: isMobile ? 5 : 10,
    enableVirtualization: isMobile,
    lazyLoadOffset: 200
  });

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
    setIsCreatingPost(false);
    
    toast.success('¡Post creado exitosamente!', {
      description: 'Tu predicción ha sido compartida con la comunidad'
    });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    measurePerformance();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    toast.success(`Buscando: ${query}`);
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'trending' && post.likes > 5) ||
      (activeFilter === 'following' && post.id % 2 === 0) ||
      (activeFilter === 'live' && post.timestamp === 'Ahora');
    
    return matchesSearch && matchesFilter;
  });

  const postsToRender = shouldOptimize 
    ? getItemsToRender(filteredPosts.length).map(index => filteredPosts[index])
    : filteredPosts;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <StrategicNotifications />
        
        <main className="pt-16 pb-20">
          <MobileSocialHeader
            onCreatePost={() => setIsCreatingPost(true)}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />
          
          <div className="px-4 py-4 space-y-4">
            <AnimatePresence>
              {postsToRender.map((post, index) => (
                <motion.div
                  key={post.id}
                  ref={(el) => shouldOptimize && el && observeElement(el, index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MobilePostCard
                    post={post}
                    isLiked={likedPosts.includes(post.id)}
                    onLike={() => handleLike(post.id)}
                    onComment={() => toast.info('Función de comentarios en desarrollo')}
                    onShare={() => handleShare(post)}
                    onBookmark={() => toast.success('Post guardado')}
                    onReport={() => toast.success('Post reportado')}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Create Post FAB for mobile */}
          {isCreatingPost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-x-4 bottom-24 bg-dark-card border border-dark-border rounded-2xl p-4 z-40 shadow-2xl"
            >
              <textarea
                placeholder="Comparte tu predicción..."
                className="w-full bg-dark-lighter border border-dark-border rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:border-neon-blue focus:outline-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreatingPost(false)}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  className="bg-neon-blue text-black hover:bg-neon-blue/90"
                  onClick={() => handleCreatePost('Nuevo post desde móvil')}
                >
                  Publicar
                </Button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <StrategicNotifications />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Comunidad de Apuestas</h1>
              <p className="text-gray-400">Conecta con expertos y mejora tus predicciones</p>
            </div>
            <Button 
              className="bg-neon-lime text-black hover:bg-neon-lime/90 animate-pulse hover:animate-none transition-all font-medium"
              onClick={() => setIsCreatingPost(true)}
            >
              Compartir Predicción
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
