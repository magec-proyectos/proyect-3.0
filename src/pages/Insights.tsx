
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import chart components
import PerformanceMetrics from '@/components/insights/PerformanceMetrics';
import PerformanceChart from '@/components/insights/PerformanceChart';
import SportDistributionChart from '@/components/insights/SportDistributionChart';
import LeaguePerformanceChart from '@/components/insights/LeaguePerformanceChart';
import BettingSkillsChart from '@/components/insights/BettingSkillsChart';
import OddsDistributionChart from '@/components/insights/OddsDistributionChart';
import BetTypeAnalysisChart from '@/components/insights/BetTypeAnalysisChart';
import TimeFrameSelector from '@/components/insights/TimeFrameSelector';
import ChartTypeSelector from '@/components/insights/ChartTypeSelector';

// Import chart data
import {
  performanceData,
  categoryData,
  leagueData,
  betTypeData,
  skillRadarData,
  oddsDistributionData
} from '@/components/insights/data';

const Insights = () => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const [timeFrame, setTimeFrame] = useState('last-6-months');

  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Betting Insights</h1>
          <p className="text-gray-400 mb-8">Track your betting performance and get data-driven insights to improve your strategy.</p>
          
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="performance" className="w-full md:w-auto">
              <TabsList className="bg-dark-lighter border-dark-border">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-4">
              <TimeFrameSelector 
                value={timeFrame} 
                onValueChange={(value) => setTimeFrame(value)} 
              />
              
              <ChartTypeSelector 
                value={chartType} 
                onValueChange={(value) => setChartType(value as 'line' | 'area' | 'bar')} 
              />
            </div>
          </div>
          
          <PerformanceMetrics 
            winRate={{ value: 71, change: 3.2 }}
            profit={{ value: 765, change: 12.5 }}
            totalBets={{ value: 146, period: 'Last 6 months' }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PerformanceChart 
              performanceData={performanceData}
              chartType={chartType}
            />
            
            <SportDistributionChart categoryData={categoryData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <LeaguePerformanceChart leagueData={leagueData} />
            <BettingSkillsChart skillRadarData={skillRadarData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OddsDistributionChart oddsDistributionData={oddsDistributionData} />
            <BetTypeAnalysisChart betTypeData={betTypeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;
