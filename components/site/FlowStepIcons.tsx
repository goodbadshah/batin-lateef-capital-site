type IconProps = { className?: string };

export function EquityGaugeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <rect x="18" y="12" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect
        className="flow-icon-gauge-fill"
        x="21"
        y="36"
        width="22"
        height="13"
        rx="1.5"
        fill="currentColor"
        opacity="0.35"
      />
      <circle className="flow-icon-coin" cx="32" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

export function PresalesStampIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <rect x="16" y="14" width="32" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 24h20M22 30h14M22 36h18" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle className="flow-icon-stamp" cx="44" cy="42" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path className="flow-icon-stamp" d="M40 42l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TreatyPuzzleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <g className="flow-icon-puzzle-left">
        <path
          d="M 10 16 H 28 V 24 Q 18 30 28 36 V 46 H 10 V 16 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.14"
        />
      </g>
      <g className="flow-icon-puzzle-right">
        <path
          d="M 28 24 Q 18 30 28 36 V 46 H 54 V 16 H 28 V 24 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.24"
        />
      </g>
    </svg>
  );
}

export function ClapperboardIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <g className="flow-icon-clapper-top" style={{ transformOrigin: "20px 22px" }}>
        <path d="M12 18h28l-4 8H12V18z" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        <path d="M14 18l4-6h24l-4 6" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <rect x="12" y="26" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle className="flow-icon-gear" cx="46" cy="46" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path className="flow-icon-gear" d="M46 41v3M46 48v3M41 46h3M48 46h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function RecoupmentChartIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <path d="M12 48h40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 48V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        className="flow-icon-chart-line"
        d="M16 40l10-12 8 6 14-18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse className="flow-icon-drop" cx="48" cy="50" rx="6" ry="2" fill="currentColor" opacity="0.2" />
      <circle className="flow-icon-drop" cx="48" cy="44" r="2" fill="currentColor" />
    </svg>
  );
}

export const flowIcons = [
  EquityGaugeIcon,
  PresalesStampIcon,
  TreatyPuzzleIcon,
  ClapperboardIcon,
  RecoupmentChartIcon,
] as const;
