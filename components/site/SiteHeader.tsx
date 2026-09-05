"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { footer, menu, wordmark } from "@/lib/copy";
import { z } from "@/lib/z";
import { useModals } from "./ModalProvider";

const menuLinks = [
  { href: "#architecture", label: menu.approach },
  { href: "#structure", label: menu.structure },
];

export function SiteHeader() {
  const { openPortal, openProspectus } = useModals();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 flex h-14 items-center justify-between border-b border-white/10 bg-burgundy px-4 text-beige sm:px-6 lg:px-10"
        style={{ zIndex: z.stickyNav }}
      >
        <Link href="/" className="font-serif text-xs tracking-[0.22em] sm:text-sm">
          {wordmark}
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="text-beige"
        >
          {menuOpen ? <X size={24} /> : <List size={22} />}
        </button>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 bg-burgundy text-beige pt-14"
          style={{ zIndex: z.modal }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav className="flex flex-col gap-1 px-6 py-8 sm:px-10 lg:px-14">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-white/10 py-4 font-serif text-2xl sm:text-3xl"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-6 border-b border-white/10 py-4 text-left font-serif text-2xl sm:text-3xl"
              onClick={() => {
                setMenuOpen(false);
                openProspectus();
              }}
            >
              {menu.prospectus}
            </button>
            <button
              type="button"
              className="border-b border-white/10 py-4 text-left font-serif text-2xl sm:text-3xl"
              onClick={() => {
                setMenuOpen(false);
                openPortal();
              }}
            >
              {menu.portal}
            </button>
          </nav>
          <div className="absolute inset-x-6 bottom-8 space-y-4 text-xs text-beige/60 sm:inset-x-10 lg:inset-x-14">
            {footer.disclaimers.map((line) => (
              <p key={line.slice(0, 24)}>{line}</p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
