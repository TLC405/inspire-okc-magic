import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Story", href: "/story" },
      { label: "Podcast", href: "/podcast" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Adulting 101", href: "/community" },
      { label: "Singles", href: "/community" },
      { label: "Self-Mastery", href: "/community" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Apply", href: "/apply" },
      { label: "Info", href: "/info" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-tight">
              INSPIRE
            </span>
            <span className="editorial-label text-accent ml-2">OKC</span>
            <p className="mt-4 text-sm text-primary-foreground/60 font-sans leading-relaxed max-w-xs">
              Empowering Oklahoma City through community, culture, and conversation.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="editorial-caption text-primary-foreground/40 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40 font-sans">
            © {new Date().getFullYear()} INSPIRE OKC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors font-sans">
              Privacy
            </a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors font-sans">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
