
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './hooks/useThemeToggle.tsx';
import { AuthProvider } from './contexts/AuthContext';
import GlobalChatbot from './components/chatbot/GlobalChatbot';
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Sports = lazy(() => import("./pages/Sports"));
const AmericanFootball = lazy(() => import("./pages/AmericanFootball"));
const Basketball = lazy(() => import("./pages/Basketball"));
const Casino = lazy(() => import("./pages/Casino"));
const Roulette = lazy(() => import("./pages/Roulette"));
const Blackjack = lazy(() => import("./pages/Blackjack"));
const Square = lazy(() => import("./pages/Square"));
const Social = lazy(() => import("./pages/Social"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Legal = lazy(() => import("./pages/Legal"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Index />
                </Suspense>
              } />
              <Route path="/sports" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Sports />
                </Suspense>
              } />
              <Route path="/american-football" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AmericanFootball />
                </Suspense>
              } />
              <Route path="/basketball" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Basketball />
                </Suspense>
              } />
              <Route path="/casino" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Casino />
                </Suspense>
              } />
              <Route path="/roulette" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Roulette />
                </Suspense>
              } />
              <Route path="/blackjack" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Blackjack />
                </Suspense>
              } />
              <Route path="/square" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Square />
                </Suspense>
              } />
              <Route path="/social" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Social />
                </Suspense>
              } />
              <Route path="/leaderboard" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Leaderboard />
                </Suspense>
              } />
              <Route path="/profile" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <UserProfile />
                </Suspense>
              } />
              <Route path="/legal" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Legal />
                </Suspense>
              } />
              <Route path="/admin" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin/dashboard" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
            <GlobalChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
