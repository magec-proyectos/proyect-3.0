import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SocialLayout from '@/components/social/layout/SocialLayout';
import SocialTabContent from '@/components/social/SocialTabContent';
import { useSocialState } from '@/hooks/useSocialState';

const Social = () => {
  const { user } = useAuth();
  const socialFeedRef = useRef<{ focusComposer: () => void }>(null);
  
  const {
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
  } = useSocialState();

  // Wrapper functions to include user parameter
  const wrappedHandleLike = (postId: number) => handleLike(postId, user);
  const wrappedHandleShare = (post: any) => handleShare(post, user);
  const wrappedHandleAddComment = (postId: number, content: string) => handleAddComment(postId, content, user);
  const wrappedHandleCreatePost = (content: string) => handleCreatePost(content, user);
  
  const filteredPosts = getFilteredPosts(feedFilter);

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

  return (
    <SocialLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onCreatePost={() => socialFeedRef.current?.focusComposer()}
      showStoriesRing={true}
      suggestedUsers={suggestedUsers}
      liveMatches={liveMatches}
      trendingPosts={posts.filter(post => post.likes > 3)}
    >
      <SocialTabContent
        activeTab={activeTab}
        posts={filteredPosts}
        likedPosts={likedPosts}
        feedFilter={feedFilter}
        onFilterChange={setFeedFilter}
        onLike={wrappedHandleLike}
        onShare={wrappedHandleShare}
        onAddComment={wrappedHandleAddComment}
        onCreatePost={wrappedHandleCreatePost}
        user={user}
        socialFeedRef={socialFeedRef}
      />
    </SocialLayout>
  );
};

export default Social;
