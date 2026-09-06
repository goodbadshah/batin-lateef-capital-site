"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-metric-item]", section);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="structure"
      className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
    >
      <ScrollReveal>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{metrics.eyebrow}</p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{metrics.heading}</h2>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {metrics.items.map((item) => (
          <div key={item.label} data-metric-item className="border-t border-line pt-8">
            <p className="font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-none tabular-nums text-ink">
              {item.value}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      <ScrollReveal delay={0.15}>
        <p className="mt-14 text-xs text-muted lg:mt-16">{metrics.note}</p>
      </ScrollReveal>
    </section>
  );
}
