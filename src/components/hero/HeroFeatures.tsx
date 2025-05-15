
import React from 'react';
import { Zap, LineChart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroFeatures = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const features = [
    {
      icon: <Zap className="text-neon-blue" size={24} />,
      title: "AI Predictions",
      description: "Advanced algorithms analyze thousands of data points for accurate predictions.",
      bgColor: "bg-neon-blue/20",
      textColor: "text-neon-blue"
    },
    {
      icon: <LineChart className="text-neon-lime" size={24} />,
      title: "Real-time Analysis",
      description: "Get instant insights and statistical calculations as games unfold.",
      bgColor: "bg-neon-lime/20",
      textColor: "text-neon-lime"
    },
    {
      icon: <Trophy className="text-neon-blue" size={24} />,
      title: "Community Rankings",
      description: "Join the community and climb the leaderboard with successful predictions.",
      bgColor: "bg-neon-blue/20",
      textColor: "text-neon-blue"
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          className="bg-dark-card p-6 rounded-xl border border-dark-border"
          variants={fadeIn}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 mx-auto`}>
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroFeatures;
