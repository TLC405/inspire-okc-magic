import { Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

const GITHUB_URL = "https://github.com/TLC405/momentomori/";
// Update this once the app is deployed:
const DEPLOY_URL = "";

export default function MomentoMori() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Minimal top bar */}
      <div className="bg-background border-b border-foreground/10 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Inspire
          </Link>
          <h1
            className="font-black text-foreground tracking-tight text-sm md:text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Momento Mori
          </h1>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={12} />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </div>

      {/* Content */}
      {DEPLOY_URL ? (
        <iframe
          src={DEPLOY_URL}
          className="flex-1 w-full border-0"
          title="Momento Mori App"
          allow="clipboard-write"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-6 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <span className="text-3xl">💀</span>
            </div>
            <div>
              <h2
                className="text-2xl font-black text-foreground tracking-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Momento Mori
              </h2>
              <p className="text-muted-foreground text-sm font-mono tracking-wide">
                A TLC showcase project — remember you must die, so live fully.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-mono text-xs tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
              >
                <Github size={14} />
                View on GitHub
              </a>
              <span className="font-mono text-[9px] text-muted-foreground/50 tracking-wider uppercase">
                Deploy coming soon
              </span>
            </div>
            <p className="font-mono text-[8px] text-muted-foreground/40 tracking-wider uppercase">
              Once deployed, the full app will be embedded here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
