"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { manifesto, mission } from "@/lib/copy";

export function DualVoice() {
  const reduce = useReducedMotion();

  return (
    <>
      <section
        id={mission.id}
        className="section-anchor border-t border-line py-20 sm:py-28 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-[13px] text-gold">{mission.label}</p>
            <h2 className="mt-3 font-serif text-4xl text-heading md:text-5xl">{mission.heading}</h2>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 text-lg leading-[1.75] text-silver md:text-xl md:leading-[1.8]"
          >
            {mission.body}
          </motion.p>
        </div>
      </section>

      <section
        id={manifesto.id}
        className="section-anchor relative overflow-hidden border-t border-line py-20 sm:py-28 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] max-h-[560px] w-full lg:col-span-5"
          >
            <div className="cinematic-frame absolute inset-0">
              <Image
                src="/images/manifesto-film.png"
                alt="Hands loading 35mm film on a working cinema camera."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-[13px] text-gold">{manifesto.label}</p>
            <h2 className="mt-3 font-serif text-4xl text-heading md:text-5xl">{manifesto.heading}</h2>
            <p className="mt-8 font-serif text-2xl leading-[1.25] text-heading pb-1 md:text-3xl">
              {manifesto.pullQuote}
            </p>
            <p className="mt-8 max-w-[62ch] text-base leading-[1.85] text-silver md:text-lg">
              {manifesto.body}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
              <div>
                <dt className="font-serif text-xl text-gold">Batin</dt>
                <dd className="mt-1 text-sm text-silver">{manifesto.etymology.batin}</dd>
              </div>
              <div>
                <dt className="font-serif text-xl text-gold">Lateef</dt>
                <dd className="mt-1 text-sm text-silver">{manifesto.etymology.lateef}</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>
    </>
  );
}
