"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { footer, headerWordmark, menu } from "@/lib/copy";
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

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 flex h-14 items-center justify-between border-b border-white/10 bg-burgundy px-4 text-bone sm:px-6 lg:px-10"
        style={{ zIndex: z.modal + 1 }}
      >
        <Link href="/" className="font-serif text-xs tracking-[0.22em] sm:text-sm">
          {headerWordmark}
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-drawer"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-10 text-bone"
        >
          {menuOpen ? <X size={24} /> : <List size={22} />}
        </button>
      </header>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        className={`fixed inset-0 top-14 bg-ink/25 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ zIndex: z.modal - 1 }}
        onClick={closeMenu}
      />

      <aside
        id="site-drawer"
        aria-hidden={!menuOpen}
        className={`fixed top-14 right-0 flex h-[calc(100dvh-3.5rem)] w-[min(20rem,88vw)] flex-col border-l border-white/10 bg-burgundy text-bone shadow-[-12px_0_40px_rgb(28_20_24_/_0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
        style={{ zIndex: z.modal }}
      >
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              className="border-b border-white/10 py-4 font-serif text-xl sm:text-2xl"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            className="mt-4 border-b border-white/10 py-4 text-left font-serif text-xl sm:text-2xl"
            onClick={() => {
              closeMenu();
              openProspectus();
            }}
          >
            {menu.prospectus}
          </button>
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            className="border-b border-white/10 py-4 text-left font-serif text-xl sm:text-2xl"
            onClick={() => {
              closeMenu();
              openPortal();
            }}
          >
            {menu.portal}
          </button>
        </nav>
        <div className="shrink-0 space-y-3 border-t border-white/10 px-6 py-5 text-xs leading-relaxed text-bone/60">
          {footer.disclaimers.slice(0, 2).map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
          ))}
        </div>
      </aside>
    </>
  );
}
