
import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TrustedBySection from '@/components/homepage/TrustedBySection';

// Lazy load components for better performance
const TestimonialsSection = lazy(() => import('@/components/homepage/TestimonialsSection'));
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
          
          {/* FAQ Section */}
          <FaqSection />
          
          {/* Latest News/Blogs */}
          <LatestNewsSection />
          
          {/* Final CTA */}
          <FinalCta />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
