"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { architecture } from "@/lib/copy";

export function Architecture() {
  const reduce = useReducedMotion();

  return (
    <section id={architecture.id} className="section-anchor border-t border-line">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-4xl text-heading md:text-5xl">{architecture.heading}</h2>
          <p className="mt-4 max-w-[58ch] text-sm text-silver">{architecture.note}</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
          {architecture.metrics.map((metric, i) => (
            <motion.div
              key={metric.value}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`border border-line px-6 py-12 md:px-8 ${i > 0 ? "border-t-0 md:border-t md:border-l-0" : ""}`}
            >
              <p className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-medium tabular-nums leading-none tracking-tight text-gold">
                {metric.value}
              </p>
              <p className="mt-5 max-w-[24ch] text-sm leading-relaxed text-silver">{metric.caption}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border border-line bg-obsidian-elevated p-8 md:p-12"
        >
          <h3 className="font-serif text-2xl text-heading md:text-3xl">{architecture.waterfallHeading}</h3>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {architecture.priorities.map((item) => (
              <div key={item.label}>
                <p className="text-sm font-medium text-gold">{item.label}</p>
                <p className="mt-2 text-base leading-relaxed text-heading">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
