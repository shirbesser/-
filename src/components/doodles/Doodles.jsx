// Hand-drawn style inline SVG decorations used across the page.
// All use currentColor so they inherit color via Tailwind text-* classes.

export function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      <path
        d="M30 2c1 9 3 17 8 22s13 7 22 8c-9 1-17 3-22 8s-7 13-8 22c-1-9-3-17-8-22s-13-7-22-8c9-1 17-3 22-8s7-13 8-22Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 3v12M20 25v12M3 20h12M25 20h12M9 9l8 8M31 31l-8-8M31 9l-8 8M9 31l8-8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleCircle({ className = "" }) {
  return (
    <svg viewBox="0 0 200 90" fill="none" className={className}>
      <path
        d="M100 8C50 4 14 22 10 44c-4 23 38 40 88 40 53 0 95-16 91-41-3-21-44-36-89-33"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }) {
  return (
    <svg viewBox="0 0 160 30" fill="none" className={className}>
      <path
        d="M2 22c10-18 20-18 30 0s20 18 30 0 20-18 30 0 20 18 30 0 20-18 30 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowCurveDown({ className = "" }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={className}>
      <path
        d="M75 8C70 50 55 85 18 100"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M6 80c2 9 6 17 12 22M6 80c8-2 16-4 24-3"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowCurveUpLeft({ className = "" }) {
  return (
    <svg viewBox="0 0 110 100" fill="none" className={className}>
      <path
        d="M100 92C70 60 45 35 14 14"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M30 8c-6 1-12 4-16 6M14 14c0 7 1 14 4 21"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowSquiggleRight({ className = "" }) {
  return (
    <svg viewBox="0 0 140 50" fill="none" className={className}>
      <path
        d="M2 30c14-22 24 18 38-2s24 16 38-2 24 16 38-2"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M104 14c6 2 12 6 14 10M118 24c-5 3-9 6-12 10"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BurstCircle({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="6"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
    </svg>
  );
}

export function HeartDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 50 44" fill="none" className={className}>
      <path
        d="M25 40C10 30 2 21 2 12 2 5 7 1 13 1c5 0 9 3 12 8 3-5 7-8 12-8 6 0 11 4 11 11 0 9-8 18-23 28Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloudDoodle({ className = "" }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" className={className}>
      <path
        d="M30 55c-15 0-26-9-26-21 0-11 9-19 20-20 4-9 13-14 23-14 12 0 22 8 25 19 11 1 19 9 19 19 0 9-8 17-19 17H30Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Underline({ className = "" }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" className={className}>
      <path
        d="M3 14c40-10 150-10 194-2"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
