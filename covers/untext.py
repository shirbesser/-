#!/usr/bin/env python3
"""Remove burned-in captions / logos from a frame by inpainting.

    python3 covers/untext.py frame.png --region "20 56 60 7" [--region "..."] [--full] [--out clean.png]

--region  x y w h in % of the frame. Inside each region the bright, low-saturation pixels (white text and
          its glow) are masked automatically and filled from the surrounding image. Use --full to fill the
          whole region instead (for logos on busy backgrounds). Writes <name>_clean.png and <name>_mask.png.
"""
import argparse, os
import cv2, numpy as np

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('image'); ap.add_argument('--region', action='append', required=True)
    ap.add_argument('--full', action='store_true'); ap.add_argument('--out', default=None)
    ap.add_argument('--thresh', type=int, default=170, help='brightness threshold for text pixels (0-255)')
    ap.add_argument('--grow', type=int, default=6, help='dilate the mask by this many px')
    a = ap.parse_args()
    img = cv2.imread(a.image); h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    hls = cv2.cvtColor(img, cv2.COLOR_BGR2HLS)
    for r in a.region:
        x, y, rw, rh = [float(v) / 100 for v in r.split()]
        x0, y0, x1, y1 = int(x * w), int(y * h), int((x + rw) * w), int((y + rh) * h)
        if a.full:
            mask[y0:y1, x0:x1] = 255
        else:
            L, S = hls[y0:y1, x0:x1, 1], hls[y0:y1, x0:x1, 2]
            m = ((L > a.thresh) & (S < 90)).astype(np.uint8) * 255
            # also catch the dark drop-shadow that usually sits under white captions
            mask[y0:y1, x0:x1] = m
    if a.grow:
        mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (a.grow * 2 + 1, a.grow * 2 + 1)))
    out = cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)
    base = os.path.splitext(a.image)[0]
    dst = a.out or base + '_clean.png'
    cv2.imwrite(dst, out); cv2.imwrite(base + '_mask.png', mask)
    print(f'✓ {os.path.relpath(dst)}  (mask: {int((mask > 0).sum())} px)')

if __name__ == '__main__':
    main()
