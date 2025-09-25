import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SocialLayout from '@/components/social/layout/SocialLayout';
import SocialTabContent from '@/components/social/SocialTabContent';
import { useRealSocialData } from '@/hooks/useRealSocialData';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { EmojiNotificationTester } from '@/components/notifications/EmojiNotificationTester';

const Social = () => {
  const { user } = useAuth();
  const socialFeedRef = useRef<{ focusComposer: () => void }>(null);
  
  const {
    posts,
    loading,
    activeTab,
    feedFilter,
    setActiveTab,
    setFeedFilter,
    handleCreatePost,
    handleReaction,
    handleShare,
    getFilteredPosts,
    getUserReactions
  } = useRealSocialData();

  const { suggestedUsers } = useUserProfiles();
  
  const filteredPosts = getFilteredPosts(feedFilter);

  // Transform suggested users for SocialLayout
  const transformedSuggestedUsers = suggestedUsers.map(user => ({
    id: user.user_id,
    name: user.display_name,
    username: user.username || user.display_name.toLowerCase().replace(' ', ''),
    avatar: user.avatar_url || 'https://placehold.co/40'
  }));

  const liveMatches = [
    { teams: 'Barcelona vs Real Madrid', score: '2-1' },
    { teams: 'Liverpool vs Man City', score: '0-0' },
    { teams: 'PSG vs Bayern', score: '1-2' },
  ];

  return (
    <>
      <EmojiNotificationTester />
      <SocialLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onCreatePost={() => socialFeedRef.current?.focusComposer()}
      showStoriesRing={true}
      suggestedUsers={transformedSuggestedUsers}
      liveMatches={liveMatches}
      trendingPosts={posts.filter(post => post.likes_count > 3)}
    >
      <SocialTabContent
        activeTab={activeTab}
        feedFilter={feedFilter}
        onFilterChange={setFeedFilter}
        user={user}
        socialFeedRef={socialFeedRef}
      />
      </SocialLayout>
    </>
  );
};

export default Social;
