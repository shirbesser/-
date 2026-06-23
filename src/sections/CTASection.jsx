import { forwardRef } from "react";
import RavPageFormEmbed from "../components/RavPageFormEmbed";
import Reveal from "../components/Reveal";
import { Star, Sparkle, Squiggle } from "../components/doodles/Doodles";

const CTASection = forwardRef(function CTASection(_props, ref) {
  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-pink-light blur-2xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-yellow-light blur-2xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Star className="mx-auto mb-3 h-9 w-9 text-pink animate-wiggle" />
        <h2 className="font-display text-4xl sm:text-5xl">יאללה, נכנסות?</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
          הקהילה חינמית, הפעילות בוואטסאפ, והכניסה פתוחה עכשיו.
        </p>
        <Squiggle className="mx-auto mt-5 h-4 w-28 text-blue" />
      </div>

      <Reveal className="relative mx-auto mt-10 max-w-xl">
        <Sparkle className="absolute -top-8 right-2 h-8 w-8 text-lavender animate-float hidden sm:block" />
        <RavPageFormEmbed />
        <p className="mt-3 text-center text-sm text-ink/60">
          שימו לב: אחרי המילוי תתבקשו לאשר שאתן לא בוטיות, ואז תועברו ללינק ההצטרפות.
        </p>
      </Reveal>
    </section>
  );
});

export default CTASection;
