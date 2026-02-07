import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {label && (
        <p className="editorial-caption text-accent mb-3">{label}</p>
      )}
      <h2 className="editorial-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground font-sans font-light max-w-2xl mx-auto text-balance">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
