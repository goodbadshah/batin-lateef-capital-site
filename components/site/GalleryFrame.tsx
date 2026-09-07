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

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const measure = () => {
      const wrapRect = wrap.getBoundingClientRect();
      const innerRect = inner.getBoundingClientRect();
      const wrapStyle = window.getComputedStyle(wrap);
      const innerStyle = window.getComputedStyle(inner);
      const img = inner.querySelector("img");
      const imgRect = img?.getBoundingClientRect();
      // #region agent log
      fetch("http://127.0.0.1:7847/ingest/89968823-16f8-4467-83dc-0f7dc61deec2", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "298bb8" },
        body: JSON.stringify({
          sessionId: "298bb8",
          hypothesisId: "A",
          location: "GalleryFrame.tsx:measure",
          message: "frame geometry",
          data: {
            src,
            aspectClass,
            wrap: {
              w: Math.round(wrapRect.width),
              h: Math.round(wrapRect.height),
              aspectRatio: wrapStyle.aspectRatio,
              overflow: wrapStyle.overflow,
              position: wrapStyle.position,
            },
            inner: {
              w: Math.round(innerRect.width),
              h: Math.round(innerRect.height),
              top: innerStyle.top,
              height: innerStyle.height,
              position: innerStyle.position,
              transform: innerStyle.transform,
            },
            img: img
              ? {
                  w: Math.round(imgRect?.width ?? 0),
                  h: Math.round(imgRect?.height ?? 0),
                  complete: img.complete,
                  naturalWidth: img.naturalWidth,
                  display: window.getComputedStyle(img).display,
                  position: window.getComputedStyle(img).position,
                  objectFit: window.getComputedStyle(img).objectFit,
                }
              : null,
            collapsed: wrapRect.height < 8,
            imgCollapsed: (imgRect?.height ?? 0) < 8,
            shiftedOut: Math.abs(innerRect.top - wrapRect.top) > wrapRect.height,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    };

    measure();
    const img = inner.querySelector("img");
    img?.addEventListener("load", measure);
    const id = window.setTimeout(measure, 400);
    return () => {
      img?.removeEventListener("load", measure);
      window.clearTimeout(id);
    };
  }, [src, aspectClass]);

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
