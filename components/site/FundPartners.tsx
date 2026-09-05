"use client";

import { useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { fundPartners } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

export function FundPartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function move(direction: -1 | 1) {
    const next = Math.min(Math.max(index + direction, 0), fundPartners.items.length - 1);
    setIndex(next);
    const card = trackRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section id={fundPartners.id} className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <ScrollReveal>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] lowercase text-ink">{fundPartners.heading}</h2>
        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{fundPartners.intro}</p>
      </ScrollReveal>

      <div className="mt-10 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Previous partner"
          onClick={() => move(-1)}
          disabled={index === 0}
          className="text-ruby disabled:opacity-30"
        >
          <CaretLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next partner"
          onClick={() => move(1)}
          disabled={index === fundPartners.items.length - 1}
          className="text-ruby disabled:opacity-30"
        >
          <CaretRight size={20} />
        </button>
      </div>

      <div ref={trackRef} className="carousel-track mt-8 flex gap-6 overflow-x-auto pb-4">
        {fundPartners.items.map((partner) => (
          <article
            key={partner.name}
            className="carousel-slide min-w-[min(100%,18rem)] shrink-0 border border-line bg-white/30 p-8 sm:min-w-[16rem]"
          >
            <h3 className="font-serif text-3xl text-ink">{partner.name}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted">{partner.region}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted">{partner.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
