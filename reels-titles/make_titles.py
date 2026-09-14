#!/usr/bin/env python3
"""
Creata (קריאטה) – Hebrew reel title overlays for CapCut.

Generates, for every title in TITLES:
  output/title_XX.png          – text only, transparent 1080x1920
  output/title_XX_sticker.png  – same title inside a tilted mustard sticker
plus output/contact_sheet.png with everything on a grey background.

Requires: Pillow built with libraqm (for RTL shaping).  Run: python3 make_titles.py
"""
import os, re
from PIL import Image, ImageDraw, ImageFont, ImageFilter, features

assert features.check("raqm"), "Pillow needs libraqm for RTL text"

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_PATH = os.path.join(HERE, "fonts", "Rubik[wght].ttf")
OUT = os.path.join(HERE, "output")

# ---- brand spec ------------------------------------------------------------
W, H = 1080, 1920
CENTER_Y = 960
MAX_W = 900
SIZE_MAX, SIZE_MIN = 100, 80
SUB_RATIO = 0.5              # subtitle size relative to the title size
LINE_SPACING = 1.15
SUB_GAP = 22                 # px between title block and subtitle

CREAM = (0xF5, 0xED, 0xE3, 255)
MUSTARD = (0xE8, 0xC8, 0x7D, 255)
BORDEAUX = (0x9D, 0x5C, 0x6C, 255)

TEXT_SHADOW = dict(offset=(0, 4), blur=14, alpha=int(255 * 0.35))
STICKER_SHADOW = dict(offset=(0, 8), blur=18, alpha=int(255 * 0.30))
STICKER_RADIUS = 14
STICKER_PAD_Y, STICKER_PAD_X = 18, 36
STICKER_TILT = 2             # degrees, counter‑clockwise (= tilted to the left)

# (title, subtitle or None).  A word in [brackets] is highlighted in mustard.
TITLES = [
    ("מי אישר עוד חופש?", "מצאנו לכן מה לעשות איתם"),
    ("כל אחת עושה משהו אחר. כולן יחד.", None),
    ("וכן, גם אתן יכולות לצבוע", None),
    ("לא צריך לדעת לצייר", "אנחנו כאן כשנתקעים"),
    ("ובסוף נשאר לכן גם משהו משלכן", None),
    ("בחול המועד תהיו האושפיזין שלנו", None),
    ("בחול המועד באים ל־Creata", None),
]

# ---- helpers ---------------------------------------------------------------
_font_cache = {}
def font(size, weight=900):
    key = (size, weight)
    if key not in _font_cache:
        f = ImageFont.truetype(FONT_PATH, size)
        f.set_variation_by_axes([weight])
        _font_cache[key] = f
    return _font_cache[key]

def hebrew_punct(s):
    """Hebrew quotes, no long dashes."""
    s = s.replace('"', "״").replace("'", "׳")
    s = s.replace("—", " ").replace("–", " ").replace(" - ", " ")
    return re.sub(r"\s+", " ", s).strip()

def parse_words(s):
    """-> list of (word, highlighted)"""
    out = []
    for w in hebrew_punct(s).split(" "):
        m = re.fullmatch(r"\[(.+)\]", w)
        out.append((m.group(1), True) if m else (w, False))
    return out

RTL = dict(direction="rtl", language="he", features=["kern"])

def text_w(s, f):
    return ImageDraw.Draw(Image.new("L", (1, 1))).textlength(s, font=f, **RTL)

def line_width(words, f):
    return text_w(" ".join(w for w, _ in words), f)

def split_two(words, f, max_w):
    """Best 2‑line split: both lines <= max_w, no single orphan word, balanced."""
    best = None
    for i in range(2, len(words) - 1):          # >=2 words on each line
        a, b = words[:i], words[i:]
        wa, wb = line_width(a, f), line_width(b, f)
        if wa <= max_w and wb <= max_w:
            score = abs(wa - wb)
            if best is None or score < best[0]:
                best = (score, [a, b])
    return best[1] if best else None

def layout(words):
    """Decide font size and line breaks. Returns (size, [lines])."""
    # 1) one line at 100, shrinking down to 80
    for size in range(SIZE_MAX, SIZE_MIN - 1, -2):
        if line_width(words, font(size)) <= MAX_W:
            return size, [words]
    # 2) two lines, largest size that fits (100 -> 80)
    for size in range(SIZE_MAX, SIZE_MIN - 1, -2):
        lines = split_two(words, font(size), MAX_W)
        if lines:
            return size, lines
    # 3) fallback: force best split at 80, allow overflow
    f = font(SIZE_MIN)
    best = None
    for i in range(1, len(words)):
        a, b = words[:i], words[i:]
        s = max(line_width(a, f), line_width(b, f))
        if best is None or s < best[0]:
            best = (s, [a, b])
    return SIZE_MIN, best[1]

def draw_line(draw, words, f, cx, y, color, hl_color):
    """Draw one RTL line centred at cx with the baseline‑top at y; highlighted
    words in hl_color.  Rendered right‑to‑left word by word so colours can differ."""
    full = " ".join(w for w, _ in words)
    total = text_w(full, f)
    right = cx + total / 2
    x_right = right
    for i, (w, hl) in enumerate(words):
        # width of this word plus everything before it (kerning‑accurate)
        prefix = " ".join(x for x, _ in words[: i + 1])
        wend = text_w(prefix, f)
        draw.text((right - wend, y), w, font=f, fill=hl_color if hl else color,
                  anchor="la", **RTL)

def line_height(size):
    return round(size * LINE_SPACING)

def render_block(title_words, sub, size, lines, color, hl_color, pad=(0, 0)):
    """Render title (+ subtitle) onto a tight transparent layer.
    Returns (layer, block_w, block_h)."""
    f = font(size)
    lh = line_height(size)
    block_h = lh * len(lines)
    widths = [line_width(l, f) for l in lines]
    block_w = max(widths)
    sub_f = None
    if sub:
        sub_f = font(round(size * SUB_RATIO), 800)
        sub_w = text_w(sub, sub_f)
        sub_h = round(sub_f.size * LINE_SPACING)
        block_w = max(block_w, sub_w)
        block_h += SUB_GAP + sub_h
    pw, ph = pad
    layer = Image.new("RGBA", (int(block_w) + 2 * pw + 40, int(block_h) + 2 * ph + 40), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = layer.width / 2
    y = ph + 20
    for l in lines:
        # vertically centre glyphs inside the 1.15 line box
        draw_line(d, l, f, cx, y + (lh - size) / 2, color, hl_color)
        y += lh
    if sub:
        y += SUB_GAP
        d.text((cx, y + (sub_h - sub_f.size) / 2), sub, font=sub_f, fill=color,
               anchor="ma", **RTL)
    return layer

def soft_shadow(layer, offset, blur, alpha):
    """Black blurred copy of layer's alpha."""
    a = layer.getchannel("A")
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sh.putalpha(a.point(lambda v: v * alpha // 255))
    # pad so the blur doesn't clip
    pad = blur * 3
    big = Image.new("RGBA", (layer.width + 2 * pad, layer.height + 2 * pad), (0, 0, 0, 0))
    big.paste(sh, (pad + offset[0], pad + offset[1]))
    return big.filter(ImageFilter.GaussianBlur(blur)), pad

def compose_center(layer, shadow=None):
    """Place layer (with optional shadow) centred on a transparent canvas."""
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    x = (W - layer.width) // 2
    y = CENTER_Y - layer.height // 2
    if shadow is not None:
        sh, pad = shadow
        canvas.alpha_composite(sh, (x - pad, y - pad))
    canvas.alpha_composite(layer, (x, y))
    return canvas

def make_plain(title_words, sub, size, lines):
    layer = render_block(title_words, sub, size, lines, CREAM, MUSTARD)
    return compose_center(layer, soft_shadow(layer, **TEXT_SHADOW))

def make_sticker(title_words, sub, size, lines):
    text = render_block(title_words, sub, size, lines, BORDEAUX, BORDEAUX,
                        pad=(STICKER_PAD_X, STICKER_PAD_Y))
    # text layer has a 20px margin baked in; the sticker rect sits inside it
    rect = Image.new("RGBA", text.size, (0, 0, 0, 0))
    ImageDraw.Draw(rect).rounded_rectangle(
        (20, 20, text.width - 21, text.height - 21), radius=STICKER_RADIUS, fill=MUSTARD)
    rect.alpha_composite(text)
    sticker = rect.rotate(STICKER_TILT, resample=Image.BICUBIC, expand=True)
    return compose_center(sticker, soft_shadow(sticker, **STICKER_SHADOW))

def contact_sheet(items):
    """items: list of (label, plain_img, sticker_img)."""
    crop_h = 640
    scale = 0.5
    cw, ch = int(W * scale), int(crop_h * scale)
    gap, margin, label_h = 24, 40, 44
    cols = 2
    sheet_w = margin * 2 + cols * cw + gap
    sheet_h = margin * 2 + len(items) * (ch + label_h + gap)
    sheet = Image.new("RGB", (sheet_w, sheet_h), (0x8C, 0x8C, 0x8C))
    d = ImageDraw.Draw(sheet)
    lf = font(28, 700)
    y = margin
    for label, plain, sticker in items:
        d.text((margin, y + 6), label, font=lf, fill=(30, 30, 30))
        d.text((margin + cw + gap, y + 6), f"{label} (sticker)", font=lf, fill=(30, 30, 30))
        y += label_h
        for col, img in enumerate((plain, sticker)):
            crop = img.crop((0, CENTER_Y - crop_h // 2, W, CENTER_Y + crop_h // 2))
            crop = crop.resize((cw, ch), Image.LANCZOS)
            x = margin + col * (cw + gap)
            # slightly darker tile so the crop bounds are visible
            tile = Image.new("RGBA", (cw, ch), (0x80, 0x80, 0x80, 255))
            tile.alpha_composite(crop)
            sheet.paste(tile.convert("RGB"), (x, y))
        y += ch + gap
    return sheet

def main():
    os.makedirs(OUT, exist_ok=True)
    items = []
    for n, (title, sub) in enumerate(TITLES, 1):
        words = parse_words(title)
        sub = hebrew_punct(sub) if sub else None
        size, lines = layout(words)
        plain = make_plain(words, sub, size, lines)
        sticker = make_sticker(words, sub, size, lines)
        p1 = os.path.join(OUT, f"title_{n:02d}.png")
        p2 = os.path.join(OUT, f"title_{n:02d}_sticker.png")
        plain.save(p1, optimize=True)
        sticker.save(p2, optimize=True)
        items.append((f"title_{n:02d}", plain, sticker))
        print(f"title_{n:02d}: size={size}px lines={len(lines)} "
              f"widths={[round(line_width(l, font(size))) for l in lines]}  |  {title}")
    contact_sheet(items).save(os.path.join(OUT, "contact_sheet.png"), optimize=True)
    print("contact_sheet.png written")

if __name__ == "__main__":
    main()
