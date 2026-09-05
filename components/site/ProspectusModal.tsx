"use client";

import { FormEvent, useState } from "react";
import { prospectus } from "@/lib/copy";
import { DialogFrame } from "./DialogFrame";
import { useModals } from "./ModalProvider";

type Errors = Partial<Record<"name" | "email" | "type", string>>;

export function ProspectusModal() {
  const { kind, close } = useModals();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  if (kind !== "prospectus") return null;

  function validate() {
    const next: Errors = {};
    if (!name.trim()) next.name = prospectus.errorRequired;
    if (!email.trim()) next.email = prospectus.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = prospectus.errorEmail;
    if (!type) next.type = prospectus.errorRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  return (
    <DialogFrame title={prospectus.title} onClose={close}>
      {status === "success" ? (
        <div>
          <p className="font-medium text-heading">{prospectus.successTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-silver">{prospectus.successBody}</p>
          <button
            type="button"
            onClick={close}
            className="mt-8 whitespace-nowrap bg-gold px-5 py-3 text-sm font-medium text-obsidian"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <p className="text-sm text-silver">{prospectus.helper}</p>
          <div className="flex flex-col gap-2">
            <label htmlFor="lp-name" className="text-sm text-heading">
              {prospectus.name}
            </label>
            <p id="lp-name-help" className="text-xs text-silver">
              {prospectus.nameHelper}
            </p>
            <input
              id="lp-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="lp-name-help"
              aria-invalid={Boolean(errors.name)}
              className="border border-line bg-obsidian px-3 py-2.5 text-heading outline-none ring-gold focus:ring-1"
            />
            {errors.name ? (
              <p className="text-sm text-gold" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lp-email" className="text-sm text-heading">
              {prospectus.email}
            </label>
            <p id="lp-email-help" className="text-xs text-silver">
              {prospectus.emailHelper}
            </p>
            <input
              id="lp-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="lp-email-help"
              aria-invalid={Boolean(errors.email)}
              className="border border-line bg-obsidian px-3 py-2.5 text-heading outline-none ring-gold focus:ring-1"
            />
            {errors.email ? (
              <p className="text-sm text-gold" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lp-type" className="text-sm text-heading">
              {prospectus.type}
            </label>
            <p id="lp-type-help" className="text-xs text-silver">
              {prospectus.typeHelper}
            </p>
            <select
              id="lp-type"
              name="investorType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-describedby="lp-type-help"
              aria-invalid={Boolean(errors.type)}
              className="border border-line bg-obsidian px-3 py-2.5 text-heading outline-none ring-gold focus:ring-1"
            >
              <option value="">Select</option>
              {prospectus.types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type ? (
              <p className="text-sm text-gold" role="alert">
                {errors.type}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 whitespace-nowrap bg-gold px-5 py-3 text-sm font-medium text-obsidian transition hover:bg-gold/90 active:scale-[0.98] disabled:opacity-60"
          >
            {status === "loading" ? prospectus.submitting : prospectus.submit}
          </button>
        </form>
      )}
    </DialogFrame>
  );
}
