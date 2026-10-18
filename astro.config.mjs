// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import typoFr from './src/typo-fr.mjs';

// TODO: remplacer par le nom de domaine définitif avant la mise en ligne
export default defineConfig({
  site: 'https://www.pauline-martino-hypnose.fr',
  // Une page = un dossier avec index.html : les URL marchent sur n'importe quel hébergeur
  // ou serveur local (/sommeil/ → sommeil/index.html), sans réécriture d'URL.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap(), typoFr()],
  vite: { plugins: [tailwindcss()] },
});
