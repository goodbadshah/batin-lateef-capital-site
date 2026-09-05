"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaFrame } from "@/components/site/MediaFrame";

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

function GalleryFrame({
  src,
  alt,
  speed,
  className,
}: {
  src: string;
  alt: string;
  speed: number;
  className: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const travel = 6 + speed * 6;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -travel, scale: 1.05 },
        {
          yPercent: travel,
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

  return <MediaFrame ref={wrapRef} innerRef={innerRef} src={src} alt={alt} className={className} />;
}

export function ParallaxMedia({ strip }: { strip: Strip }) {
  if (strip.variant === "duo-left" && strip.pairSrc && strip.pairAlt) {
    return (
      <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <GalleryFrame
            src={strip.src}
            alt={strip.alt}
            speed={strip.speed}
            className="aspect-[4/5] w-full lg:aspect-[3/4]"
          />
          <GalleryFrame
            src={strip.pairSrc}
            alt={strip.pairAlt}
            speed={strip.speed * 1.2}
            className="aspect-[4/3] w-full lg:mt-24"
          />
        </div>
      </section>
    );
  }

  if (strip.variant === "inset") {
    return (
      <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <GalleryFrame
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
      <GalleryFrame src={strip.src} alt={strip.alt} speed={strip.speed} className="aspect-[16/9] w-full" />
    </section>
  );
}
