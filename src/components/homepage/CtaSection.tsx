
import React from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/micro-interaction';

const CtaSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced background with solid colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark-card" />
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      
      {/* Floating decorative elements with solid colors */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-600/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container px-4 relative z-10">
        <AnimatedCard intensity="moderate">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Enhanced heading with solid color text */}
            <motion.div
              className="mb-6"
              variants={fadeIn}
            >
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-blue-600 text-sm font-medium uppercase tracking-wider">
                  Start Your Journey
                </span>
                <Sparkles className="w-6 h-6 text-blue-600 ml-2" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ready to Make{' '}
                <span className="text-blue-600">
                  Smarter Predictions
                </span>
                ?
              </h2>
            </motion.div>

            <motion.p 
              className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Join thousands of users who use our AI-powered tools to improve their winning chances 
              and maximize their betting potential.
            </motion.p>

            {/* Enhanced CTA button with solid colors */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeIn}
            >
              <EnhancedButton 
                size="xl" 
                variant="solid"
                animation="glow"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-6 rounded-xl shadow-2xl"
              >
                Get Started Free
              </EnhancedButton>
              
              <EnhancedButton 
                size="lg" 
                variant="outline"
                className="text-gray-300 border-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Watch Demo
              </EnhancedButton>
            </motion.div>

            {/* Trust indicators with solid colors */}
            <motion.div 
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
              variants={fadeIn}
            >
              <div className="bg-dark-card/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 hover:border-blue-600/50 transition-colors duration-300">
                <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              
              <div className="bg-dark-card/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 hover:border-green-600/50 transition-colors duration-300">
                <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              
              <div className="bg-dark-card/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 hover:border-blue-600/50 transition-colors duration-300">
                <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-sm text-gray-400">AI Analysis</div>
              </div>
              
              <div className="bg-dark-card/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 hover:border-green-600/50 transition-colors duration-300">
                <div className="text-2xl font-bold text-green-600 mb-1">Free</div>
                <div className="text-sm text-gray-400">To Start</div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default CtaSection;
