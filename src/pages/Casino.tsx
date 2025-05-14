
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dice, MenuIcon } from 'lucide-react';
import BlackjackContent from './Blackjack';
import RouletteContent from './Roulette';

const Casino = () => {
  const [activeTab, setActiveTab] = useState("blackjack");
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Casino Games</h1>
          </div>
          
          <Card className="bg-dark-card border-dark-border">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-dark-border">
                <TabsList className="bg-transparent h-14 p-0 w-full flex justify-start gap-2">
                  <TabsTrigger 
                    value="blackjack"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-neon-lime data-[state=active]:border-b-2 data-[state=active]:border-neon-lime rounded-none px-6 h-14"
                  >
                    <MenuIcon className="mr-2" size={18} />
                    Blackjack
                  </TabsTrigger>
                  <TabsTrigger 
                    value="roulette"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-neon-lime data-[state=active]:border-b-2 data-[state=active]:border-neon-lime rounded-none px-6 h-14"
                  >
                    <Dice className="mr-2" size={18} />
                    Roulette
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-6">
                <TabsContent value="blackjack" className="m-0">
                  <BlackjackContent />
                </TabsContent>
                <TabsContent value="roulette" className="m-0">
                  <RouletteContent />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Casino;
