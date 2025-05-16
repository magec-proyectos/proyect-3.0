
import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TrustedBySection from '@/components/homepage/TrustedBySection';

// Lazy load components for better performance
const GameChoiceSection = lazy(() => import('@/components/homepage/GameChoiceSection'));
const HowItWorksSection = lazy(() => import('@/components/homepage/HowItWorksSection'));
const TestimonialsSection = lazy(() => import('@/components/homepage/TestimonialsSection'));
const CtaSection = lazy(() => import('@/components/homepage/CtaSection'));

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By Section */}
        <TrustedBySection />
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          {/* Sports vs Casino Section */}
          <GameChoiceSection />
          
          {/* How It Works Section */}
          <HowItWorksSection />
          
          {/* Testimonials */}
          <TestimonialsSection />
          
          {/* CTA Section */}
          <CtaSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
