"use client";

import { GalleryFrame } from "@/components/site/GalleryFrame";
import { mediaStrips } from "@/lib/images";

type Strip = (typeof mediaStrips)[number];

export function ParallaxMedia({ strip }: { strip: Strip }) {
  if (strip.variant === "duo-left" && strip.pairSrc && strip.pairAlt) {
    return (
      <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid min-w-0 gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-6">
          <GalleryFrame
            src={strip.src}
            alt={strip.alt}
            speed={strip.speed}
            sizes="(max-width: 1024px) 100vw, 55vw"
            aspectClass="media-aspect-heritage-left"
            eager
          />
          <GalleryFrame
            src={strip.pairSrc}
            alt={strip.pairAlt}
            speed={strip.speed * 1.35}
            sizes="(max-width: 1024px) 100vw, 45vw"
            aspectClass="media-aspect-4-3"
            className="lg:mt-24"
            eager
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
          sizes="(max-width: 1024px) 100vw, 75vw"
          aspectClass="media-aspect-3-2"
          className="ml-auto max-w-4xl"
          eager
        />
      </section>
    );
  }

  return (
    <section aria-label="Gallery" className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
      <GalleryFrame
        src={strip.src}
        alt={strip.alt}
        speed={strip.speed}
        sizes="(max-width: 1024px) 100vw, 75vw"
        aspectClass="media-aspect-3-2"
        eager
      />
    </section>
  );
}
