"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { thesis } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger);

export function ThesisStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".thesis-stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id={thesis.id} className="section-anchor border-t border-line">
      <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <h2 className="font-serif text-4xl text-heading md:text-5xl">{thesis.heading}</h2>
      </div>
      <div ref={ref} className="relative">
        {thesis.pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className="thesis-stack-card sticky top-0 flex min-h-[100dvh] items-center bg-obsidian"
          >
            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <h3 className="font-serif text-4xl leading-[1.1] text-heading pb-1 md:text-5xl">
                  {pillar.title}
                </h3>
                <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-silver md:text-lg">
                  {pillar.body}
                </p>
              </div>
              <div
                className={`relative aspect-[16/11] w-full lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="cinematic-frame absolute inset-0">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
