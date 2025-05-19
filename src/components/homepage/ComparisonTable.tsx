
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Star, Info, Trophy, ExternalLink } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

const ComparisonTable = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const rowAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const features = [
    { 
      name: "AI-Powered Predictions", 
      description: "Uses advanced machine learning algorithms to predict outcomes", 
      icon: <Star size={16} className="mr-2 text-neon-blue" />, 
      ourValue: true,
      othersValue: true
    },
    { 
      name: "Real-time Updates", 
      description: "Instant updates based on team changes, injuries and weather conditions", 
      icon: <Info size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: false
    },
    { 
      name: "Win Rate", 
      description: "Average win rate of predictions across major leagues", 
      icon: <Trophy size={16} className="mr-2 text-neon-blue" />,
      ourValue: "Up to 89%",
      othersValue: "Up to 71%"
    },
    { 
      name: "Sports Coverage", 
      description: "Number of sports and leagues covered", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" />,
      ourValue: "20+ sports, 100+ leagues",
      othersValue: "10 sports, 30 leagues"
    },
    { 
      name: "Custom Alerts", 
      description: "Personalized notifications for high-value betting opportunities", 
      icon: <Info size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: false
    },
    { 
      name: "Odds Comparison", 
      description: "Automated comparison across multiple bookmakers", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: true
    },
    { 
      name: "Advanced Statistics", 
      description: "Detailed statistical analysis beyond basic metrics", 
      icon: <Info size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: false
    },
    { 
      name: "Value Bet Detection", 
      description: "AI system that identifies mispriced odds in the market", 
      icon: <Star size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: false
    },
    { 
      name: "Free Trial Available", 
      description: "Try before subscribing with full access to features", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" />,
      ourValue: true,
      othersValue: true
    }
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="inline-block px-4 py-1 bg-neon-blue/10 text-neon-blue text-sm rounded-full mb-4">
            Competitive Edge
          </span>
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Why We're The Best
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our AI prediction platform outperforms competitors in the sports betting market
          </p>
        </motion.div>
        
        <motion.div
          className="mt-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerAnimation}
        >
          <div className="rounded-xl overflow-hidden border border-dark-border/50 shadow-lg shadow-neon-blue/5 glass-effect">
            <div className="min-w-full pb-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-dark-card/80 hover:bg-dark-card/80 backdrop-blur-md">
                    <TableHead className="w-[300px] border-r border-dark-border/50">
                      <div className="flex items-center">
                        <Shield size={18} className="mr-2 text-neon-blue" />
                        <span className="font-semibold">Feature</span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-center bg-neon-blue/10 text-neon-blue border-r border-dark-border/50"
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">Smart Bet AI</span>
                        <span className="text-xs font-normal py-1 px-3 bg-neon-blue/20 rounded-full mt-1 inline-block">
                          <Trophy size={12} className="inline mr-1" /> Industry Leader
                        </span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">
                      <span className="font-semibold text-gray-400">Others</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature, featureIndex) => (
                    <motion.tr 
                      key={featureIndex}
                      className="border-b border-dark-border/50 hover:bg-dark-lighter/10 transition-colors"
                      variants={rowAnimation}
                    >
                      <TableCell className="font-medium border-r border-dark-border/50">
                        <div>
                          <div className="flex items-center">
                            {feature.icon}
                            <p className="font-semibold">{feature.name}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                        </div>
                      </TableCell>
                      <TableCell 
                        className="text-center bg-neon-blue/5 border-r border-dark-border/50"
                      >
                        {typeof feature.ourValue === 'string' ? (
                          <motion.div 
                            className="font-semibold text-neon-blue"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                          >
                            {feature.ourValue}
                          </motion.div>
                        ) : feature.ourValue ? (
                          <motion.div 
                            className="flex justify-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="w-8 h-8 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center">
                              <Check size={16} />
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                              <X size={16} />
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.othersValue === 'string' ? (
                          <div className="text-gray-400">{feature.othersValue}</div>
                        ) : feature.othersValue ? (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-gray-600/20 text-gray-400 flex items-center justify-center">
                              <Check size={16} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                              <X size={16} />
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
