# קאברים לרילס — The Jewelry Gallery

טמפלייטים לקאברים של הגלריה (1080×1350 לפיד, 1080×1920 לרילס), בשפה של תיק המותג:
קרם / שמפניה / בלאש, זהב, כותרת עברית בולטת עם מילה אחת בזהב, ולוגו THE JEWELRY GALLERY למטה.

## מה יש כאן

| קובץ | תפקיד |
|---|---|
| `template.html` | הטמפלייט עצמו: 6 לייאאוטים, ניתן לעריכה ב-CSS |
| `render.cjs` | מרנדר קאבר (או אצווה) ל-PNG/JPG דרך Chromium |
| `frames.cjs` | גוזר פריימים מסרטון: contact sheet, פריים לפי שנייה, או "הכי טובים" אוטומטית |
| `covers.json` | דוגמת אצווה: 6 הקאברים עם טקסט שב-`preview/` |
| `looks.json` | דוגמת אצווה לקאברים-תמונה בלבד (photo + grade warm) |
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

## לוקים לתמונה בלבד (בלי טקסט)

כשהקאברים הם רק תמונה, האחידות מגיעה משלושה דברים: אותו חיתוך 4:5, אותו גרייד צבע, ואותה מסגרת.

| `layout` | מה זה |
|---|---|
| `photo` | הפריים ממלא את כל הקאבר (ברירת המחדל המומלצת לפיד נקי) |
| `mat` | פספרטו קרם סביב הפריים, כמו הדפס בגלריה (`--mat wide` לשוליים רחבים) |
| `window` | הפריים בתוך חלון קשת על קרם, עם קו זהב דק |

| `grade` | מה זה עושה |
|---|---|
| `warm` | שמפניה חמה, מנטרל גוון קר של צילום טלפון. **זה הקו של הגלריה.** |
| `soft` | בהיר ואוורירי יותר |
| `deep` | כהה יותר עם ויניֶטה, לצילומים דרמטיים / מאחורי הקלעים |
| `off` | בלי גרייד |

```bash
node covers/render.cjs --layout photo --grade warm --image covers/frames/reel1_03.50s.jpg --focus "50% 45%" --out covers/out/reel1.jpg
node covers/render.cjs --batch covers/looks.json     # אצווה של קאברים-תמונה
```

ההשוואה בין הלוקים והגריידים: `preview/looks-grid.png` (מודגם על פריימים סינתטיים).

## חדות: פריים חד, בלי כתוביות, מוגדל חכם

```bash
# הפריים הכי חד בסביבת רגע (±0.5 שנ׳), מדורג לפי האזור של התכשיט (x y w h באחוזים), רק מאותו שוט
python3 covers/sharpest.py covers/frames/reel3.mp4 --at 24.86 --window 0.5 --region "30 25 50 45"
#    -> covers/frames/reel3_24.99s_sharp.png

# הסרת כתובית / לוגו צרובים (אזור באחוזים; הטקסט הלבן מזוהה לבד ומתמלא מהסביבה)
python3 covers/untext.py covers/frames/reel5_13.35s_sharp.png --region "15 55 70 9"
#    -> ..._clean.png  (+ ..._mask.png לבדיקה)

# הגדלה חכמה x2 (EDSR, ~4 דק׳ לפריים 720p על CPU) לפני החיתוך
python3 covers/upscale.py covers/frames/reel5_13.35s_sharp_clean.png --scale 2
#    -> ..._x2.png   ואז render עם --image על הקובץ המוגדל
```

דרישות לחלק הזה: `pip install opencv-contrib-python-headless numpy`. המודלים יורדים לבד ל-`covers/models/` (לא ב-git).

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
- `--center "40% 55%"` — איזו נקודה בפריים המקורי תשב במרכז החיתוך (באחוזים). עובד יחד עם `--zoom`, ונוח יותר מ-`--focus` כשרוצים לכוון לתכשיט עצמו.
- `--zoom 1.6` — חיתוך צמוד יותר סביב נקודת ה-focus. שימושי כשיש כתוביות או לוגו צרובים בסרטון: מזיזים את ה-focus אל החלק הנקי ומגדילים זום עד שהטקסט יוצא מהפריים (במחיר חדות, כי המקור 720px).

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
