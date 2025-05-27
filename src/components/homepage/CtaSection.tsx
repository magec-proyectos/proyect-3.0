
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
    <section className="py-16">
      <div className="container px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Predictions?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of users who use our AI-powered tools to improve their winning chances.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
            Get Started Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
