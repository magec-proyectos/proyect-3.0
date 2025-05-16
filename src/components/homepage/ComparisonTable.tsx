
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
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
    { name: "AI-Powered Predictions", description: "Uses machine learning algorithms to generate predictions" },
    { name: "Historical Data Analysis", description: "Analyzes years of historical match data" },
    { name: "Real-time Updates", description: "Updates predictions during live events" },
    { name: "Custom Alerts", description: "Personalized notifications for high-value opportunities" },
    { name: "Odds Comparison", description: "Compares odds across multiple bookmakers" },
    { name: "Advanced Statistics", description: "Provides in-depth statistical analysis" },
    { name: "Community Insights", description: "Access to community prediction trends" },
    { name: "Multi-Sport Support", description: "Supports multiple sports and leagues" },
    { name: "No Monthly Fees", description: "No recurring subscription fees" }
  ];
  
  const competitors = [
    { name: "Our Platform", hasFeatures: [true, true, true, true, true, true, true, true, true] },
    { name: "Competitor A", hasFeatures: [true, true, false, true, true, false, false, true, false] },
    { name: "Competitor B", hasFeatures: [true, false, true, false, false, true, true, false, false] },
    { name: "Competitor C", hasFeatures: [false, true, false, false, true, true, false, true, true] }
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
          <h2 className="text-3xl font-bold mb-3">Why We're The Best</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our AI prediction platform compares to other solutions on the market
          </p>
        </motion.div>
        
        <motion.div
          className="mt-10 overflow-x-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="min-w-[800px]">
            <Table className="border border-dark-border/50 rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-dark-card hover:bg-dark-card">
                  <TableHead className="w-[300px] border-r border-dark-border/50">Feature</TableHead>
                  {competitors.map((competitor, index) => (
                    <TableHead 
                      key={index} 
                      className={`text-center ${index === 0 ? 'bg-neon-blue/10 text-neon-blue' : ''}`}
                    >
                      {competitor.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature, featureIndex) => (
                  <TableRow 
                    key={featureIndex}
                    className="border-b border-dark-border/50"
                  >
                    <TableCell className="font-medium border-r border-dark-border/50">
                      <div>
                        <p>{feature.name}</p>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </TableCell>
                    {competitors.map((competitor, competitorIndex) => (
                      <TableCell 
                        key={competitorIndex} 
                        className={`text-center ${competitorIndex === 0 ? 'bg-neon-blue/5' : ''}`}
                      >
                        {competitor.hasFeatures[featureIndex] ? (
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
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
