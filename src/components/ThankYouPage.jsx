import CTAButton from "./CTAButton";
import StickerBadge from "./StickerBadge";
import { WHATSAPP_LINK } from "../constants";
import { Star, Sparkle, BurstCircle, Squiggle, HeartDoodle } from "./doodles/Doodles";

export default function ThankYouPage({ name, onBack }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-light blur-2xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-light blur-2xl" />
        <BurstCircle className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-yellow/20 animate-spin-slow" />
      </div>

      <Star className="mb-2 h-12 w-12 text-pink animate-wiggle" />

      <h1 className="font-display text-4xl sm:text-5xl">
        תודה שנרשמת
        {name ? <>, <span className="highlight-pink">{name}</span></> : ""}!
      </h1>

      <p className="mx-auto mt-4 max-w-md text-xl font-display text-ink/90 sm:text-2xl">
        <span className="highlight-yellow">הקהילה מחכה לך</span>
      </p>

      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
        נשאר רק צעד אחד: להצטרף לקבוצת הוואטסאפ ולהתחיל לקבל תוכן שעובד.
      </p>

      <CTAButton href={WHATSAPP_LINK} variant="whatsapp" className="mt-8">
        להצטרפות לקהילה בוואטסאפ
      </CTAButton>

      <Squiggle className="mx-auto mt-10 h-4 w-28 text-blue" />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <StickerBadge color="pink" rotate="-4deg">
          27K באינסטגרם
        </StickerBadge>
        <StickerBadge color="lavender" rotate="3deg">
          תוכן שעובד
        </StickerBadge>
      </div>

      <Sparkle className="absolute top-10 right-10 h-8 w-8 text-lavender animate-float hidden sm:block" />
      <HeartDoodle className="absolute bottom-10 left-10 h-7 w-8 text-pink animate-float-slow hidden sm:block" />

      <button
        type="button"
        onClick={onBack}
        className="mt-12 font-accent text-sm text-ink/50 underline transition hover:text-ink"
      >
        בחזרה לעמוד הבית
      </button>
    </div>
  );
}
