import { architecture } from "@/lib/copy";
import { Reveal } from "./Reveal";

export function Architecture() {
  return (
    <section id="structure" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="headline-balance font-serif text-3xl text-heading md:text-4xl">
            {architecture.heading}
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm text-silver">{architecture.note}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {architecture.metrics.map((metric, i) => (
            <Reveal
              key={metric.value}
              delay={i * 0.05}
              className={`border border-line px-6 py-10 ${i > 0 ? "border-t-0 md:border-t md:border-l-0" : ""}`}
            >
              <p className="font-sans text-5xl font-medium tabular-nums tracking-tight text-gold md:text-6xl">
                {metric.value}
              </p>
              <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-silver">{metric.caption}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08} className="mt-10 border border-line bg-[color-mix(in_oklch,var(--color-gold)_6%,var(--color-obsidian))] p-6 md:p-10">
          <h3 className="font-serif text-2xl text-heading">{architecture.waterfallHeading}</h3>
          <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {architecture.priorities.map((item) => (
              <li key={item.label} className="max-w-[48ch]">
                <p className="text-sm font-medium text-gold">{item.label}</p>
                <p className="mt-2 text-base leading-relaxed text-heading">{item.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
