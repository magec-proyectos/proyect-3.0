
import React from 'react';
import { motion } from 'framer-motion';
import { Football, Basketball, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  const isActive = (sport: string) => activeSport === sport;

  return (
    <div className={`${className}`}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Football Card */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectSport('football')}
        >
          <Card className={`h-full overflow-hidden cursor-pointer transition-all duration-200 bg-dark-card hover:bg-dark-lighter
            ${isActive('football') ? 'border-2 border-neon-blue shadow-md shadow-neon-blue/20' : 'border border-dark-border'}`}
          >
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isActive('football') ? 'bg-neon-blue/10 border border-neon-blue' : 'bg-dark-lighter border border-dark-border'}`}
                >
                  <Football size={28} className={`${isActive('football') ? 'text-neon-blue' : 'text-white'}`} />
                </div>
                <h3 className="text-xl font-medium mb-2">Football</h3>
                <p className="text-gray-400 text-sm mb-4">Premier League, La Liga & more</p>
                <Button 
                  variant={isActive('football') ? "default" : "outline"} 
                  size="sm" 
                  className={`mt-2 group ${isActive('football') ? 'bg-neon-blue text-black' : ''}`}
                >
                  Select
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Basketball Card */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectSport('basketball')}
        >
          <Card className={`h-full overflow-hidden cursor-pointer transition-all duration-200 bg-dark-card hover:bg-dark-lighter
            ${isActive('basketball') ? 'border-2 border-neon-lime shadow-md shadow-neon-lime/20' : 'border border-dark-border'}`}
          >
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isActive('basketball') ? 'bg-neon-lime/10 border border-neon-lime' : 'bg-dark-lighter border border-dark-border'}`}
                >
                  <Basketball size={28} className={`${isActive('basketball') ? 'text-neon-lime' : 'text-white'}`} />
                </div>
                <h3 className="text-xl font-medium mb-2">Basketball</h3>
                <p className="text-gray-400 text-sm mb-4">NBA, Euroleague & international</p>
                <Button 
                  variant={isActive('basketball') ? "default" : "outline"} 
                  size="sm" 
                  className={`mt-2 group ${isActive('basketball') ? 'bg-neon-lime text-black' : ''}`}
                >
                  Select
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* American Football Card */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectSport('americanFootball')}
        >
          <Card className={`h-full overflow-hidden cursor-pointer transition-all duration-200 bg-dark-card hover:bg-dark-lighter
            ${isActive('americanFootball') ? 'border-2 border-purple-500 shadow-md shadow-purple-500/20' : 'border border-dark-border'}`}
          >
            <CardContent className="p-0">
              <div className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isActive('americanFootball') ? 'bg-purple-500/10 border border-purple-500' : 'bg-dark-lighter border border-dark-border'}`}
                >
                  <span className={`text-2xl ${isActive('americanFootball') ? 'text-purple-400' : 'text-white'}`}>🏈</span>
                </div>
                <h3 className="text-xl font-medium mb-2">American Football</h3>
                <p className="text-gray-400 text-sm mb-4">NFL, NCAA & major leagues</p>
                <Button 
                  variant={isActive('americanFootball') ? "default" : "outline"} 
                  size="sm" 
                  className={`mt-2 group ${isActive('americanFootball') ? 'bg-purple-500 text-white' : ''}`}
                >
                  Select
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SportSelection;
