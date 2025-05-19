
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Square = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <h1 className="text-3xl font-bold mb-8">Square Page</h1>
            
            <motion.div
              className="w-64 h-64 bg-neon-blue/20 border-2 border-neon-blue rounded-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0,240,255,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ["10%", "50%", "50%", "10%", "10%"]
              }}
              transition={{ 
                duration: 10, 
                ease: "linear", 
                repeat: Infinity,
                borderRadius: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
            
            <p className="mt-8 text-gray-400 text-center max-w-md">
              This is a simple square page demonstrating the integration of the Square icon in the navigation.
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Square;
