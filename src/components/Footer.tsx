import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "Events", href: "/events" },
      { label: "Stories", href: "/stories" },
      { label: "Ask Inspire", href: "/ask" },
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
    <footer className="bg-background border-t border-border">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-black tracking-[-0.02em] text-foreground">INSPIRE</span>
              <span className="label-caps text-accent ml-2">Oklahoma City</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
              The living interface for what is happening, where it is happening, who is part of it, and what to do next.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Midtown", "Bricktown", "Paseo", "Plaza", "Deep Deuce"].map((area) => (
                <span key={area} className="mono-data text-muted-foreground/30 border border-border px-2 py-1 hover:text-accent hover:border-accent/30 transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>
            <p className="mono-data text-muted-foreground/20">
              405 · Oklahoma City · EST. 2024
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="label-caps text-muted-foreground/40 mb-4 tracking-[0.2em]">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="mono-data text-muted-foreground/20">
            © {new Date().getFullYear()} INSPIRE Oklahoma City
          </p>
          <p className="mono-data text-muted-foreground/15">
            POP: 700K+ · METRO: 1.4M · 73507
          </p>
        </div>
      </div>
    </footer>
  );
}
