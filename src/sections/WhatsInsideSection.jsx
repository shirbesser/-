import FeatureCard from "../components/FeatureCard";
import Reveal from "../components/Reveal";
import {
  IconCamera,
  IconPalette,
  IconSparkleAI,
  IconFilm,
  IconMic,
  IconGift,
} from "../components/doodles/Icons";
import { Star } from "../components/doodles/Doodles";

const FEATURES = [
  {
    icon: <IconCamera className="h-6 w-6 text-pink" />,
    title: "עדכוני אינסטגרם ומה באמת חשוב לדעת",
    color: "pink",
    rotate: "-2deg",
  },
  {
    icon: <IconPalette className="h-6 w-6 text-coral" />,
    title: "טיפים פרקטיים לקאנבה",
    color: "peach",
    rotate: "2deg",
  },
  {
    icon: <IconSparkleAI className="h-6 w-6 text-lavender" />,
    title: "פרומפטים ל-AI ליצירת תוכן",
    color: "lavender",
    rotate: "-3deg",
  },
  {
    icon: <IconFilm className="h-6 w-6 text-blue" />,
    title: "רעיונות לרילס, סטוריז וקרוסלות",
    color: "blue",
    rotate: "3deg",
  },
  {
    icon: <IconMic className="h-6 w-6 text-pink" />,
    title: "לייבים קצרים ופירוקים מהשטח",
    color: "yellow",
    rotate: "-2deg",
  },
  {
    icon: <IconGift className="h-6 w-6 text-coral" />,
    title: "הזמנות ראשונות לסדנאות ותכנים מיוחדים",
    color: "pink",
    rotate: "2deg",
  },
];

export default function WhatsInsideSection() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Star className="mx-auto mb-3 h-8 w-8 text-yellow" />
        <h2 className="font-display text-3xl sm:text-4xl">
          מה מחכה לך <span className="highlight-pink">בפנים?</span>
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <FeatureCard {...f} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
