
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Timer, Star, Share2, ChartPie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import SportSelection from '@/components/SportSelection';
import PredictionVisualizer from '@/components/PredictionVisualizer';

const TryItNow = () => {
  const [activeSport, setActiveSport] = useState<'football' | 'basketball' | 'americanFootball'>('football');
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

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quickDemoActive, setQuickDemoActive] = useState(false);

  // Effect for the fake analysis progress bar
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            return 0;
          }
          return prev + 4;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  // Effect to automatically show a demo prediction on first visit
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('hasSeenPredictionDemo');
    
    if (!hasSeenDemo && !quickDemoActive) {
      const timer = setTimeout(() => {
        handleQuickDemo();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleGetPrediction = (sport: 'football' | 'basketball' | 'americanFootball') => {
    if (selectedMatches[sport] || quickDemoActive) {
      setIsAnalyzing(true);
      setProgress(0);
      
      // Simulate AI analyzing time
      setTimeout(() => {
        setShowPredictions(prev => ({ ...prev, [sport]: true }));
        setIsAnalyzing(false);
        localStorage.setItem('hasSeenPredictionDemo', 'true');
      }, 2000);
    }
  };

  const handleQuickDemo = () => {
    setQuickDemoActive(true);
    setActiveSport('football');
    setSelectedMatches(prev => ({...prev, football: 'liverpool_vs_arsenal'}));
    handleGetPrediction('football');
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.9],
      transition: { 
        duration: 2, 
        ease: "easeInOut", 
        repeat: Infinity 
      }
    }
  };

  const isActive = (sport: string) => activeSport === sport;

  // Get match options based on active sport
  const getMatchOptions = () => {
    switch (activeSport) {
      case 'football':
        return (
          <>
            <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
            <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
            <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
          </>
        );
      case 'basketball':
        return (
          <>
            <SelectItem value="lakers_vs_celtics">Lakers vs Celtics</SelectItem>
            <SelectItem value="bulls_vs_heat">Bulls vs Heat</SelectItem>
            <SelectItem value="warriors_vs_nets">Warriors vs Nets</SelectItem>
          </>
        );
      case 'americanFootball':
        return (
          <>
            <SelectItem value="chiefs_vs_eagles">Chiefs vs Eagles</SelectItem>
            <SelectItem value="cowboys_vs_giants">Cowboys vs Giants</SelectItem>
            <SelectItem value="packers_vs_bears">Packers vs Bears</SelectItem>
          </>
        );
      default:
        return null;
    }
  };

  // Get button style based on active sport
  const getButtonStyle = () => {
    switch (activeSport) {
      case 'football':
        return "bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:from-neon-blue hover:to-neon-blue text-black";
      case 'basketball':
        return "bg-gradient-to-r from-neon-lime to-neon-lime/70 hover:from-neon-lime hover:to-neon-lime text-black";
      case 'americanFootball':
        return "bg-gradient-to-r from-purple-500 to-purple-500/70 hover:from-purple-500 hover:to-purple-500 text-white";
      default:
        return "bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:from-neon-blue hover:to-neon-blue text-black";
    }
  };

  // Get accent color based on active sport
  const getAccentColor = () => {
    switch (activeSport) {
      case 'football':
        return "neon-blue";
      case 'basketball':
        return "neon-lime";
      case 'americanFootball':
        return "purple-500";
      default:
        return "neon-blue";
    }
  };

  // Get border color based on active sport
  const getBorderColor = () => {
    switch (activeSport) {
      case 'football':
        return "border-neon-blue/20";
      case 'basketball':
        return "border-neon-lime/20";
      case 'americanFootball':
        return "border-purple-500/20";
      default:
        return "border-neon-blue/20";
    }
  };

  // Function to get match name from value
  const getMatchName = (value: string): string => {
    const mapping: Record<string, string> = {
      'liverpool_vs_arsenal': 'Liverpool vs Arsenal',
      'mancity_vs_chelsea': 'Man City vs Chelsea',
      'barcelona_vs_realmadrid': 'Barcelona vs Real Madrid',
      'lakers_vs_celtics': 'Lakers vs Celtics',
      'bulls_vs_heat': 'Bulls vs Heat',
      'warriors_vs_nets': 'Warriors vs Nets',
      'chiefs_vs_eagles': 'Chiefs vs Eagles',
      'cowboys_vs_giants': 'Cowboys vs Giants',
      'packers_vs_bears': 'Packers vs Bears'
    };
    
    return mapping[value] || value;
  };

  // Get prediction confidence level for the UI
  const getPredictionConfidence = (): {value: number, label: string, color: string} => {
    switch (activeSport) {
      case 'football':
        return { value: 78, label: 'High', color: 'text-neon-blue' };
      case 'basketball':
        return { value: 65, label: 'Medium', color: 'text-neon-lime' };
      case 'americanFootball':
        return { value: 82, label: 'Very High', color: 'text-purple-500' };
      default:
        return { value: 75, label: 'High', color: 'text-neon-blue' };
    }
  };

  return (
    <motion.div 
      className="my-12 max-w-4xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-dark-card/80 to-dark-card/50 backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold mb-2 sm:mb-0">Try Our Prediction AI</h2>
              
              {/* Quick Demo Button for first-time users */}
              {!quickDemoActive && !showPredictions[activeSport] && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-dark-lighter border-dark-border text-neon-blue hover:bg-dark hover:text-neon-lime"
                  onClick={handleQuickDemo}
                >
                  <Timer size={16} className="mr-2 animate-pulse" />
                  Quick Demo
                </Button>
              )}
            </div>
            
            {/* Sport selection cards */}
            <SportSelection
              className="mb-8"
              activeSport={activeSport}
              onSelectSport={(sport) => {
                setActiveSport(sport);
                setShowPredictions(prev => ({ ...prev, [sport]: false }));
                setQuickDemoActive(false);
              }}
            />
            
            <div className="border-t border-dark-border pt-8">
              <AnimatePresence mode="wait">
                {!showPredictions[activeSport] && !isAnalyzing && (
                  <motion.div 
                    key="selection-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                  >
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 mb-1.5 block">Select Match</label>
                      <Select 
                        onValueChange={(value) => setSelectedMatches(prev => ({ ...prev, [activeSport]: value }))} 
                        value={selectedMatches[activeSport]}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
                          <SelectValue placeholder={`Choose a ${activeSport === 'americanFootball' ? 'football' : activeSport} match`} />
                        </SelectTrigger>
                        <SelectContent className="bg-dark border-dark-border text-white">
                          {getMatchOptions()}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:w-1/3">
                      <label className="text-sm text-gray-400 mb-1.5 block">AI Prediction</label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={() => handleGetPrediction(activeSport)}
                          className={`w-full ${getButtonStyle()} font-medium h-12 transition-all`}
                          disabled={!selectedMatches[activeSport]}
                        >
                          Get Prediction
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {isAnalyzing && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-6"
                  >
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center bg-dark-lighter rounded-full w-16 h-16 mb-4">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                            scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                          }}
                        >
                          <ChartPie size={32} className={`text-${getAccentColor()}`} />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Analyzing Match Data</h3>
                      <p className="text-gray-400 mb-4">Our AI is processing thousands of data points...</p>
                      
                      <div className="max-w-md mx-auto">
                        <Progress 
                          value={progress} 
                          className="h-2 mb-2" 
                          indicatorClassName={`bg-${getAccentColor()}`} 
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Analyzing stats</span>
                          <span>{progress}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {showPredictions[activeSport] && !isAnalyzing && (
                  <motion.div
                    key="prediction-results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="bg-dark/50 rounded-lg p-4 mb-4 flex flex-wrap justify-between items-center">
                      <div>
                        <Badge className={`bg-${getAccentColor()}/20 text-${getAccentColor()} mb-2`}>
                          Match Analysis
                        </Badge>
                        <h3 className="text-xl font-bold mb-1">
                          {getMatchName(selectedMatches[activeSport])}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-400">AI Confidence</div>
                        <div className={`text-sm font-medium ${getPredictionConfidence().color}`}>
                          {getPredictionConfidence().label} ({getPredictionConfidence().value}%)
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced visualization component */}
                    <PredictionVisualizer 
                      sport={activeSport} 
                      matchId={selectedMatches[activeSport]} 
                    />
                    
                    <div className="flex flex-wrap gap-3 mt-6 justify-between">
                      <Button 
                        variant="outline" 
                        className="bg-transparent border-dark-border hover:bg-dark-lighter"
                        onClick={() => {
                          setShowPredictions(prev => ({ ...prev, [activeSport]: false }));
                          setQuickDemoActive(false);
                        }}
                      >
                        Try Another Match
                      </Button>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className={`bg-dark-lighter border-dark-border hover:bg-dark hover:text-${getAccentColor()}`}
                            >
                              <Play size={16} className="mr-2" />
                              Analysis Video
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
                            <div className="aspect-video w-full">
                              <iframe 
                                width="100%" 
                                height="100%" 
                                src={videos[selectedMatches[activeSport] as keyof typeof videos]}
                                title="Match Analysis" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          className={`bg-${getAccentColor()} ${activeSport === 'americanFootball' ? 'text-white' : 'text-black'}`}
                        >
                          <Star size={16} className="mr-2" />
                          Place Bet
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TryItNow;
