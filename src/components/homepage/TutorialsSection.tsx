
import React from 'react';
import { motion } from 'framer-motion';

const TutorialsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-dark-darker">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-3">Tutorial Videos</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch our quick guides to master the platform and start making smarter predictions today.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="bg-dark-card rounded-xl border border-dark-border p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-2">Video Content Area</h3>
              <p>Your tutorial videos will be placed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TutorialsSection;
