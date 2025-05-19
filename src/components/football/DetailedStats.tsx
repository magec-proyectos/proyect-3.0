
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types/football';

interface DetailedStatsProps {
  homeTeam: Team;
  awayTeam: Team;
}

const DetailedStats: React.FC<DetailedStatsProps> = ({ homeTeam, awayTeam }) => {
  return (
    <Card className="glass-effect border-dark-border">
      <CardHeader>
        <CardTitle>Detailed Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-dark-lighter rounded-lg">
              <div className="text-sm text-gray-400">Shots on Target</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-neon-blue">{homeTeam.stats.shotsOnTarget}</span>
                <span className="text-gray-500 mx-1">-</span>
                <span className="text-neon-lime">{awayTeam.stats.shotsOnTarget}</span>
              </div>
            </div>
            
            <div className="p-3 bg-dark-lighter rounded-lg">
              <div className="text-sm text-gray-400">Corners</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-neon-blue">{homeTeam.stats.corners}</span>
                <span className="text-gray-500 mx-1">-</span>
                <span className="text-neon-lime">{awayTeam.stats.corners}</span>
              </div>
            </div>
            
            <div className="p-3 bg-dark-lighter rounded-lg">
              <div className="text-sm text-gray-400">xG</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-neon-blue">{homeTeam.stats.xG.toFixed(1)}</span>
                <span className="text-gray-500 mx-1">-</span>
                <span className="text-neon-lime">{awayTeam.stats.xG.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <h4 className="font-medium text-center">{homeTeam.name}</h4>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Clean Sheets</span>
                  <span>8</span>
                </div>
              </div>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Average Goals</span>
                  <span>2.4</span>
                </div>
              </div>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Win Rate</span>
                  <span>68%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-center">{awayTeam.name}</h4>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Clean Sheets</span>
                  <span>5</span>
                </div>
              </div>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Average Goals</span>
                  <span>1.7</span>
                </div>
              </div>
              <div className="bg-dark-lighter p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Win Rate</span>
                  <span>53%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedStats;
