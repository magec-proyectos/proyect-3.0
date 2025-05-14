
import React from 'react';
import PostItem, { Post } from './PostItem';

interface PostFeedProps {
  posts: Post[];
  likedPosts: number[];
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, likedPosts, onLike, onShare, onAddComment }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          isLiked={likedPosts.includes(post.id)}
          onLike={onLike}
          onShare={onShare}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default PostFeed;
