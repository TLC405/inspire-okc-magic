import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Singles from "./pages/Singles";
import Workouts from "./pages/Workouts";
import Volunteering from "./pages/Volunteering";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/singles" element={<Singles />} />
              <Route path="/fitness" element={<Workouts />} />
              <Route path="/volunteering" element={<Volunteering />} />
              <Route path="/discover" element={<Discover />} />
              {/* Redirects from old routes */}
              <Route path="/workouts" element={<Navigate to="/fitness" replace />} />
              <Route path="/explore" element={<Navigate to="/" replace />} />
              <Route path="/events" element={<Navigate to="/" replace />} />
              <Route path="/community" element={<Navigate to="/" replace />} />
              <Route path="/stories" element={<Navigate to="/" replace />} />
              <Route path="/ask" element={<Navigate to="/" replace />} />
              <Route path="/info" element={<Navigate to="/" replace />} />
              <Route path="/coaching" element={<Navigate to="/" replace />} />
              <Route path="/men-talk" element={<Navigate to="/" replace />} />
              <Route path="/my-apps" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
