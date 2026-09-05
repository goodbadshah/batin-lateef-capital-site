"use client";

import { motion, useReducedMotion } from "motion/react";
import { contact, hero } from "@/lib/copy";
import { MagneticButton } from "./MagneticButton";
import { useModals } from "./ModalProvider";

export function Contact() {
  const reduce = useReducedMotion();
  const { openProspectus } = useModals();

  return (
    <section id={contact.id} className="section-anchor border-t border-line">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-4xl text-heading md:text-5xl">{contact.heading}</h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-silver md:text-lg">
            {contact.body}
          </p>
          <MagneticButton
            onClick={openProspectus}
            className="mt-10 bg-gold px-6 py-3.5 text-sm font-medium text-obsidian hover:bg-gold-dim"
          >
            {hero.primaryCta}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
