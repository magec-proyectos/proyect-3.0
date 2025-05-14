
import React from 'react';
import { GameStats as GameStatsType } from './types';

interface GameStatsProps {
  stats: GameStatsType;
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div className="bg-dark-lighter p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400">Win/Loss</div>
        <div className="text-lg font-semibold">{stats.wins}/{stats.losses}</div>
      </div>
      <div className="bg-dark-lighter p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400">Win Rate</div>
        <div className="text-lg font-semibold">
          {stats.totalBets > 0 ? `${Math.round((stats.wins / stats.totalBets) * 100)}%` : '-'}
        </div>
      </div>
      <div className="bg-dark-lighter p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400">Profit/Loss</div>
        <div className={`text-lg font-semibold ${stats.totalWinnings - stats.totalLosses >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${stats.totalWinnings - stats.totalLosses}
        </div>
      </div>
      <div className="bg-dark-lighter p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400">Total Bets</div>
        <div className="text-lg font-semibold">{stats.totalBets}</div>
      </div>
    </div>
  );
};

export default GameStats;
