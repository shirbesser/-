import { HeartDoodle } from "../components/doodles/Doodles";

export default function Footer() {
  return (
    <footer className="relative border-t-[3px] border-ink bg-ink px-4 py-12 text-center text-cream">
      <p className="font-display text-2xl">לגדול באינסטגרם עם שיר</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-cream/70">
        תוכן, אינסטגרם, קאנבה ו-AI לבעלות עסקים ומנהלות סושיאל
      </p>
      <HeartDoodle className="mx-auto mt-5 h-6 w-7 text-pink" />
    </footer>
  );
}
