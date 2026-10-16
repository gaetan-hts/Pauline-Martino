// Captures pleine page desktop / tablette / mobile de toutes les pages → screenshots/
// Prérequis : `npm run build && npm run preview` dans un autre terminal.
// 1re fois : npx playwright install chromium
// Usage : npm run shots [-- --base=http://localhost:4321]
import { chromium } from 'playwright';
import { mkdir, readdir } from 'node:fs/promises';

const base = (process.argv.find((a) => a.startsWith('--base='))?.slice(7) ?? 'http://localhost:4321').replace(/\/$/, '');
const out = 'screenshots';

const slugs = (await readdir('src/content/accompagnements')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
const pages = [['accueil', '/'], ...slugs.map((s) => [s, `/${s}`]), ['mentions-legales', '/mentions-legales']];

const devices = [
  ['desktop', { width: 1440, height: 900 }],
  ['tablette', { width: 820, height: 1180 }],
  ['mobile', { width: 390, height: 844 }],
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
let overflow = 0;

for (const [device, viewport] of devices) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // Les éléments sticky se dupliquent dans une capture pleine page : on les neutralise
    await page.addStyleTag({ content: '.sticky,[class*=":sticky"]{position:static!important}' });
    // Fait défiler la page pour charger les images en loading="lazy"
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await page.waitForLoadState('networkidle');

    const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const file = `${out}/${name}-${device}.png`;
    await page.screenshot({ path: file, fullPage: true });
    if (wide > 0) {
      overflow++;
      console.log(`⚠ débordement horizontal (${wide}px) : ${file}`);
    } else {
      console.log(`✓ ${file}`);
    }
  }
  await page.close();
}

await browser.close();
console.log(overflow ? `\n${overflow} capture(s) avec débordement horizontal.` : '\nAucun débordement horizontal.');
process.exitCode = overflow ? 1 : 0;
