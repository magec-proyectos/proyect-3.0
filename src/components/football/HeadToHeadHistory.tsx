
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeadToHeadHistoryProps {
  homeTeamName: string;
  awayTeamName: string;
}

const HeadToHeadHistory: React.FC<HeadToHeadHistoryProps> = ({ 
  homeTeamName, 
  awayTeamName 
}) => {
  // Sample head-to-head data
  const matches = [
    { date: '12 Jan 2025', result: '2-1', winner: 'home' },
    { date: '24 Aug 2024', result: '1-1', winner: 'draw' },
    { date: '5 Mar 2024', result: '3-0', winner: 'home' },
    { date: '20 Oct 2023', result: '1-2', winner: 'away' },
    { date: '4 May 2023', result: '2-1', winner: 'home' }
  ];

  return (
    <Card className="glass-effect border-dark-border">
      <CardHeader>
        <CardTitle>Head-to-Head History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-center">
            <div>
              <div className="text-3xl font-bold text-neon-blue">15</div>
              <div className="text-sm text-gray-400">{homeTeamName} Wins</div>
            </div>
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm text-gray-400">Draws</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-lime">10</div>
              <div className="text-sm text-gray-400">{awayTeamName} Wins</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Last 5 Meetings</h4>
            <div className="space-y-2">
              {matches.map((match, idx) => (
                <div key={idx} className="flex justify-between items-center bg-dark-lighter p-3 rounded-lg">
                  <span className="text-sm">{match.date}</span>
                  <div className={`font-bold ${
                    match.winner === 'home' ? 'text-neon-blue' : 
                    match.winner === 'away' ? 'text-neon-lime' : ''
                  }`}>
                    {match.result}
                  </div>
                  <span className="text-xs text-gray-400">
                    {match.winner === 'home' ? homeTeamName : 
                      match.winner === 'away' ? awayTeamName : 'Draw'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeadToHeadHistory;
