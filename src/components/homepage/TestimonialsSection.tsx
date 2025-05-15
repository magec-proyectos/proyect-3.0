
import React from 'react';
import { Star } from 'lucide-react';
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
      avatar: "https://placehold.co/100/2f3136/fff?text=MT",
      text: "The football prediction model is incredibly accurate! I've improved my success rate by over 30% since I started using it.",
      rating: 5,
      platform: "TikTok"
    },
    {
      name: "Jessica L.",
      avatar: "https://placehold.co/100/2f3136/fff?text=JL",
      text: "The Blackjack advisor helped me understand optimal strategy and has completely changed how I approach the game.",
      rating: 5,
      platform: "Instagram"
    },
    {
      name: "David W.",
      avatar: "https://placehold.co/100/2f3136/fff?text=DW",
      text: "I love the community feature - following top predictors and seeing their analysis has been a game-changer.",
      rating: 4,
      platform: "TikTok"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-dark-card p-6 rounded-xl border border-dark-border"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">via {testimonial.platform}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "fill-neon-lime text-neon-lime" : "text-gray-600"} 
                  />
                ))}
              </div>
              <p className="text-gray-300">&ldquo;{testimonial.text}&rdquo;</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
