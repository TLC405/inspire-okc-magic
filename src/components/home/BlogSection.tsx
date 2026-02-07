import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const posts = [
  {
    category: "Culture",
    title: "Why Oklahoma City is the Next Creative Capital",
    excerpt: "From grassroots movements to gallery openings, OKC is rewriting the narrative.",
    date: "Feb 28, 2026",
  },
  {
    category: "Community",
    title: "The Power of Showing Up",
    excerpt: "How consistent presence in community spaces transforms lives and cities.",
    date: "Feb 15, 2026",
  },
  {
    category: "Growth",
    title: "Lessons from Our First 100 Members",
    excerpt: "What we learned about building something real, one person at a time.",
    date: "Jan 30, 2026",
  },
];

export function BlogSection() {
  return (
    <section className="py-24 md:py-32 bg-editorial-warm">
      <div className="container">
        <SectionHeading
          label="Journal"
          title="Latest Stories"
          subtitle="Insights, reflections, and dispatches from the community."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 0.1}>
              <article className="group cursor-pointer">
                {/* Image placeholder */}
                <div className="img-zoom mb-6 aspect-[4/3] bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-border flex items-center justify-center">
                    <span className="editorial-caption text-muted-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="editorial-label text-accent mb-2">{post.category}</p>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 text-balance">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <p className="text-xs text-muted-foreground font-sans">{post.date}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
