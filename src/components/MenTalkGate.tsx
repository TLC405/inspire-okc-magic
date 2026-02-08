import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        <p className="label-caps text-accent mb-6 tracking-[0.3em]">
          Restricted Access
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-foreground mb-4">
          MEN-TALK<br />OKC
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          This space requires an access code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Enter code"
            className="w-full bg-transparent border-2 border-border text-foreground text-center text-2xl font-mono tracking-[0.2em] py-4 px-6 focus:outline-none focus:border-accent transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive font-medium">Invalid code</p>
          )}
          <button
            type="submit"
            className="w-full border-2 border-accent text-accent label-caps py-3 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
          >
            Enter
          </button>
        </form>

        <p className="text-xs text-muted-foreground/40 mt-8 font-mono">
          REF: OKC-73507
        </p>
      </motion.div>
    </div>
  );
}
