import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useVisitorLog } from "@/hooks/useVisitorLog";
import Index from "./pages/Index";
import Singles from "./pages/Singles";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Workouts from "./pages/Workouts";
import Volunteering from "./pages/Volunteering";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppInner = () => {
  useVisitorLog();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/singles" element={<Singles />} />
      <Route path="/events" element={<Events />} />
      <Route path="/fitness" element={<Workouts />} />
      <Route path="/volunteering" element={<Volunteering />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/workouts" element={<Navigate to="/fitness" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

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
              <Route path="/events" element={<Events />} />
              <Route path="/fitness" element={<Workouts />} />
              <Route path="/volunteering" element={<Volunteering />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/workouts" element={<Navigate to="/fitness" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
