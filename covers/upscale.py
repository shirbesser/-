#!/usr/bin/env python3
"""Super-resolution upscale for video frames before they go into a cover.

    python3 covers/upscale.py covers/frames/reel5_13.17s_sharp.png --scale 2
    -> covers/frames/reel5_13.17s_sharp_x2.png

Uses OpenCV dnn_superres with EDSR (best quality, slow on CPU: ~1 min per 720p frame) and falls back to
FSRCNN, then to Lanczos + light unsharp mask if no model is available. Models live in covers/models/
(not in git) and are downloaded on first use.
"""
import argparse, os, sys, urllib.request
import cv2

MODELS = {
    ('edsr', 2): 'https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x2.pb',
    ('edsr', 3): 'https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x3.pb',
    ('edsr', 4): 'https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb',
    ('fsrcnn', 2): 'https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x2.pb',
    ('fsrcnn', 3): 'https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x3.pb',
    ('fsrcnn', 4): 'https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x4.pb',
}
HERE = os.path.dirname(os.path.abspath(__file__))

def model_path(kind, scale):
    d = os.path.join(HERE, 'models'); os.makedirs(d, exist_ok=True)
    p = os.path.join(d, f'{kind.upper()}_x{scale}.pb')
    if not os.path.exists(p) or os.path.getsize(p) < 10000:
        url = MODELS[(kind, scale)]
        print(f'downloading {os.path.basename(p)} ...', file=sys.stderr)
        urllib.request.urlretrieve(url, p)
    return p

def upscale(img, scale, kind):
    for k in ([kind] if kind != 'auto' else ['edsr', 'fsrcnn']):
        try:
            sr = cv2.dnn_superres.DnnSuperResImpl_create()
            sr.readModel(model_path(k, scale)); sr.setModel(k, scale)
            return sr.upsample(img), k
        except Exception as e:  # model missing / download blocked
            print(f'{k} unavailable ({e}); trying next', file=sys.stderr)
    up = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4)
    blur = cv2.GaussianBlur(up, (0, 0), 1.2)
    return cv2.addWeighted(up, 1.35, blur, -0.35, 0), 'lanczos'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('image'); ap.add_argument('--scale', type=int, default=2, choices=[2, 3, 4])
    ap.add_argument('--model', default='auto', choices=['auto', 'edsr', 'fsrcnn', 'lanczos'])
    ap.add_argument('--out', default=None)
    a = ap.parse_args()
    img = cv2.imread(a.image)
    if img is None:
        sys.exit(f'cannot read {a.image}')
    if a.model == 'lanczos':
        out, used = upscale(img, a.scale, 'none'), 'lanczos'
        out = out[0]
    else:
        out, used = upscale(img, a.scale, a.model)
    dst = a.out or os.path.splitext(a.image)[0] + f'_x{a.scale}.png'
    cv2.imwrite(dst, out)
    print(f'✓ {os.path.relpath(dst)}  {img.shape[1]}x{img.shape[0]} -> {out.shape[1]}x{out.shape[0]} ({used})')

if __name__ == '__main__':
    main()
