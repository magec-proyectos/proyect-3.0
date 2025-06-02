
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ArrowRight } from 'lucide-react';

const FinalCta = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const benefits = [
    "Access AI predictions for all major sports",
    "Improve your betting strategy with data-driven insights",
    "Connect to your favorite betting platforms",
    "Track performance and refine your approach",
    "Join a community of strategic bettors"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-green-600/5 opacity-30"></div>
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-blue-600/10 blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-green-600/10 blur-[150px] translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto p-8 md:p-12 bg-dark-card/80 backdrop-blur-md border border-gray-600 rounded-2xl">
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="md:w-1/2">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="text-green-600">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-dark-darker p-6 rounded-xl border border-gray-600">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">Free to Get Started</h3>
                <p className="text-gray-400">No credit card required</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Daily Predictions</span>
                  <span className="font-medium">5 Free</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Analysis Dashboard</span>
                  <span className="font-medium">Basic Access</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Community Features</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="mb-6">
              <EnhancedButton 
                size="xl" 
                variant="solid"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-6 rounded-xl shadow-xl"
              >
                Start Winning Today
              </EnhancedButton>
            </div>
            
            <p className="text-gray-400">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
