"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/lib/copy";
import { useModals } from "./ModalProvider";

export function Hero() {
  const reduce = useReducedMotion();
  const { openProspectus } = useModals();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-line">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-20 lg:pb-16">
        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="headline-balance font-serif text-4xl leading-[1.12] text-heading pb-1 md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-silver md:text-[17px]">
            {hero.subhead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openProspectus}
              className="whitespace-nowrap bg-gold px-5 py-3 text-sm font-medium text-obsidian transition hover:bg-gold/90 active:scale-[0.98]"
            >
              {hero.primaryCta}
            </button>
            <a
              href="#structure"
              className="inline-flex items-center justify-center whitespace-nowrap border border-gold px-5 py-3 text-sm font-medium text-gold transition hover:bg-gold/10 active:scale-[0.98]"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </motion.div>
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-line lg:col-span-5 lg:aspect-auto lg:min-h-[52vh]">
          <Image
            src="/images/hero-soundstage.png"
            alt="Empty nocturnal soundstage with sparse champagne practical lighting."
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
