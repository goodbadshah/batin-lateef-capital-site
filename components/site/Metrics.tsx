"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger);

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const mobileCounterRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const panel = panelRef.current;
    const progress = progressRef.current;
    const mobileProgress = mobileProgressRef.current;
    const mobileCounter = mobileCounterRef.current;
    if (!section || !track || !panel) return;

    const count = metrics.items.length;
    const valueLayers = gsap.utils.toArray<HTMLElement>("[data-metric-value]", panel);
    const indexLabels = gsap.utils.toArray<HTMLElement>("[data-metric-index]", panel);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setActive = (index: number, animate: boolean) => {
      if (index === activeIndexRef.current && animate) return;
      activeIndexRef.current = index;

      indexLabels.forEach((label, i) => {
        label.dataset.active = i === index ? "true" : "false";
      });

      valueLayers.forEach((layer, i) => {
        const isActive = i === index;
        if (!animate || reduced) {
          gsap.set(layer, { autoAlpha: isActive ? 1 : 0, y: isActive ? 0 : 20 });
          return;
        }

        gsap.to(layer, {
          autoAlpha: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      const progressScale = count <= 1 ? 1 : index / (count - 1);
      if (progress) {
        if (!animate || reduced) {
          gsap.set(progress, { scaleY: progressScale });
        } else {
          gsap.to(progress, { scaleY: progressScale, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        }
      }

      if (mobileProgress) {
        const width = `${((index + 1) / count) * 100}%`;
        if (!animate || reduced) {
          gsap.set(mobileProgress, { width });
        } else {
          gsap.to(mobileProgress, { width, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        }
      }

      if (mobileCounter) {
        mobileCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
      }
    };

    setActive(0, false);

    if (reduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const index =
            count <= 1 ? 0 : Math.min(count - 1, Math.round(self.progress * (count - 1)));
          setActive(index, true);
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="structure" className="scroll-mt-20 border-t border-line">
      <div className="hidden px-6 py-16 motion-reduce:block sm:px-10 lg:px-14 lg:py-20">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{metrics.eyebrow}</p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{metrics.heading}</h2>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.items.map((item) => (
            <div key={item.label} className="border-t border-line pt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p className="mt-3 font-serif text-5xl tabular-nums text-ink md:text-6xl">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted">{metrics.note}</p>
      </div>

      <div
        ref={trackRef}
        className="relative motion-reduce:hidden"
        style={{ height: `${metrics.items.length * 70}dvh` }}
      >
        <div
          ref={panelRef}
          className="sticky top-14 flex h-[calc(100dvh-3.5rem)] flex-col justify-center px-6 sm:px-10 lg:px-14"
        >
          <div className="mb-10 lg:mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{metrics.eyebrow}</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{metrics.heading}</h2>
            <p className="mt-4 text-sm text-muted">{metrics.hint}</p>
          </div>

          <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex gap-5 lg:gap-6">
              <div className="relative hidden w-px shrink-0 self-stretch bg-line sm:block">
                <div
                  ref={progressRef}
                  className="absolute inset-x-0 top-0 h-full origin-top bg-ruby"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <nav aria-label="Fund metrics" className="flex flex-col gap-4 sm:gap-5">
                {metrics.items.map((item, index) => (
                  <p
                    key={item.label}
                    data-metric-index
                    data-active={index === 0 ? "true" : "false"}
                    className="border-l-2 border-transparent pl-4 text-[11px] uppercase tracking-[0.18em] transition-[color,border-color,opacity] duration-500 data-[active=false]:text-muted/45 data-[active=true]:border-ruby data-[active=true]:text-ink"
                  >
                    {item.label}
                  </p>
                ))}
              </nav>
            </div>

            <div className="relative min-h-[clamp(8rem,28vw,12rem)]">
              {metrics.items.map((item, index) => (
                <div
                  key={item.label}
                  data-metric-value
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ visibility: index === 0 ? "visible" : "hidden", opacity: index === 0 ? 1 : 0 }}
                >
                  <p className="font-serif text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.95] tabular-nums text-ink">
                    {item.value}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 sm:hidden">
            <div className="relative h-px flex-1 bg-line">
              <div ref={mobileProgressRef} className="absolute inset-y-0 left-0 h-full bg-ruby" style={{ width: "25%" }} />
            </div>
            <span ref={mobileCounterRef} className="text-[10px] uppercase tracking-[0.18em] text-muted">
              01 / 04
            </span>
          </div>

          <p className="mt-8 text-xs text-muted lg:mt-10">{metrics.note}</p>
        </div>
      </div>
    </section>
  );
}
