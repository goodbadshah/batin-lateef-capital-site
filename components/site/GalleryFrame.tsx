"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaFrame } from "@/components/site/MediaFrame";

gsap.registerPlugin(ScrollTrigger);

type GalleryFrameProps = {
  src: string;
  alt: string;
  aspectClass: string;
  speed?: number;
  className?: string;
  sizes?: string;
  eager?: boolean;
};

export function GalleryFrame({
  src,
  alt,
  aspectClass,
  speed = 0.35,
  className = "",
  sizes,
  eager = false,
}: GalleryFrameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Celeres-style drift: gentle scrub with speed as a subtle multiplier.
    // Oversized inner layer (see globals.css) prevents clipping at extremes.
    const travel = 3.5 + speed * 4;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  return (
    <MediaFrame
      ref={wrapRef}
      innerRef={innerRef}
      src={src}
      alt={alt}
      aspectClass={aspectClass}
      className={className}
      sizes={sizes}
      eager={eager}
    />
  );
}
