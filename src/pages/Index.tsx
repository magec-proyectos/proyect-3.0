
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import GameChoiceSection from '@/components/homepage/GameChoiceSection';
import HowItWorksSection from '@/components/homepage/HowItWorksSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import CtaSection from '@/components/homepage/CtaSection';
import TrustedBySection from '@/components/homepage/TrustedBySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By Section */}
        <TrustedBySection />
        
        {/* Sports vs Casino Section */}
        <GameChoiceSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
