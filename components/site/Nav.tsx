"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, wordmark } from "@/lib/copy";
import { z } from "@/lib/z";
import { MagneticButton } from "./MagneticButton";
import { useModals } from "./ModalProvider";

const links = [
  { href: "/#mission", label: nav.mission },
  { href: "/#manifesto", label: nav.manifesto },
  { href: "/#structure", label: nav.structure },
  { href: "/#contact", label: nav.contact },
];

export function Nav() {
  const { openPortal } = useModals();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 transition-[background,backdrop-filter] duration-500 ${scrolled ? "liquid-glass-nav" : "bg-transparent"}`}
      style={{ zIndex: z.stickyNav, height: "var(--nav-h)" }}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-heading sm:text-xs"
        >
          {wordmark}
        </Link>
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-wide text-silver transition hover:text-heading"
            >
              {item.label}
            </a>
          ))}
          <MagneticButton
            onClick={openPortal}
            className="bg-gold px-4 py-2 text-[13px] font-medium text-obsidian hover:bg-gold-dim"
          >
            {nav.portal}
          </MagneticButton>
        </nav>
        <button
          type="button"
          className="text-heading lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[var(--nav-h)] flex flex-col gap-1 bg-obsidian px-6 py-8 lg:hidden"
          style={{ zIndex: z.stickyNav }}
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-line py-5 font-serif text-2xl text-heading"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openPortal();
            }}
            className="mt-6 w-full bg-gold px-4 py-3 text-sm font-medium text-obsidian"
          >
            {nav.portal}
          </button>
        </div>
      ) : null}
    </header>
  );
}
