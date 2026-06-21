import { Star, Sparkle, ArrowSquiggleRight } from "../components/doodles/Doodles";

export default function SolutionSection() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          בדיוק בשביל זה פתחתי את
          <span className="highlight-blue"> הקהילה</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
          זה לא עוד מקום שיציף אותך בטיפים.
          <br />
          זה מרחב שעושה סדר במה שבאמת חשוב לדעת על אינסטגרם, קאנבה ו-AI,
          ומתרגם את זה לכלים פשוטים שאפשר ליישם בפועל.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl">
        <Star className="absolute -top-7 -right-3 h-9 w-9 text-yellow animate-wiggle sm:-right-8" />
        <Sparkle className="absolute -bottom-6 -left-3 h-8 w-8 text-blue animate-float sm:-left-8" />
        <ArrowSquiggleRight className="absolute -top-10 left-1/3 hidden h-10 w-28 rotate-180 text-ink/60 sm:block" />

        <div
          className="border-[3px] border-ink bg-pink px-6 py-10 text-center text-white shadow-doodle-lg sm:px-10 sm:py-12"
          style={{ borderRadius: "30px 30px 6px 30px" }}
        >
          <p className="font-display text-2xl leading-snug sm:text-3xl">
            פחות ניחושים.
            <br />
            יותר סדר. יותר תוכן שעובד.
          </p>
        </div>
      </div>
    </section>
  );
}
