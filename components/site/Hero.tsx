"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/lib/copy";
import { heroImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const image = imageRef.current;
    const copy = copyRef.current;
    if (!section || !imageWrap || !image || !copy) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 14,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.from(copy.children, {
        opacity: 0,
        y: 56,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden">
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-0 h-[62vh] lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[52%]"
      >
        <div ref={imageRef} className="relative h-full w-full">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bone/10 via-bone/20 to-bone lg:bg-gradient-to-l lg:from-bone lg:via-bone/40 lg:to-transparent" />
        </div>
      </div>

      <div
        ref={copyRef}
        className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-16 pt-[58vh] sm:px-10 lg:max-w-[48%] lg:justify-end lg:pb-24 lg:pt-28 lg:pl-14"
      >
        <h1 className="max-w-[12ch] font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] text-ink">
          {hero.lineOne} <span className="italic">{hero.lineOneItalic}</span>
        </h1>
        <h2 className="mt-6 font-serif text-[clamp(1.35rem,2.5vw,2rem)] italic text-muted">{hero.lineTwo}</h2>
      </div>
    </section>
  );
}
