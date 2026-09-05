"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { howItWorks } from "@/lib/copy";
import { flowIcons } from "./FlowStepIcons";
import { ScrollReveal } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = "top 55%";

function FlowConnector({
  direction,
  index,
}: {
  direction: "horizontal" | "vertical";
  index: number;
}) {
  const vertical = direction === "vertical";

  return (
    <div
      data-flow-connector
      data-flow-connector-index={index}
      data-flow-connector-vertical={vertical ? "true" : "false"}
      className={`relative flex shrink-0 items-center justify-center ${
        vertical ? "h-12 w-full lg:hidden" : "hidden w-10 self-center lg:flex"
      }`}
      aria-hidden
    >
      <div
        data-flow-connector-line
        className={`bg-ruby/45 ${vertical ? "h-full w-px origin-top" : "h-px w-full origin-left"}`}
      />
    </div>
  );
}

function revealConnector(section: HTMLElement, index: number) {
  section.querySelectorAll<HTMLElement>(`[data-flow-connector-index="${index}"]`).forEach((connector) => {
    const line = connector.querySelector<HTMLElement>("[data-flow-connector-line]");
    if (!line) return;

    const isVertical = connector.dataset.flowConnectorVertical === "true";

    gsap.to(connector, { opacity: 1, duration: 0.2 });
    gsap.to(
      line,
      isVertical
        ? { scaleY: 1, duration: 0.35, ease: "power2.out" }
        : { scaleX: 1, duration: 0.35, ease: "power2.out" },
    );
  });
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = section.querySelectorAll<HTMLElement>("[data-flow-step]");
    const connectors = section.querySelectorAll<HTMLElement>("[data-flow-connector]");

    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(steps, { y: 28 });
      gsap.set(connectors, { opacity: 0 });

      connectors.forEach((connector) => {
        const line = connector.querySelector<HTMLElement>("[data-flow-connector-line]");
        if (!line) return;

        const vertical = connector.dataset.flowConnectorVertical === "true";
        gsap.set(line, {
          scaleX: vertical ? 1 : 0,
          scaleY: vertical ? 0 : 1,
          transformOrigin: vertical ? "top center" : "left center",
        });
      });

      const revealStep = (step: HTMLElement, index: number) => {
        gsap.to(step, { y: 0, duration: 0.55, ease: "power3.out" });
        if (index > 0) revealConnector(section, index - 1);
      };

      steps.forEach((step, index) => {
        const pastCenter = step.getBoundingClientRect().top < window.innerHeight * 0.55;

        if (pastCenter || window.location.hash === `#${howItWorks.id}`) {
          revealStep(step, index);
          return;
        }

        ScrollTrigger.create({
          trigger: step,
          start: REVEAL_START,
          once: true,
          onEnter: () => revealStep(step, index),
        });
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={howItWorks.id}
      className="scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-28"
    >
      <ScrollReveal>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{howItWorks.eyebrow}</p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">{howItWorks.heading}</h2>
        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{howItWorks.lead}</p>
      </ScrollReveal>

      <div className="mt-14 flex flex-col lg:mt-16 lg:flex-row lg:items-stretch">
        {howItWorks.steps.map((step, index) => {
          const Icon = flowIcons[index];

          return (
            <Fragment key={step.id}>
              <article
                data-flow-step
                className="flex min-w-0 flex-1 flex-col border border-line bg-white/20 lg:min-h-[22rem]"
              >
                <div className="flex items-center justify-center border-b border-line bg-burgundy/5 px-5 py-8 text-burgundy">
                  <Icon className="h-16 w-16" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="inline-flex h-7 w-7 items-center justify-center border border-ruby/30 bg-bone text-[11px] font-medium tabular-nums text-ruby">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-ink sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-muted">{step.description}</p>
                </div>
              </article>
              {index < howItWorks.steps.length - 1 ? (
                <>
                  <FlowConnector direction="vertical" index={index} />
                  <FlowConnector direction="horizontal" index={index} />
                </>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
