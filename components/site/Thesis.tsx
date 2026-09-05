import Image from "next/image";
import { thesis } from "@/lib/copy";
import { Reveal } from "./Reveal";

export function Thesis() {
  const [a, b, c] = thesis.pillars;
  return (
    <section id="thesis" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="headline-balance font-serif text-3xl text-heading md:text-4xl">
            {thesis.heading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-0 md:grid-cols-2">
          <Reveal className="border border-line p-6 md:p-10">
            <h3 className="font-serif text-2xl leading-[1.15] text-heading pb-1">{a.title}</h3>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-silver">{a.body}</p>
          </Reveal>
          <Reveal delay={0.06} className="border border-line border-t-0 p-0 md:border-t md:border-l-0">
            <div className="relative aspect-[4/3] w-full md:h-full md:min-h-[280px] md:aspect-auto">
              <Image
                src="/images/thesis-treaty.png"
                alt="Dusk landscape used to evoke Canada and South Africa co-production geography."
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-10">
              <h3 className="font-serif text-2xl leading-[1.15] text-heading pb-1">{b.title}</h3>
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-silver">{b.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="border border-line border-t-0 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="relative aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-[240px]">
                <Image
                  src="/images/thesis-genre.png"
                  alt="Night city street still suggesting four-quadrant genre cinema."
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:col-span-7 md:p-10">
                <h3 className="font-serif text-2xl leading-[1.15] text-heading pb-1">{c.title}</h3>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-silver">{c.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
