// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import typoFr from './src/typo-fr.mjs';

// TODO: remplacer par le nom de domaine définitif avant la mise en ligne
export default defineConfig({
  site: 'https://www.pauline-martino-hypnose.fr',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap(), typoFr()],
  vite: { plugins: [tailwindcss()] },
});
