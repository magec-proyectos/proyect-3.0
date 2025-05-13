
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ArrowDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Extra Content Section */}
        <section className="py-16 bg-dark-lighter">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400">Our AI system analyzes vast amounts of data to provide you with accurate predictions and advice.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-dark p-6 rounded-xl border border-dark-border">
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Select Your Game</h3>
                <p className="text-gray-400">Choose between football match analysis or blackjack advice.</p>
              </div>
              
              <div className="bg-dark p-6 rounded-xl border border-dark-border">
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Parameters</h3>
                <p className="text-gray-400">Select teams, cards, or other relevant information for analysis.</p>
              </div>
              
              <div className="bg-dark p-6 rounded-xl border border-dark-border">
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <span className="text-neon-blue font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get AI Predictions</h3>
                <p className="text-gray-400">Receive data-driven predictions and recommendations to inform your decisions.</p>
              </div>
            </div>
            
            <div className="flex justify-center mb-16">
              <Button asChild className="flex items-center gap-2">
                <Link to="/football">
                  Start Analyzing
                  <ArrowDown size={16} />
                </Link>
              </Button>
            </div>
            
            {/* Features list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Football Predictions</h3>
                <ul className="space-y-3">
                  {[
                    'Match outcome predictions with confidence scores',
                    'Detailed team statistics and head-to-head analysis',
                    'Goal expectancy and scoring probability models',
                    'Form analysis and performance trends',
                    'Bet recommendations with risk assessment'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1">
                        <Check size={16} className="text-neon-blue" />
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/football">Try Football Predictions</Link>
                </Button>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Blackjack Advisor</h3>
                <ul className="space-y-3">
                  {[
                    'Real-time strategy recommendations based on your hand',
                    'Probability-based decision making',
                    'Optimal play advice following basic strategy',
                    'Interactive card input for any game situation',
                    'Simplified explanation of complex decisions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1">
                        <Check size={16} className="text-neon-lime" />
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/blackjack">Try Blackjack Advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Bets?</h2>
              <p className="text-gray-400 mb-8">
                Join thousands of bettors who use our AI-powered tools to improve their winning chances.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium">
                Get Started Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-lighter py-8 border-t border-dark-border">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl gradient-text">Bet3.0</span>
            </div>
            
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Bet3.0. AI-Powered Betting Insights.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
