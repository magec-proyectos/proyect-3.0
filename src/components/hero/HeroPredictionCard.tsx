
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="mt-16 mb-16 max-w-2xl mx-auto"
      variants={fadeIn}
    >
      <Card className="bg-dark-card/60 backdrop-blur-md border-dark-border">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Try it now</h2>
          <p className="text-gray-400 mb-6">Get an instant prediction for an upcoming match</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Select onValueChange={setTestMatch}>
                <SelectTrigger className="bg-dark-lighter border-dark-border">
                  <SelectValue placeholder="Select a match" />
                </SelectTrigger>
                <SelectContent className="bg-dark border-dark-border text-white">
                  <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
                  <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
                  <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleTestPrediction}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              Get Prediction
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          
          {showPrediction && (
            <motion.div 
              className="mt-6 p-4 bg-dark-lighter rounded-lg border border-dark-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Prediction</p>
                  <p className="text-lg font-medium">Home Win (60% probability)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Recommended</p>
                  <p className="text-neon-lime font-medium">Over 2.5 Goals</p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroPredictionCard;
