#!/usr/bin/env python3
"""Pick the sharpest frame around a moment in a video.

    python3 covers/sharpest.py covers/frames/reel5.mp4 --at 13.17 --window 0.5 --region "10 30 60 40"

Extracts every frame in [at-window, at+window], scores each by the variance of the Laplacian
(a standard focus / motion-blur measure) inside --region (x y w h, in % of the frame; default = whole frame),
prints the ranking and writes the best frame as  <frames dir>/<name>_<time>s_sharp.png.
"""
import argparse, os, shutil, subprocess, sys, tempfile
import cv2, numpy as np

def ffmpeg():
    if os.environ.get('FFMPEG') and os.path.exists(os.environ['FFMPEG']):
        return os.environ['FFMPEG']
    if shutil.which('ffmpeg'):
        return 'ffmpeg'
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()

def score(img, region):
    h, w = img.shape[:2]
    if region:
        x, y, rw, rh = [float(v) / 100 for v in region.split()]
        img = img[int(y * h):int((y + rh) * h), int(x * w):int((x + rw) * w)]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video'); ap.add_argument('--at', type=float, required=True)
    ap.add_argument('--window', type=float, default=0.5); ap.add_argument('--region', default=None)
    ap.add_argument('--out', default=None, help='output dir (default: covers/frames)')
    ap.add_argument('--top', type=int, default=5)
    ap.add_argument('--same-shot', type=float, default=0.75, help='min histogram correlation with the reference frame')
    a = ap.parse_args()
    out_dir = a.out or os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frames')
    os.makedirs(out_dir, exist_ok=True)
    name = os.path.splitext(os.path.basename(a.video))[0]
    start = max(0.0, a.at - a.window)
    tmp = tempfile.mkdtemp(prefix='sharp-')
    subprocess.run([ffmpeg(), '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(start), '-i', a.video,
                    '-t', str(2 * a.window), os.path.join(tmp, 'f_%04d.png')], check=True)
    # frame timestamps: read the real frame rate from ffmpeg's banner
    info = subprocess.run([ffmpeg(), '-i', a.video], capture_output=True, text=True).stderr
    import re
    m = re.search(r'(\d+(?:\.\d+)?) fps', info); fps = float(m.group(1)) if m else 30.0
    # reference = the frame closest to --at; frames from a different shot (a cut inside the window) are dropped
    files = sorted(os.listdir(tmp))
    ref_idx = min(range(len(files)), key=lambda i: abs(start + i / fps - a.at))
    def hist(img):
        h = cv2.calcHist([cv2.cvtColor(img, cv2.COLOR_BGR2HSV)], [0, 1], None, [32, 32], [0, 180, 0, 256])
        return cv2.normalize(h, h).flatten()
    ref_hist = hist(cv2.imread(os.path.join(tmp, files[ref_idx])))
    ranked, dropped = [], 0
    for f in files:
        idx = int(f[2:6]) - 1
        img = cv2.imread(os.path.join(tmp, f))
        if cv2.compareHist(ref_hist, hist(img), cv2.HISTCMP_CORREL) < a.same_shot:
            dropped += 1; continue
        ranked.append((score(img, a.region), start + idx / fps, os.path.join(tmp, f)))
    if dropped:
        print(f'  ({dropped} frames skipped: different shot)')
    ranked.sort(reverse=True)
    for s, t, _ in ranked[:a.top]:
        print(f'  {t:6.2f}s  sharpness {s:8.1f}')
    best_s, best_t, best_f = ranked[0]
    dst = os.path.join(out_dir, f'{name}_{best_t:05.2f}s_sharp.png')
    shutil.copy(best_f, dst)
    shutil.rmtree(tmp, ignore_errors=True)
    print(f'✓ {os.path.relpath(dst)}  (best of {len(ranked)} frames around {a.at}s)')

if __name__ == '__main__':
    main()
