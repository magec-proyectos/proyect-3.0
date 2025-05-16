
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
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
      image: "/lovable-uploads/4330ed63-1f9d-41cb-abaf-d7c32bad7d90.png"
    },
    {
      name: "Jessica L.",
      bgColor: "from-amber-600/40 to-amber-600/10",
      image: "/lovable-uploads/fe481046-2099-4838-857a-16dc6fe1a978.png"
    },
    {
      name: "David W.",
      bgColor: "from-blue-600/40 to-blue-600/10",
      image: "/lovable-uploads/db61165b-8e60-4e2b-aa68-da32fa6ce904.png"
    },
    {
      name: "Sarah M.",
      bgColor: "from-purple-600/40 to-purple-600/10",
      image: "/lovable-uploads/fbf6cdda-cb0b-4722-aee4-18b91bfe30bd.png"
    }
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
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            className="w-full"
            setApi={(api) => {
              api?.on("select", () => {
                const selectedIndex = api.selectedScrollSnap();
                setActiveIndex(selectedIndex);
              });
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <motion.div 
                    className="rounded-xl overflow-hidden relative"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`relative h-[450px] bg-gradient-to-b ${testimonial.bgColor} bg-dark-darker overflow-hidden`}>
                      {/* Background image */}
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} testimonial`}
                        className="w-full h-full object-cover object-center opacity-80"
                      />
                      
                      {/* Video play button with improved styling */}
                      <div className="absolute left-4 top-4 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer border border-white/30 shadow-lg">
                        <Play size={22} className="text-white ml-1" fill="rgba(255,255,255,0.3)" />
                      </div>
                      
                      {/* Text content aligned to bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pt-20">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600 font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
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
            <div className="flex items-center justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "bg-white scale-125" : "bg-white/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <CarouselPrevious className="absolute -left-12 md:-left-16 bg-dark-lighter border-dark-border text-white hover:bg-dark-card hover:text-white" />
            <CarouselNext className="absolute -right-12 md:-right-16 bg-dark-lighter border-dark-border text-white hover:bg-dark-card hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
