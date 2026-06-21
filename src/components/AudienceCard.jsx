const COLORS = {
  pink: "bg-pink text-white",
  blue: "bg-blue text-white",
  lavender: "bg-lavender text-white",
};

export default function AudienceCard({ icon, title, body, color = "pink", rotate = "0deg" }) {
  return (
    <div
      className="tilt-card relative cursor-default border-[2.5px] border-ink bg-paper p-6 shadow-doodle"
      style={{ "--rot": rotate, borderRadius: "20px 20px 4px 20px" }}
    >
      <div
        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink ${COLORS[color]}`}
      >
        {icon}
      </div>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-ink/80">{body}</p>
    </div>
  );
}
