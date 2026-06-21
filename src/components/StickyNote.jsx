const COLORS = {
  yellow: "bg-yellow-light",
  pink: "bg-pink-light",
  blue: "bg-blue-light",
  lavender: "bg-lavender-light",
  peach: "bg-peach",
};

export default function StickyNote({
  children,
  color = "yellow",
  rotate = "-2deg",
  className = "",
}) {
  return (
    <div
      className={`tilt-card relative cursor-default border-[2.5px] border-ink px-5 py-4 font-accent text-lg leading-snug shadow-doodle sm:text-xl ${COLORS[color]} ${className}`}
      style={{
        "--rot": rotate,
        borderRadius: "2px 14px 4px 14px / 14px 4px 14px 4px",
      }}
    >
      {/* little piece of tape */}
      <span
        className="absolute -top-3 left-1/2 h-5 w-12 -translate-x-1/2 border border-ink/20 bg-white/70"
        style={{ transform: "translateX(-50%) rotate(-4deg)" }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
