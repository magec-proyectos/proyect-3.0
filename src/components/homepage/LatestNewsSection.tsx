
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LatestNewsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const blogs = [
    {
      id: 1,
      title: "How AI is Revolutionizing Sports Betting Strategies",
      image: "/lovable-uploads/f3783ec2-a81a-4070-a131-dfb4a9367047.png",
      category: "AI Technology"
    },
    {
      id: 2,
      title: "5 Casino Games Where AI Analysis Gives You the Edge",
      image: "/lovable-uploads/662235b7-184c-447e-b1a6-5d796396aaab.png",
      category: "Casino Strategy"
    },
    {
      id: 3,
      title: "Understanding Betting Patterns: What the Data Reveals",
      image: "/lovable-uploads/158a61d4-99dd-4969-80d8-1708ade8bb66.png",
      category: "Data Analysis"
    }
  ];

  return (
    <section className="py-16 bg-dark">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="mb-6">
            <Badge className="bg-neon-blue/10 hover:bg-neon-blue/10 text-neon-blue font-medium py-1 px-4 rounded-full text-sm border-0">
              INSIGHTS
            </Badge>
          </div>
          <h2 className="text-5xl font-bold mb-4 text-white leading-tight">Latest News & Insights</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-xl">
            Expert analysis and updates from the world of sports betting and AI
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border border-dark-border rounded-lg bg-transparent hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-neon-blue/90 hover:bg-neon-blue/90 text-xs font-medium px-2 py-1 rounded-sm text-white border-0">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-3 text-white line-clamp-2 hover:text-neon-blue transition-colors">
                    {blog.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
