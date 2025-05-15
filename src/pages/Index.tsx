import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { ArrowDown, Check, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import TryItNow from '@/components/homepage/TryItNow';

const Index = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Sports vs Casino Section */}
        <section className="py-16 bg-dark">
          <div className="container px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-2">Choose Your Game</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Whether you're a sports fan or casino player, our AI tools are designed to enhance your strategy and decision making.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="relative overflow-hidden rounded-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-transparent z-0"></div>
                <div className="relative z-10 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-6">
                    <span className="text-neon-blue text-3xl font-bold">S</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Sports Analysis</h3>
                  <p className="text-gray-400 mb-6">Advanced AI predictions for football, basketball, and more. Get insights on upcoming matches, team performance, and strategic opportunities.</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-blue mt-0.5" />
                      <span>Match predictions with confidence scores</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-blue mt-0.5" />
                      <span>Team statistics and performance analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-blue mt-0.5" />
                      <span>Historical data comparisons</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/football">
                      <Button className="bg-neon-blue text-black hover:bg-neon-blue/90">
                        Football
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                    <Link to="/basketball">
                      <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                        Basketball
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                    <Link to="/american-football">
                      <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                        American Football
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative overflow-hidden rounded-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-lime/20 to-transparent z-0"></div>
                <div className="relative z-10 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-neon-lime/20 flex items-center justify-center mb-6">
                    <span className="text-neon-lime text-3xl font-bold">C</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Casino Strategy</h3>
                  <p className="text-gray-400 mb-6">Optimize your gameplay with AI-driven strategies for blackjack, roulette and more. Get real-time advice based on mathematical probabilities.</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-lime mt-0.5" />
                      <span>Optimal play recommendations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-lime mt-0.5" />
                      <span>Probability-based strategy advice</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-neon-lime mt-0.5" />
                      <span>Mathematical edge calculation</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/blackjack">
                      <Button className="bg-neon-lime text-black hover:bg-neon-lime/90">
                        Blackjack
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                    <Link to="/roulette">
                      <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                        Roulette
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-dark-lighter">
          <div className="container px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400">Our AI system analyzes vast amounts of data to provide you with accurate predictions and advice.</p>
            </motion.div>
            
            {/* Try It Now Component - Now correctly positioned between the section title and the steps */}
            <TryItNow />
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.div 
                className="bg-dark p-6 rounded-xl border border-dark-border"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Select Your Game</h3>
                <p className="text-gray-400">Choose between football match analysis or blackjack advice.</p>
              </motion.div>
              
              <motion.div 
                className="bg-dark p-6 rounded-xl border border-dark-border"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Parameters</h3>
                <p className="text-gray-400">Select teams, cards, or other relevant information for analysis.</p>
              </motion.div>
              
              <motion.div 
                className="bg-dark p-6 rounded-xl border border-dark-border"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get AI Predictions</h3>
                <p className="text-gray-400">Receive data-driven predictions and recommendations to inform your decisions.</p>
              </motion.div>
            </motion.div>
            
            <div className="flex justify-center mb-16">
              <Button asChild className="flex items-center gap-2">
                <Link to="/football">
                  Start Analyzing
                  <ArrowDown size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-dark">
          <div className="container px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of users who are making smarter decisions with our AI predictions.</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              {[
                {
                  name: "Michael T.",
                  avatar: "https://placehold.co/100/2f3136/fff?text=MT",
                  text: "The football prediction model is incredibly accurate! I've improved my success rate by over 30% since I started using it.",
                  rating: 5,
                  platform: "TikTok"
                },
                {
                  name: "Jessica L.",
                  avatar: "https://placehold.co/100/2f3136/fff?text=JL",
                  text: "The Blackjack advisor helped me understand optimal strategy and has completely changed how I approach the game.",
                  rating: 5,
                  platform: "Instagram"
                },
                {
                  name: "David W.",
                  avatar: "https://placehold.co/100/2f3136/fff?text=DW",
                  text: "I love the community feature - following top predictors and seeing their analysis has been a game-changer.",
                  rating: 4,
                  platform: "TikTok"
                },
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-dark-card p-6 rounded-xl border border-dark-border"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">via {testimonial.platform}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonial.rating ? "fill-neon-lime text-neon-lime" : "text-gray-600"} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">&ldquo;{testimonial.text}&rdquo;</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Predictions?</h2>
              <p className="text-gray-400 mb-8">
                Join thousands of users who use our AI-powered tools to improve their winning chances.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium">
                Get Started Free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
