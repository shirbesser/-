const COLORS = {
  pink: "bg-pink text-white",
  yellow: "bg-yellow text-ink",
  blue: "bg-blue text-white",
  lavender: "bg-lavender text-white",
  cream: "bg-paper text-ink",
};

export default function StickerBadge({
  children,
  color = "pink",
  rotate = "-3deg",
  className = "",
}) {
  return (
    <span
      className={`tilt-badge inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink px-4 py-1.5 font-display text-sm shadow-doodle sm:text-base ${COLORS[color]} ${className}`}
      style={{ "--rot": rotate }}
    >
      {children}
    </span>
  );
}
