import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Story", href: "/story" },
      { label: "Programs", href: "/community" },
      { label: "Info", href: "/info" },
    ],
  },
  {
    title: "Directories",
    links: [
      { label: "Volunteering OKC", href: "/community" },
      { label: "Singles OKC", href: "/community" },
      { label: "Workout OKC", href: "/community" },
      { label: "Coach TLC", href: "/community" },
      { label: "Men-Talk OKC", href: "/community" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-2 border-border">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <span className="text-2xl font-black tracking-[-0.02em]">INSPIRE</span>
            <span className="label-caps text-accent ml-2">OKC</span>
            <p className="mt-4 text-sm text-primary-foreground/40 max-w-xs leading-relaxed">
              Community. Connection. Health. Built around the psychology of belonging in Oklahoma City.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="label-caps text-primary-foreground/30 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t-2 border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/25">
            © {new Date().getFullYear()} INSPIRE OKC
          </p>
        </div>
      </div>
    </footer>
  );
}
