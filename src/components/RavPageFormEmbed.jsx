import { useEffect, useRef, useState } from "react";

const FORM_SCRIPT_SRC =
  "https://form2.ravpage.co.il/4e99c65ac1e851bd776143487af9f2906A383962";

const FRAME_DOC = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <base target="_blank" />
    <style>
      body { margin: 0; font-family: 'Rubik', sans-serif; }
    </style>
  </head>
  <body>
    <script type="text/javascript" src="${FORM_SCRIPT_SRC}" charset="UTF-8"></script>
  </body>
</html>`;

export default function RavPageFormEmbed() {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(480);

  useEffect(() => {
    const interval = setInterval(() => {
      const body = iframeRef.current?.contentDocument?.body;
      if (body?.scrollHeight) setHeight(body.scrollHeight);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={FRAME_DOC}
      title="טופס הרשמה"
      style={{ width: "100%", height, border: "none", display: "block" }}
    />
  );
}
