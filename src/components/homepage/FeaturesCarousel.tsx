
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, BarChart2, Zap, Globe, Calendar, Lock } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const FeaturesCarousel = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      id: 1,
      icon: <BarChart2 size={28} />,
      title: "Advanced Analytics",
      description: "Get deep insights into team performance metrics, historical patterns, and predictive models that go beyond basic statistics.",
      color: "text-neon-blue",
      bgColor: "bg-neon-blue/10"
    },
    {
      id: 2,
      icon: <Zap size={28} />,
      title: "Real-Time Predictions",
      description: "Receive instant updates and prediction adjustments as game conditions change, allowing you to make timely decisions.",
      color: "text-neon-lime",
      bgColor: "bg-neon-lime/10"
    },
    {
      id: 3,
      icon: <Globe size={28} />,
      title: "Global Coverage",
      description: "Access predictions for sports events from around the world, covering major leagues and tournaments across all continents.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 4,
      icon: <Calendar size={28} />,
      title: "Custom Schedules",
      description: "Create personalized alert schedules for upcoming matches and receive notifications when high-confidence predictions are available.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      id: 5,
      icon: <MessageCircle size={28} />,
      title: "Expert Commentary",
      description: "Combine AI predictions with insights from industry experts who provide context and additional analysis for important events.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      id: 6,
      icon: <Lock size={28} />,
      title: "Secure Predictions",
      description: "Your betting history and preferences are kept secure with enterprise-grade encryption and privacy controls.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-3">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI platform comes packed with sophisticated tools designed to maximize your prediction success
          </p>
        </motion.div>
        
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Carousel 
            opts={{ 
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {features.map(feature => (
                <CarouselItem key={feature.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-dark-card/70 backdrop-blur-sm p-6 rounded-xl border border-dark-border h-full">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-5 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-dark-lighter border-dark-border" />
            <CarouselNext className="right-4 bg-dark-lighter border-dark-border" />
          </Carousel>
          
          <div className="flex justify-center mt-8 gap-2">
            {features.map((_, index) => (
              <button key={index} className="w-2 h-2 rounded-full bg-gray-600"></button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
