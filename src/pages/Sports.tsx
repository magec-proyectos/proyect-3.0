
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Sports = () => {
  const navigate = useNavigate();
  
  const sportsCategories = [
    { 
      title: 'Football',
      description: 'Get predictions and analysis for football matches from leagues around the world.',
      path: '/football',
      icon: <Dumbbell size={48} className="text-neon-blue" />,
      color: 'from-neon-blue/20 to-transparent'
    },
    { 
      title: 'Basketball',
      description: 'Basketball predictions and stats to help you make informed betting decisions.',
      path: '/basketball',
      icon: <Dumbbell size={48} className="text-neon-lime" />,
      color: 'from-neon-lime/20 to-transparent'
    },
    { 
      title: 'American Football',
      description: 'NFL and college football predictions powered by advanced analytics.',
      path: '/american-football',
      icon: <Dumbbell size={48} className="text-purple-500" />,
      color: 'from-purple-500/20 to-transparent'
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
            <h1 className="text-4xl font-bold mb-4">Sports Predictions & Analysis</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Get AI-powered insights and analytics for a variety of sports to make smarter betting decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {sportsCategories.map((sport, index) => (
              <motion.div
                key={sport.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="bg-dark-card border-dark-border h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`relative overflow-hidden h-full`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${sport.color} z-0`}></div>
                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="mb-4">{sport.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{sport.title}</h3>
                        <p className="text-gray-400 mb-6 flex-grow">{sport.description}</p>
                        <Button 
                          onClick={() => navigate(sport.path)} 
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
                <h3 className="text-xl font-bold mb-2">Looking for more sports?</h3>
                <p className="text-gray-400">We're constantly adding new sports to our prediction platform.</p>
              </div>
              <Button
                className="bg-neon-blue text-black hover:bg-neon-blue/90 min-w-40"
                onClick={() => {/* Future feature */}}
              >
                Request a Sport
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sports;
