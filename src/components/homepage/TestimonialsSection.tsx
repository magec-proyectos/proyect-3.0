
import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      name: "Michael T.",
      role: "",
      text: "The football prediction model is incredibly accurate! I've improved my success rate by over 30% since I started using it.",
      platform: "TikTok",
      bgColor: "from-green-600/40 to-green-600/10"
    },
    {
      name: "Jessica L.",
      role: "",
      text: "The Blackjack advisor helped me understand optimal strategy and has completely changed how I approach the game.",
      platform: "Instagram",
      bgColor: "from-amber-600/40 to-amber-600/10"
    },
    {
      name: "David W.",
      role: "",
      text: "I love the community feature - following top predictors and seeing their analysis has been a game-changer.",
      platform: "TikTok",
      bgColor: "from-blue-600/40 to-blue-600/10"
    },
  ];

  return (
    <section className="py-16 bg-dark">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of users who are making smarter decisions with our AI predictions.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="rounded-xl overflow-hidden relative"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`relative h-[450px] bg-gradient-to-b ${testimonial.bgColor} bg-dark-darker`}>
                {/* Video play button */}
                <div className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={20} className="text-white ml-1" />
                </div>
                
                {/* Logo in top right */}
                <div className="absolute right-4 top-4 text-white font-medium">
                  {testimonial.platform}
                </div>
                
                {/* Text content aligned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-20">
                  <p className="text-white text-xl font-medium mb-4 leading-tight">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-sm text-gray-300">{testimonial.role}</p>
                      )}
                      {!testimonial.role && testimonial.platform && (
                        <p className="text-xs text-gray-300">via {testimonial.platform}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button className="px-8 py-3 bg-white text-dark font-medium rounded-full hover:bg-white/90 transition-colors">
            Solicitar una demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
