import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const ACCESS_CODE = "73507";
const STORAGE_KEY = "mentalk-access";

export function MenTalkGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "granted") {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, "granted");
      setAuthenticated(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <motion.div
        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md px-6"
      >
        <div className="w-12 h-12 border-2 border-border flex items-center justify-center mx-auto mb-8">
          <Lock size={18} className="text-accent" />
        </div>

        <p className="label-caps text-accent mb-6 tracking-[0.3em]">
          Directory (05)
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-foreground leading-[0.85] mb-3">
          MEN-TALK
        </h1>
        <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-accent leading-[0.85] mb-6">
          OKC
        </h2>
        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          This space requires an access code.<br />
          Ask someone in the community — or you already know.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="• • • • •"
            maxLength={5}
            className="w-full bg-transparent border-2 border-border text-foreground text-center text-3xl font-mono tracking-[0.3em] py-5 px-6 focus:outline-none focus:border-accent transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive font-medium">Invalid code — try again</p>
          )}
          <button
            type="submit"
            className="w-full border-2 border-accent text-accent label-caps py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
          >
            Enter
          </button>
        </form>

        <p className="text-xs text-muted-foreground/30 mt-10 font-mono">
          REF: OKC-73507 · RESTRICTED
        </p>
      </motion.div>
    </div>
  );
}
