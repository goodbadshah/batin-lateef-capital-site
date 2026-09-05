"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/lib/copy";
import { heroImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const STRIPE_COUNT = 8;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const stripeOverlayRef = useRef<HTMLDivElement>(null);
  const stripeMasksRef = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageParallax = imageParallaxRef.current;
    const copy = copyRef.current;
    if (!section || !imageParallax || !copy) return;

    const masks = stripeMasksRef.current.filter((mask): mask is HTMLDivElement => mask !== null);
    const overlay = stripeOverlayRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hideOverlay = () => {
      if (overlay) overlay.style.display = "none";
    };

    if (reduced) {
      hideOverlay();
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({ onComplete: hideOverlay });

      reveal.to(masks, {
        xPercent: 105,
        duration: 1.05,
        stagger: { each: 0.065, from: "end" },
        ease: "power3.inOut",
        force3D: true,
      }, 0.1);

      gsap.fromTo(
        imageParallax,
        { yPercent: -4 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      gsap.from(copy.children, {
        opacity: 0,
        y: 56,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.45,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden">
      <div
        ref={imageWrapRef}
        className="absolute inset-x-0 top-0 h-[62vh] overflow-hidden lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[52%]"
      >
        <div ref={imageParallaxRef} className="absolute inset-x-0 top-[-8%] h-[116%] w-full">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>

        <div
          ref={stripeOverlayRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 flex"
        >
          {Array.from({ length: STRIPE_COUNT }, (_, index) => (
            <div key={index} className="relative h-full min-w-0 flex-1 overflow-hidden">
              <div
                ref={(node) => {
                  stripeMasksRef.current[index] = node;
                }}
                className="absolute inset-y-0 -left-px w-[calc(100%+2px)] bg-bone will-change-transform"
              />
            </div>
          ))}
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
