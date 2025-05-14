import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FootballContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Popular Matches</h2>
          <div className="space-y-4">
            {[
              { teams: "Manchester United vs Liverpool", time: "Today, 20:00", odds: [2.10, 3.40, 3.20] },
              { teams: "Real Madrid vs Barcelona", time: "Tomorrow, 21:00", odds: [2.40, 3.20, 2.90] },
              { teams: "Bayern Munich vs Dortmund", time: "Saturday, 18:30", odds: [1.75, 3.80, 4.20] },
              { teams: "PSG vs Marseille", time: "Sunday, 20:45", odds: [1.60, 3.90, 5.10] },
            ].map((match, index) => (
              <div key={index} className="bg-dark-lighter p-4 rounded-lg border border-dark-border flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{match.teams}</span>
                  <span className="text-sm text-gray-400">{match.time}</span>
                </div>
                <div className="flex gap-2">
                  {match.odds.map((odd, oddIndex) => (
                    <button 
                      key={oddIndex}
                      className="bg-dark hover:bg-dark-border transition-colors px-3 py-1 rounded text-center min-w-16"
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
              "Premier League", 
              "La Liga", 
              "Bundesliga", 
              "Serie A", 
              "Ligue 1", 
              "Champions League", 
              "Europa League"
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
        <h2 className="text-xl font-semibold mb-4">Upcoming Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "World Cup 2026", matches: 64, date: "Jun 2026" },
            { name: "Euro 2024", matches: 51, date: "Jun-Jul 2024" },
            { name: "Copa America", matches: 32, date: "Jun-Jul 2024" },
            { name: "Club World Cup", matches: 7, date: "Dec 2024" },
          ].map((tournament, index) => (
            <div 
              key={index}
              className="bg-dark-lighter p-4 rounded-lg border border-dark-border"
            >
              <h3 className="font-medium">{tournament.name}</h3>
              <p className="text-sm text-gray-400">{tournament.matches} matches</p>
              <p className="text-sm text-neon-blue">{tournament.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Football = () => {
  const location = useLocation();
  
  // If we're on the /football direct route, show the full page with navbar and footer
  if (location.pathname === "/football") {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="container px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Football Predictions</h1>
            <FootballContent />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Otherwise just return the content for use in the Sports tabs
  return <FootballContent />;
};

export default Football;
