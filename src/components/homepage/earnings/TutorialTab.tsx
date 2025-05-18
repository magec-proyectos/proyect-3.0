
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TutorialTab = () => {
  const activeTutorial = {
    title: "How to Use Bet 3.0 for Maximum Betting Profits",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    description: "Learn how to leverage our Bet 3.0 prediction system to maximize your betting profits and improve your win rate."
  };
  
  return (
    <motion.div 
      className="bg-dark-card/50 p-5 rounded-lg border border-dark-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-3">{activeTutorial.title}</h3>
      <div className="aspect-video w-full mb-4 bg-black/50 rounded-lg overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <motion.div 
              className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-tr from-dark-card to-dark-card/50 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center backdrop-blur-sm"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 20px rgba(0, 240, 255, 0.6)", "0 0 0px rgba(0, 240, 255, 0)"],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="text-neon-blue ml-1" size={30} />
                </motion.div>
              </div>
              
              {/* Video thumbnail with animated overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-full relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Tutorial thumbnail" 
                    className="w-full h-full object-cover opacity-50"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
            <div className="aspect-video w-full">
              <iframe 
                width="100%" 
                height="100%" 
                src={activeTutorial.videoUrl}
                title={activeTutorial.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-gray-400">{activeTutorial.description}</p>
      
      <div className="mt-6 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" className="text-gray-400 border-dark-border">
            <ChevronLeft className="mr-1" size={16} /> Previous
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black" size="sm">
            Next Tutorial <ChevronRight className="ml-1" size={16} />
          </Button>
        </motion.div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <motion.div 
            key={item}
            className="bg-dark-card/30 border border-dark-border rounded-lg p-3 cursor-pointer hover:bg-dark-lighter/30 transition-all"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 240, 255, 0.3)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (item * 0.1) }}
          >
            <div className="aspect-video bg-black/30 rounded mb-2 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play size={20} className="text-gray-400" />
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent -translate-x-full"
                whileHover={{ x: ["100%", "-100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="text-sm font-medium truncate">Tutorial {item}: Advanced Tips</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TutorialTab;
