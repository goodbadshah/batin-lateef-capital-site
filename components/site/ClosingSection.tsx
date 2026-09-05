"use client";

import { closing } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";
import { useModals } from "./ModalProvider";

export function ClosingSection() {
  const { openProspectus } = useModals();

  return (
    <section id={closing.id} className="scroll-mt-20 border-t border-line">
      <div className="bg-burgundy px-6 py-20 text-beige sm:px-10 lg:px-14 lg:py-28">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-beige/60">{closing.eyebrow}</p>
          <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight text-beige">
            {closing.heading}
          </h2>
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-ruby">{closing.lead}</p>
          <div className="mt-10 grid max-w-4xl gap-8">
            {closing.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-[1.85] text-beige/85 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={openProspectus}
            className="mt-12 border border-beige/30 px-6 py-3 text-sm uppercase tracking-[0.18em] text-beige transition hover:border-beige hover:bg-beige/10"
          >
            {closing.cta}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
