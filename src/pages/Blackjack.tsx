
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BlackjackTable from '@/components/BlackjackTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calculator, BookOpen, Sparkles, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import StrategyChart from '@/components/blackjack/StrategyChart';
import CardCounter from '@/components/blackjack/CardCounter';
import BlackjackTips from '@/components/blackjack/BlackjackTips';
import { Separator } from '@/components/ui/separator';

const Blackjack = () => {
  const [activeTab, setActiveTab] = useState('advisor');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 gradient-text">Blackjack Advisor</h1>
            <p className="text-gray-400">
              Enter your cards and get AI-powered recommendations for optimal play.
            </p>
          </div>
          
          <Tabs 
            defaultValue="advisor" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="bg-dark-lighter border-dark-border mb-6">
              <TabsTrigger value="advisor" className="flex items-center gap-2">
                <Sparkles size={16} />
                Advisor
              </TabsTrigger>
              <TabsTrigger value="counter" className="flex items-center gap-2">
                <Calculator size={16} />
                Card Counter
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                <BookOpen size={16} />
                Basic Strategy
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Info size={16} />
                Tips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="advisor" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BlackjackTable />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="counter" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CardCounter />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StrategyChart />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="tips" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BlackjackTips />
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-dark-card border-dark-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent z-0 rounded-lg"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg font-medium flex items-center">
                  <span className="gradient-text">Blackjack</span>
                  <span className="ml-2">Simulator Coming Soon</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-gray-400">
                  Our full blackjack simulator with betting functionality will be available soon. 
                  Practice your strategy with virtual chips in realistic casino conditions.
                </p>
              </CardContent>
              <CardFooter className="relative z-10 text-xs text-gray-500 pt-0">
                Stay tuned for updates!
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blackjack;
