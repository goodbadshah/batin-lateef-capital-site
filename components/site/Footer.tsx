"use client";

import Link from "next/link";
import { footer } from "@/lib/copy";
import { useModals } from "./ModalProvider";

export function Footer() {
  const { openPortal } = useModals();
  return (
    <footer className="bg-obsidian">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-5 text-[13px] leading-relaxed text-silver">
          {footer.disclaimers.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Legal">
            <Link href="/privacy" className="text-heading hover:text-gold">
              {footer.privacy}
            </Link>
            <Link href="/terms" className="text-heading hover:text-gold">
              {footer.terms}
            </Link>
            <button
              type="button"
              onClick={openPortal}
              className="text-left text-heading hover:text-gold"
            >
              {footer.lpLogin}
            </button>
          </nav>
          <p className="text-sm text-silver">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
