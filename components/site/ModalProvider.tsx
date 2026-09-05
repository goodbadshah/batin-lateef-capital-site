"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ModalKind = "none" | "portal" | "prospectus";

type ModalContextValue = {
  kind: ModalKind;
  openPortal: () => void;
  openProspectus: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<ModalKind>("none");
  const openPortal = useCallback(() => setKind("portal"), []);
  const openProspectus = useCallback(() => setKind("prospectus"), []);
  const close = useCallback(() => setKind("none"), []);
  const value = useMemo(
    () => ({ kind, openPortal, openProspectus, close }),
    [kind, openPortal, openProspectus, close],
  );
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}
