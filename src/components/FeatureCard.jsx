const COLORS = {
  pink: "bg-pink-light",
  yellow: "bg-yellow-light",
  blue: "bg-blue-light",
  lavender: "bg-lavender-light",
  peach: "bg-peach",
};

export default function FeatureCard({
  icon,
  title,
  color = "pink",
  rotate = "0deg",
  className = "",
}) {
  return (
    <div
      className={`tilt-card relative cursor-default border-[2.5px] border-ink p-5 shadow-doodle sm:p-6 ${COLORS[color]} ${className}`}
      style={{ "--rot": rotate, borderRadius: "18px 6px 18px 6px" }}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white text-2xl">
        {icon}
      </div>
      <p className="font-display text-lg leading-snug sm:text-xl">{title}</p>
    </div>
  );
}
