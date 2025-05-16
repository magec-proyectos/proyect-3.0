
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TryItNow = () => {
  const [selectedMatches, setSelectedMatches] = useState({
    football: '',
    basketball: '',
    americanFootball: ''
  });
  
  const [showPredictions, setShowPredictions] = useState({
    football: false,
    basketball: false,
    americanFootball: false
  });
  
  const handleGetPrediction = (sport: 'football' | 'basketball' | 'americanFootball') => {
    if (selectedMatches[sport]) {
      setShowPredictions(prev => ({ ...prev, [sport]: true }));
    }
  };

  const videos = {
    // Football videos
    liverpool_vs_arsenal: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mancity_vs_chelsea: "https://www.youtube.com/embed/jNQXAC9IVRw",
    barcelona_vs_realmadrid: "https://www.youtube.com/embed/M7lc1UVf-VE",
    
    // Basketball videos
    lakers_vs_celtics: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bulls_vs_heat: "https://www.youtube.com/embed/jNQXAC9IVRw",
    warriors_vs_nets: "https://www.youtube.com/embed/M7lc1UVf-VE",
    
    // American Football videos
    chiefs_vs_eagles: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    cowboys_vs_giants: "https://www.youtube.com/embed/jNQXAC9IVRw",
    packers_vs_bears: "https://www.youtube.com/embed/M7lc1UVf-VE",
  };

  return (
    <motion.div 
      className="mb-8 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-dark-card/90 to-dark-card/60 backdrop-blur-md border-dark-border shadow-lg">
        <CardContent className="pt-8 pb-6 px-6">
          <h3 className="text-2xl font-bold mb-3 gradient-text">Try it now</h3>
          <p className="text-gray-400 mb-6">Get instant AI predictions for upcoming matches</p>
          
          <Tabs defaultValue="football" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-dark-lighter border-dark-border">
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="americanFootball">American Football</TabsTrigger>
            </TabsList>
            
            {/* Football Content */}
            <TabsContent value="football" className="mt-0">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <Select 
                    onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, football: value }))} 
                    value={selectedMatches.football}
                  >
                    <SelectTrigger className="bg-dark-lighter border-dark-border">
                      <SelectValue placeholder="Select a football match" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border-dark-border text-white">
                      <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
                      <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
                      <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => handleGetPrediction('football')}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                  disabled={!selectedMatches.football}
                >
                  Get Prediction
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
              
              {showPredictions.football && (
                <motion.div 
                  className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
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

                    {selectedMatches.football && (
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
                              src={videos[selectedMatches.football as keyof typeof videos]}
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
            </TabsContent>
            
            {/* Basketball Content */}
            <TabsContent value="basketball" className="mt-0">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <Select 
                    onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, basketball: value }))} 
                    value={selectedMatches.basketball}
                  >
                    <SelectTrigger className="bg-dark-lighter border-dark-border">
                      <SelectValue placeholder="Select a basketball match" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border-dark-border text-white">
                      <SelectItem value="lakers_vs_celtics">Lakers vs Celtics</SelectItem>
                      <SelectItem value="bulls_vs_heat">Bulls vs Heat</SelectItem>
                      <SelectItem value="warriors_vs_nets">Warriors vs Nets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => handleGetPrediction('basketball')}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                  disabled={!selectedMatches.basketball}
                >
                  Get Prediction
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
              
              {showPredictions.basketball && (
                <motion.div 
                  className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Prediction</p>
                      <p className="text-lg font-medium">Away Win (55% probability)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Recommended</p>
                      <p className="text-neon-lime font-medium">Under 220.5 Points</p>
                    </div>

                    {selectedMatches.basketball && (
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
                              src={videos[selectedMatches.basketball as keyof typeof videos]}
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
            </TabsContent>
            
            {/* American Football Content */}
            <TabsContent value="americanFootball" className="mt-0">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <Select 
                    onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, americanFootball: value }))} 
                    value={selectedMatches.americanFootball}
                  >
                    <SelectTrigger className="bg-dark-lighter border-dark-border">
                      <SelectValue placeholder="Select an American football match" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border-dark-border text-white">
                      <SelectItem value="chiefs_vs_eagles">Chiefs vs Eagles</SelectItem>
                      <SelectItem value="cowboys_vs_giants">Cowboys vs Giants</SelectItem>
                      <SelectItem value="packers_vs_bears">Packers vs Bears</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => handleGetPrediction('americanFootball')}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                  disabled={!selectedMatches.americanFootball}
                >
                  Get Prediction
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
              
              {showPredictions.americanFootball && (
                <motion.div 
                  className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Prediction</p>
                      <p className="text-lg font-medium">Home Win (72% probability)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Recommended</p>
                      <p className="text-neon-lime font-medium">Over 45.5 Points</p>
                    </div>

                    {selectedMatches.americanFootball && (
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
                              src={videos[selectedMatches.americanFootball as keyof typeof videos]}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TryItNow;
