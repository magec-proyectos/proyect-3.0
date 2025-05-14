import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BasketballContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Live Games</h2>
          <div className="space-y-4">
            {[
              { teams: "LA Lakers vs Boston Celtics", time: "Q3 05:45", score: "78-82", odds: [2.40, 1.60] },
              { teams: "Miami Heat vs Chicago Bulls", time: "Q2 08:12", score: "42-39", odds: [1.80, 2.10] },
              { teams: "Brooklyn Nets vs Toronto Raptors", time: "Q4 01:18", score: "98-102", odds: [3.50, 1.30] },
              { teams: "Golden State vs Dallas Mavericks", time: "Q1 06:55", score: "22-18", odds: [1.90, 1.95] },
            ].map((game, index) => (
              <div key={index} className="bg-dark-lighter p-4 rounded-lg border border-dark-border flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{game.teams}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{game.time}</span>
                    <span className="text-neon-blue font-medium">{game.score}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">LIVE</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {game.odds.map((odd, oddIndex) => (
                    <button 
                      key={oddIndex}
                      className="bg-dark hover:bg-dark-border transition-colors px-4 py-1 rounded text-center min-w-16"
                    >
                      {odd.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Top Leagues</h2>
          <div className="space-y-2">
            {[
              "NBA", 
              "EuroLeague", 
              "NCAA", 
              "Spanish ACB", 
              "Australian NBL", 
              "FIBA World Cup", 
              "Olympics"
            ].map((league, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 bg-dark-lighter hover:bg-dark-border transition-colors rounded-lg flex justify-between items-center"
              >
                <span>{league}</span>
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-dark p-6 rounded-xl border border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Team Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { team: "Boston Celtics", win: 24, loss: 6 },
            { team: "Milwaukee Bucks", win: 22, loss: 8 },
            { team: "Philadelphia 76ers", win: 23, loss: 10 },
            { team: "Denver Nuggets", win: 21, loss: 10 },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-dark-lighter p-4 rounded-lg border border-dark-border"
            >
              <h3 className="font-medium">{stat.team}</h3>
              <p className="text-sm text-gray-400">Season record</p>
              <p className="text-lg font-bold text-neon-blue">{stat.win}-{stat.loss}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Basketball = () => {
  const location = useLocation();
  
  // If we're on the /basketball direct route, show the full page with navbar and footer
  if (location.pathname === "/basketball") {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="container px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Basketball Predictions</h1>
            <BasketballContent />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Otherwise just return the content for use in the Sports tabs
  return <BasketballContent />;
};

export default Basketball;
