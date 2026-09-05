"use client";

import { contact, hero } from "@/lib/copy";
import { Reveal } from "./Reveal";
import { useModals } from "./ModalProvider";

export function Contact() {
  const { openProspectus } = useModals();
  return (
    <section id="contact" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="headline-balance font-serif text-3xl text-heading md:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-silver">{contact.body}</p>
          <button
            type="button"
            onClick={openProspectus}
            className="mt-8 whitespace-nowrap bg-gold px-5 py-3 text-sm font-medium text-obsidian transition hover:bg-gold/90 active:scale-[0.98]"
          >
            {hero.primaryCta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
