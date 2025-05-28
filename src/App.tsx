
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import NotificationProvider from '@/contexts/NotificationContext';
import { FootballProvider } from '@/contexts/FootballContext';
import { RouletteProvider } from '@/contexts/RouletteContext';
import { AdminProvider } from '@/contexts/AdminContext';
import Index from '@/pages/Index';
import Sports from '@/pages/Sports';
import AdvancedDashboard from '@/pages/AdvancedDashboard';
import EnhancedMatchSelection from '@/components/football/EnhancedMatchSelection';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <FootballProvider>
              <RouletteProvider>
                <AdminProvider>
                  <div className="min-h-screen bg-dark text-white">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/sports" element={<Sports />} />
                      <Route path="/enhanced-match-selection" element={<EnhancedMatchSelection />} />
                      <Route path="/advanced-dashboard" element={<AdvancedDashboard />} />
                    </Routes>
                  </div>
                </AdminProvider>
              </RouletteProvider>
            </FootballProvider>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
