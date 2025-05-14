import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AmericanFootballContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-dark p-6 rounded-xl border border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
          <div className="space-y-4">
            {[
              { teams: "Kansas City Chiefs vs San Francisco 49ers", time: "Sunday, 18:30", odds: [1.85, 2.05] },
              { teams: "Dallas Cowboys vs Philadelphia Eagles", time: "Sunday, 22:20", odds: [2.15, 1.80] },
              { teams: "Buffalo Bills vs Cincinnati Bengals", time: "Monday, 20:15", odds: [1.90, 1.95] },
              { teams: "Green Bay Packers vs Chicago Bears", time: "Thursday, 20:20", odds: [1.70, 2.25] },
            ].map((game, index) => (
              <div key={index} className="bg-dark-lighter p-4 rounded-lg border border-dark-border flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{game.teams}</span>
                  <span className="text-sm text-gray-400">{game.time}</span>
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
          <h2 className="text-xl font-semibold mb-4">Competitions</h2>
          <div className="space-y-2">
            {[
              "NFL", 
              "College Football", 
              "Super Bowl", 
              "Pro Bowl", 
              "NFL Playoffs", 
              "NFL Draft", 
              "XFL"
            ].map((comp, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 bg-dark-lighter hover:bg-dark-border transition-colors rounded-lg flex justify-between items-center"
              >
                <span>{comp}</span>
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-dark p-6 rounded-xl border border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Divisional Standings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
            <h3 className="font-medium mb-3">AFC East</h3>
            <div className="space-y-2">
              {[
                { team: "Buffalo Bills", win: 10, loss: 6 },
                { team: "Miami Dolphins", win: 9, loss: 7 },
                { team: "New York Jets", win: 7, loss: 9 },
                { team: "New England Patriots", win: 4, loss: 12 },
              ].map((team, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span>{idx + 1}. {team.team}</span>
                  <span className="text-gray-400">{team.win}-{team.loss}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-dark-lighter p-4 rounded-lg border border-dark-border">
            <h3 className="font-medium mb-3">NFC West</h3>
            <div className="space-y-2">
              {[
                { team: "San Francisco 49ers", win: 12, loss: 4 },
                { team: "Los Angeles Rams", win: 9, loss: 7 },
                { team: "Seattle Seahawks", win: 8, loss: 8 },
                { team: "Arizona Cardinals", win: 4, loss: 12 },
              ].map((team, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span>{idx + 1}. {team.team}</span>
                  <span className="text-gray-400">{team.win}-{team.loss}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AmericanFootball = () => {
  const location = useLocation();
  
  // If we're on the /american-football direct route, show the full page with navbar and footer
  if (location.pathname === "/american-football") {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        
        <main className="container px-4 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">American Football Predictions</h1>
            <AmericanFootballContent />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Otherwise just return the content for use in the Sports tabs
  return <AmericanFootballContent />;
};

export default AmericanFootball;
