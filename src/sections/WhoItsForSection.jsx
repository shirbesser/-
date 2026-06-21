import AudienceCard from "../components/AudienceCard";
import Reveal from "../components/Reveal";
import { IconBriefcase, IconBulb, IconChart } from "../components/doodles/Icons";

const CARDS = [
  {
    icon: <IconBriefcase className="h-7 w-7" />,
    title: "לבעלות עסקים",
    body: "שרוצות להפסיק להעלות תוכן מתוך לחץ, ולהתחיל להבין מה באמת יכול לעבוד לעסק שלהן.",
    color: "pink",
    rotate: "-2deg",
  },
  {
    icon: <IconBulb className="h-7 w-7" />,
    title: "ליוצרות תוכן",
    body: "שרוצות לעבוד חכם יותר עם רעיונות, קאנבה, AI ותהליך תוכן ברור.",
    color: "lavender",
    rotate: "2deg",
  },
  {
    icon: <IconChart className="h-7 w-7" />,
    title: "למנהלות סושיאל",
    body: "שרוצות להישאר מעודכנות, לקבל כלים פרקטיים, ולהביא יותר ערך ללקוחות שלהן.",
    color: "blue",
    rotate: "-1deg",
  },
];

export default function WhoItsForSection() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          למי זה <span className="highlight-yellow">מתאים?</span>
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <AudienceCard {...c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
