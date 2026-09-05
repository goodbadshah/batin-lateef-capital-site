"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Strip = {
  id: string;
  src: string;
  alt: string;
  variant: "full" | "inset" | "duo-left";
  speed: number;
  pairSrc?: string;
  pairAlt?: string;
};

function MediaFrame({
  src,
  alt,
  speed,
  className = "",
}: {
  src: string;
  alt: string;
  speed: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -8 * speed * 10, scale: 1.08 },
        {
          yPercent: 8 * speed * 10,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={wrapRef} className={`media-frame ${className}`}>
      <div ref={imgRef} className="media-frame-inner">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 75vw" />
      </div>
    </div>
  );
}

export function ParallaxMedia({ strip }: { strip: Strip }) {
  if (strip.variant === "duo-left" && strip.pairSrc && strip.pairAlt) {
    return (
      <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <MediaFrame src={strip.src} alt={strip.alt} speed={strip.speed} className="aspect-[4/5] lg:aspect-[3/4]" />
          <MediaFrame
            src={strip.pairSrc}
            alt={strip.pairAlt}
            speed={strip.speed * 1.2}
            className="aspect-[4/3] lg:mt-24"
          />
        </div>
      </section>
    );
  }

  if (strip.variant === "inset") {
    return (
      <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <MediaFrame
          src={strip.src}
          alt={strip.alt}
          speed={strip.speed}
          className="ml-auto aspect-[16/10] w-full max-w-4xl"
        />
      </section>
    );
  }

  return (
    <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
      <MediaFrame src={strip.src} alt={strip.alt} speed={strip.speed} className="aspect-[16/9] w-full" />
    </section>
  );
}
