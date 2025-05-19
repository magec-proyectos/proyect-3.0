
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertTriangle, UserMinus } from 'lucide-react';

interface MatchEvent {
  type: 'goal' | 'yellow-card' | 'red-card' | 'substitution';
  time: number;
  team: 'home' | 'away';
  player: string;
  description?: string;
}

interface MatchTimelineProps {
  events: MatchEvent[];
  homeTeam: string;
  awayTeam: string;
}

const MatchTimeline: React.FC<MatchTimelineProps> = ({ events, homeTeam, awayTeam }) => {
  // Early return if no events
  if (!events || events.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No events available for this match yet.
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Trophy size={18} className="text-neon-blue" />;
      case 'yellow-card':
        return <AlertTriangle size={18} className="text-yellow-500" />;
      case 'red-card':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'substitution':
        return <UserMinus size={18} className="text-purple-500" />;
      default:
        return <Trophy size={18} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">{homeTeam}</div>
        <div className="text-xs bg-dark-card px-3 py-1 rounded-full">Match Timeline</div>
        <div className="font-semibold">{awayTeam}</div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-dark-border"></div>

        {/* Events */}
        {events.map((event, index) => (
          <motion.div 
            key={`${event.time}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center mb-4 ${
              event.team === 'home' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div 
              className={`flex flex-row items-center glass-effect rounded-lg p-3 w-5/6 ${
                event.team === 'home' ? 'mr-auto pr-10' : 'ml-auto pl-10'
              }`}
            >
              {event.team === 'home' && (
                <div className="mr-3 p-2 rounded-full bg-dark-card">
                  {getEventIcon(event.type)}
                </div>
              )}
              
              <div className={`flex flex-col ${event.team === 'home' ? 'text-left' : 'text-right'}`}>
                <div className="text-sm font-medium">{event.player}</div>
                <div className="text-xs text-gray-400">{event.description}</div>
              </div>
              
              {event.team === 'away' && (
                <div className="ml-3 p-2 rounded-full bg-dark-card">
                  {getEventIcon(event.type)}
                </div>
              )}
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-black text-xs font-bold rounded-full h-6 w-12 flex items-center justify-center">
                {event.time}'
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchTimeline;
