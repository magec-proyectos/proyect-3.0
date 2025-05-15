
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const HeroPredictionCard = () => {
  const [testMatch, setTestMatch] = useState<string>('');
  const [showPrediction, setShowPrediction] = useState(false);
  
  const handleTestPrediction = () => {
    if (testMatch) {
      setShowPrediction(true);
    }
  };

  return (
    <motion.div 
      className="mt-16 mb-16 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <Card className="bg-dark-card/40 backdrop-blur-xl border border-dark-border/50 neon-border">
        <CardContent className="pt-6">
          <motion.h2 
            className="text-2xl font-bold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Try it now
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Get an instant prediction for an upcoming match
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Select onValueChange={setTestMatch}>
                <SelectTrigger className="bg-dark-lighter/50 border-dark-border backdrop-blur-md">
                  <SelectValue placeholder="Select a match" />
                </SelectTrigger>
                <SelectContent className="bg-dark border-dark-border text-white">
                  <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
                  <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
                  <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleTestPrediction}
                className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-lg shadow-neon-blue/20"
              >
                Get Prediction
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          </div>
          
          {showPrediction && (
            <motion.div 
              className="mt-6 p-4 bg-dark-lighter/60 rounded-lg border border-dark-border/70 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-sm text-gray-400">Prediction</p>
                  <p className="text-lg font-medium">Home Win (60% probability)</p>
                </motion.div>
                <motion.div 
                  className="text-right"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-gray-400">Recommended</p>
                  <p className="text-neon-lime font-medium">Over 2.5 Goals</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroPredictionCard;
