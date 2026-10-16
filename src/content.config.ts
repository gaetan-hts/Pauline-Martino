import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Une page thématique = un fichier Markdown dans src/content/accompagnements/
const accompagnements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accompagnements' }),
  schema: ({ image }) =>
    z.object({
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
    }),
});

export const collections = { accompagnements };
