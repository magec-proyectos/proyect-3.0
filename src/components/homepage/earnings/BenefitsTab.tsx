
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChartBar, Star, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const BenefitsTab = () => {
  const benefits = [
    {
      icon: <ChartBar className="text-neon-blue" size={24} />,
      title: "AI-Powered Analysis",
      description: "Our system processes 350+ data points per game for super-accurate predictions",
      successRate: 92,
      highlightColor: "from-neon-blue to-blue-400"
    },
    {
      icon: <TrendingUp className="text-amber-400" size={24} />,
      title: "+127% Win Rate",
      description: "Users report an average 127% increase in win rate within the first month",
      successRate: 88,
      highlightColor: "from-amber-400 to-amber-500"
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      title: "Proven Results",
      description: "95.7% of our users achieve positive ROI within their first 30 days",
      successRate: 95,
      highlightColor: "from-emerald-400 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Michael R.",
      avatarUrl: "",
      initials: "MR",
      role: "Professional Bettor",
      content: "I've tried many betting systems, but Bet 3.0 has consistently outperformed them all. My win rate jumped by 34% in just two weeks.",
      winIncrease: "+34%"
    },
    {
      name: "Sarah L.",
      avatarUrl: "",
      initials: "SL",
      role: "Weekend Bettor",
      content: "As a casual bettor, I never thought I could make consistent profits. Bet 3.0 changed everything - I'm actually making money now!",
      winIncrease: "+87%"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={item}
            className="relative overflow-hidden"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="h-full bg-dark-card/50 border border-dark-border hover:border-neon-blue/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-dark-lighter rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-dark-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Success rate</div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + (index * 0.2), duration: 0.5 }}
                      className="text-neon-blue font-medium flex items-center gap-2"
                    >
                      {benefit.successRate}%
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <CheckCircle size={16} className="text-neon-blue" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="relative h-2 bg-dark-lighter rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${benefit.highlightColor} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${benefit.successRate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-neon-blue w-5 h-5" />
          <h3 className="text-xl font-bold text-white">User Success Stories</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-dark-card border border-dark-border rounded-lg p-5 relative"
            >
              <div className="absolute top-4 right-4 bg-neon-blue/10 text-neon-blue font-bold py-1 px-3 rounded-full text-sm">
                {testimonial.winIncrease}
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
                  {testimonial.avatarUrl ? (
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                  ) : (
                    <AvatarFallback className="bg-neon-blue/20 text-neon-blue">{testimonial.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 text-gray-300 italic">"{testimonial.content}"</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        variants={item}
        className="relative overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-dark-card/80 to-dark-card/40 border border-neon-blue/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to boost your betting success?</h3>
                <p className="text-gray-400">Join thousands of smart bettors who have increased their earnings with Bet 3.0</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-neon-blue text-black font-medium rounded-lg shadow-lg shadow-neon-blue/20 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Free Trial</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-blue/80 to-neon-blue opacity-100"
                  animate={{ 
                    x: ["-100%", "100%"],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                />
              </motion.button>
            </div>
          </CardContent>
        </Card>
        
        {/* Animated border effect */}
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 rounded-xl opacity-0 blur-sm"
          animate={{ 
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsTab;
