// Small line-icon glyphs for feature cards. Rounded, hand-drawn feel.

const base = "w-6 h-6";

export function IconCamera({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="6" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6 9.5 3h5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPalette({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3C6.5 3 2 7 2 12c0 5.2 4.7 9 10 9 1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.8-1.7H17c2.8 0 5-2.2 5-5C22 6 17.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="7.5" cy="11" r="1.4" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r="1.4" fill="currentColor" />
      <circle cx="15" cy="7.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconSparkleAI({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.2 3.2M15.8 15.8 19 19M19 5l-3.2 3.2M8.2 15.8 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

export function IconFilm({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M3 15h18M8 4v16M16 4v16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconMic({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="8" y="2" width="8" height="13" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconGift({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="9" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 13h18M12 9v11" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 9c-1 0-4-.5-4-3s2.5-3 4 0c1.5-3 4-3 4 0s-3 3-4 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBriefcase({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="7" width="20" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 12h20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconBulb({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2a7 7 0 0 0-4 12.7c.6.4 1 1.1 1 1.8V18h6v-1.5c0-.7.4-1.4 1-1.8A7 7 0 0 0 12 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 21h6M10 18.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconChart({ className = base }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="5" y="11" width="3.5" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10.5" y="6" width="3.5" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="14" width="3.5" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
