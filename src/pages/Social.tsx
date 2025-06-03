
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import SocialTabs from '@/components/social/SocialTabs';
import StrategicNotifications from '@/components/notifications/StrategicNotifications';
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
      toast.error('Inicia sesión para dar like', {
        description: 'Crea una cuenta o inicia sesión para interactuar'
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
      
      // Animate the like change and show strategic notification
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.classList.add('animate-pulse');
        setTimeout(() => {
          postElement.classList.remove('animate-pulse');
        }, 500);
      }
      
      // Simular notificación estratégica
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

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {/* Notificaciones estratégicas */}
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
