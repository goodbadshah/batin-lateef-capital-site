export const mediaStrips = [
  {
    id: "premiere",
    src: "/images/premiere-night.png",
    alt: "Film premiere crowd and marquee light outside a cinema",
    variant: "full" as const,
    speed: 0.35,
  },
  {
    id: "production",
    src: "/images/film-soundstage.png",
    alt: "Film crew on a working soundstage",
    variant: "inset" as const,
    speed: 0.45,
  },
  {
    id: "heritage",
    src: "/images/islamic-architecture.png",
    alt: "Geometric light inside historic Islamic architecture",
    variant: "duo-left" as const,
    speed: 0.3,
    pairSrc: "/images/arab-film-craft.png",
    pairAlt: "Arabic calligraphy panel beside a film clapperboard on set",
  },
  {
    id: "box-office",
    src: "/images/box-office.png",
    alt: "Box office window at an art-house cinema",
    variant: "inset" as const,
    speed: 0.4,
  },
] as const;

export const heroImage = {
  src: "/images/location-production.png",
  alt: "Film crew on location at dusk",
} as const;
