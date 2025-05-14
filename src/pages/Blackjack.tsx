import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const BlackjackContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Live Blackjack Tables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Classic Blackjack", minBet: "$5", maxBet: "$1,000", players: 4, status: "Open" },
              { name: "VIP Blackjack", minBet: "$100", maxBet: "$10,000", players: 2, status: "Open" },
              { name: "Speed Blackjack", minBet: "$10", maxBet: "$2,000", players: 3, status: "Open" },
              { name: "Infinite Blackjack", minBet: "$1", maxBet: "$500", players: 7, status: "Open" },
            ].map((table, index) => (
              <div 
                key={index}
                className="bg-dark-lighter p-4 rounded-lg border border-dark-border hover:border-neon-lime transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-white">{table.name}</h3>
                <div className="text-sm text-gray-400 mt-1">
                  <div className="flex justify-between">
                    <span>Bet range:</span>
                    <span className="text-white">{table.minBet} - {table.maxBet}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Players:</span>
                    <span className="text-white">{table.players}/7</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Status:</span>
                    <span className="text-neon-lime">{table.status}</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-neon-lime text-black font-medium py-2 rounded hover:bg-neon-lime/90 transition-colors">
                  Join Table
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Blackjack Strategy</h2>
          <div className="space-y-4">
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">Basic Strategy Chart</h3>
              <p className="text-sm text-gray-400 mb-3">Learn the mathematically optimal play for any blackjack situation</p>
              <button className="w-full bg-dark-border hover:bg-dark-border/70 transition-colors py-2 rounded font-medium">
                View Strategy Chart
              </button>
            </div>
            
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">Card Counting Guide</h3>
              <p className="text-sm text-gray-400 mb-3">Master the Hi-Lo system and improve your edge</p>
              <button className="w-full bg-dark-border hover:bg-dark-border/70 transition-colors py-2 rounded font-medium">
                Learn Card Counting
              </button>
            </div>
            
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">AI Advisor</h3>
              <p className="text-sm text-gray-400 mb-3">Get real-time advice for optimal decisions</p>
              <button className="w-full bg-neon-lime text-black font-medium py-2 rounded hover:bg-neon-lime/90 transition-colors">
                Enable AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark p-6 rounded-xl border border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Blackjack Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Classic Blackjack", rtp: "99.5%", feature: "Standard rules" },
            { name: "European Blackjack", rtp: "99.6%", feature: "No hole card" },
            { name: "Double Exposure", rtp: "99.3%", feature: "Both dealer cards visible" },
            { name: "Spanish 21", rtp: "99.7%", feature: "No 10s in the deck" },
            { name: "Blackjack Switch", rtp: "99.8%", feature: "Play two hands, switch cards" },
            { name: "Perfect Pairs", rtp: "99.5%", feature: "Side bet on pairs" },
            { name: "Free Bet Blackjack", rtp: "99.2%", feature: "Free doubles and splits" },
            { name: "Pontoon", rtp: "99.6%", feature: "British variation" },
          ].map((variant, index) => (
            <div 
              key={index}
              className="bg-dark-lighter p-4 rounded-lg border border-dark-border hover:border-neon-lime transition-colors cursor-pointer"
            >
              <h3 className="font-medium">{variant.name}</h3>
              <p className="text-xs text-gray-400 mt-1">RTP: <span className="text-neon-lime">{variant.rtp}</span></p>
              <p className="text-xs text-gray-400 mt-1">{variant.feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blackjack = () => {
  const location = useLocation();
  
  // If we're on the /blackjack direct route, show the full page with navbar and footer
  if (location.pathname === "/blackjack") {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="container px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Blackjack Strategy Advisor</h1>
            <BlackjackContent />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Otherwise just return the content for use in the Casino tabs
  return <BlackjackContent />;
};

export default Blackjack;
