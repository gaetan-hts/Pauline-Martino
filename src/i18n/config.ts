// Langues du site : le français à la racine (/), l'anglais sous /en/.
// Toutes les URL internes finissent par « / » (build.format: 'directory', trailingSlash: 'always').
export const langs = ['fr', 'en'] as const;
export type Lang = (typeof langs)[number];

export const ogLocale: Record<Lang, string> = { fr: 'fr_FR', en: 'en_GB' };

export const homePath: Record<Lang, string> = { fr: '/', en: '/en/' };
export const legalPath: Record<Lang, string> = { fr: '/mentions-legales/', en: '/en/legal-notice/' };
export const servicePath = (lang: Lang, slug: string) => (lang === 'fr' ? `/${slug}/` : `/en/${slug}/`);
/** Ancre de la home dans la bonne langue, ex. anchor('en', 'faq') → /en/#faq */
export const anchor = (lang: Lang, id: string) => `${homePath[lang]}#${id}`;

/** URL des deux versions d'une page, pour hreflang et le sélecteur de langue */
export type Alternates = Record<Lang, string>;

/**
 * Version anglaise désactivée : Pauline ne fait pas de séances en anglais (oct. 2026).
 * Les traductions restent dans le repo ; passer à true pour regénérer /en/, le sélecteur FR/EN et hreflang.
 */
export const englishEnabled = false;
