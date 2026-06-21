import { useEffect, useState } from "react";
import CTAButton from "./CTAButton";

export default function StickyCTA({ onClick }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > window.innerHeight * 0.85);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <CTAButton onClick={onClick} size="sm" className="w-full max-w-xs justify-center sm:w-auto">
        הצטרפי לקהילה בוואטסאפ
      </CTAButton>
    </div>
  );
}
