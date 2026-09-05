"use client";

import { portalModal } from "@/lib/copy";
import { DialogFrame } from "./DialogFrame";
import { useModals } from "./ModalProvider";

export function InvestorPortalModal() {
  const { kind, close } = useModals();
  if (kind !== "portal") return null;
  return (
    <DialogFrame title={portalModal.title} onClose={close}>
      <p className="text-base leading-relaxed text-muted">{portalModal.body}</p>
      <button
        type="button"
        onClick={close}
        className="mt-8 whitespace-nowrap bg-burgundy px-5 py-3 text-sm font-medium text-beige transition hover:bg-burgundy/90 active:scale-[0.98]"
      >
        {portalModal.close}
      </button>
    </DialogFrame>
  );
}
