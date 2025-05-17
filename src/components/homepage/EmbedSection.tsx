
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmbedSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const platforms = [
    {
      id: 1,
      name: "Betting Platform 1",
      logo: "/lovable-uploads/2e6807d6-c6f9-4f98-be1c-cd7cfee16262.png",
      description: "Seamlessly integrate predictions with your favorite sportsbook"
    },
    {
      id: 2,
      name: "Betting Platform 2",
      logo: "/lovable-uploads/573d8a50-9af4-4d57-9edb-75fa1eaf9f50.png",
      description: "One-click bet placements directly from our platform"
    },
    {
      id: 3,
      name: "Betting Platform 3",
      logo: "/lovable-uploads/7524a565-21ca-4ac3-827b-23a205a694d2.png",
      description: "Automatic odds comparison across multiple providers"
    }
  ];

  const benefits = [
    "Place bets directly from our platform",
    "Compare odds across multiple providers",
    "Track your betting history in one place",
    "Receive notifications for the best odds",
    "Synchronize your betting portfolio"
  ];

  return (
    <section className="py-20 bg-dark-darker">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Embed Your Bets Into Your Favorite Tools</h2>
            <p className="text-gray-400 mb-8">
              Integrate our AI predictions seamlessly with your preferred betting platforms. Get the best of both worlds - powerful predictions and familiar betting interfaces.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-neon-blue" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              Connect Your Accounts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="relative bg-dark-card border border-dark-border rounded-xl overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-lime/5"></div>
              
              <div className="relative">
                {/* Platform Logo and Name */}
                <div className="flex flex-col items-center text-center mb-8">
                  <img 
                    src={platforms[0].logo} 
                    alt={platforms[0].name} 
                    className="h-16 mb-4 object-contain"
                  />
                  <h3 className="text-xl font-bold">{platforms[0].name}</h3>
                  <p className="text-gray-400 mt-2">{platforms[0].description}</p>
                </div>
                
                {/* Match Card Preview */}
                <div className="mb-8 w-full max-w-[400px] mx-auto bg-dark-lighter rounded-lg border border-dark-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Liverpool vs Chelsea</span>
                    <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full">Recommended</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Over 2.5 Goals</span>
                    <span className="text-neon-lime">1.95</span>
                  </div>
                </div>
                
                {/* Platform Icons */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {platforms.map((platform) => (
                    <div 
                      key={platform.id} 
                      className="w-16 h-16 bg-dark-lighter rounded-lg border border-dark-border flex items-center justify-center hover:border-neon-blue/50 transition-colors cursor-pointer"
                    >
                      <img 
                        src={platform.logo} 
                        alt={platform.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmbedSection;
