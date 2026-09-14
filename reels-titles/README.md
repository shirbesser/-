# Creata – Hebrew reel titles

Transparent 1080×1920 PNG title overlays for CapCut, generated with Python + Pillow.

```bash
pip install pillow          # Pillow must be built with libraqm (RTL shaping)
python3 reels-titles/make_titles.py
```

- Edit the `TITLES` list in `make_titles.py` (title, optional small subtitle).
  A word in `[brackets]` is coloured mustard in the plain version.
- Output: `output/title_XX.png`, `output/title_XX_sticker.png`, `output/contact_sheet.png`.
- Font: Rubik variable (OFL), rendered at weight 900 (Black).
