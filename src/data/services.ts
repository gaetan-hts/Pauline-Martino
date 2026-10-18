// Pages thématiques dans une langue, triées, avec leur URL et celle de leur traduction.
import { getCollection, type CollectionEntry } from 'astro:content';
import { servicePath, type Alternates, type Lang } from '../i18n/config';

export type Service = {
  entry: CollectionEntry<'accompagnements'> | CollectionEntry<'accompagnementsEn'>;
  slug: string;
  key: string; // slug français, commun aux deux langues (illustration, etc.)
  url: string;
  alternates: Alternates;
};

export async function getServices(lang: Lang): Promise<Service[]> {
  const fr = await getCollection('accompagnements');
  const en = await getCollection('accompagnementsEn');
  const enByFr = new Map(en.map((e) => [e.data.fr, e.id]));
  const frByEn = new Map(en.map((e) => [e.id, e.data.fr]));

  const list = lang === 'fr' ? fr : en;
  return list
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const frSlug = lang === 'fr' ? entry.id : frByEn.get(entry.id)!;
      const enSlug = lang === 'en' ? entry.id : enByFr.get(entry.id);
      return {
        entry,
        slug: entry.id,
        key: frSlug,
        url: servicePath(lang, entry.id),
        alternates: {
          fr: servicePath('fr', frSlug),
          // page pas encore traduite : la version anglaise renvoie à l'accueil anglais
          en: enSlug ? servicePath('en', enSlug) : '/en/',
        },
      };
    });
}
