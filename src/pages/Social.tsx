
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Share2, Heart, MessageCircle, ThumbsUp, Instagram, Facebook, Twitter } from 'lucide-react';

// Sample data for social posts
const initialPosts = [
  {
    id: 1,
    user: {
      name: 'Alex Thompson',
      avatar: 'https://placehold.co/40',
      username: 'alexbet'
    },
    content: 'Just placed my bet on Liverpool to win 2-1! Who's with me? 🔥⚽️ #PremierLeague',
    bet: {
      match: 'Liverpool vs Manchester United',
      prediction: 'Liverpool Win (2-1)',
      odds: 3.25,
      amount: 50
    },
    likes: 245,
    comments: 32,
    shares: 18,
    timestamp: '2h ago'
  },
  {
    id: 2,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://placehold.co/40',
      username: 'sarahwins'
    },
    content: 'This AI prediction gives Arsenal a 70% chance to win against Chelsea! Putting $100 on it! 💰',
    bet: {
      match: 'Arsenal vs Chelsea',
      prediction: 'Arsenal Win & Over 2.5 Goals',
      odds: 2.80,
      amount: 100
    },
    likes: 189,
    comments: 41,
    shares: 14,
    timestamp: '5h ago'
  },
  {
    id: 3,
    user: {
      name: 'Mike Johnson',
      avatar: 'https://placehold.co/40',
      username: 'mikethebetter'
    },
    content: 'The algorithm is suggesting BTTS for the Manchester City game. Already up $500 this week following these predictions! 📈',
    bet: {
      match: 'Manchester City vs Tottenham',
      prediction: 'Both Teams To Score - Yes',
      odds: 1.75,
      amount: 200
    },
    likes: 312,
    comments: 57,
    shares: 29,
    timestamp: '1d ago'
  }
];

const Social = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
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
    } else {
      // Like post
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleShare = (post: any) => {
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

  const handleCreatePost = () => {
    if (!user) {
      toast.error('Please log in to create posts', {
        description: 'Create an account or log in to share your bets'
      });
      return;
    }
    
    if (!newPostContent.trim()) {
      toast.error('Please add some content to your post');
      return;
    }
    
    const newPost = {
      id: posts.length + 1,
      user: {
        name: user.name,
        avatar: 'https://placehold.co/40',
        username: user.name.toLowerCase().replace(' ', '')
      },
      content: newPostContent,
      bet: {
        match: 'Liverpool vs Manchester United',
        prediction: 'Custom Bet',
        odds: 2.5,
        amount: 25
      },
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Just now'
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsCreatingPost(false);
    
    toast.success('Post created successfully!', {
      description: 'Your bet prediction has been shared'
    });
  };

  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Bet Social</h1>
            <Button 
              className="bg-neon-lime text-black hover:bg-neon-lime/90"
              onClick={() => setIsCreatingPost(true)}
            >
              Share a Bet
            </Button>
          </div>
          
          <Tabs defaultValue="trending" className="mb-8">
            <TabsList className="bg-dark-lighter border-dark-border mb-6">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
            </TabsList>
            
            {isCreatingPost && (
              <Card className="bg-dark-card border-dark-border mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Share your bet prediction..." 
                      className="bg-dark-lighter border-dark-border resize-none"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="pt-2 border-t border-dark-border">
                      <h3 className="text-sm font-medium mb-2">Attach a bet:</h3>
                      <div className="bg-dark-lighter p-3 rounded-md">
                        <p className="text-sm text-gray-400">Selected bet:</p>
                        <p className="font-medium">Liverpool vs Manchester United - Home Win</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm">@2.50</span>
                          <span className="text-sm">$25 stake</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setIsCreatingPost(false)}>Cancel</Button>
                  <Button 
                    className="bg-neon-lime text-black hover:bg-neon-lime/90"
                    onClick={handleCreatePost}
                  >
                    Post
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-dark-card border-dark-border overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{post.user.name}</h3>
                        <p className="text-xs text-gray-400">@{post.user.username} • {post.timestamp}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2 space-y-3">
                    <p>{post.content}</p>
                    
                    <div className="bg-dark-lighter p-3 rounded-lg border border-dark-border">
                      <div className="text-sm text-gray-400">Bet prediction:</div>
                      <div className="font-medium">{post.bet.match}</div>
                      <div className="font-medium text-neon-blue">{post.bet.prediction}</div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>@{post.bet.odds.toFixed(2)}</span>
                        <span>${post.bet.amount} stake</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex items-center gap-1.5 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart size={18} className={likedPosts.includes(post.id) ? 'fill-red-500' : ''} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                          <MessageCircle size={18} />
                          {post.comments}
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1.5"
                        onClick={() => handleShare(post)}
                      >
                        <Share2 size={18} />
                        {post.shares}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Social;
