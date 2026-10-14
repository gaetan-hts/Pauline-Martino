// Typographie française : espace insécable avant « : ; ! ? » et à l'intérieur des guillemets,
// pour éviter qu'un « ? » ou un « : » se retrouve seul en début de ligne.
// Appliqué au HTML généré, uniquement sur le texte (pas les balises, scripts ni styles).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NBSP = ' ';
const NNBSP = ' ';

function fixText(t) {
  return t
    .replace(/(\p{L})(?:'|&#39;)(\p{L})/gu, '$1’$2')
    .replace(/ ([;!?»])/g, `${NNBSP}$1`)
    .replace(/ :(?=\s|$)/g, `${NBSP}:`)
    .replace(/« /g, `«${NNBSP}`);
}

function fixHtml(html) {
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/g);
  return parts.map((p) => (p.startsWith('<') ? p : fixText(p))).join('');
}

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) await writeFile(p, fixHtml(await readFile(p, 'utf8')));
  }
}

export default function typoFr() {
  return {
    name: 'typo-fr',
    hooks: { 'astro:build:done': async ({ dir }) => walk(fileURLToPath(dir)) },
  };
}
