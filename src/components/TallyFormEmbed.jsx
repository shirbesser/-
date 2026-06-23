import { useEffect } from "react";

const TALLY_FORM_ID = "KYOZJ7";
const TALLY_EMBED_SRC = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

export default function TallyFormEmbed() {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.onload = () => window.Tally?.loadEmbeds();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      data-tally-src={TALLY_EMBED_SRC}
      loading="lazy"
      width="100%"
      height="400"
      title="הרשמה לקהילה"
      style={{ border: "none", display: "block" }}
    />
  );
}
