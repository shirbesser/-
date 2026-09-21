#!/usr/bin/env node
// Render Instagram covers from template.html with Playwright (Chromium).
//
//   node covers/render.cjs --layout editorial --headline "לא כל *קראט* נראה אותו דבר" \
//        --sub "אותו קראט, מראה אחר" --kicker "מיתוסים על יהלומים" \
//        --image covers/frames/reel1_03.5s.jpg --focus "50% 35%" --out covers/out/reel1.png
//
//   node covers/render.cjs --batch covers/covers.json            # many covers at once
//
// Options: --layout editorial|arch|series|number|split|deep   (with text)
//          --layout photo|mat|window                           (image only, no text)
//          --layout cutout --image cut.png [--deco arch|circle|none] [--rotate -12] [--zoom .9] [--no-logo]   (jewelry cut out on cream)
//          --grade warm|soft|deep|off   one colour treatment for every frame   --mat tight|wide (mat only)
//          --size feed (1080x1350) | reel (1080x1920)
//          --zoom 1.6 crop tighter; --center "40% 55%" = the point of the source frame to put in the middle of the crop
//          (--focus "50% 20%" is the lower-level object-position alternative when --center is not given)
//          --tone blush|cream (series only)  --numeral "03" (number only)  --logo path/to/logo.png
//          --headline-size 90   --frame-line   --jpg (write JPEG instead of PNG)
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  try { return require('playwright'); } catch (_) {}
  try { return require('/opt/node22/lib/node_modules/playwright'); } catch (_) {}
  console.error('playwright not found. Run: npm i -g playwright  (Chromium must be installed)');
  process.exit(1);
}

function parseArgs(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) o[key] = true; else { o[key] = next; i++; }
  }
  return o;
}

const fileUrl = (p) => 'file://' + path.resolve(p);

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const here = __dirname;
  let jobs = [];
  if (args.batch) {
    const list = JSON.parse(fs.readFileSync(args.batch, 'utf8'));
    const base = path.dirname(path.resolve(args.batch));
    jobs = list.map((j) => ({ ...j, _base: base }));
  } else {
    if (!args.headline && !args.image) { console.error('need --headline (or --batch file.json)'); process.exit(1); }
    jobs = [{ ...args, _base: process.cwd() }];
  }

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(fileUrl(path.join(here, 'template.html')));
  await page.evaluate(() => document.fonts.ready);

  let n = 0;
  for (const job of jobs) {
    const size = job.size === 'reel' ? 'reel' : 'feed';
    const height = size === 'reel' ? 1920 : 1350;
    await page.setViewportSize({ width: 1080, height });
    const resolve = (p) => (p ? (path.isAbsolute(p) ? p : path.resolve(job._base, p)) : undefined);
    const image = resolve(job.image);
    if (job.image && !fs.existsSync(image)) console.warn(`! image not found: ${image} (rendering placeholder)`);
    const cover = {
      layout: job.layout || 'editorial',
      size,
      tone: job.tone,
      kicker: job.kicker,
      headline: job.headline,
      sub: job.sub,
      numeral: job.numeral,
      headlineSize: job.headlineSize,
      frameLine: !!job.frameLine,
      textless: !!job.textless,
      grade: job.grade,
      mat: job.mat,
      logoLight: !!job.logoLight,
      focus: job.focus,
      zoom: job.zoom ? parseFloat(job.zoom) : 1,
      center: job.center,
      rotate: job.rotate ? parseFloat(job.rotate) : 0,
      deco: job.deco,
      noLogo: !!job.noLogo,
      withLogo: !!job.withLogo,
      image: image && fs.existsSync(image) ? fileUrl(image) : undefined,
      logoImage: job.logo ? fileUrl(resolve(job.logo)) : undefined,
    };
    await page.evaluate((c) => window.setCover(c), cover);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(60);
    const out = resolve(job.out) || path.join(here, 'out', `cover-${String(++n).padStart(2, '0')}.png`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const type = job.jpg || out.toLowerCase().endsWith('.jpg') ? 'jpeg' : 'png';
    await page.screenshot({ path: out, type, ...(type === 'jpeg' ? { quality: 92 } : {}) });
    console.log(`✓ ${path.relative(process.cwd(), out)}  [${cover.layout}, ${size}]`);
  }
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
