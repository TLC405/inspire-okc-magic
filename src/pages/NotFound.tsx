import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

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
          <p className="editorial-caption text-primary-foreground/40 mb-4 tracking-[0.3em]">
            Page Not Found
          </p>
          <h1 className="editorial-heading text-8xl md:text-9xl mb-4">404</h1>
          <p className="text-lg text-primary-foreground/60 font-sans font-light mb-8">
            This page doesn't exist yet.
          </p>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans text-sm tracking-wide px-8 h-12 rounded-none"
          >
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
