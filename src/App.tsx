import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { FootballProvider } from '@/contexts/FootballContext';
import { RouletteProvider } from '@/contexts/RouletteContext';
import { AdminProvider } from '@/contexts/AdminContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Football from '@/pages/Football';
import Admin from '@/pages/Admin';
import Roulette from '@/pages/Roulette';
import EnhancedMatchSelection from '@/components/football/EnhancedMatchSelection';
import AdvancedDashboard from '@/pages/AdvancedDashboard';

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <FootballProvider>
              <RouletteProvider>
                <AdminProvider>
                  <div className="min-h-screen bg-dark text-white">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/football" element={<Football />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/roulette" element={<Roulette />} />
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
    </QueryClient>
  );
}

export default App;
