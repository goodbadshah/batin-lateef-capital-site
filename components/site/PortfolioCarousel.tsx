"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolio } from "@/lib/copy";
import { MediaFrame } from "@/components/site/MediaFrame";
import { ScrollReveal } from "./ScrollReveal";

export function PortfolioCarousel() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const contentRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    portfolio.items.forEach((_, index) => {
      const el = contentRefs.current.get(index);
      if (!el) return;

      if (expanded === index) {
        gsap.set(el, { height: "auto" });
        const height = el.offsetHeight;
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height,
            opacity: 1,
            duration: reduced ? 0 : 0.45,
            ease: "power2.out",
            onComplete: () => gsap.set(el, { height: "auto" }),
          },
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: reduced ? 0 : 0.35,
          ease: "power2.inOut",
        });
      }
    });
  }, [expanded]);

  function toggle(index: number) {
    setExpanded((current) => (current === index ? null : index));
  }

  return (
    <section id={portfolio.id} className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <ScrollReveal>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{portfolio.eyebrow}</p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{portfolio.heading}</h2>
        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{portfolio.intro}</p>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        {portfolio.items.map((entry, index) => {
          const isOpen = expanded === index;

          return (
            <article
              key={entry.id}
              className={`border transition-[border-color,background-color] duration-300 ${isOpen ? "border-ink bg-bone/80" : "border-line bg-transparent"}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
                className="w-full text-left"
              >
                <MediaFrame
                  src={entry.image}
                  alt={`${entry.name}, ${entry.category}`}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ruby">{entry.layer}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{entry.name}</h3>
                  <p className="mt-2 text-sm text-muted">{entry.category}</p>
                </div>
              </button>

              <div
                ref={(node) => {
                  if (node) contentRefs.current.set(index, node);
                  else contentRefs.current.delete(index);
                }}
                className="overflow-hidden px-5 sm:px-6"
                style={{ height: 0, opacity: 0 }}
                aria-hidden={!isOpen}
              >
                <div className="border-t border-line pb-6 pt-5">
                  <p className="text-base leading-[1.85] text-muted">{entry.description}</p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="text-muted">Invested:</dt>
                      <dd className="text-ink">{entry.invested}</dd>
                      <span className="text-muted" aria-hidden>
                        →
                      </span>
                      <dt className="text-muted">Exited:</dt>
                      <dd className="text-ink">{entry.exited || ""}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted">Exit valuation:</dt>
                      <dd className="text-ink">{entry.valuation}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
