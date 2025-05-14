
import React from 'react';
import { GameStats as GameStatsType } from './types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface GameStatsProps {
  stats: GameStatsType;
  balance: number;
}

const GameStats: React.FC<GameStatsProps> = ({ stats, balance }) => {
  // Calculate Return on Investment (ROI)
  const roi = stats.totalBets > 0 
    ? ((stats.totalWinnings - stats.totalLosses) / stats.totalLosses * 100).toFixed(1) 
    : '0.0';
  
  // Determine if ROI is positive or negative
  const isPositiveRoi = parseFloat(roi) >= 0;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-black/30 p-3 rounded-lg text-center border border-amber-900/30">
        <div className="text-xs text-amber-200/80 mb-1">Win/Loss</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-green-400 font-semibold">{stats.wins}</span>
          <span className="text-amber-200">/</span>
          <span className="text-red-400 font-semibold">{stats.losses}</span>
        </div>
        <div className="text-[10px] text-amber-200/60 mt-1">
          {stats.totalBets} total bets
        </div>
      </div>
      
      <div className="bg-black/30 p-3 rounded-lg text-center border border-amber-900/30">
        <div className="text-xs text-amber-200/80 mb-1">Win Rate</div>
        <div className="text-lg font-semibold text-amber-200">
          {stats.totalBets > 0 ? `${Math.round((stats.wins / stats.totalBets) * 100)}%` : '-'}
        </div>
        <div className="w-full bg-green-900/30 h-1 mt-2 rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-green-500"
            style={{ width: `${stats.totalBets > 0 ? (stats.wins / stats.totalBets) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-black/30 p-3 rounded-lg text-center border border-amber-900/30">
        <div className="text-xs text-amber-200/80 mb-1">Profit/Loss</div>
        <div className={`text-lg font-semibold flex items-center justify-center ${
          stats.totalWinnings - stats.totalLosses >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {stats.totalWinnings - stats.totalLosses >= 0 ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          ${Math.abs(stats.totalWinnings - stats.totalLosses)}
        </div>
        <div className="text-[10px] text-amber-200/60 mt-1">
          ROI: <span className={isPositiveRoi ? 'text-green-400' : 'text-red-400'}>{roi}%</span>
        </div>
      </div>
      
      <div className="bg-black/30 p-3 rounded-lg text-center border border-amber-900/30">
        <div className="text-xs text-amber-200/80 mb-1">Balance</div>
        <div className="text-lg font-semibold text-amber-200">
          ${balance}
        </div>
        <div className="text-[10px] text-amber-200/60 mt-1 flex items-center justify-center gap-1">
          <span className={stats.totalWinnings - stats.totalLosses >= 0 ? 'text-green-400' : 'text-red-400'}>
            {stats.totalWinnings - stats.totalLosses >= 0 ? '+' : ''}
            {stats.totalWinnings - stats.totalLosses}
          </span>
          <span>since start</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
