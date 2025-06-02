
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AnimatedCard } from '@/components/ui/micro-interaction';

const SectionHeader: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      {/* Enhanced main content section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mb-12"
      >
        <AnimatedCard intensity="subtle">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* Enhanced heading section */}
            <div className="flex-1 space-y-6">
              {/* Badge */}
              <motion.div
                className="flex items-center gap-2 w-fit"
                variants={fadeIn}
              >
                <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">
                    Platform Integration
                  </span>
                </div>
              </motion.div>

              {/* Main heading with enhanced styling */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Export bets to your 
                <span className="relative ml-3">
                  <span className="text-blue-600">
                    favorite platforms
                  </span>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h2>
            </div>
            
            {/* Enhanced CTA section */}
            <div className="flex flex-col items-start lg:items-end space-y-6 lg:max-w-md">
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                variants={fadeIn}
              >
                Create your betting strategies and export them directly to your favorite casinos 
                and betting platforms to maximize your winning potential.
              </motion.p>
              
              <motion.div variants={fadeIn}>
                <EnhancedButton 
                  variant="solid" 
                  size="lg"
                  animation="glow"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
                >
                  Explore all integrations
                </EnhancedButton>
              </motion.div>
            </div>
          </div>
        </AnimatedCard>
      </motion.div>
    </>
  );
};

export default SectionHeader;
