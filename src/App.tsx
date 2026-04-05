import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashScreen } from "@/components/SplashScreen";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import Explore from "./pages/Explore";
import Events from "./pages/Events";
import Ask from "./pages/Ask";
import Singles from "./pages/Singles";
import Workouts from "./pages/Workouts";
import Volunteering from "./pages/Volunteering";
import Coaching from "./pages/Coaching";
import Info from "./pages/Info";
import Podcast from "./pages/Podcast";
import MyApps from "./pages/MyApps";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on initial homepage load, not on deep links
    return window.location.pathname === "/";
  });

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/events" element={<Events />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/ask" element={<Ask />} />
              <Route path="/singles" element={<Singles />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/volunteering" element={<Volunteering />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/info" element={<Info />} />
              <Route path="/men-talk" element={<Podcast />} />
              <Route path="/my-apps" element={<MyApps />} />
              {/* Redirects from old routes */}
              <Route path="/community" element={<Navigate to="/explore" replace />} />
              <Route path="/story" element={<Navigate to="/stories" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
