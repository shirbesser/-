import StickerBadge from "./StickerBadge";
import CTAButton from "./CTAButton";
import {
  Star,
  Sparkle,
  ScribbleCircle,
  ArrowCurveDown,
  ArrowCurveUpLeft,
  Squiggle,
} from "./doodles/Doodles";

export default function Hero({ onCtaClick }) {
  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -right-16 h-72 w-72 rounded-full bg-lavender-light blur-2xl sm:h-96 sm:w-96" />
        <div className="absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-blue-light blur-2xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-pink-light blur-2xl" />
      </div>

      <Star className="absolute top-6 left-4 h-8 w-8 text-pink animate-float sm:left-10 sm:h-12 sm:w-12" />
      <Sparkle className="absolute top-24 right-2 h-7 w-7 text-blue animate-float-fast sm:top-32 sm:right-10" />
      <Star className="absolute bottom-10 left-6 hidden h-10 w-10 text-yellow animate-float-slow sm:block" />

      <div className="relative mx-auto max-w-3xl text-center">
        <StickerBadge color="yellow" rotate="-4deg" className="mb-5">
          קהילה חדשה ומבעבעת
        </StickerBadge>

        <h1 className="font-display text-4xl leading-[1.15] sm:text-6xl">
          לגדול ב
          <span className="highlight-pink">אינסטגרם</span>
          <br />
          עם שיר
        </h1>

        <p className="font-accent mt-5 text-2xl leading-snug text-pink-dark sm:text-3xl">
          איך ליצור תוכן שעובד לעסק שלך בעידן של אינסטגרם, קאנבה ו-AI
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
          קהילה חינמית לבעלות עסקים, יוצרות תוכן ומנהלות סושיאל שרוצות להבין
          מה באמת עובד עכשיו באינסטגרם, ליצור תוכן טוב יותר בקאנבה, ולהשתמש
          ב-AI כדי לעבוד חכם, מהר ומדויק יותר.
        </p>

        <div className="relative mt-9 inline-block">
          <ArrowCurveDown className="absolute -top-16 -right-14 h-20 w-16 -rotate-12 text-ink/70 hidden sm:block" />
          <ArrowCurveUpLeft className="absolute -top-14 -left-16 h-16 w-20 text-ink/70 hidden sm:block" />
          <CTAButton onClick={onCtaClick} size="lg">
            אני רוצה להצטרף לקהילה
          </CTAButton>
        </div>

        <Squiggle className="mx-auto mt-8 h-4 w-32 text-coral" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <StickerBadge color="pink" rotate="-2deg">
            עדכוני אינסטגרם
          </StickerBadge>
          <StickerBadge color="blue" rotate="3deg">
            קאנבה בלי כאב ראש
          </StickerBadge>
          <StickerBadge color="lavender" rotate="-3deg">
            פרומפטים ל-AI
          </StickerBadge>
          <StickerBadge color="yellow" rotate="2deg">
            רעיונות לתוכן
          </StickerBadge>
          <StickerBadge color="pink" rotate="-4deg">
            מה עובד עכשיו?
          </StickerBadge>
        </div>
      </div>

      <ScribbleCircle className="absolute -bottom-2 left-1/2 hidden h-10 w-48 -translate-x-1/2 text-ink/20 sm:block" />
    </section>
  );
}
