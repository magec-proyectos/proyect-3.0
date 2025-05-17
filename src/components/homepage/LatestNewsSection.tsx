
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
      excerpt: "Discover how machine learning algorithms are changing the way bettors approach sports prediction and analysis.",
      image: "/lovable-uploads/08212846-590e-4578-b016-bf0a01f14455.png",
      date: "May 14, 2025",
      author: "Daniel Chen",
      category: "AI Technology"
    },
    {
      id: 2,
      title: "5 Casino Games Where AI Analysis Gives You the Edge",
      excerpt: "Learn which casino games benefit most from AI-powered strategy analysis and how to maximize your advantage.",
      image: "/lovable-uploads/7c55be5a-2fd6-4846-805f-6abc4132183b.png",
      date: "May 10, 2025",
      author: "Sarah Johnson",
      category: "Casino Strategy"
    },
    {
      id: 3,
      title: "Understanding Betting Patterns: What the Data Reveals",
      excerpt: "An in-depth look at common betting patterns and what they can tell us about prediction accuracy and strategy development.",
      image: "/lovable-uploads/c2a9e6cd-258e-479a-9f6b-88c09da13e36.png",
      date: "May 5, 2025",
      author: "Michael Rodriguez",
      category: "Data Analysis"
    }
  ];

  return (
    <section className="py-20 bg-dark">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-5xl font-bold mb-2">Latest News</h2>
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
              <Card className="overflow-hidden border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="uppercase tracking-wide text-purple-600 font-semibold text-sm mb-3">
                    {blog.category}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 hover:text-purple-700 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-base flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-800 flex items-center gap-1.5 font-medium self-start">
                    Read More <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
