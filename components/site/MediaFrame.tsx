import Image from "next/image";
import { forwardRef, type Ref } from "react";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  innerRef?: Ref<HTMLDivElement>;
};

export const MediaFrame = forwardRef<HTMLDivElement, MediaFrameProps>(function MediaFrame(
  { src, alt, className = "", sizes = "(max-width: 1024px) 100vw, 75vw", innerRef },
  ref,
) {
  return (
    <div ref={ref} className={`media-frame relative w-full overflow-hidden ${className}`}>
      <div ref={innerRef} className="media-frame-inner">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
});
