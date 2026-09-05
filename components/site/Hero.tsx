"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/lib/copy";
import { MagneticButton } from "./MagneticButton";
import { useModals } from "./ModalProvider";

export function Hero() {
  const reduce = useReducedMotion();
  const { openProspectus } = useModals();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1600px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          style={reduce ? undefined : { y: textY, opacity }}
          className="relative z-10 flex flex-col justify-end px-4 pb-14 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 max-w-[14ch] font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.08] text-heading pb-1 headline-balance"
          >
            {hero.headline}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[42ch] text-[15px] leading-relaxed text-silver md:text-base"
          >
            {hero.subhead}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              onClick={openProspectus}
              className="bg-gold px-6 py-3.5 text-sm font-medium text-obsidian hover:bg-gold-dim"
            >
              {hero.primaryCta}
            </MagneticButton>
            <MagneticButton
              href="#structure"
              className="border border-gold/80 px-6 py-3.5 text-sm font-medium text-gold hover:bg-gold/10"
            >
              {hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[42vh] lg:min-h-[100dvh]">
          <motion.div
            style={reduce ? undefined : { y: imageY }}
            className="cinematic-frame absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[-8vw]"
          >
            <Image
              src="/images/hero-dock.png"
              alt="Cinematographer beside anamorphic glass at blue hour on a working dock."
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[center_35%]"
            />
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent lg:from-obsidian lg:via-obsidian/40"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
