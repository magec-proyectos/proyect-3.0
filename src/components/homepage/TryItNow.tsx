
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, TrendingUp } from 'lucide-react';
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { 
      duration: 2, 
      ease: "easeInOut", 
      repeat: Infinity 
    }
  };

  return (
    <motion.div 
      className="my-24 max-w-4xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <motion.div 
          className="inline-block mb-3 bg-gradient-to-r from-neon-blue to-neon-lime text-black font-medium rounded-full px-4 py-1 text-sm"
          animate={pulseAnimation}
        >
          <Sparkles className="inline-block mr-1 h-4 w-4" /> AI-Powered Predictions
        </motion.div>
        <motion.h2 
          className="text-4xl font-bold mb-2 gradient-text"
          variants={itemVariants}
        >
          See It In Action
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-xl mx-auto"
          variants={itemVariants}
        >
          Select from upcoming matches and get instant AI-powered predictions to enhance your betting strategy.
        </motion.p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-dark-card/50 to-dark-card/30 backdrop-blur-lg">
          <CardContent className="p-0">
            <div className="border-b border-dark-border">
              <Tabs defaultValue="football" className="w-full">
                <TabsList className="grid grid-cols-3 bg-transparent border-b border-dark-border rounded-none h-16">
                  <TabsTrigger 
                    value="football" 
                    className="data-[state=active]:bg-dark-lighter data-[state=active]:border-b-2 data-[state=active]:border-neon-blue data-[state=active]:shadow-none rounded-none h-full"
                  >
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-8 h-8 bg-dark-lighter rounded-full flex items-center justify-center mr-2 border border-dark-border">
                        <span className="text-neon-blue font-bold">⚽</span>
                      </div>
                      <span>Football</span>
                    </motion.div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="basketball" 
                    className="data-[state=active]:bg-dark-lighter data-[state=active]:border-b-2 data-[state=active]:border-neon-lime data-[state=active]:shadow-none rounded-none h-full"
                  >
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-8 h-8 bg-dark-lighter rounded-full flex items-center justify-center mr-2 border border-dark-border">
                        <span className="text-neon-lime font-bold">🏀</span>
                      </div>
                      <span>Basketball</span>
                    </motion.div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="americanFootball" 
                    className="data-[state=active]:bg-dark-lighter data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none h-full"
                  >
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-8 h-8 bg-dark-lighter rounded-full flex items-center justify-center mr-2 border border-dark-border">
                        <span className="text-purple-500 font-bold">🏈</span>
                      </div>
                      <span className="hidden sm:inline">American Football</span>
                      <span className="sm:hidden">Football</span>
                    </motion.div>
                  </TabsTrigger>
                </TabsList>
                
                {/* Football Content */}
                <TabsContent value="football" className="pt-6 pb-8 px-6 sm:px-8">
                  <div className="p-4 bg-dark-lighter/50 border border-dark-border rounded-lg mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      <TrendingUp className="inline-block mr-1 h-3 w-3" /> AI has analyzed 347 matches from the last 30 days for more accurate predictions
                    </p>
                  </div>
                
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 mb-1.5 block">Select Match</label>
                      <Select 
                        onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, football: value }))} 
                        value={selectedMatches.football}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
                          <SelectValue placeholder="Choose a football match" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark border-dark-border text-white">
                          <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
                          <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
                          <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:w-1/3">
                      <label className="text-sm text-gray-400 mb-1.5 block">AI Prediction</label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={() => handleGetPrediction('football')}
                          className="w-full bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:from-neon-blue hover:to-neon-blue text-black font-medium h-12 transition-all"
                          disabled={!selectedMatches.football}
                        >
                          Get Prediction
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {showPredictions.football && (
                    <motion.div 
                      className="rounded-xl border border-neon-blue/20 bg-dark-lighter/50 overflow-hidden backdrop-blur-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-neon-blue"></div>
                              <p className="text-sm text-gray-400">AI Prediction</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium">Home Win</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-neon-blue/20 text-neon-blue rounded-full">
                                68% probability
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-neon-lime"></div>
                              <p className="text-sm text-gray-400">Recommended Bet</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium text-neon-lime">Over 2.5 Goals</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-neon-lime/20 text-neon-lime rounded-full">
                                High confidence
                              </div>
                            </div>
                          </div>

                          {selectedMatches.football && (
                            <div className="md:w-auto">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full md:w-auto bg-dark-lighter border-dark-border hover:bg-dark hover:text-neon-blue">
                                    <Play size={16} className="mr-2" />
                                    Analysis Video
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
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
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Historical H2H</p>
                            <p className="text-lg font-medium">67% Home Wins</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Form Analysis</p>
                            <p className="text-lg font-medium">Strong home form</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Value Bet</p>
                            <p className="text-lg font-medium text-neon-lime">Home Win + BTTS</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>
                
                {/* Basketball Content */}
                <TabsContent value="basketball" className="pt-6 pb-8 px-6 sm:px-8">
                  <div className="p-4 bg-dark-lighter/50 border border-dark-border rounded-lg mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      <TrendingUp className="inline-block mr-1 h-3 w-3" /> AI has analyzed 218 games from the last 30 days for more accurate predictions
                    </p>
                  </div>
                
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 mb-1.5 block">Select Game</label>
                      <Select 
                        onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, basketball: value }))} 
                        value={selectedMatches.basketball}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
                          <SelectValue placeholder="Choose a basketball game" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark border-dark-border text-white">
                          <SelectItem value="lakers_vs_celtics">Lakers vs Celtics</SelectItem>
                          <SelectItem value="bulls_vs_heat">Bulls vs Heat</SelectItem>
                          <SelectItem value="warriors_vs_nets">Warriors vs Nets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:w-1/3">
                      <label className="text-sm text-gray-400 mb-1.5 block">AI Prediction</label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={() => handleGetPrediction('basketball')}
                          className="w-full bg-gradient-to-r from-neon-lime to-neon-lime/70 hover:from-neon-lime hover:to-neon-lime text-black font-medium h-12 transition-all"
                          disabled={!selectedMatches.basketball}
                        >
                          Get Prediction
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {showPredictions.basketball && (
                    <motion.div 
                      className="rounded-xl border border-neon-lime/20 bg-dark-lighter/50 overflow-hidden backdrop-blur-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-neon-lime"></div>
                              <p className="text-sm text-gray-400">AI Prediction</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium">Away Win</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-neon-lime/20 text-neon-lime rounded-full">
                                55% probability
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-neon-lime"></div>
                              <p className="text-sm text-gray-400">Recommended Bet</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium text-neon-lime">Under 220.5 Points</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-neon-lime/20 text-neon-lime rounded-full">
                                Medium confidence
                              </div>
                            </div>
                          </div>

                          {selectedMatches.basketball && (
                            <div className="md:w-auto">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full md:w-auto bg-dark-lighter border-dark-border hover:bg-dark hover:text-neon-lime">
                                    <Play size={16} className="mr-2" />
                                    Analysis Video
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
                                  <div className="aspect-video w-full">
                                    <iframe 
                                      width="100%" 
                                      height="100%" 
                                      src={videos[selectedMatches.basketball as keyof typeof videos]}
                                      title="Game Analysis" 
                                      frameBorder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Key Stats</p>
                            <p className="text-lg font-medium">+7.2 avg road margin</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Injury Impact</p>
                            <p className="text-lg font-medium">2 starters out (home)</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Value Bet</p>
                            <p className="text-lg font-medium text-neon-lime">Away -4.5 points</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>
                
                {/* American Football Content */}
                <TabsContent value="americanFootball" className="pt-6 pb-8 px-6 sm:px-8">
                  <div className="p-4 bg-dark-lighter/50 border border-dark-border rounded-lg mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      <TrendingUp className="inline-block mr-1 h-3 w-3" /> AI has analyzed 124 games from the last 30 days for more accurate predictions
                    </p>
                  </div>
                
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 mb-1.5 block">Select Game</label>
                      <Select 
                        onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, americanFootball: value }))} 
                        value={selectedMatches.americanFootball}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
                          <SelectValue placeholder="Choose an American football game" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark border-dark-border text-white">
                          <SelectItem value="chiefs_vs_eagles">Chiefs vs Eagles</SelectItem>
                          <SelectItem value="cowboys_vs_giants">Cowboys vs Giants</SelectItem>
                          <SelectItem value="packers_vs_bears">Packers vs Bears</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:w-1/3">
                      <label className="text-sm text-gray-400 mb-1.5 block">AI Prediction</label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={() => handleGetPrediction('americanFootball')}
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-500/70 hover:from-purple-500 hover:to-purple-500 text-white font-medium h-12 transition-all"
                          disabled={!selectedMatches.americanFootball}
                        >
                          Get Prediction
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {showPredictions.americanFootball && (
                    <motion.div 
                      className="rounded-xl border border-purple-500/20 bg-dark-lighter/50 overflow-hidden backdrop-blur-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                              <p className="text-sm text-gray-400">AI Prediction</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium">Home Win</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                                72% probability
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                              <p className="text-sm text-gray-400">Recommended Bet</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-medium text-purple-300">Over 45.5 Points</p>
                              <div className="text-xs font-medium px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                                High confidence
                              </div>
                            </div>
                          </div>

                          {selectedMatches.americanFootball && (
                            <div className="md:w-auto">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full md:w-auto bg-dark-lighter border-dark-border hover:bg-dark hover:text-purple-400">
                                    <Play size={16} className="mr-2" />
                                    Analysis Video
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
                                  <div className="aspect-video w-full">
                                    <iframe 
                                      width="100%" 
                                      height="100%" 
                                      src={videos[selectedMatches.americanFootball as keyof typeof videos]}
                                      title="Game Analysis" 
                                      frameBorder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">QB Rating</p>
                            <p className="text-lg font-medium">115.8 (home)</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Red Zone %</p>
                            <p className="text-lg font-medium">76% conversion</p>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-1">Value Bet</p>
                            <p className="text-lg font-medium text-purple-300">Home -6.5 points</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        className="mt-10 flex justify-center"
        variants={itemVariants}
      >
        <Button 
          className="bg-dark-lighter hover:bg-dark/70 border border-dark-border text-gray-300 hover:text-white"
          onClick={() => window.location.href = '/sports'}
        >
          Explore All Sports
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TryItNow;
