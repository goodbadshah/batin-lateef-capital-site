"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { portfolio } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

export function PortfolioCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const item = portfolio.items[active];

  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.fromTo(detail, { opacity: 0.4, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }, [active]);

  function scrollByCard(direction: -1 | 1) {
    const next = Math.min(Math.max(active + direction, 0), portfolio.items.length - 1);
    setActive(next);
    const track = trackRef.current;
    const card = track?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section id={portfolio.id} className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <ScrollReveal>
        <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] italic text-muted">{portfolio.headingTop}</p>
        <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] lowercase text-ink">{portfolio.heading}</h2>
        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{portfolio.intro}</p>
      </ScrollReveal>

      <div className="mt-14 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous slate"
          onClick={() => scrollByCard(-1)}
          className="text-ruby disabled:opacity-30"
          disabled={active === 0}
        >
          <CaretLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next slate"
          onClick={() => scrollByCard(1)}
          className="text-ruby disabled:opacity-30"
          disabled={active === portfolio.items.length - 1}
        >
          <CaretRight size={20} />
        </button>
      </div>

      <div ref={trackRef} className="carousel-track mt-8 flex gap-6 overflow-x-auto pb-4">
        {portfolio.items.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setActive(index)}
            className={`carousel-slide min-w-[min(100%,20rem)] shrink-0 border text-left transition-colors sm:min-w-[18rem] ${active === index ? "border-ink bg-white/40" : "border-line bg-transparent"}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={entry.image}
                alt={`${entry.name}, ${entry.category}`}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-2xl text-ink">{entry.name}</h3>
              <p className="mt-2 text-sm text-muted">{entry.category}</p>
            </div>
          </button>
        ))}
      </div>

      <article ref={detailRef} className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h3 className="font-serif text-4xl text-ink">{item.name}</h3>
          <p className="mt-2 text-sm text-muted">{item.category}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Invested:</dt>
              <dd className="text-ink">{item.invested}</dd>
              <span className="text-muted" aria-hidden>
                →
              </span>
              <dt className="text-muted">Exited:</dt>
              <dd className="text-ink">{item.exited || ""}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Exit valuation:</dt>
              <dd className="text-ink">{item.valuation}</dd>
            </div>
          </dl>
        </div>
        <p className="text-base leading-[1.85] text-muted md:text-lg">{item.description}</p>
      </article>
    </section>
  );
}
