
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, LineChart, Zap, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-neon-lime/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Smarter Bets</span> with AI.<br />
            <span className="text-white">Analyze, Predict, Win.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10">
            Advanced AI algorithms analyze sports data and card games to give you the winning edge.
            Make informed decisions backed by real-time statistics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/football">
              <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium w-full sm:w-auto">
                Analyze Football Match
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
            <Link to="/blackjack">
              <Button size="lg" variant="outline" className="border-neon-lime text-neon-lime hover:bg-neon-lime/10 w-full sm:w-auto">
                Try Blackjack Advisor
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-neon-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Predictions</h3>
              <p className="text-gray-400 text-sm">Advanced algorithms analyze thousands of data points for accurate predictions.</p>
            </div>
            
            <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div className="w-12 h-12 rounded-full bg-neon-lime/20 flex items-center justify-center mb-4 mx-auto">
                <LineChart className="text-neon-lime" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analysis</h3>
              <p className="text-gray-400 text-sm">Get instant insights and odds calculations as games unfold.</p>
            </div>
            
            <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <History className="text-neon-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Historical Stats</h3>
              <p className="text-gray-400 text-sm">Deep dive into past performance data for better informed decisions.</p>
            </div>
          </div>
          
          {/* Trust badge */}
          <div className="mt-16 flex justify-center">
            <div className="bg-dark-card px-6 py-3 rounded-lg border border-dark-border inline-flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-dark-card">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Trusted by</p>
                <p className="text-white font-medium">10,000+ bettors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
