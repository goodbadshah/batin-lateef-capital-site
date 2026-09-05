"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger);

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gsap.utils.toArray<HTMLElement>("[data-metric-card]", section);
    const count = cards.length;

    if (reduced) {
      cards.forEach((card) => {
        card.dataset.lit = "true";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0.35, y: 24, scale: 0.98 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${Math.max(window.innerHeight * 0.28 * (count - 1), window.innerHeight * 0.22)}`,
          pin: pin,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            onStart: () => {
              card.dataset.lit = "true";
            },
          },
          index,
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="structure" className="scroll-mt-20 border-t border-line">
      <div
        ref={pinRef}
        className="flex min-h-[50dvh] flex-col px-6 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-14 lg:pb-16 lg:pt-10"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.items.map((item) => (
            <div
              key={item.label}
              data-metric-card
              className="border-t border-line pt-6 transition-colors duration-500 data-[lit=true]:border-ruby/40"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p className="mt-3 font-serif text-5xl tabular-nums text-ink md:text-6xl">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-auto pt-16 text-xs text-muted sm:pt-20 lg:pt-24">{metrics.note}</p>
      </div>
    </section>
  );
}
