import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RouletteContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Live Roulette Tables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "European Roulette", minBet: "$1", maxBet: "$5,000", players: 12, status: "Open" },
              { name: "American Roulette", minBet: "$5", maxBet: "$10,000", players: 8, status: "Open" },
              { name: "French Roulette", minBet: "$2", maxBet: "$2,000", players: 9, status: "Open" },
              { name: "Lightning Roulette", minBet: "$0.50", maxBet: "$1,000", players: 24, status: "Open" },
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
                    <span className="text-white">{table.players}</span>
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
          <h2 className="text-xl font-semibold mb-4">Roulette Strategies</h2>
          <div className="space-y-4">
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">Martingale System</h3>
              <p className="text-sm text-gray-400 mb-3">Double your bet after each loss to recover previous losses</p>
              <button className="w-full bg-dark-border hover:bg-dark-border/70 transition-colors py-2 rounded font-medium">
                Learn Martingale
              </button>
            </div>
            
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">Fibonacci System</h3>
              <p className="text-sm text-gray-400 mb-3">Follow the Fibonacci sequence for bet progression</p>
              <button className="w-full bg-dark-border hover:bg-dark-border/70 transition-colors py-2 rounded font-medium">
                Learn Fibonacci
              </button>
            </div>
            
            <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
              <h3 className="font-medium mb-2">AI Advisor</h3>
              <p className="text-sm text-gray-400 mb-3">Get personalized strategy advice based on probabilities</p>
              <button className="w-full bg-neon-lime text-black font-medium py-2 rounded hover:bg-neon-lime/90 transition-colors">
                Enable AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark p-6 rounded-xl border border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Popular Bets</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 px-4">Bet Type</th>
                <th className="text-left py-3 px-4">Numbers Covered</th>
                <th className="text-left py-3 px-4">Payout</th>
                <th className="text-left py-3 px-4">Probability</th>
                <th className="text-left py-3 px-4">House Edge</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Straight Up", numbers: "1 number", payout: "35:1", probability: "2.7%", edge: "2.7%" },
                { type: "Split", numbers: "2 numbers", payout: "17:1", probability: "5.4%", edge: "2.7%" },
                { type: "Street", numbers: "3 numbers", payout: "11:1", probability: "8.1%", edge: "2.7%" },
                { type: "Corner", numbers: "4 numbers", payout: "8:1", probability: "10.8%", edge: "2.7%" },
                { type: "Red/Black", numbers: "18 numbers", payout: "1:1", probability: "48.6%", edge: "2.7%" },
              ].map((bet, index) => (
                <tr key={index} className="border-b border-dark-border hover:bg-dark-lighter">
                  <td className="py-3 px-4">{bet.type}</td>
                  <td className="py-3 px-4">{bet.numbers}</td>
                  <td className="py-3 px-4">{bet.payout}</td>
                  <td className="py-3 px-4">{bet.probability}</td>
                  <td className="py-3 px-4">{bet.edge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Roulette = () => {
  const location = useLocation();
  
  // If we're on the /roulette direct route, show the full page with navbar and footer
  if (location.pathname === "/roulette") {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="container px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Roulette Strategy Advisor</h1>
            <RouletteContent />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Otherwise just return the content for use in the Casino tabs
  return <RouletteContent />;
};

export default Roulette;
