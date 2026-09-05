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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const values = section.querySelectorAll<HTMLElement>("[data-metric-value]");

    const ctx = gsap.context(() => {
      values.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="structure"
      className="scroll-mt-20 border-t border-line px-6 py-16 sm:px-10 lg:px-14 lg:py-20"
    >
      <ScrollReveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {metrics.items.map((item) => (
            <div key={item.label} className="border-t border-line pt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p data-metric-value className="mt-3 font-serif text-5xl text-ink md:text-6xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted">{metrics.note}</p>
      </ScrollReveal>
    </section>
  );
}
