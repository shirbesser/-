import { useState } from "react";
import CTAButton from "./CTAButton";
import { Sparkle } from "./doodles/Doodles";

export default function SignupForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("רוצה שנדע איך לקרוא לך, כתבי שם");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("נראה שיש טעות קטנה במייל, אפשר לבדוק שוב");
      return;
    }
    setError("");
    onSuccess(name.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto max-w-xl border-[3px] border-ink bg-paper p-7 shadow-doodle-lg sm:p-9"
      style={{ borderRadius: "26px 8px 26px 8px" }}
    >
      <Sparkle className="absolute -top-5 -left-5 h-10 w-10 text-pink animate-wiggle" />

      <div className="flex flex-col gap-4">
        <label className="block text-right">
          <span className="mb-1.5 block font-display text-base">שם</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="איך קוראים לך?"
            className="w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-base outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/40"
          />
        </label>

        <label className="block text-right">
          <span className="mb-1.5 block font-display text-base">מייל</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-base outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/40"
          />
        </label>

        {error && (
          <p className="text-right font-display text-sm text-pink-dark">{error}</p>
        )}

        <CTAButton type="submit" className="mt-1 w-full justify-center">
          שלחו לי את הקישור לקהילה
        </CTAButton>
      </div>

      <p className="mt-4 text-center text-sm text-ink/60">
        לא ספאם. לא חפירות. רק תוכן, עדכונים וכלים שיעזרו לך לעבוד חכם יותר.
      </p>
    </form>
  );
}
