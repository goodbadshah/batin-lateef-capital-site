import { about } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <section id={about.id} className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <ScrollReveal>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{about.heading}</h2>
        <div className="mt-10 grid max-w-4xl gap-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-[1.85] text-muted md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
