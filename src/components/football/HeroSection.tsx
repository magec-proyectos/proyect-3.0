
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { TrendingUp, Target, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/micro-interaction';

const HeroSection = () => {
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  const statsVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative bg-gradient-to-br from-dark via-dark-lighter to-dark-card overflow-hidden">
      {/* Enhanced background elements */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-neon-blue/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-neon-lime/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          
          {/* Enhanced badge */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-neon-blue/20 to-neon-lime/20 border border-neon-blue/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <Zap className="h-5 w-5 text-neon-blue" />
              <span className="text-sm text-neon-blue font-semibold uppercase tracking-wider">
                AI-Powered Analytics
              </span>
              <TrendingUp className="h-5 w-5 text-neon-lime" />
            </div>
          </motion.div>
          
          {/* Enhanced main heading */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Smarter Football Bets,{' '}
            <span className="bg-gradient-to-r from-neon-blue via-neon-lime to-neon-blue bg-clip-text text-transparent animate-pulse">
              Backed by Real-Time AI
            </span>
          </motion.h1>
          
          {/* Enhanced subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Live stats, 20+ leagues, deep insights. Win smarter with data-driven predictions.
          </motion.p>
          
          {/* Enhanced action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <EnhancedButton 
              size="xl" 
              variant="gradient"
              animation="glow"
              icon={<Target className="h-5 w-5" />}
              className="font-bold text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-blue-500/30"
            >
              View Today's Picks
            </EnhancedButton>
            
            <EnhancedButton 
              variant="outline" 
              size="xl" 
              icon={<BarChart3 className="h-5 w-5" />}
              className="border-2 border-gray-600 text-white hover:border-neon-blue hover:text-neon-blue hover:shadow-neon-blue/20 px-10 py-6 rounded-xl transition-all duration-300"
            >
              Explore Matches
            </EnhancedButton>
          </motion.div>
          
          {/* Enhanced stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Leagues", color: "neon-blue", delay: 0 },
              { value: "87%", label: "Accuracy", color: "neon-lime", delay: 1 },
              { value: "Live", label: "Odds", color: "neon-blue", delay: 2 },
              { value: "Real-time", label: "Analytics", color: "neon-lime", delay: 3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={statsVariants}
              >
                <AnimatedCard intensity="moderate">
                  <div className="bg-dark-card/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 group">
                    <motion.div 
                      className={`text-3xl font-bold text-${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
