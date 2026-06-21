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
