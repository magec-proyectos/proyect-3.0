
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      bgColor: "from-green-600/40 to-green-600/10",
      avatar: "/lovable-uploads/7524a565-21ca-4ac3-827b-23a205a694d2.png"
    },
    {
      name: "Jessica L.",
      bgColor: "from-amber-600/40 to-amber-600/10",
      avatar: "/lovable-uploads/c2a9e6cd-258e-479a-9f6b-88c09da13e36.png"
    },
    {
      name: "David W.",
      bgColor: "from-blue-600/40 to-blue-600/10",
      avatar: "/lovable-uploads/08212846-590e-4578-b016-bf0a01f14455.png"
    },
    {
      name: "Sofia R.",
      bgColor: "from-purple-600/40 to-purple-600/10",
      avatar: "/lovable-uploads/1444d86a-8269-4ae4-ab37-fcbd7409eb22.png"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

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
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onSelect={(api) => setCurrentSlide(api?.selectedScrollSnap() || 0)}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <motion.div 
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
                    
                    {/* Text content aligned to bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-20">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3 border-2 border-white/20">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-medium text-white">{testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-gray-600"
                }`}
                onClick={() => {
                  // Handle dot click
                }}
              />
            ))}
          </div>
          <CarouselPrevious className="left-2 bg-black/30 text-white border-none hover:bg-black/50" />
          <CarouselNext className="right-2 bg-black/30 text-white border-none hover:bg-black/50" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
