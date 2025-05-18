
import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        
        {/* Platform Promotion Section */}
        <section className="py-16 bg-dark">
          <div className="container px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/10 border border-neon-blue mb-4">
                <span className="text-3xl">⚽</span>
              </div>
              <div className="max-w-lg mx-auto">
                <h3 className="text-xl font-medium mb-2">Experience the full Smart Bet AI platform</h3>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:bg-neon-blue text-black mt-4 px-8"
                >
                  Try for free
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
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
