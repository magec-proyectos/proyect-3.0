
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="py-20">
      <div className="container px-4">
        <motion.div 
          className="flex flex-wrap items-center justify-between mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest News & Insights</h2>
            <p className="text-gray-400 max-w-2xl">
              Expert articles and analysis to keep you informed on the latest trends in AI prediction
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-neon-blue text-neon-blue hover:bg-neon-blue/10">
            View All Articles
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="bg-dark-card/60 backdrop-blur-md border border-dark-border rounded-xl overflow-hidden hover-scale"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 text-xs bg-neon-blue/10 text-neon-blue px-2 py-1 rounded-full">
                    <Tag size={12} />
                    {blog.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                <p className="text-gray-400 mb-5">{blog.excerpt}</p>
                
                <Button variant="link" className="p-0 h-auto text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 font-medium">
                  Read Article <ArrowRight size={16} />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
