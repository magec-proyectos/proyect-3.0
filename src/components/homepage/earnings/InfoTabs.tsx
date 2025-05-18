
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BenefitsTab from './BenefitsTab';

const InfoTabs: React.FC = () => {
  return (
    <Tabs defaultValue="benefits" className="w-full">
      <TabsList className="grid grid-cols-1 mb-6">
        <TabsTrigger value="benefits" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Why Choose Bet 3.0</TabsTrigger>
      </TabsList>
      
      <TabsContent value="benefits" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
        <BenefitsTab />
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
