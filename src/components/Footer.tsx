import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Story", href: "/story" },
      { label: "Community", href: "/community" },
      { label: "Apply", href: "/apply" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Volunteering OKC", href: "/community" },
      { label: "Singles OKC", href: "/community" },
      { label: "Workout OKC", href: "/community" },
      { label: "Coach TLC", href: "/community" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Info", href: "/info" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <span className="text-2xl font-bold tracking-tight">INSPIRE</span>
            <span className="label-caps text-accent ml-2">OKC</span>
            <p className="mt-4 text-sm text-primary-foreground/50 max-w-xs">
              Community. Culture. Growth. Oklahoma City.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="label-caps text-primary-foreground/40 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} INSPIRE OKC
          </p>
        </div>
      </div>
    </footer>
  );
}
