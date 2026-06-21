import StickyNote from "../components/StickyNote";
import Reveal from "../components/Reveal";
import { Squiggle } from "../components/doodles/Doodles";

const NOTES = [
  { text: "אין לי רעיונות", color: "yellow", rotate: "-4deg" },
  { text: "הסטורי מת", color: "pink", rotate: "3deg" },
  { text: "AI יוצא לי רובוטי", color: "blue", rotate: "-2deg" },
  { text: "קאנבה לוקחת לי שעות", color: "lavender", rotate: "4deg" },
  { text: "מה עובד עכשיו?", color: "peach", rotate: "-3deg" },
  { text: "למה אין חשיפה?", color: "yellow", rotate: "2deg" },
];

export default function PainSection() {
  return (
    <section className="relative bg-pink-light/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl leading-snug sm:text-4xl">
          מרגישה שכבר אי אפשר להבין
          <br />
          מה אינסטגרם רוצה ממך?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
          רילס, סטורי, קאנבה, AI, אלגוריתם, חשיפה, טרנדים, פיצ׳רים חדשים
          וכל יום מישהי אחרת אומרת משהו אחר.
        </p>
        <p className="mt-3 text-base text-ink/80 sm:text-lg">
          ובסוף את נשארת עם השאלה הכי פשוטה:
        </p>

        <p className="font-display mt-4 text-3xl sm:text-4xl">
          <span className="highlight-yellow">מה אני אמורה להעלות עכשיו?</span>
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14">
        {NOTES.map((note, i) => (
          <Reveal key={note.text} delay={i * 90}>
            <StickyNote
              color={note.color}
              rotate={note.rotate}
              className={`mx-auto w-full max-w-[170px] text-center animate-float${
                i % 3 === 0 ? "" : i % 3 === 1 ? "-slow" : "-fast"
              }`}
            >
              {note.text}
            </StickyNote>
          </Reveal>
        ))}
      </div>

      <Squiggle className="mx-auto mt-16 h-4 w-40 text-lavender" />
    </section>
  );
}
