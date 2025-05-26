
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import pages
import Index from '@/pages/Index';
import Sports from '@/pages/Sports';
import Football from '@/pages/Football';
import Basketball from '@/pages/Basketball';
import AmericanFootball from '@/pages/AmericanFootball';
import Casino from '@/pages/Casino';
import Roulette from '@/pages/Roulette';
import Blackjack from '@/pages/Blackjack';
import Social from '@/pages/Social';
import Leaderboard from '@/pages/Leaderboard';
import UserProfile from '@/pages/UserProfile';
import Legal from '@/pages/Legal';
import Square from '@/pages/Square';
import NotFound from '@/pages/NotFound';

// Import contexts
import AuthProvider from '@/contexts/AuthContext';
import NotificationProvider from '@/contexts/NotificationContext';
import { FootballProvider } from '@/contexts/FootballContext';

// Create a query client instance
const queryClient = new QueryClient();

function App() {
  const [error, setError] = useState<string | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-dark text-white">
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sports" element={<Sports />} />
                <Route 
                  path="/football" 
                  element={
                    <FootballProvider>
                      <Football />
                    </FootballProvider>
                  } 
                />
                <Route path="/basketball" element={<Basketball />} />
                <Route path="/american-football" element={<AmericanFootball />} />
                <Route path="/casino" element={<Casino />} />
                <Route path="/roulette" element={<Roulette />} />
                <Route path="/blackjack" element={<Blackjack />} />
                <Route path="/social" element={<Social />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/square" element={<Square />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
