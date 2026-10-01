"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Mobile browser chrome (including Telegram's URL field) resizes the viewport
    // without changing width. Refreshing ScrollTrigger on that resize jumps the page.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      syncTouch: false,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    let width = window.innerWidth;
    const refreshOnWidthChange = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      refresh();
    };
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refreshOnWidthChange);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refreshOnWidthChange);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}
