#!/usr/bin/env node
// Pull still frames out of reels so they can be dropped into the cover templates.
//
//   node covers/frames.cjs sheet  video.mp4 [--n 12]                 -> covers/frames/<name>_sheet.png (timestamps printed on each tile)
//   node covers/frames.cjs grab   video.mp4 --at 3.5 [--at 7.25 ...]  -> covers/frames/<name>_03.50s.jpg (full resolution)
//   node covers/frames.cjs best   video.mp4 [--n 6]                  -> covers/frames/<name>_best_1.jpg ... (ffmpeg picks representative, low-motion frames)
//
// Requires ffmpeg. Looks for: $FFMPEG, then `ffmpeg` on PATH, then the imageio-ffmpeg binary (pip install imageio-ffmpeg).
const { execFileSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function findFfmpeg() {
  if (process.env.FFMPEG && fs.existsSync(process.env.FFMPEG)) return process.env.FFMPEG;
  const which = spawnSync('which', ['ffmpeg']);
  if (which.status === 0) return which.stdout.toString().trim();
  const py = spawnSync('python3', ['-c', 'import imageio_ffmpeg as i; print(i.get_ffmpeg_exe())']);
  if (py.status === 0) return py.stdout.toString().trim();
  console.error('ffmpeg not found. Install it, or: pip install imageio-ffmpeg');
  process.exit(1);
}

function parseArgs(argv) {
  const o = { at: [] };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--at') { o.at.push(parseFloat(argv[++i])); continue; }
    if (a.startsWith('--')) { o[a.slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; continue; }
    rest.push(a);
  }
  return { o, rest };
}

const FF = findFfmpeg();
const FFPROBE = path.join(path.dirname(FF), 'ffprobe');
const run = (args) => execFileSync(FF, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });

function duration(video) {
  // ffprobe is not always shipped next to ffmpeg; fall back to parsing ffmpeg's banner.
  if (fs.existsSync(FFPROBE)) {
    const out = execFileSync(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).toString();
    return parseFloat(out);
  }
  const r = spawnSync(FF, ['-i', video]);
  const m = r.stderr.toString().match(/Duration: (\d+):(\d+):(\d+\.?\d*)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0;
}

const fmt = (t) => `${t.toFixed(2).padStart(5, '0')}s`;

async function main() {
  const { o, rest } = parseArgs(process.argv.slice(2));
  const [cmd, video] = rest;
  if (!cmd || !video || !fs.existsSync(video)) {
    console.error('usage: frames.cjs sheet|grab|best <video> [--n N] [--at seconds ...] [--out dir]');
    process.exit(1);
  }
  const name = path.basename(video).replace(/\.[^.]+$/, '');
  const outDir = path.resolve(o.out || path.join(__dirname, 'frames'));
  fs.mkdirSync(outDir, { recursive: true });

  if (cmd === 'grab') {
    if (!o.at.length) { console.error('grab needs at least one --at <seconds>'); process.exit(1); }
    for (const t of o.at) {
      const out = path.join(outDir, `${name}_${fmt(t)}.jpg`);
      run(['-ss', String(t), '-i', video, '-frames:v', '1', '-q:v', '2', out]);
      console.log(`✓ ${path.relative(process.cwd(), out)}`);
    }
    return;
  }

  if (cmd === 'best') {
    const n = parseInt(o.n || '6', 10);
    const dur = duration(video);
    // thumbnail=N picks the most representative frame out of every N frames.
    const batch = Math.max(30, Math.floor((dur * 30) / n));
    const pattern = path.join(outDir, `${name}_best_%d.jpg`);
    run(['-i', video, '-vf', `thumbnail=${batch}`, '-frames:v', String(n), '-vsync', 'vfr', '-q:v', '2', pattern]);
    console.log(`✓ ${n} frames -> ${path.relative(process.cwd(), outDir)}/${name}_best_*.jpg`);
    return;
  }

  if (cmd === 'sheet') {
    const n = parseInt(o.n || '12', 10);
    const dur = duration(video);
    if (!dur) { console.error('could not read duration'); process.exit(1); }
    const tmp = fs.mkdtempSync(path.join(outDir, '.sheet-'));
    const tiles = [];
    for (let i = 0; i < n; i++) {
      const t = ((i + 0.5) / n) * dur;
      const f = path.join(tmp, `${i}.jpg`);
      run(['-ss', String(t), '-i', video, '-frames:v', '1', '-vf', 'scale=360:-2', '-q:v', '4', f]);
      tiles.push({ t, f });
    }
    // Build the contact sheet in the browser so the labels use a real font.
    let playwright;
    try { playwright = require('playwright'); } catch (_) { playwright = require('/opt/node22/lib/node_modules/playwright'); }
    const cols = 4, rows = Math.ceil(n / cols);
    const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#2A2420;font-family:sans-serif">
      <div style="display:grid;grid-template-columns:repeat(${cols},360px);gap:14px;padding:14px">
      ${tiles.map(({ t, f }) => `<figure style="margin:0;position:relative"><img src="file://${f}" style="display:block;width:360px">
        <figcaption style="position:absolute;left:8px;top:8px;background:rgba(0,0,0,.65);color:#fff;font-size:20px;padding:4px 10px;border-radius:6px">${t.toFixed(2)}s</figcaption></figure>`).join('')}
      </div></body>`;
    const htmlPath = path.join(tmp, 'sheet.html');
    fs.writeFileSync(htmlPath, html);
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage({ viewport: { width: cols * 374 + 14, height: rows * 700 } });
    await page.goto('file://' + htmlPath);
    const out = path.join(outDir, `${name}_sheet.png`);
    await page.screenshot({ path: out, fullPage: true });
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`✓ ${path.relative(process.cwd(), out)}  (${n} frames, ${dur.toFixed(1)}s video)`);
    console.log('  choose a timestamp, then: node covers/frames.cjs grab <video> --at <seconds>');
    return;
  }

  console.error(`unknown command: ${cmd}`);
  process.exit(1);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
