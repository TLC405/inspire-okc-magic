import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useVisitorLog } from "@/hooks/useVisitorLog";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SvgFilters } from "@/components/SvgFilters";
import { SiteConfigContext, useSiteConfigLoader } from "@/hooks/useSiteConfig";
import Index from "./pages/Index";
import Singles from "./pages/Singles";
import Events from "./pages/Events";
import DateNights from "./pages/DateNights";
import Admin from "./pages/Admin";
import Workouts from "./pages/Workouts";
import Volunteering from "./pages/Volunteering";
import Discover from "./pages/Discover";
import MomentoMori from "./pages/MomentoMori";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppInner = () => {
  useVisitorLog();
  return (
    <>
      <SvgFilters />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/singles" element={<Singles />} />
        <Route path="/events" element={<Events />} />
        <Route path="/date-nights" element={<DateNights />} />
        <Route path="/fitness" element={<Workouts />} />
        <Route path="/volunteering" element={<Volunteering />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/momento-mori" element={<MomentoMori />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/workouts" element={<Navigate to="/fitness" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileTabBar />
    </>
  );
};

const SiteConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  const config = useSiteConfigLoader();
  return <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>;
};

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SiteConfigWrapper>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppInner />
            </BrowserRouter>
          </TooltipProvider>
        </SiteConfigWrapper>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
