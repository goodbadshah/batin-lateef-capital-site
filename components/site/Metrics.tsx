"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger);

function parseMetricValue(raw: string) {
  if (raw.toLowerCase().startsWith("up to")) {
    const num = Number.parseFloat(raw.replace(/[^\d.]/g, ""));
    return { kind: "upto" as const, max: num, suffix: "%" };
  }
  if (raw.includes("-") && raw.endsWith("%")) {
    const [a, b] = raw.replace("%", "").split("-").map(Number);
    return { kind: "range" as const, min: a, max: b, suffix: "%" };
  }
  if (raw.endsWith("x")) {
    return { kind: "multiplier" as const, value: Number.parseFloat(raw), suffix: "x" };
  }
  return { kind: "text" as const, text: raw };
}

function MetricCounter({ raw, active }: { raw: string; active: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const parsed = parseMetricValue(raw);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = raw;
      return;
    }

    const state = { n: 0, n2: 0 };

    if (parsed.kind === "range") {
      el.textContent = `${parsed.min}-${parsed.min}${parsed.suffix}`;
      gsap.to(state, {
        n: parsed.min,
        n2: parsed.max,
        duration: 0.85,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(state.n)}-${Math.round(state.n2)}${parsed.suffix}`;
        },
      });
      return;
    }

    if (parsed.kind === "upto") {
      el.textContent = `Up to 0${parsed.suffix}`;
      gsap.to(state, {
        n: parsed.max,
        duration: 0.9,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `Up to ${Math.round(state.n)}${parsed.suffix}`;
        },
      });
      return;
    }

    if (parsed.kind === "multiplier") {
      el.textContent = `0${parsed.suffix}`;
      gsap.to(state, {
        n: parsed.value,
        duration: 0.75,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${state.n.toFixed(1)}${parsed.suffix}`;
        },
      });
      return;
    }

    el.textContent = parsed.text;
  }, [active, parsed, raw]);

  return (
    <p
      ref={ref}
      className="mt-3 font-serif text-5xl tabular-nums text-ink md:text-6xl"
      aria-label={raw}
    >
      {active ? "" : raw}
    </p>
  );
}

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(true);
      return;
    }

    const cards = section.querySelectorAll<HTMLElement>("[data-metric-card]");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => setActive(true),
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.7,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
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
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.items.map((item) => (
          <div
            key={item.label}
            data-metric-card
            className="border-t border-line pt-6 transition-colors duration-500 data-[lit=true]:border-ruby/40"
            data-lit={active}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
            <MetricCounter raw={item.value} active={active} />
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-muted">{metrics.note}</p>
    </section>
  );
}
