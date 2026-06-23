import { useEffect, useRef } from "react";

const FORM_SCRIPT_SRC =
  "https://form2.ravpage.co.il/4e99c65ac1e851bd776143487af9f2906A383962";

export default function RavPageFormEmbed() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = FORM_SCRIPT_SRC;
    script.charset = "UTF-8";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} />;
}
