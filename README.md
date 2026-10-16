# Site de Pauline Martino, hypnothérapeute à La Farlède

Site vitrine statique : **Astro 5 + Tailwind CSS 4**, aucune base de données, aucun JavaScript côté client hormis le menu mobile.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ en local
npm run shots    # captures desktop/tablette/mobile → screenshots/ (preview doit tourner ; 1re fois : npx playwright install chromium)
```

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Téléphone, e-mail, adresse, horaires, tarif, réseaux, lien Medoucine | `src/data/site.ts` |
| Citations (bandeaux verts) | `src/data/site.ts` → `quotes` |
| Questions fréquentes (affichées + envoyées à Google) | `src/data/faq.ts` |
| Les 7 pages thématiques | `src/content/accompagnements/*.md` (le nom du fichier = l'URL) |
| Page d'accueil | `src/pages/index.astro` |
| Couleurs et typographies | `src/styles/global.css` (bloc `@theme`) |
| Photos | `src/assets/photos/` (redimensionnées et converties en WebP automatiquement) |

Ajouter une page thématique = copier un `.md`, changer le contenu et `order`. Elle apparaît seule dans la home, le menu du footer et le sitemap.

## SEO en place

- `<title>` ≤ 60 caractères et meta description par page, URL canonique, Open Graph (image 1200×630 générée)
- Données structurées : `LocalBusiness` (adresse, horaires, zone desservie), `Person`, `FAQPage`, `Service`, `BreadcrumbList`
- `sitemap-index.xml` + `robots.txt`
- `/llms.txt` et `/llms-full.txt` pour les assistants IA (ChatGPT, Claude, Perplexity…), générés depuis les mêmes données : `src/data/llms.ts`
- Polices auto-hébergées (pas d'appel à Google Fonts : plus rapide et conforme RGPD)
- Typographie française (espaces insécables avant `: ; ! ?`, apostrophes courbes) appliquée au build : `src/typo-fr.mjs`
- Chaque bouton « Prendre rendez-vous » envoie un `utm_campaign` différent vers Medoucine (ex. `stress-anxiete-hero`) pour savoir quelle page génère des réservations

## Déploiement (Cloudflare Pages, gratuit)

1. Pousser le repo sur GitHub
2. Cloudflare Pages → Create project → connecter le repo
3. Build command : `npm run build` · Output : `dist`
4. Ajouter le domaine personnalisé, puis mettre l'URL définitive dans `astro.config.mjs` (`site`), `src/data/site.ts` (`url`) et `public/robots.txt`

## À faire avant la mise en ligne

- [ ] Nom de domaine définitif
- [ ] Mentions légales : SIRET et hébergeur (`src/pages/mentions-legales.astro`)
- [ ] Logo définitif (cerveau + rameau d'olivier) à la place de `OliveMark.astro` et `public/favicon.svg`
- [ ] Avis Google : widget ou sélection validée par Pauline (section `#avis` de la home)
- [ ] Lien « Réserver un appel gratuit » de l'accompagnement à deux voix
- [ ] Page « Mes écrits » (blog) + inscription « être prévenu de la parution » (Brevo)
- [ ] Mettre à jour la fiche Google Business Profile pour pointer vers le site
- [ ] Déclarer le site dans Google Search Console et soumettre le sitemap
