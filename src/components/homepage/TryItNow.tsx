
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SportSelection from '@/components/SportSelection';

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

  return (
    <motion.div 
      className="my-24 max-w-4xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Try Our AI Predictions
        </motion.h2>

        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-dark-card/50 to-dark-card/30 backdrop-blur-lg">
          <CardContent className="p-6">
            {/* Sport selection cards */}
            <SportSelection
              className="mb-8"
              activeSport={activeSport}
              onSelectSport={(sport) => {
                setActiveSport(sport);
                setShowPredictions(prev => ({ ...prev, [sport]: false }));
              }}
            />
            
            <div className="border-t border-dark-border pt-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              </div>
              
              {showPredictions[activeSport] && (
                <motion.div 
                  className={`rounded-xl border ${getBorderColor()} bg-dark-lighter/50 overflow-hidden backdrop-blur-sm`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`h-2 w-2 rounded-full bg-${getAccentColor()}`}></div>
                          <p className="text-sm text-gray-400">AI Prediction</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-medium">{activeSport === 'basketball' ? 'Away Win' : 'Home Win'}</p>
                          <div className={`text-xs font-medium px-2 py-0.5 bg-${getAccentColor()}/20 text-${getAccentColor()} rounded-full`}>
                            {activeSport === 'basketball' ? '55%' : activeSport === 'americanFootball' ? '72%' : '68%'} probability
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`h-2 w-2 rounded-full bg-${getAccentColor()}`}></div>
                          <p className="text-sm text-gray-400">Recommended Bet</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className={`text-xl font-medium text-${getAccentColor()}`}>
                            {activeSport === 'basketball' ? 'Under 220.5 Points' : 
                             activeSport === 'americanFootball' ? 'Over 45.5 Points' : 'Over 2.5 Goals'}
                          </p>
                          <div className={`text-xs font-medium px-2 py-0.5 bg-${getAccentColor()}/20 text-${activeSport === 'basketball' ? 'neon-lime' : activeSport === 'americanFootball' ? 'purple-300' : 'neon-blue'} rounded-full`}>
                            {activeSport === 'basketball' ? 'Medium' : 'High'} confidence
                          </div>
                        </div>
                      </div>

                      {selectedMatches[activeSport] && (
                        <div className="md:w-auto">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className={`w-full md:w-auto bg-dark-lighter border-dark-border hover:bg-dark hover:text-${getAccentColor()}`}
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
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-dark/50 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">
                          {activeSport === 'football' ? 'Historical H2H' : 
                           activeSport === 'basketball' ? 'Key Stats' : 'QB Rating'}
                        </p>
                        <p className="text-lg font-medium">
                          {activeSport === 'football' ? '67% Home Wins' : 
                           activeSport === 'basketball' ? '+7.2 avg road margin' : '115.8 (home)'}
                        </p>
                      </div>
                      <div className="bg-dark/50 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">
                          {activeSport === 'football' ? 'Form Analysis' : 
                           activeSport === 'basketball' ? 'Injury Impact' : 'Red Zone %'}
                        </p>
                        <p className="text-lg font-medium">
                          {activeSport === 'football' ? 'Strong home form' : 
                           activeSport === 'basketball' ? '2 starters out (home)' : '76% conversion'}
                        </p>
                      </div>
                      <div className="bg-dark/50 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1">Value Bet</p>
                        <p className={`text-lg font-medium text-${activeSport === 'americanFootball' ? 'purple-300' : 
                                      activeSport === 'basketball' ? 'neon-lime' : 'neon-lime'}`}>
                          {activeSport === 'football' ? 'Home Win + BTTS' : 
                           activeSport === 'basketball' ? 'Away -4.5 points' : 'Home -6.5 points'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TryItNow;
