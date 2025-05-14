
import React from 'react';
import { GameStats as GameStatsType } from './types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface GameStatsProps {
  stats: GameStatsType;
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  // Calcular la tasa de retorno (ROI)
  const roi = stats.totalBets > 0 
    ? ((stats.totalWinnings - stats.totalLosses) / stats.totalLosses * 100).toFixed(1) 
    : '0.0';
  
  // Determinar si el ROI es positivo o negativo
  const isPositiveRoi = parseFloat(roi) >= 0;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="glass-card p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400 mb-1">Victoria/Derrota</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-green-400 font-semibold">{stats.wins}</span>
          <span className="text-gray-400">/</span>
          <span className="text-red-400 font-semibold">{stats.losses}</span>
        </div>
        <div className="text-[10px] text-gray-500 mt-1">
          {stats.totalBets} jugadas totales
        </div>
      </div>
      
      <div className="glass-card p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400 mb-1">Tasa de Victoria</div>
        <div className="text-lg font-semibold">
          {stats.totalBets > 0 ? `${Math.round((stats.wins / stats.totalBets) * 100)}%` : '-'}
        </div>
        <div className="w-full bg-dark-lighter h-1 mt-2 rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-green-500"
            style={{ width: `${stats.totalBets > 0 ? (stats.wins / stats.totalBets) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="glass-card p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400 mb-1">Ganancia/Pérdida</div>
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
        <div className="text-[10px] text-gray-500 mt-1">
          ROI: <span className={isPositiveRoi ? 'text-green-400' : 'text-red-400'}>{roi}%</span>
        </div>
      </div>
      
      <div className="glass-card p-3 rounded-lg text-center">
        <div className="text-xs text-gray-400 mb-1">Balance</div>
        <div className="text-lg font-semibold text-white">
          $1000
        </div>
        <div className="text-[10px] text-gray-500 mt-1 flex items-center justify-center gap-1">
          <span className={stats.totalWinnings - stats.totalLosses >= 0 ? 'text-green-400' : 'text-red-400'}>
            {stats.totalWinnings - stats.totalLosses >= 0 ? '+' : ''}
            {stats.totalWinnings - stats.totalLosses}
          </span>
          <span>desde inicio</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
