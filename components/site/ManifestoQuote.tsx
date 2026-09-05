import { manifesto } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

export function ManifestoQuote() {
  return (
    <section className="border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <ScrollReveal>
        <blockquote className="max-w-4xl border-l-2 border-ruby pl-8">
          <p className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.55] text-ink">
            {manifesto.quote}
          </p>
          <p className="mt-6 font-serif text-lg italic text-muted">{manifesto.closing}</p>
        </blockquote>
      </ScrollReveal>
    </section>
  );
}
