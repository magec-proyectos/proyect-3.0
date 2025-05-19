
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "@/contexts/AuthContext";
import NotificationProvider from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import Sports from "./pages/Sports";
import Football from "./pages/Football";
import Basketball from "./pages/Basketball";
import AmericanFootball from "./pages/AmericanFootball";
import Casino from "./pages/Casino";
import Blackjack from "./pages/Blackjack";
import Roulette from "./pages/Roulette";
import Social from "./pages/Social";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard";
import Legal from "./pages/Legal";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/football" element={<Football />} />
              <Route path="/basketball" element={<Basketball />} />
              <Route path="/american-football" element={<AmericanFootball />} />
              <Route path="/casino" element={<Casino />} />
              <Route path="/blackjack" element={<Blackjack />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/social" element={<Social />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
