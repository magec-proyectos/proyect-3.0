
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsPanel from '@/components/StatsPanel';
import PredictionBox from '@/components/PredictionBox';
import MatchTimeline from '@/components/MatchTimeline';
import BettingTrends from '@/components/BettingTrends';
import MatchNews from '@/components/MatchNews';
import DetailedStats from '@/components/football/DetailedStats';
import HeadToHeadHistory from '@/components/football/HeadToHeadHistory';
import SkeletonCard from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { TrendingUp, FileText } from 'lucide-react';

import { 
  Team, 
  Prediction, 
  MatchEvent, 
  BettingTrend, 
  NewsItem 
} from '@/types/football';

interface FootballTabsProps {
  isLoading: boolean;
  homeTeam: Team;
  awayTeam: Team;
  prediction: Prediction;
  matchEvents: MatchEvent[];
  bettingTrends: BettingTrend[];
  matchNews: NewsItem[];
}

const FootballTabs: React.FC<FootballTabsProps> = ({
  isLoading,
  homeTeam,
  awayTeam,
  prediction,
  matchEvents,
  bettingTrends,
  matchNews
}) => {
  return (
    <Tabs defaultValue="prediction" className="mb-8">
      <TabsList className="bg-dark-lighter border-dark-border mb-6 w-full md:w-auto">
        <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
        <TabsTrigger value="stats">Statistics</TabsTrigger>
        <TabsTrigger value="timeline">Match Timeline</TabsTrigger>
        <TabsTrigger value="trends">Betting Trends</TabsTrigger>
        <TabsTrigger value="news">Latest News</TabsTrigger>
      </TabsList>
      
      <TabsContent value="prediction" className="mt-0 space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard type="stats" />
            <SkeletonCard type="prediction" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsPanel homeTeam={homeTeam} awayTeam={awayTeam} />
            <PredictionBox 
              prediction={prediction} 
              homeTeam={homeTeam.name} 
              awayTeam={awayTeam.name} 
            />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="stats" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailedStats homeTeam={homeTeam} awayTeam={awayTeam} />
          <HeadToHeadHistory homeTeamName={homeTeam.name} awayTeamName={awayTeam.name} />
        </div>
      </TabsContent>
      
      <TabsContent value="timeline" className="mt-0">
        <Card className="glass-effect border-dark-border">
          <CardHeader>
            <CardTitle>Match Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchTimeline 
              events={matchEvents}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="trends" className="mt-0">
        <Card className="glass-effect border-dark-border">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Betting Market Trends</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <TrendingUp size={14} />
                <span>Live Updates</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BettingTrends 
              trends={bettingTrends}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="news" className="mt-0">
        <Card className="glass-effect border-dark-border">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Latest News & Updates</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText size={14} />
                <span>See All News</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MatchNews news={matchNews} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default FootballTabs;
