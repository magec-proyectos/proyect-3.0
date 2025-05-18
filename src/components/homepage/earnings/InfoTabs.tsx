
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BenefitsTab from './BenefitsTab';
import TutorialTab from './TutorialTab';

const InfoTabs: React.FC = () => {
  return (
    <Tabs defaultValue="benefits" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="benefits" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Benefits</TabsTrigger>
        <TabsTrigger value="tutorial" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Tutorial</TabsTrigger>
      </TabsList>
      
      <TabsContent value="benefits" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
        <BenefitsTab />
      </TabsContent>
      
      <TabsContent value="tutorial" className="focus-visible:outline-none focus-visible:ring-0">
        <TutorialTab />
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
