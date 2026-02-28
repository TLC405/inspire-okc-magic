import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Story", href: "/story" },
      { label: "Programs", href: "/community" },
      { label: "My Apps", href: "/my-apps" },
      { label: "Info", href: "/info" },
    ],
  },
  {
    title: "Directories",
    links: [
      { label: "Social Singles", href: "/singles" },
      { label: "Fitness", href: "/workouts" },
      { label: "Volunteering", href: "/volunteering" },
      { label: "Coach TLC", href: "/coaching" },
      { label: "Men-Talk", href: "/men-talk" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-2 border-border">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-black tracking-[-0.02em]">INSPIRE</span>
              <span className="label-caps text-accent ml-2">Oklahoma City</span>
            </div>
            <p className="text-sm text-primary-foreground/40 max-w-xs leading-relaxed mb-6">
              Community. Connection. Health. Five directories built around the psychology of belonging in Oklahoma City.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Midtown", "Bricktown", "Paseo", "Plaza", "NW Oklahoma City"].map((area) => (
                <span key={area} className="text-[10px] font-mono text-primary-foreground/20 border border-primary-foreground/10 px-2 py-1 hover:text-accent hover:border-accent/30 transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-xs font-mono text-primary-foreground/15">
              405 · Oklahoma City · EST. 2024 · 73507
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="label-caps text-primary-foreground/25 mb-6 tracking-[0.2em]">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-150 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-primary-foreground/8">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/20">
            © {new Date().getFullYear()} INSPIRE Oklahoma City · The Big Friendly · Oklahoma City, OK
          </p>
          <p className="text-xs font-mono text-primary-foreground/12">
            REF: OKC-73507 · POP: 700K+ · METRO: 1.4M
          </p>
        </div>
      </div>
    </footer>
  );
}
