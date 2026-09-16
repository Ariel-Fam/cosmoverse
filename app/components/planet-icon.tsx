import { useId } from "react";

export const planetColors = [
  "#b8a0e2",
  "#57c2e8",
  "#e25495",
  "#9d79cb",
  "#f3b944",
  "#a4c1e7",
  "#9b84ce",
  "#90b75d",
];

export function PlanetIcon({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 80 80"
      className={`planet-icon ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`p-${id}`} cx="30%" cy="25%" r="80%">
          <stop stopColor={planetColors[index]} />
          <stop offset="1" stopColor={index === 4 ? "#946011" : "#292941"} />
        </radialGradient>
        <clipPath id={`c-${id}`}>
          <circle cx="40" cy="40" r="26" />
        </clipPath>
      </defs>
      <circle
        cx="40"
        cy="40"
        r="31"
        fill="none"
        stroke={planetColors[index]}
        strokeOpacity=".25"
        strokeDasharray="2 5"
        className="planet-orbit"
      />
      <circle
        cx="40"
        cy="40"
        r="26"
        fill={`url(#p-${id})`}
        stroke={planetColors[index]}
        strokeWidth="1"
      />
      <g
        clipPath={`url(#c-${id})`}
        fill="none"
        stroke={planetColors[index]}
        strokeWidth="7"
        opacity=".5"
        transform="rotate(-25 40 40)"
      >
        {index === 1 || index === 7 ? (
          <>
            <path d="M20 14 Q48 25 35 39 T60 63" strokeWidth="13" />
            <path d="M10 44 Q23 55 30 72" />
          </>
        ) : index === 6 ? (
          <g fill="#f3c757" stroke="none">
            <path d="m31 20 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
            <path d="m48 42 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
            <circle cx="25" cy="53" r="2" />
          </g>
        ) : (
          <>
            <path d="M9 23 Q35 35 70 20" />
            <path d="M9 43 Q35 55 70 40" />
            <path d="M9 63 Q35 75 70 60" />
          </>
        )}
      </g>
      {index === 3 && (
        <ellipse
          cx="40"
          cy="43"
          rx="37"
          ry="10"
          transform="rotate(-25 40 43)"
          fill="none"
          stroke="#eac367"
          strokeWidth="4"
        />
      )}
    </svg>
  );
}

export function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="13" stroke="currentColor" />
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="8"
        transform="rotate(-35 24 24)"
        stroke="currentColor"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 0v6m0 36v6M0 24h6m36 0h6" stroke="currentColor" />
    </svg>
  );
}
