
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Football, Basketball, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import FootballContent from './Football';
import BasketballContent from './Basketball';
import AmericanFootballContent from './AmericanFootball';

const Sports = () => {
  const [activeTab, setActiveTab] = useState("football");
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Sports Betting</h1>
            <Link 
              to="/insights" 
              className="flex items-center gap-2 text-neon-blue hover:underline"
            >
              <Trophy size={18} />
              <span>View Insights</span>
            </Link>
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
                    value="football"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-neon-blue data-[state=active]:border-b-2 data-[state=active]:border-neon-blue rounded-none px-6 h-14"
                  >
                    <Football className="mr-2" size={18} />
                    Football
                  </TabsTrigger>
                  <TabsTrigger 
                    value="basketball"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-neon-blue data-[state=active]:border-b-2 data-[state=active]:border-neon-blue rounded-none px-6 h-14"
                  >
                    <Basketball className="mr-2" size={18} />
                    Basketball
                  </TabsTrigger>
                  <TabsTrigger 
                    value="american-football"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-neon-blue data-[state=active]:border-b-2 data-[state=active]:border-neon-blue rounded-none px-6 h-14"
                  >
                    <Trophy className="mr-2" size={18} />
                    American Football
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-6">
                <TabsContent value="football" className="m-0">
                  <FootballContent />
                </TabsContent>
                <TabsContent value="basketball" className="m-0">
                  <BasketballContent />
                </TabsContent>
                <TabsContent value="american-football" className="m-0">
                  <AmericanFootballContent />
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

export default Sports;
