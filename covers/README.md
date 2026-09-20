# קאברים לרילס — The Jewelry Gallery

טמפלייטים לקאברים של הגלריה (1080×1350 לפיד, 1080×1920 לרילס), בשפה של תיק המותג:
קרם / שמפניה / בלאש, זהב, כותרת עברית בולטת עם מילה אחת בזהב, ולוגו THE JEWELRY GALLERY למטה.

## מה יש כאן

| קובץ | תפקיד |
|---|---|
| `template.html` | הטמפלייט עצמו: 6 לייאאוטים, ניתן לעריכה ב-CSS |
| `render.cjs` | מרנדר קאבר (או אצווה) ל-PNG/JPG דרך Chromium |
| `frames.cjs` | גוזר פריימים מסרטון: contact sheet, פריים לפי שנייה, או "הכי טובים" אוטומטית |
| `covers.json` | דוגמת אצווה: 6 הקאברים שב-`preview/` |
| `preview/` | הרינדורים לדוגמה (עם פלייסהולדר במקום פריים) |
| `fonts/` | Heebo, Assistant, Frank Ruhl Libre, Cormorant Garamond, Montserrat (מקומי, בלי תלות ברשת) |

## הלייאאוטים

| `layout` | מתי | איפה הפריים |
|---|---|---|
| `editorial` | פריים חזק שממלא הכול, הוק למעלה | מלא (full-bleed), דהייה קרמית למעלה |
| `arch` | תכשיט/יד יפה, נקי ויוקרתי | חלון קשת במרכז |
| `series` | תוכן מומחית / סדרות (מיתוסים, תקציבים) | חצי תחתון, נכנס בדהייה |
| `number` | תוכן רשימה: "3 דברים", "4 צורות" | ריבוע מעוגל למטה-שמאל, מספר סריפי גדול |
| `split` | פריים בחלק העליון, פאנל קרם למטה | 60% עליונים |
| `deep` | מאחורי הקלעים / הבורסה, קונטרסט בגריד | כרטיס במרכז על רקע טאופ כהה |

## תהליך עבודה

```bash
# 1) לראות מה יש בסרטון (8–16 פריימים עם חותמות זמן)
node covers/frames.cjs sheet reel1.mp4 --n 12
#    -> covers/frames/reel1_sheet.png

# 2) לגזור את הפריים שנבחר בגודל מלא (אפשר כמה)
node covers/frames.cjs grab reel1.mp4 --at 3.5 --at 7.2
#    -> covers/frames/reel1_03.50s.jpg

#    או לתת ל-ffmpeg לבחור פריימים יציבים אוטומטית
node covers/frames.cjs best reel1.mp4 --n 6

# 3) לרנדר קאבר
node covers/render.cjs --layout editorial \
  --kicker "מיתוסים על יהלומים" \
  --headline "לא כל *קראט* | נראה אותו דבר" \
  --sub "אותו קראט. אז למה אחת נראית גדולה יותר?" \
  --image covers/frames/reel1_03.50s.jpg --focus "50% 35%" \
  --out covers/out/reel1-cover.png

# 3ב) או הרבה קאברים בבת אחת מקובץ JSON
node covers/render.cjs --batch covers/covers.json
```

### פרמטרים לכותרת

- `*מילה*` — המילה נצבעת בזהב.
- `|` — שבירת שורה ידנית.
- `--headline-size 88` — להקטין כותרת ארוכה.
- `--size reel` — 1080×1920 (הקומפוזיציה ממורכזת, הרקע מתארך).
- `--focus "50% 30%"` — איזה חלק מהפריים נשאר בחיתוך (X% Y%), כמו object-position.
- `--tone cream` — ב-`series` בלבד: רקע קרם במקום בלאש.
- `--numeral 03` — ב-`number` בלבד.
- `--logo path/to/logo.png` — להחליף את הלוגו הטקסטואלי בקובץ הלוגו האמיתי.
- `--frame-line` — קו זהב דק סביב הפריים.

### שדות ב-JSON

אותם שמות, ב-camelCase: `layout, kicker, headline, sub, image, focus, out, size, tone, numeral, headlineSize, logo, frameLine`.
נתיבים יחסיים לקובץ ה-JSON.

## דרישות

- Node 18+ עם Playwright (`npm i -g playwright` + Chromium).
- ffmpeg: או מותקן במערכת, או `pip install imageio-ffmpeg` (הסקריפט מוצא אותו לבד). אפשר גם `FFMPEG=/path/to/ffmpeg`.

## הערות לגריד באינסטגרם

- הגריד מציג 3:4, כלומר קאבר 4:5 נחתך כ-34px מכל צד. כל הטקסט יושב במרווח של 72px, אז הוא בטוח.
- בקאבר לריל (9:16) הגריד מציג את המרכז; `--size reel` שומר את הקומפוזיציה בתוך 1350 הפיקסלים האמצעיים.
- כדי שהפיד ייראה מסודר: לסירוגין לייאאוט "עם הרבה טקסט" (`series`, `number`) ולייאאוט "עם הרבה תמונה" (`editorial`, `arch`, `split`), ו-`deep` אחד לכל 6–9 פוסטים לקונטרסט.
