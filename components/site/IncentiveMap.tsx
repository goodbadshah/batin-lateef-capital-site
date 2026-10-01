"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { ComposableMap, Geographies, Geography, Sphere } from "react-simple-maps";
import { geoEqualEarth } from "d3-geo";
import type { GeoJsonObject } from "geojson";
import worldAtlas from "world-atlas/countries-110m.json";
import { incentiveHeadline, incentiveRateLabel, incentives, type IncentiveJurisdiction } from "@/data/incentives";
import { incentiveMap } from "@/lib/copy";
import { ScrollReveal } from "./ScrollReveal";

const MAP_WIDTH = 800;
const MAP_HEIGHT = 460;

const ISO_NUMERIC_BY_CODE: Record<string, string> = {
  CA: "124",
  ZA: "710",
  AU: "036",
  TH: "764",
  IE: "372",
  GB: "826",
  FR: "250",
  NZ: "554",
  HU: "348",
  CO: "170",
};

type Point = [number, number];

const CENTROIDS: Record<string, Point> = {
  CA: [-96.4, 60.5],
  ZA: [25.2, -28.9],
  AU: [134.3, -25.8],
  TH: [101, 15],
  IE: [-8, 53.2],
  GB: [-2.8, 53.8],
  FR: [2.4, 46.6],
  NZ: [173, -41.5],
  HU: [19.3, 47.2],
  CO: [-74.3, 4.6],
};

/** Label anchors, as percentages of the map. Offset from the country so Europe stays tappable. */
const CALLOUTS: Record<string, { x: number; y: number }> = {
  CA: { x: 4, y: 36 },
  IE: { x: 36, y: 22 },
  GB: { x: 44, y: 4 },
  FR: { x: 30, y: 38 },
  HU: { x: 48, y: 30 },
  TH: { x: 60, y: 48 },
  ZA: { x: 42, y: 84 },
  AU: { x: 68, y: 64 },
  NZ: { x: 80, y: 88 },
  CO: { x: 12, y: 62 },
};

const geography = worldAtlas as unknown as GeoJsonObject;

const projection = geoEqualEarth().translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]).center([0, 0]).scale(158);

const incentivesByNumeric = new Map(
  incentives.flatMap((entry) => {
    const numeric = ISO_NUMERIC_BY_CODE[entry.code];
    return numeric ? ([[numeric, entry]] as const) : [];
  }),
);

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function projectPercent(coordinates: Point) {
  const point = projection(coordinates);
  if (!point) return null;
  return { x: (point[0] / MAP_WIDTH) * 100, y: (point[1] / MAP_HEIGHT) * 100 };
}

function rateLabel(entry: IncentiveJurisdiction) {
  return incentiveRateLabel(entry, incentiveMap.detailsOnRequest);
}

function rateRank(entry: IncentiveJurisdiction) {
  const label = entry.mapRate ?? (entry.percentage == null ? "" : `${entry.percentage}`);
  const match = /(\d+(?:\.\d+)?)/.exec(label);
  const value = match ? Number(match[1]) : -1;
  return label.includes("+") ? value + 0.5 : value;
}

const orderedIncentives = [...incentives].sort(
  (a, b) => rateRank(b) - rateRank(a) || a.country.localeCompare(b.country),
);

export function IncentiveMap() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [selected, setSelected] = useState(orderedIncentives[0]?.code ?? "CA");

  const selectedEntry = orderedIncentives.find((entry) => entry.code === selected) ?? orderedIncentives[0];

  function commit(code: string) {
    setSelected(code);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = orderedIncentives.findIndex((entry) => entry.code === selected);
    if (index < 0) return;

    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % orderedIncentives.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + orderedIncentives.length) % orderedIncentives.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = orderedIncentives.length - 1;
    else return;

    event.preventDefault();
    const code = orderedIncentives[next].code;
    commit(code);
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-code="${code}"]`)?.focus();
  }

  return (
    <section
      id={incentiveMap.id}
      aria-labelledby="incentive-map-heading"
      className="scroll-mt-20 border-t border-line px-6 py-20 [-webkit-tap-highlight-color:transparent] sm:px-10 lg:px-14 lg:py-28"
    >
      <ScrollReveal>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{incentiveMap.eyebrow}</p>
        <h2 id="incentive-map-heading" className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
          {incentiveMap.heading}
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{incentiveMap.intro}</p>
        <p className="mt-4 max-w-3xl text-base leading-[1.85] text-muted md:text-lg">{incentiveMap.prompt}</p>
      </ScrollReveal>

      <div className="@container mt-10 min-w-0">
        <div className="relative -mx-6 border border-line bg-white/25 sm:-mx-10 @min-[48rem]:mx-0">
          <div className="relative aspect-[800/460]">
              <ComposableMap
                projection="geoEqualEarth"
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                projectionConfig={{ scale: 158, center: [0, 0] }}
                className="absolute inset-0 h-full w-full [&_path]:outline-none [&_path]:focus:outline-none"
                aria-hidden
              >
                <Sphere fill="rgb(28 20 24 / 0.035)" stroke="rgb(28 20 24 / 0.28)" strokeWidth={0.8} />
                <Geographies geography={geography}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const entry = incentivesByNumeric.get(String(geo.id ?? ""));
                      if (!entry) {
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            tabIndex={-1}
                            fill="rgb(28 20 24 / 0.06)"
                            stroke="rgb(28 20 24 / 0.12)"
                            strokeWidth={0.35}
                            style={{ pointerEvents: "none", outline: "none" }}
                          />
                        );
                      }

                      const isShown = entry.code === selected;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          tabIndex={-1}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={(event) => {
                            commit(entry.code);
                            if (event.detail > 0) event.currentTarget.blur();
                          }}
                          fill={isShown ? "#4f2330" : "#8a7f82"}
                          stroke={isShown ? "#e5ddd2" : "#e5ddd2"}
                          strokeWidth={isShown ? 0.8 : 0.4}
                          style={{
                            cursor: "pointer",
                            outline: "none",
                            transition: "fill 180ms ease, stroke 180ms ease",
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full @min-[48rem]:block"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                aria-hidden
              >
                {incentives.map((entry) => {
                  const centroid = CENTROIDS[entry.code];
                  const callout = CALLOUTS[entry.code];
                  const point = centroid ? projection(centroid) : null;
                  if (!point || !callout) return null;
                  const labelX = (callout.x / 100) * MAP_WIDTH + 36;
                  const labelY = (callout.y / 100) * MAP_HEIGHT + 18;
                  return (
                    <line
                      key={entry.code}
                      x1={point[0]}
                      y1={point[1]}
                      x2={labelX}
                      y2={labelY}
                      stroke="#4f2330"
                      strokeWidth={1}
                      strokeOpacity={entry.code === selected ? 0.9 : 0.35}
                    />
                  );
                })}
              </svg>

              {incentives.map((entry) => {
                const centroid = CENTROIDS[entry.code];
                const point = centroid ? projectPercent(centroid) : null;
                if (!point) return null;
                return (
                  <span
                    key={`${entry.code}-dot`}
                    className={`pointer-events-none absolute hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 @min-[48rem]:block ${
                      entry.code === selected ? "bg-bone ring-2 ring-burgundy" : "bg-burgundy"
                    }`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-hidden
                  />
                );
              })}

              <div
                className="pointer-events-none absolute inset-0 z-10 hidden @min-[48rem]:block"
                role="tablist"
                aria-label={incentiveMap.listLabel}
                onKeyDown={onKeyDown}
              >
                {orderedIncentives.map((entry) => {
                  const callout = CALLOUTS[entry.code];
                  if (!callout) return null;
                  return (
                    <CountryButton
                      key={entry.code}
                      entry={entry}
                      selected={entry.code === selected}
                      tabIndex={entry.code === selected ? 0 : -1}
                      className="pointer-events-auto absolute"
                      style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                      onSelect={() => commit(entry.code)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="relative z-20 mx-3 -mt-6 mb-3 grid border border-line bg-bone px-4 py-3 @min-[48rem]:mt-3 @min-[64rem]:absolute @min-[64rem]:top-4 @min-[64rem]:right-4 @min-[64rem]:m-0 @min-[64rem]:w-[22rem]">
              {orderedIncentives.map((entry) => {
                const active = entry.code === selected;
                return (
                  <motion.div
                    key={entry.code}
                    id={active ? "incentive-readout" : undefined}
                    role={active ? "tabpanel" : undefined}
                    aria-hidden={active ? undefined : true}
                    className="col-start-1 row-start-1"
                    initial={false}
                    animate={{ opacity: active ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ pointerEvents: active ? "auto" : "none" }}
                  >
                    <IncentiveReadout entry={entry} />
                  </motion.div>
                );
              })}
            </div>
          </div>

        <div
          className="mt-3 grid grid-cols-2 gap-2 @min-[48rem]:hidden"
          role="tablist"
          aria-label={incentiveMap.listLabel}
          onKeyDown={onKeyDown}
        >
          {orderedIncentives.map((entry) => (
            <CountryButton
              key={entry.code}
              entry={entry}
              selected={entry.code === selected}
              tabIndex={entry.code === selected ? 0 : -1}
              className="w-full"
              onSelect={() => commit(entry.code)}
            />
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {selectedEntry ? `${selectedEntry.country}. ${rateLabel(selectedEntry)}. ${incentiveHeadline(selectedEntry)}` : ""}
      </p>
      <ul className="sr-only">
        {orderedIncentives.map((entry) => (
          <li key={entry.code}>
            {entry.country}: {rateLabel(entry)}. {incentiveHeadline(entry)}. {entry.notes}
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-[65ch] text-xs leading-relaxed text-muted">{incentiveMap.footnote}</p>
    </section>
  );
}

function CountryButton({
  entry,
  selected,
  tabIndex,
  className = "",
  style,
  onSelect,
}: {
  entry: IncentiveJurisdiction;
  selected: boolean;
  tabIndex: number;
  className?: string;
  style?: React.CSSProperties;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      data-code={entry.code}
      aria-selected={selected}
      aria-controls="incentive-readout"
      tabIndex={tabIndex}
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => {
        onSelect();
        if (event.detail > 0) event.currentTarget.blur();
      }}
      style={style}
      className={`min-h-11 min-w-[5.5rem] border px-2.5 py-1.5 text-left outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${className} ${
        selected ? "border-burgundy bg-burgundy text-bone" : "border-line bg-bone text-ink"
      }`}
    >
      <span className="block text-[10px] uppercase tracking-[0.14em]">{entry.country}</span>
      <span className="mt-0.5 block font-serif text-lg leading-none">{rateLabel(entry)}</span>
    </button>
  );
}

function IncentiveReadout({ entry }: { entry: IncentiveJurisdiction }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl leading-none text-ink">{entry.country}</h3>
        <p className="shrink-0 font-serif text-2xl leading-none text-ink">{rateLabel(entry)}</p>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{incentiveHeadline(entry)}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{entry.notes}</p>
    </div>
  );
}
