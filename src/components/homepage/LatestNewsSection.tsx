import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      date: "May 14, 2025",
      author: "Daniel Chen",
      category: "AI Technology"
    },
    {
      id: 2,
      title: "5 Casino Games Where AI Analysis Gives You the Edge",
      image: "/lovable-uploads/662235b7-184c-447e-b1a6-5d796396aaab.png",
      date: "May 10, 2025",
      author: "Sarah Johnson",
      category: "Casino Strategy"
    },
    {
      id: 3,
      title: "Understanding Betting Patterns: What the Data Reveals",
      image: "/lovable-uploads/158a61d4-99dd-4969-80d8-1708ade8bb66.png",
      date: "May 5, 2025",
      author: "Michael Rodriguez",
      category: "Data Analysis"
    }
  ];

  return (
    <section className="py-16 bg-dark">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold">Latest News</h2>
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
                    <span className="bg-neon-blue/90 text-xs font-medium px-2 py-1 rounded-sm text-white">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2 hover:text-neon-blue transition-colors">
                    {blog.title}
                  </h3>
                  
                  <Button variant="link" className="p-0 h-auto text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 text-sm justify-start mt-2">
                    Read More <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
