import StickerBadge from "./StickerBadge";
import Reveal from "./Reveal";
import { Star, Sparkle, ScribbleCircle } from "./doodles/Doodles";
import profilePhoto from "../assets/profile.png";

export default function AboutSection() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-12 sm:grid-cols-2">
        {/* polaroid placeholder photo */}
        <Reveal className="relative mx-auto w-full max-w-xs">
          <Star className="absolute -top-6 -left-6 h-9 w-9 text-yellow animate-wiggle" />
          <Sparkle className="absolute -bottom-5 -right-4 h-8 w-8 text-blue animate-float" />

          <div
            className="relative -rotate-2 border-[3px] border-ink bg-paper p-4 pb-8 shadow-doodle-lg transition-transform duration-300 hover:rotate-0 hover:scale-105"
            style={{ borderRadius: "4px" }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border-2 border-ink/20">
              <img
                src={profilePhoto}
                alt="שיר בסר"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-accent mt-3 text-center text-xl text-ink/70">
              שיר בסר
            </p>
          </div>

          <StickerBadge color="pink" rotate="-6deg" className="absolute -top-4 -right-8 hidden sm:flex">
            27K באינסטגרם
          </StickerBadge>
          <StickerBadge color="blue" rotate="5deg" className="absolute top-1/3 -left-10 hidden sm:flex">
            אסטרטגיית תוכן
          </StickerBadge>
          <StickerBadge color="yellow" rotate="-4deg" className="absolute -bottom-6 right-2 hidden sm:flex">
            AI + Canva
          </StickerBadge>
          <StickerBadge color="lavender" rotate="3deg" className="absolute bottom-10 -left-12 hidden sm:flex">
            גאנטים וימי צילום
          </StickerBadge>
        </Reveal>

        <Reveal delay={150} className="relative text-center sm:text-right">
          <ScribbleCircle className="absolute -top-10 right-1/4 hidden h-8 w-32 text-ink/15 sm:block" />
          <h2 className="font-display text-3xl sm:text-4xl">קצת עליי</h2>

          <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            אני שיר בסר, אסטרטגית אינסטגרם, יוצרת תוכן ומרצה על AI וקאנבה.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
            בפחות משנתיים גדלתי לקהילה של{" "}
            <span className="highlight-pink">27 אלף עוקבות</span> באינסטגרם,
            והיום אני מלווה בעלות עסקים ומנהלות סושיאל ביצירת תוכן, חידוד
            מסרים, בניית גאנטים, תכנון ימי צילום ושימוש חכם בכלים כמו
            ChatGPT, Canva ו-CapCut.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
            פתחתי את לגדול באינסטגרם עם שיר כדי לרכז במקום אחד את כל מה
            שחשוב לדעת על אינסטגרם, קאנבה ו-AI, ולעזור לך ליצור תוכן שעובד
            לעסק שלך בצורה חכמה, ברורה ופרקטית.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
