# לגדול באינסטגרם עם שיר

Landing page (React + Vite + Tailwind CSS) for the free WhatsApp community "לגדול באינסטגרם עם שיר". Hebrew copy, RTL layout, mobile-first.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The WhatsApp invite link used by the signup form is a placeholder — update `WHATSAPP_LINK` in `src/components/SignupForm.jsx` with the real community link.
- The form has no backend; submitting it validates the fields locally and reveals the WhatsApp CTA button.
- Replace the placeholder photo area in `src/components/AboutSection.jsx` with Shir's real photo when available.

## Boost guide landing page (`boost-guide/`)

A standalone, dependency-free sales page for **המדריך לבוסט באינסטגרם — מהדורת ספטמבר 2026**. Open `boost-guide/index.html` directly or host the folder as-is; no build step.

Before launch, replace the placeholders marked in the file:

- `PURCHASE_URL` in the `<script>` at the bottom is set to the Grow checkout link; change it there to update every "אני רוצה את המדריך" button.
- The guide cover images are the RavPages uploads Shir sent (three `<img data-placeholder="guide-cover">` tags); a designed CSS cover renders if they fail to load.
- Shir's portrait at `boost-guide/assets/shir.png`.
- Headline font: FB Jambo (`boost-guide/assets/FbJambo-Regular.otf`) for Hebrew; Karantina from Google Fonts covers Latin and digits.

`boost-guide/ravpages-embed.html` is a self-contained copy for pasting into an HTML block in RavPages: same page with the portrait and font inlined as data URIs and all CSS classes prefixed `bg-` so the host page's styles cannot collide. Regenerate it after editing `index.html` with `python3 boost-guide/build-embed.py`.
