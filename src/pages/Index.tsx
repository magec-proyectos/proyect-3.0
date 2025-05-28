
import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TrustedBySection from '@/components/homepage/TrustedBySection';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load components with better chunking
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
        
        {/* Trusted By Section - loaded immediately as it's above fold */}
        <TrustedBySection />
        
        <Suspense fallback={<LoadingSpinner />}>
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
