
import React from 'react';
import { Zap, LineChart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroFeatures = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "AI Predictions",
      description: "Advanced algorithms analyze thousands of data points for accurate predictions.",
      bgColor: "bg-neon-blue/20",
      borderColor: "border-neon-blue/30",
      textColor: "text-neon-blue"
    },
    {
      icon: <LineChart size={24} />,
      title: "Real-time Analysis",
      description: "Get instant insights and statistical calculations as games unfold.",
      bgColor: "bg-neon-lime/20",
      borderColor: "border-neon-lime/30",
      textColor: "text-neon-lime"
    },
    {
      icon: <Trophy size={24} />,
      title: "Community Rankings",
      description: "Join the community and climb the leaderboard with successful predictions.",
      bgColor: "bg-neon-blue/20",
      borderColor: "border-neon-blue/30",
      textColor: "text-neon-blue"
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          className={`bg-dark-card/40 backdrop-blur-lg p-6 rounded-xl border ${feature.borderColor} hover:border-opacity-100`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, delay: index * 0.2 }
            }
          }}
          whileHover={{ 
            y: -8,
            boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1)`,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div 
            className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 mx-auto`}
            initial={{ scale: 0.8, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <motion.div 
              className={feature.textColor}
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.3
              }}
            >
              {feature.icon}
            </motion.div>
          </motion.div>
          <h3 className={`text-lg font-semibold ${feature.textColor} mb-2 text-center`}>{feature.title}</h3>
          <p className="text-gray-400 text-sm text-center">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroFeatures;
