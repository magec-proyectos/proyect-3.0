import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StrategicNotifications from '@/components/notifications/StrategicNotifications';
import SocialSidebar from '../SocialSidebar';
import SocialDiscovery from '../SocialDiscovery';
import MobileBottomNav from '../mobile/MobileBottomNav';
import StoriesRing from '../StoriesRing';
import { useIsMobile } from '@/hooks/use-mobile';

interface SocialLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost: () => void;
  showStoriesRing?: boolean;
  suggestedUsers: any[];
  liveMatches: any[];
  trendingPosts: any[];
}

const SocialLayout: React.FC<SocialLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onCreatePost,
  showStoriesRing = false,
  suggestedUsers,
  liveMatches,
  trendingPosts
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <StrategicNotifications />
        
        <main className="pt-16 pb-20 spacing-sm">
          <div className="max-w-md mx-auto">
            {showStoriesRing && activeTab === 'home' && (
              <div className="spacing-md">
                <StoriesRing />
              </div>
            )}
            {children}
          </div>
        </main>
        
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={onTabChange}
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
      
      <div className="flex w-full">
        <SocialSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          onCreatePost={onCreatePost}
          notifications={3}
          messages={1}
        />
        
        <main className="flex-1 min-h-screen max-w-2xl pt-20 spacing-md border-x border-border/50">
          {showStoriesRing && activeTab === 'home' && (
            <div className="spacing-lg border-b border-border/50 pb-4">
              <StoriesRing />
            </div>
          )}
          {children}
        </main>
        
        <div className="w-80 pt-20 spacing-md hidden xl:block">
          <div className="sticky top-24">
            <SocialDiscovery
              trendingPosts={trendingPosts}
              suggestedUsers={suggestedUsers}
              liveMatches={liveMatches}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLayout;