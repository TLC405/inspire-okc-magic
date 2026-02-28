import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="label-caps text-primary-foreground/40 mb-4 tracking-[0.3em]">Page Not Found</p>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">404</h1>
          <p className="text-base text-primary-foreground/50 mb-2">This page doesn't exist yet.</p>
          <p className="text-xs font-mono text-primary-foreground/15 mb-10">REF: {location.pathname} · OKLAHOMA-CITY-73507</p>
          <Link to="/" className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-4 px-10 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] transition-all duration-150">
            Return Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
