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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="label-caps text-muted-foreground mb-4 tracking-[0.3em]">Page Not Found</p>
          <h1 className="display-hero mb-4">404</h1>
          <p className="text-base text-muted-foreground mb-2">This page doesn't exist yet.</p>
          <p className="mono-data text-muted-foreground/30 mb-10">{location.pathname} · Oklahoma City</p>
          <Link to="/" className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150">
            Return Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
