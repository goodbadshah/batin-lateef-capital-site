"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, wordmark } from "@/lib/copy";
import { z } from "@/lib/z";
import { useModals } from "./ModalProvider";

const links = [
  { href: "/#thesis", label: nav.thesis },
  { href: "/#structure", label: nav.structure },
  { href: "/#contact", label: nav.contact },
];

export function Nav() {
  const { openPortal } = useModals();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 border-b border-line bg-obsidian/92"
      style={{ zIndex: z.stickyNav }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          href="/"
          className="truncate font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-heading sm:text-xs"
        >
          {wordmark}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-silver transition hover:text-heading"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openPortal}
            className="whitespace-nowrap bg-gold px-4 py-2 text-sm font-medium text-obsidian transition hover:bg-gold/90 active:scale-[0.98]"
          >
            {nav.portal}
          </button>
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
          className="fixed inset-0 top-16 flex flex-col gap-2 bg-obsidian px-6 py-8 lg:hidden"
          style={{ zIndex: z.stickyNav }}
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 text-lg text-heading"
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
            className="mt-4 w-full whitespace-nowrap bg-gold px-4 py-3 text-sm font-medium text-obsidian"
          >
            {nav.portal}
          </button>
        </div>
      ) : null}
    </header>
  );
}
