"use client";

import Link from "next/link";
import { footer, menu, prospectus } from "@/lib/copy";
import { useModals } from "./ModalProvider";

export function Footer() {
  const { openPortal, openProspectus } = useModals();

  return (
    <footer className="border-t border-line px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <button type="button" onClick={openProspectus} className="text-ink hover:text-ruby">
            {prospectus.title}
          </button>
          <button type="button" onClick={openPortal} className="text-ink hover:text-ruby">
            {menu.portal}
          </button>
          <Link href="/privacy" className="text-ink hover:text-ruby">
            {footer.privacy}
          </Link>
          <Link href="/terms" className="text-ink hover:text-ruby">
            {footer.terms}
          </Link>
        </div>
        <p className="text-sm text-muted">{footer.copyright}</p>
      </div>
      <div className="mt-10 space-y-4 text-xs leading-relaxed text-muted max-lg:block lg:hidden">
        {footer.disclaimers.map((line) => (
          <p key={line.slice(0, 28)}>{line}</p>
        ))}
      </div>
    </footer>
  );
}
