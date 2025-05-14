
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dice1, ArrowRight, CircleDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Casino = () => {
  const navigate = useNavigate();
  
  const casinoGames = [
    { 
      title: 'Blackjack',
      description: 'Get optimal play recommendations for blackjack based on mathematical probabilities.',
      path: '/blackjack',
      icon: <Dice1 size={48} className="text-neon-blue" />,
      color: 'from-neon-blue/20 to-transparent',
      isPopular: true
    },
    { 
      title: 'Roulette',
      description: 'Analyze roulette strategies and get probability-based recommendations.',
      path: '/roulette',
      icon: <CircleDollarSign size={48} className="text-neon-lime" />,
      color: 'from-neon-lime/20 to-transparent',
      isPopular: false
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Casino Game Analysis</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Get AI-powered advice and strategy recommendations for popular casino games.
            </p>
          </motion.div>

          {/* Featured game - Blackjack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 overflow-hidden rounded-xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/30 to-transparent z-0"></div>
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                  <Dice1 size={32} className="text-neon-blue" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">Blackjack Advisor</h2>
                    <span className="bg-neon-blue/20 text-neon-blue text-xs font-medium px-2.5 py-0.5 rounded">FEATURED</span>
                  </div>
                  <p className="text-gray-300 mb-6 max-w-2xl">
                    Our most advanced casino tool! Get real-time advice on your blackjack hands based on mathematical probabilities and optimal strategy.
                  </p>
                  <Button 
                    onClick={() => navigate('/blackjack')} 
                    className="bg-neon-blue text-black hover:bg-neon-blue/90"
                  >
                    Try Blackjack Advisor
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold mb-6">All Casino Games</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {casinoGames.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="bg-dark-card border-dark-border h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`relative overflow-hidden h-full`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${game.color} z-0`}></div>
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div>{game.icon}</div>
                          {game.isPopular && (
                            <span className="bg-neon-blue/20 text-neon-blue text-xs font-medium px-2.5 py-0.5 rounded">POPULAR</span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                        <p className="text-gray-400 mb-6 flex-grow">{game.description}</p>
                        <Button 
                          onClick={() => navigate(game.path)} 
                          className="w-full bg-dark-lighter hover:bg-dark/70 border border-dark-border group"
                        >
                          <span className="mr-auto">Explore</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 p-6 bg-dark-lighter rounded-lg border border-dark-border"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Looking for more games?</h3>
                <p className="text-gray-400">We're constantly adding new casino games to our advisor platform.</p>
              </div>
              <Button
                className="bg-neon-lime text-black hover:bg-neon-lime/90 min-w-40"
                onClick={() => {/* Future feature */}}
              >
                Request a Game
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Casino;
