"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, CaretLeft, CaretRight, List, X } from "@phosphor-icons/react";
import {
  established,
  footer,
  fundPartners,
  menu,
  offices,
  portfolio,
  sidebarQuote,
  wordmark,
} from "@/lib/copy";
import { z } from "@/lib/z";
import { useModals } from "./ModalProvider";

const menuLinks = [
  { href: "#slates", label: menu.slates },
  { href: "#structure", label: menu.structure },
  { href: "#partners", label: menu.partners },
];

export function Sidebar() {
  const { openPortal, openProspectus } = useModals();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [sidebarQuote];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <aside
        className="fixed inset-y-0 left-0 flex w-[var(--sidebar-w)] flex-col bg-burgundy text-beige max-lg:hidden"
        style={{ zIndex: z.stickyNav }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link href="/" className="font-serif text-sm tracking-[0.22em] text-beige">
            {wordmark}
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="text-beige"
          >
            <List size={22} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-10">
          <div>
            <p className="font-serif text-lg leading-snug text-ruby">{quotes[quoteIndex].text}</p>
            <p className="mt-4 text-xs leading-relaxed text-beige/70">{quotes[quoteIndex].attribution}</p>
            <div className="mt-6 flex items-center gap-3 text-ruby">
              <button type="button" aria-label="Previous quote" onClick={() => setQuoteIndex(0)}>
                <CaretLeft size={16} />
              </button>
              <button type="button" aria-label="Next quote" onClick={() => setQuoteIndex(0)}>
                <CaretRight size={16} />
              </button>
            </div>
          </div>

          <div className="border-y border-white/10 py-8 text-center">
            <p className="font-serif text-3xl tracking-[0.18em] text-beige">{wordmark}</p>
            <p className="mt-3 text-[11px] tracking-[0.28em] text-beige/60">EST {established}</p>
          </div>

          <div className="space-y-6">
            {offices.map((office) => (
              <div key={office.city}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-beige/80">{office.city}</p>
                <p className="mt-1 text-xs leading-relaxed text-beige/60">{office.address}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="border-t border-white/10 px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-beige/70 hover:text-beige"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowUp size={14} />
            Top
          </span>
        </button>
      </aside>

      <header
        className="fixed inset-x-0 top-0 flex h-14 items-center justify-between bg-burgundy px-4 text-beige lg:hidden"
        style={{ zIndex: z.stickyNav }}
      >
        <Link href="/" className="font-serif text-xs tracking-[0.22em]">
          {wordmark}
        </Link>
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <List size={22} />
        </button>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 bg-burgundy text-beige"
          style={{ zIndex: z.modal }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <span className="font-serif tracking-[0.22em]">{wordmark}</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-8">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-white/10 py-4 font-serif text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-6 border-b border-white/10 py-4 text-left font-serif text-2xl"
              onClick={() => {
                setMenuOpen(false);
                openProspectus();
              }}
            >
              {menu.prospectus}
            </button>
            <button
              type="button"
              className="border-b border-white/10 py-4 text-left font-serif text-2xl"
              onClick={() => {
                setMenuOpen(false);
                openPortal();
              }}
            >
              {menu.portal}
            </button>
          </nav>
          <div className="absolute inset-x-6 bottom-8 space-y-4 text-xs text-beige/60">
            {footer.disclaimers.map((line) => (
              <p key={line.slice(0, 24)}>{line}</p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
