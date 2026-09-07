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
          onLoad={(event) => {
            // #region agent log
            const img = event.currentTarget;
            fetch("http://127.0.0.1:7847/ingest/89968823-16f8-4467-83dc-0f7dc61deec2", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "298bb8" },
              body: JSON.stringify({
                sessionId: "298bb8",
                hypothesisId: "C",
                location: "MediaFrame.tsx:onLoad",
                message: "image loaded",
                data: {
                  src,
                  complete: img.complete,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  clientWidth: img.clientWidth,
                  clientHeight: img.clientHeight,
                  currentSrc: img.currentSrc,
                },
                timestamp: Date.now(),
              }),
            }).catch(() => {});
            // #endregion
          }}
          onError={() => {
            // #region agent log
            fetch("http://127.0.0.1:7847/ingest/89968823-16f8-4467-83dc-0f7dc61deec2", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "298bb8" },
              body: JSON.stringify({
                sessionId: "298bb8",
                hypothesisId: "C",
                location: "MediaFrame.tsx:onError",
                message: "image error",
                data: { src },
                timestamp: Date.now(),
              }),
            }).catch(() => {});
            // #endregion
          }}
        />
        </div>
      </div>
    </div>
  );
});
