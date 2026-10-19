import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

// Une page thématique = un fichier Markdown (nom de fichier = URL)
//   français : src/content/accompagnements/*.md     → /<slug>/
//   anglais  : src/content/accompagnements-en/*.md  → /en/<slug>/ (champ `fr` = slug français)
const fields = ({ image }: SchemaContext) => ({
  order: z.number(),
  menuLabel: z.string(), // libellé court (menu, liste de la home)
  summary: z.string(), // une ligne pour la home
  seoTitle: z.string().max(65), // <title> : ~60 caractères max, sinon Google coupe
  description: z.string().max(160), // meta description
  title: z.string(), // H1 visible
  intro: z.string(),
  extra: z.object({ title: z.string(), text: z.string() }).optional(),
  signs: z.array(z.string()), // « Vous vous reconnaissez ? »
  practice: z.string(), // « En pratique »
  image: image(),
  imageAlt: z.string(),
});

const accompagnements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accompagnements' }),
  schema: (ctx) => z.object(fields(ctx)),
});

const accompagnementsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accompagnements-en' }),
  schema: (ctx) => z.object({ ...fields(ctx), fr: z.string() }),
});

// Mes écrits : un texte = un fichier Markdown (src/content/ecrits/*.md), affichés sur /mes-ecrits/
// dans l'ordre de `order`. Dans le texte, « --- » sépare les passages (ornement à l'affichage).
const ecrits = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ecrits' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    pullQuote: z.string().optional(), // phrase du texte mise en exergue
  }),
});

export const collections = { accompagnements, accompagnementsEn, ecrits };
