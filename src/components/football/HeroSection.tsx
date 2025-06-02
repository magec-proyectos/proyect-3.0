
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { TrendingUp, Target, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/micro-interaction';
import { useSpacing } from '@/hooks/useSpacing';
import { useTypography } from '@/hooks/useTypography';

const HeroSection = () => {
  const spacing = useSpacing();
  const typography = useTypography();
  
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

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
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      />
      
      {/* Glass overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/20" />
      
      {/* Floating decorative elements with solid colors */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full animate-float opacity-60" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/5 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
      
      <div className={`relative container mx-auto ${spacing.getPadding('lg')} py-20 md:py-28`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center max-w-5xl mx-auto ${spacing.getSpace('lg')}`}
        >
          
          {/* Enhanced badge with solid colors */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={`bg-dark-card/50 border border-gray-600 ${spacing.getPadding('md')} rounded-full flex items-center ${spacing.getGap('sm')}`}>
              <Zap className="h-5 w-5 text-blue-600" />
              <span className={`${typography.getTextClass('caption')} text-blue-600 font-semibold uppercase tracking-wider`}>
                AI-Powered Analytics
              </span>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </motion.div>
          
          {/* Enhanced main heading */}
          <motion.h1 
            className={`${typography.getResponsiveClass('display-md', 'display-2xl')} mb-8 leading-tight ${typography.balance}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Smarter Football Bets,{' '}
            <span className="text-blue-600">
              Backed by Real-Time AI
            </span>
          </motion.h1>
          
          {/* Enhanced subtitle */}
          <motion.p 
            className={`${typography.getResponsiveClass('body-md', 'body-lg')} text-gray-400 mb-12 max-w-3xl mx-auto ${typography.pretty}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Live stats, 20+ leagues, deep insights. Win smarter with data-driven predictions.
          </motion.p>
          
          {/* Enhanced action buttons */}
          <motion.div 
            className={`flex flex-col sm:flex-row ${spacing.getGap('lg')} justify-center items-center mb-16`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <EnhancedButton 
              size="xl" 
              variant="solid"
              animation="glow"
              icon={<Target className="h-5 w-5" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg interactive-lift"
            >
              View Today's Picks
            </EnhancedButton>
            
            <EnhancedButton 
              variant="outline" 
              size="xl" 
              icon={<BarChart3 className="h-5 w-5" />}
              className="border-2 border-gray-600 bg-transparent hover:border-blue-600 text-gray-300 hover:text-blue-600 interactive-lift"
            >
              Explore Matches
            </EnhancedButton>
          </motion.div>
          
          {/* Enhanced stats grid with solid colors */}
          <div className={`grid grid-cols-2 md:grid-cols-4 ${spacing.getGap('lg')}`}>
            {[
              { value: "20+", label: "Leagues", color: "blue-600", delay: 0 },
              { value: "87%", label: "Accuracy", color: "green-600", delay: 1 },
              { value: "Live", label: "Odds", color: "blue-600", delay: 2 },
              { value: "Real-time", label: "Analytics", color: "green-600", delay: 3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={statsVariants}
              >
                <AnimatedCard intensity="moderate">
                  <div className={`bg-dark-card/50 border border-gray-600 hover:border-${stat.color}/30 ${spacing.getPadding('lg')} rounded-xl hover:shadow-lg transition-all duration-300 group interactive-lift`}>
                    <motion.div 
                      className={`${typography.getTextClass('display-sm')} text-${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.value}
                    </motion.div>
                    <div className={`${typography.getTextClass('caption')} text-gray-400 font-medium`}>
                      {stat.label}
                    </div>
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
