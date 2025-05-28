import React, { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TrustedBySection from '@/components/homepage/TrustedBySection';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EnhancedPageWrapper } from '@/components/enhanced-page-wrapper';
import { Home, TrendingUp, Users } from 'lucide-react';

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
  const onboardingSteps = [
    {
      id: 'welcome',
      title: '¡Bienvenido a Bet3.0!',
      content: 'Descubre predicciones deportivas potenciadas por IA para tomar mejores decisiones.',
      target: '[data-onboarding="hero-title"]',
      position: 'bottom' as const,
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'navigation',
      title: 'Navegación',
      content: 'Explora diferentes deportes y juegos de casino desde el menú principal.',
      target: '[data-onboarding="navbar"]',
      position: 'bottom' as const,
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'social',
      title: 'Comunidad',
      content: 'Únete a nuestra comunidad para compartir estrategias y seguir a otros usuarios.',
      target: '[data-onboarding="social-section"]',
      position: 'top' as const,
      icon: <Users className="w-4 h-4" />,
    }
  ];

  return (
    <EnhancedPageWrapper
      showBreadcrumbs={false}
      onboardingSteps={onboardingSteps}
      onboardingKey="homepage"
    >
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
    </EnhancedPageWrapper>
  );
};

export default Index;
