
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/components/OptimizedImage';

const LatestNewsSection = React.memo(() => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const blogs = React.useMemo(() => [
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
  ], []);

  return (
    <section className="py-16 bg-dark">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div>
            <h2 className="text-4xl font-bold text-white">Latest News</h2>
          </div>
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
                  <OptimizedImage 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full transition-transform duration-500 hover:scale-105"
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
});

LatestNewsSection.displayName = 'LatestNewsSection';

export default LatestNewsSection;
