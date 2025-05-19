
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Settings, Users, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-gray-400 mt-1">Manage your platform settings and users</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  className="px-4 py-2 bg-neon-lime text-black rounded-md font-medium hover:bg-opacity-80 transition-colors"
                  onClick={() => {
                    toast({
                      title: "Changes saved",
                      description: "Your changes have been successfully saved",
                    });
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 max-w-md bg-dark-lighter">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-neon-lime data-[state=active]:text-black">
                  <Database className="mr-2 h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-neon-lime data-[state=active]:text-black">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-neon-lime data-[state=active]:text-black">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <AdminDashboard />
              </TabsContent>
              
              <TabsContent value="users">
                <AdminUsers />
              </TabsContent>
              
              <TabsContent value="settings">
                <AdminSettings />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
