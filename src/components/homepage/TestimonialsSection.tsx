
import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const testimonials = [
    {
      name: "Michael T.",
      text: "The football prediction model is incredibly accurate! I've improved my success rate by over 30% since I started using it.",
      bgColor: "from-green-600/40 to-green-600/10"
    },
    {
      name: "Jessica L.",
      text: "The Blackjack advisor helped me understand optimal strategy and has completely changed how I approach the game.",
      bgColor: "from-amber-600/40 to-amber-600/10"
    },
    {
      name: "David W.",
      text: "I love the community feature - following top predictors and seeing their analysis has been a game-changer.",
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
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
                        <p className="text-white text-xl font-medium mb-4 leading-tight">
                          "{testimonial.text}"
                        </p>
                        
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
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-dark-darker text-white border-none hover:bg-black/60" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-dark-darker text-white border-none hover:bg-black/60" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
