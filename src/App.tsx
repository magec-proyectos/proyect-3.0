
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { FollowingProvider } from "@/contexts/FollowingContext";
import { FootballProvider } from "@/contexts/FootballContext";
import NotificationProvider from "@/contexts/NotificationContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Sports from "./pages/Sports";
import AmericanFootball from "./pages/AmericanFootball";
import Basketball from "./pages/Basketball";
import Casino from "./pages/Casino";
import Roulette from "./pages/Roulette";
import Blackjack from "./pages/Blackjack";
import UserProfile from "./pages/UserProfile";
import AdvancedDashboard from "./pages/AdvancedDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Social from "./pages/Social";
import Square from "./pages/Square";
import Leaderboard from "./pages/Leaderboard";
import PublicUserProfile from "./pages/PublicUserProfile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AccessibilityProvider>
          <AdminProvider>
            <AuthProvider>
              <NotificationProvider>
                <FollowingProvider>
                  <FootballProvider>
                    <BrowserRouter>
                      <Layout>
                        <Toaster />
                        <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/sports" element={<Sports />} />
                    <Route path="/american-football" element={<AmericanFootball />} />
                    <Route path="/basketball" element={<Basketball />} />
                    <Route path="/casino" element={<Casino />} />
                    <Route path="/roulette" element={<Roulette />} />
                    <Route path="/blackjack" element={<Blackjack />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/user/:userId" element={<PublicUserProfile />} />
                    <Route path="/dashboard" element={<AdvancedDashboard />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/square" element={<Square />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Layout>
                    </BrowserRouter>
                  </FootballProvider>
                </FollowingProvider>
              </NotificationProvider>
            </AuthProvider>
          </AdminProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
