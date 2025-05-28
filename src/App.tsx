
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './hooks/useThemeToggle.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import GlobalChatbot from './components/chatbot/GlobalChatbot';
import LoadingSpinner from "@/components/LoadingSpinner";
import LazySection from "@/components/LazySection";

// Lazy load pages with better error boundaries
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Enhanced loading component for better UX
const PageLoadingFallback = ({ type = 'matches' }: { type?: 'matches' | 'stats' | 'predictions' }) => (
  <LoadingSpinner 
    type="sports" 
    sportsType={type}
    message="Cargando página..."
  />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Index />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/sports" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback type="matches" />}>
                      <Sports />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/american-football" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback type="matches" />}>
                      <AmericanFootball />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/basketball" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback type="matches" />}>
                      <Basketball />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/casino" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Casino />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/roulette" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Roulette />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/blackjack" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Blackjack />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/square" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Square />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/social" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Social />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/leaderboard" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback type="stats" />}>
                      <Leaderboard />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/profile" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <UserProfile />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/legal" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <Legal />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/admin" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <AdminLogin />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="/admin/dashboard" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback type="stats" />}>
                      <AdminDashboard />
                    </Suspense>
                  </LazySection>
                } />
                <Route path="*" element={
                  <LazySection>
                    <Suspense fallback={<PageLoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  </LazySection>
                } />
              </Routes>
              <GlobalChatbot />
            </BrowserRouter>
          </TooltipProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
