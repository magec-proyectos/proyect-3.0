
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostFeed from './PostFeed';
import CreatePostForm from './CreatePostForm';
import { Post } from './PostItem';

interface SocialTabsProps {
  posts: Post[];
  likedPosts: number[];
  isCreatingPost: boolean;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onCreatePost: (content: string) => void;
  onCancelPost: () => void;
  onAddComment: (postId: number, content: string) => void;
}

const SocialTabs: React.FC<SocialTabsProps> = ({
  posts,
  likedPosts,
  isCreatingPost,
  onLike,
  onShare,
  onCreatePost,
  onCancelPost,
  onAddComment
}) => {
  return (
    <Tabs defaultValue="trending" className="mb-8">
      <TabsList className="bg-dark-lighter border-dark-border mb-6">
        <TabsTrigger value="trending">Trending</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="latest">Latest</TabsTrigger>
      </TabsList>
      
      {isCreatingPost && (
        <CreatePostForm onCreatePost={onCreatePost} onCancel={onCancelPost} />
      )}
      
      <TabsContent value="trending">
        <PostFeed 
          posts={posts}
          likedPosts={likedPosts}
          onLike={onLike}
          onShare={onShare}
          onAddComment={onAddComment}
        />
      </TabsContent>
      
      <TabsContent value="following">
        <div className="text-center py-10">
          <p className="text-gray-400">Follow other users to see their posts here</p>
        </div>
      </TabsContent>
      
      <TabsContent value="latest">
        <PostFeed 
          posts={[...posts].sort((a, b) => {
            if (a.timestamp === "Just now") return -1;
            if (b.timestamp === "Just now") return 1;
            return a.timestamp.localeCompare(b.timestamp);
          })}
          likedPosts={likedPosts}
          onLike={onLike}
          onShare={onShare}
          onAddComment={onAddComment}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SocialTabs;
