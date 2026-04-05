import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="rule-heavy" />
      <div className="container py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-black text-sm tracking-[-0.02em] text-foreground">INSPIRE</span>
          <span className="dateline text-muted-foreground ml-2">Oklahoma City</span>
        </div>
        <nav className="flex items-center gap-5">
          <Link to="/singles" className="dateline text-muted-foreground hover:text-foreground transition-colors">Singles</Link>
          <Link to="/fitness" className="dateline text-muted-foreground hover:text-foreground transition-colors">Fitness</Link>
          <Link to="/volunteering" className="dateline text-muted-foreground hover:text-foreground transition-colors">Volunteering</Link>
        </nav>
        <p className="dateline text-muted-foreground/40">
          © {new Date().getFullYear()} · 405 · Est. 2024
        </p>
      </div>
    </footer>
  );
}
