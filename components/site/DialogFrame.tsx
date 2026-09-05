"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { z } from "@/lib/z";

export function DialogFrame({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const labelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea",
    );
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea",
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (!nodes.length) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-end justify-center p-4 sm:items-center"
      style={{ zIndex: z.modal }}
    >
      <button
        type="button"
        aria-label="Dismiss dialog"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="relative w-full max-w-lg border border-line bg-beige p-6 shadow-[0_24px_80px_rgb(28_20_24_/_0.18)] sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={labelId} className="headline-balance font-serif text-2xl leading-[1.15] text-ink pb-1">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-muted transition hover:text-ink active:scale-[0.98]"
            aria-label="Close"
          >
            <X size={22} weight="regular" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
