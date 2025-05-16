
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
const TutorialsSection = lazy(() => import('@/components/homepage/TutorialsSection'));
const EarningsSection = lazy(() => import('@/components/homepage/EarningsSection'));
const FeaturesCarousel = lazy(() => import('@/components/homepage/FeaturesCarousel'));
const EmbedSection = lazy(() => import('@/components/homepage/EmbedSection'));
const ComparisonTable = lazy(() => import('@/components/homepage/ComparisonTable'));
const FaqSection = lazy(() => import('@/components/homepage/FaqSection'));
const LatestNewsSection = lazy(() => import('@/components/homepage/LatestNewsSection'));
const FinalCta = lazy(() => import('@/components/homepage/FinalCta'));

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By Section */}
        <TrustedBySection />
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          {/* Testimonials */}
          <TestimonialsSection />
          
          {/* Sports vs Casino Section */}
          <GameChoiceSection />
          
          {/* Tutorial Videos */}
          <TutorialsSection />
          
          {/* Earnings Graphics */}
          <EarningsSection />
          
          {/* Features Carousel */}
          <FeaturesCarousel />
          
          {/* Embed Section */}
          <EmbedSection />
          
          {/* Comparison Table */}
          <ComparisonTable />
          
          {/* How It Works Section */}
          <HowItWorksSection />
          
          {/* FAQ Section */}
          <FaqSection />
          
          {/* Latest News/Blogs */}
          <LatestNewsSection />
          
          {/* Final CTA */}
          <FinalCta />
          
          {/* CTA Section */}
          <CtaSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
