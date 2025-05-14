
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Football from "./pages/Football";
import Basketball from "./pages/Basketball";
import AmericanFootball from "./pages/AmericanFootball";
import Blackjack from "./pages/Blackjack";
import Roulette from "./pages/Roulette";
import Social from "./pages/Social";
import Insights from "./pages/Insights";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/football" element={<Football />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/american-football" element={<AmericanFootball />} />
            <Route path="/blackjack" element={<Blackjack />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/social" element={<Social />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
