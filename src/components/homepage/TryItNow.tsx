
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TryItNow = () => {
  const [selectedMatch, setSelectedMatch] = useState<string>('');
  const [showPrediction, setShowPrediction] = useState(false);
  
  const handleGetPrediction = () => {
    if (selectedMatch) {
      setShowPrediction(true);
    }
  };

  const videos = {
    liverpool_vs_arsenal: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mancity_vs_chelsea: "https://www.youtube.com/embed/jNQXAC9IVRw",
    barcelona_vs_realmadrid: "https://www.youtube.com/embed/M7lc1UVf-VE",
  };

  return (
    <motion.div 
      className="mb-2 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-dark-card/60 backdrop-blur-md border-dark-border">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-3">Try it now</h3>
          <p className="text-gray-400 mb-6">Get an instant prediction for an upcoming match</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Select onValueChange={setSelectedMatch} value={selectedMatch}>
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
              onClick={handleGetPrediction}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
              disabled={!selectedMatch}
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
                  <p className="text-lg font-medium">Home Win (68% probability)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Recommended</p>
                  <p className="text-neon-lime font-medium">Over 2.5 Goals</p>
                </div>

                {selectedMatch && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="ml-2 bg-dark-lighter border-dark-border">
                        <Play size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-dark-card border-dark-border sm:max-w-[600px]">
                      <div className="aspect-video w-full">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={videos[selectedMatch as keyof typeof videos]}
                          title="Match Analysis" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TryItNow;
