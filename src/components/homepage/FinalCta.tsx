
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 to-neon-lime/10 opacity-30"></div>
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-neon-blue blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-neon-lime blur-[150px] opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto p-8 md:p-12 bg-dark-card/80 backdrop-blur-md border border-dark-border rounded-2xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Start Making Smarter Predictions Today</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of users who have transformed their betting approach with our AI-powered platform
            </p>
          </motion.div>
          
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
                    <div className="text-neon-lime">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-dark-darker p-6 rounded-xl border border-dark-border">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">Free to Get Started</h3>
                <p className="text-gray-400">No credit card required</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-dark-border">
                  <span>Daily Predictions</span>
                  <span className="font-medium">5 Free</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dark-border">
                  <span>Analysis Dashboard</span>
                  <span className="font-medium">Basic Access</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Community Features</span>
                  <span className="font-medium">Included</span>
                </div>
                
                <Button className="mt-4 bg-gradient-to-r from-neon-blue to-neon-lime hover:opacity-90 text-black font-medium">
                  Create Free Account <ArrowRight size={16} className="ml-2" />
                </Button>
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
            <p className="text-gray-400">
              Already have an account? <a href="/login" className="text-neon-blue hover:underline">Log in</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
