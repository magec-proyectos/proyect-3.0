
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Roulette = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Roulette Strategy Advisor</h1>
          <p className="text-gray-400 mb-8">
            Coming soon! Our roulette strategy tools are currently in development.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Roulette;
