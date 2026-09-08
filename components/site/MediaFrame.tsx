"use client";

import Image from "next/image";
import { forwardRef, type Ref } from "react";

type MediaFrameProps = {
  src: string;
  alt: string;
  /** CSS class from globals.css that sets aspect-ratio */
  aspectClass: string;
  className?: string;
  sizes?: string;
  innerRef?: Ref<HTMLDivElement>;
  /** Disable lazy loading for above-the-fold gallery strips */
  eager?: boolean;
};

export const MediaFrame = forwardRef<HTMLDivElement, MediaFrameProps>(function MediaFrame(
  {
    src,
    alt,
    aspectClass,
    className = "",
    sizes = "(max-width: 1024px) 100vw, 75vw",
    innerRef,
    eager = false,
  },
  ref,
) {
  return (
    <div ref={ref} className={`media-frame ${aspectClass} relative w-full min-w-0 overflow-hidden ${className}`}>
      <div ref={innerRef} className="media-frame-parallax">
        <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
        />
        </div>
      </div>
    </div>
  );
});
