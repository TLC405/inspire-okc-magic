import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Story", href: "/story" },
      { label: "Programs", href: "/community" },
      { label: "Info", href: "/info" },
    ],
  },
  {
    title: "Directories",
    links: [
      { label: "Social Singles OKC", href: "/community" },
      { label: "OKC Workouts", href: "/community" },
      { label: "Volunteering OKC", href: "/community" },
      { label: "Coach TLC", href: "/community" },
      { label: "Men-Talk OKC", href: "/men-talk" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-2 border-border">
      {/* Main footer */}
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="mb-4">
              <span className="text-2xl font-black tracking-[-0.02em]">INSPIRE</span>
              <span className="label-caps text-accent ml-2">OKC</span>
            </div>
            <p className="text-sm text-primary-foreground/40 max-w-xs leading-relaxed mb-4">
              Community. Connection. Health. Five directories built around the psychology of belonging in Oklahoma City.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Midtown", "Bricktown", "Paseo", "Plaza", "NW OKC"].map((area) => (
                <span key={area} className="text-[10px] font-mono text-primary-foreground/15 border border-primary-foreground/10 px-2 py-0.5">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-xs font-mono text-primary-foreground/15">
              405 · OKC · EST. 2024 · 73507
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="label-caps text-primary-foreground/25 mb-5 tracking-[0.2em]">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-primary-foreground/8">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/20">
            © {new Date().getFullYear()} INSPIRE OKC · The Big Friendly · Oklahoma City, OK
          </p>
          <p className="text-xs font-mono text-primary-foreground/12">
            REF: OKC-73507 · POP: 700K+ · METRO: 1.4M
          </p>
        </div>
      </div>
    </footer>
  );
}
