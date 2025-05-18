
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Football } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SportSelectionProps {
  className?: string;
  activeSport: 'football' | 'basketball' | 'americanFootball';
  onSelectSport: (sport: 'football' | 'basketball' | 'americanFootball') => void;
}

const SportSelection = ({ className, activeSport, onSelectSport }: SportSelectionProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.03, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const isActive = (sport: string) => activeSport === sport;

  // Sports data for cleaner rendering
  const sportsData = [
    {
      id: 'football',
      name: 'Football',
      emoji: '⚽',
      description: 'Premier League, La Liga & more',
      color: 'neon-blue',
      stat: '320+ matches weekly',
      tooltipText: 'Get predictions for top football leagues worldwide'
    },
    {
      id: 'basketball',
      name: 'Basketball',
      emoji: '🏀',
      description: 'NBA, Euroleague & international',
      color: 'neon-lime',
      stat: '140+ games analyzed',
      tooltipText: 'NBA and international basketball predictions'
    },
    {
      id: 'americanFootball',
      name: 'American Football',
      emoji: '🏈',
      description: 'NFL, NCAA & major leagues',
      color: 'purple-500',
      stat: '70+ matchups covered',
      tooltipText: 'NFL and college football predictions and analysis'
    }
  ];

  return (
    <div className={`${className}`}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sportsData.map((sport) => {
          const active = isActive(sport.id);
          
          return (
            <TooltipProvider key={sport.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    variants={itemVariants} 
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: active ? `0 8px 30px rgba(var(--${sport.color}-rgb), 0.3)` : '0 8px 20px rgba(0,0,0,0.2)'
                    }} 
                    whileTap={{ scale: 0.98 }}
                    animate={active ? "pulse" : ""}
                    variants={pulseVariants}
                    onClick={() => onSelectSport(sport.id as any)}
                    className={`relative overflow-hidden h-full`}
                  >
                    <Card className={`h-full overflow-hidden cursor-pointer transition-all duration-300 
                      bg-dark-card hover:bg-dark-lighter
                      ${active 
                        ? `border-2 border-${sport.color} shadow-lg shadow-${sport.color}/20` 
                        : 'border border-dark-border'}`}
                    >
                      {active && (
                        <div className={`absolute top-0 left-0 w-full h-1 bg-${sport.color}`}></div>
                      )}
                      
                      {/* Background pattern specific to sport */}
                      <div className={`absolute inset-0 opacity-5 ${
                        sport.id === 'football' ? 'bg-[url("/pattern-soccer.svg")]' :
                        sport.id === 'basketball' ? 'bg-[url("/pattern-basketball.svg")]' :
                        'bg-[url("/pattern-football.svg")]'
                      }`}></div>
                      
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col items-center text-center">
                          <motion.div 
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
                              ${active 
                                ? `bg-${sport.color}/10 border border-${sport.color}` 
                                : 'bg-dark-lighter border border-dark-border'}`}
                            animate={active ? { 
                              boxShadow: [`0 0 0px rgba(var(--${sport.color}-rgb), 0)`, 
                                          `0 0 10px rgba(var(--${sport.color}-rgb), 0.5)`, 
                                          `0 0 0px rgba(var(--${sport.color}-rgb), 0)`] 
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className={`text-2xl ${active ? `text-${sport.color}` : 'text-white'}`}>
                              {sport.emoji}
                            </span>
                          </motion.div>
                          
                          <h3 className="text-xl font-medium mb-1">{sport.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{sport.description}</p>
                          
                          {/* Stats indicator */}
                          <div className={`mb-4 text-xs px-2 py-1 rounded-full 
                            ${active ? `bg-${sport.color}/10 text-${sport.color}` : 'bg-dark/40 text-gray-400'}`}>
                            {sport.stat}
                          </div>
                          
                          <Button 
                            variant={active ? "default" : "outline"} 
                            size="sm" 
                            className={`mt-2 group ${active 
                              ? `bg-${sport.color} ${sport.id === 'americanFootball' ? 'text-white' : 'text-black'}` 
                              : ''}`}
                          >
                            Select
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent 
                  className="bg-dark-lighter border-dark-border text-white"
                  side="bottom"
                >
                  {sport.tooltipText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </motion.div>
      
      {/* Football icon and free trial message below the table */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/10 border border-neon-blue mb-4">
          <span className="text-3xl">⚽</span>
        </div>
        <div className="max-w-lg mx-auto">
          <h3 className="text-xl font-medium mb-2">Experience the full Smart Bet AI platform</h3>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:bg-neon-blue text-black mt-4 px-8"
          >
            Try for free
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SportSelection;
