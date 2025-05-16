
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TutorialsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const videos = [
    {
      id: 1,
      title: "Getting Started with Sports Predictions",
      thumbnail: "/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png",
      duration: "3:42",
      description: "Learn how to get started with our AI-powered sports prediction system in just minutes."
    },
    {
      id: 2,
      title: "Advanced Casino Strategy Analysis",
      thumbnail: "/lovable-uploads/7e5d05aa-3c36-4eef-9cd8-202104533843.png",
      duration: "5:16",
      description: "Discover advanced patterns and strategies that our AI can detect in various casino games."
    },
    {
      id: 3,
      title: "Understanding Prediction Confidence Scores",
      thumbnail: "/lovable-uploads/7b0e3981-9449-4433-bfd3-f8b1b08782d6.png",
      duration: "4:28",
      description: "Get insights into how our confidence scoring works and how to interpret prediction strengths."
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="rounded-xl overflow-hidden hover-scale"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group cursor-pointer">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play size={30} className="text-black ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-5 bg-dark-card">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{video.description}</p>
                <Button variant="link" className="text-neon-blue p-0 h-auto flex items-center gap-1.5 hover:text-neon-blue/80">
                  Watch tutorial <ExternalLink size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
            View All Tutorials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TutorialsSection;
