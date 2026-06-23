import { useEffect, useRef, useState } from "react";

const FORM_SCRIPT_SRC =
  "https://form2.ravpage.co.il/4aba56d67804e492581ad015fda01c6c6A3A6DCB";

// This widget relies on document.write() to render itself, which only works
// while a document is still being parsed. By the time a React effect runs,
// the host page has already finished loading, so the script silently does
// nothing there. Giving it a fresh iframe document (still mid-parse when the
// script tag executes) lets it render correctly.
const FRAME_DOC = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <base href="https://form2.ravpage.co.il/" target="_blank" />
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
