
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Star, Info } from 'lucide-react';
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
  
  const features = [
    { 
      name: "AI-Powered Predictions", 
      description: "Uses advanced machine learning algorithms to predict outcomes", 
      icon: <Star size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Real-time Updates", 
      description: "Instant updates based on team changes, injuries and weather conditions", 
      icon: <Info size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Win Rate", 
      description: "Average win rate of predictions across major leagues", 
      icon: <Star size={16} className="mr-2 text-neon-blue" />,
      value: "Up to 89%",
      competitors: ["Up to 76%", "Up to 72%", "Up to 70%"]
    },
    { 
      name: "Sports Coverage", 
      description: "Number of sports and leagues covered", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" />,
      value: "20+ sports, 100+ leagues",
      competitors: ["8 sports, 25+ leagues", "12 sports, 30+ leagues", "5 sports, 15+ leagues"]
    },
    { 
      name: "Custom Alerts", 
      description: "Personalized notifications for high-value betting opportunities", 
      icon: <Info size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Odds Comparison", 
      description: "Automated comparison across multiple bookmakers", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Advanced Statistics", 
      description: "Detailed statistical analysis beyond basic metrics", 
      icon: <Info size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Value Bet Detection", 
      description: "AI system that identifies mispriced odds in the market", 
      icon: <Star size={16} className="mr-2 text-neon-blue" /> 
    },
    { 
      name: "Free Trial Available", 
      description: "Try before subscribing with full access to features", 
      icon: <Shield size={16} className="mr-2 text-neon-blue" /> 
    }
  ];
  
  const competitors = [
    { name: "Smart Bet AI", hasFeatures: [true, true, true, true, true, true, true, true, true] },
    { name: "BetStars", hasFeatures: [true, true, false, true, false, true, false, false, false] },
    { name: "Predictix", hasFeatures: [true, false, true, false, true, false, true, false, true] },
    { name: "OddsOracle", hasFeatures: [false, true, false, false, false, true, true, false, false] }
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
            Competitive Analysis
          </span>
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Why We're The Best
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our AI prediction platform compares to leading competitors in the sports betting market
          </p>
        </motion.div>
        
        <motion.div
          className="mt-10 overflow-x-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="min-w-[800px] pb-8">
            <div className="rounded-lg overflow-hidden border border-dark-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-dark-card hover:bg-dark-card">
                    <TableHead className="w-[300px] border-r border-dark-border/50">
                      <div className="flex items-center">
                        <Shield size={18} className="mr-2 text-neon-blue" />
                        <span>Feature</span>
                      </div>
                    </TableHead>
                    {competitors.map((competitor, index) => (
                      <TableHead 
                        key={index} 
                        className={`text-center ${index === 0 ? 'bg-neon-blue/10 text-neon-blue' : ''}`}
                      >
                        {competitor.name}
                        {index === 0 && (
                          <div className="text-xs font-normal py-1 px-2 bg-neon-blue/20 rounded-full mt-1 inline-block">
                            Most recommended
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature, featureIndex) => (
                    <TableRow 
                      key={featureIndex}
                      className="border-b border-dark-border/50 hover:bg-dark-lighter/10 transition-colors"
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
                      {competitors.map((competitor, competitorIndex) => (
                        <TableCell 
                          key={competitorIndex} 
                          className={`text-center ${competitorIndex === 0 ? 'bg-neon-blue/5' : ''}`}
                        >
                          {feature.value && competitorIndex === 0 ? (
                            <div className="font-semibold text-neon-blue">{feature.value}</div>
                          ) : feature.value && feature.competitors && competitorIndex > 0 ? (
                            <div className="text-gray-400">{feature.competitors[competitorIndex-1]}</div>
                          ) : competitor.hasFeatures[featureIndex] ? (
                            <div className="flex justify-center">
                              <div className={`w-6 h-6 rounded-full ${competitorIndex === 0 ? 'bg-neon-blue/20 text-neon-blue' : 'bg-gray-600/20 text-gray-400'} flex items-center justify-center`}>
                                <Check size={14} />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                                <X size={14} />
                              </div>
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
        
        {/* Competitive Edge Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div 
            className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-neon-blue/30 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4">
              <Star size={24} className="text-neon-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Superior Accuracy</h3>
            <p className="text-gray-400">Our algorithms consistently outperform competitors with up to 89% prediction accuracy across major leagues.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-neon-blue/30 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4">
              <Shield size={24} className="text-neon-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
            <p className="text-gray-400">We cover 3x more sports and leagues than our closest competitor, giving you more opportunities to find value.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-neon-blue/30 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-4">
              <Info size={24} className="text-neon-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Value Bet Detection</h3>
            <p className="text-gray-400">Our exclusive Value Bet Detection system finds mispriced odds that other platforms miss completely.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
