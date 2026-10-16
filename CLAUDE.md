# CLAUDE.md : site de Pauline Martino

Contexte de travail pour Claude Code. À lire avant toute modification.

## Le projet

Site vitrine de **Pauline Martino, hypnothérapeute et praticienne NEMO** à La Farlède (Var, 83210), à 15 min de Toulon. Elle consulte au cabinet et en visio.
Développeur : Gaëtan Honthaas. Cliente : Pauline.

**Objectif n°1 : le référencement local.** Apparaître sur « hypnose La Farlède / Toulon / La Garde / Hyères… » et faire cliquer sur « Prendre rendez-vous ».
**Public :** des particuliers (adultes, parents d'enfants dès 5 ans, ados, seniors, couples), souvent en situation de fragilité. Le ton est doux, rassurant, sans jargon et sans promesse.

## Stack et commandes

- **Astro 5.18** (volontairement pas Astro 7 : API v5 connue et stable), génération 100 % statique, `build.format: 'file'`
- **Tailwind CSS 4** via `@tailwindcss/vite`. Les tokens sont dans `src/styles/global.css` (`@theme`)
- `@astrojs/sitemap`, `sharp` (images), polices auto-hébergées via Fontsource
- Zéro framework JS côté client. Seul script : le toggle du menu mobile dans `Header.astro`
- Hébergement prévu : Cloudflare Pages (gratuit). Domaine provisoire : `https://www.pauline-martino-hypnose.fr`

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ + passe typo FR (voir plus bas)
npm run preview
npm run shots      # captures desktop/tablette/mobile → screenshots/ (preview doit tourner)
                   # 1re fois : npx playwright install chromium
```

**Toujours** après une modif visuelle : `npm run build && npm run preview`, puis `npm run shots`. Regarder les captures et vérifier qu'aucune n'affiche « ⚠ débordement horizontal ».

## Arborescence

```
src/
  data/site.ts            ← téléphone, e-mail, adresse, horaires, tarif, réseaux, communes voisines,
                            bookingUrl(campaign) vers Medoucine, citations
  data/faq.ts             ← FAQ (affichée sur la home + JSON-LD FAQPage)
  data/llms.ts            ← contenu de /llms.txt et /llms-full.txt, généré depuis site.ts, faq.ts
                            et la collection (pages/llms.txt.ts, pages/llms-full.txt.ts)
  content.config.ts       ← schéma Zod de la collection « accompagnements »
  content/accompagnements/*.md  ← les 7 pages thématiques (nom de fichier = URL)
  pages/index.astro       ← home (one-page longue, ancres #accompagnements #qui-suis-je
                            #techniques #infos-pratiques #avis #faq)
  pages/[slug].astro      ← gabarit des pages thématiques
  pages/mentions-legales.astro
  layouts/Layout.astro    ← <head> SEO, OG, JSON-LD LocalBusiness commun, header/footer
  components/             ← Header, Footer, BookingButton, Quote, OliveMark (logo provisoire)
  styles/global.css       ← tokens Tailwind + .wrap .arch .btn .btn-rdv .btn-ghost .prose-pauline
  typo-fr.mjs             ← intégration Astro : espaces insécables FR + apostrophes courbes au build
  assets/photos/          ← photos (optimisées en WebP par <Image>)
docs/
  brief-presentation-pauline.md   ← texte de Pauline : home, qui suis-je, techniques, infos, écrits,
                                    autre activité, FAQ, liste de mots-clés
  brief-pages-thematiques.md      ← texte de Pauline : les 7 pages thématiques
  sources/*.docx                  ← originaux Word envoyés par Pauline
  sources/photos-non-utilisees/   ← photos écartées (voir plus bas)
scripts/screenshots.mjs
```

## Contenu : règles

1. **Les textes viennent de Pauline** (`docs/brief-*.md`). On garde sa voix et ses formulations, en se limitant à corriger l'orthographe et la ponctuation, et à couper les paragraphes trop longs. Pas de réécriture marketing.
2. **Ne jamais inventer d'avis, de témoignages, de chiffres ou de résultats.** La section `#avis` reste un emplacement tant qu'on n'a pas ses vrais avis Google.
3. **Pas d'allégations thérapeutiques.** La liste « Accroches par problématique » / « Mots clés » en fin de `brief-presentation-pauline.md` (cancer, épilepsie, endométriose, allergies, AVC, troubles sexuels, etc.) **ne doit pas être utilisée** dans le site. Raisons : risque DGCCRF / exercice illégal de la médecine, pénalité Google sur les sujets santé (YMYL), et une liste de mots-clés n'a aucun effet SEO. Gaëtan a validé ce point. Le SEO passe par les 7 pages thématiques.
4. Chaque page thématique garde sa mention : « Cet accompagnement ne remplace pas un suivi médical ou psychologique… ».
5. Les citations de Pauline (`quotes` dans `site.ts`) sont réparties sur le site en bandeaux (`<Quote>`, ton `olive` ou `lin`). Elle tient à les voir « sur l'ensemble du site ».
6. Une photo est écartée : `panneau-en-seance.jpg`, à cause de la carte « suis tes rêves putain » posée dessus. À ne pas utiliser, sauf si on la recadre sur le seul panneau.

## SEO : règles

- `<title>` **≤ 60 caractères**, imposé par le schéma Zod (`seoTitle` max 65). Les titres « … et les communes voisines (Toulon, La Garde…) » de son document ont été raccourcis volontairement. Les communes vont dans la `description` (≤ 160) et dans le texte.
- Un seul `<h1>` par page. Il est visible et décrit le service et le lieu.
- JSON-LD :
  - `LocalBusiness` sur toutes les pages (adresse, horaires lun/mer/sam 9 h-19 h, `areaServed` = La Farlède + `site.neighbours`), défini dans `Layout.astro`
  - `Person` et `FAQPage` sur la home
  - `Service` et `BreadcrumbList` sur les pages thématiques
- **Pas** de balisage `AggregateRating` sur nos propres avis : Google ne l'affiche plus pour un site qui se note lui-même.
- Liens rendez-vous : toujours `<BookingButton campaign="…">`, jamais l'URL Medoucine en dur. Convention `campaign` : `<page>-<emplacement>`, par ex. `stress-anxiete-hero`, `accueil-infos`, `header-<page>`, `footer`.
- Le téléphone est toujours un lien `tel:` (`site.phoneHref`).
- Images : toujours `<Image>` d'`astro:assets` avec `widths` + `sizes` et un `alt` descriptif en français. L'image LCP (hero) est en `loading="eager" fetchpriority="high"`.
- Typo FR : le post-traitement `typo-fr.mjs` s'en charge au build, donc écrire les textes normalement (« Qu'est-ce que… ? »).
- **SEO pour les IA (GEO) :** `/llms.txt` (résumé + liens, format llmstxt.org) et `/llms-full.txt` (tous les textes) sont générés au build. Le texte « Approche » de `llms.ts` reprend la home : le mettre à jour si celle-ci change. Mêmes règles que le site : rien d'inventé, pas d'allégation thérapeutique, mention « ne remplace pas un suivi médical » conservée.
- Le levier SEO externe le plus fort reste la **fiche Google Business Profile** de Pauline, qui doit pointer vers le site une fois en ligne.

## Charte graphique

La palette est tirée des photos du cabinet. Le pari visuel : **l'arche** (portes cannées du buffet, miroir soleil en rotin), appliquée aux photos principales via la classe `.arch`. Ne pas multiplier les formes : arche pour les photos phares, `rounded-2xl/3xl` pour le reste.

| Token | Hex | Rôle |
|---|---|---|
| `lin` | `#f2ece1` | fond principal |
| `lin-fonce` | `#e6dbc8` | sections alternées, fonds d'image |
| `olive` | `#56622f` | accents texte, bandeau final, titres H3 |
| `olive-nuit` | `#353d1e` | citations, footer, encarts « En pratique » / RDV |
| `sauge` | `#a7ae86` | texte secondaire sur fond olive |
| `argile` | `#a14d2c` | **réservé aux boutons « Prendre rendez-vous »** + puces, focus |
| `argile-clair` | `#e9c4ad` | hover de liens sur fond sombre |
| `rotin` | `#c39a5d` | réserve (non utilisé pour l'instant) |
| `noyer` | `#2e2219` | texte |

- **Typo :** `Young Serif` pour les titres et les citations (`font-serif`), `Figtree Variable` pour le texte (`font-sans`). Corps 17 px, interligne 1,65.
- **À éviter :** labels en MAJUSCULES espacées, mot isolé en couleur ou en italique dans un titre, numérotation 01/02/03 décorative, animations d'entrée sur chaque section, cartes identiques avec ombre grise.
- **Logo provisoire :** `OliveMark.astro` (rameau d'olivier SVG) + `public/favicon.svg`. Pauline veut un logo « cerveau avec ramification d'olivier », à remplacer quand il sera fourni.
- **Responsive :** la nav desktop apparaît à partir de `xl` (1280 px). En dessous, bouton menu + icône téléphone. Le header utilise `max-w-7xl`, le contenu `max-w-6xl` (`.wrap`).
- **Accessibilité :** focus visible (outline argile), lien d'évitement « Aller au contenu », `prefers-reduced-motion` respecté.

### Photos (`src/assets/photos/`)

| Fichier | Contenu | Utilisée sur |
|---|---|---|
| `pauline-portrait.jpg` | portrait, veste taupe, fond sculpté blanc | hero home, confiance-en-soi, image OG par défaut |
| `pauline-bord-de-mer.jpg` | Pauline souriante, coucher de soleil | qui suis-je, phobies |
| `coucher-soleil-coeur.jpg` | mains en cœur autour du soleil | souvenirs douloureux |
| `cabinet-fauteuil-hypnose.jpg` | fauteuil gris, niche vert olive | galerie home, stress-anxiété |
| `cabinet-salle.jpg` | vue de la salle, suspensions rotin | galerie home, sommeil |
| `cabinet-bureau-lampe.jpg` | bureau, lampe de sel | galerie home, émotions |
| `cabinet-bureau-jour.jpg` | bureau en lumière naturelle | habitudes à changer |
| `cabinet-vue-ensemble.jpg` | salle, fauteuil vintage, lampe | bandeau final home |
| `pauline-christophe.jpg` | Pauline et Christophe Rodrik | section « à deux voix » |

## Pièges connus

- **Frontmatter YAML :** toute valeur contenant `: ` doit être entre guillemets (`'…'`, apostrophes doublées `''`), sinon le build casse (« bad indentation of a mapping entry »).
- **Tailwind 4 :** on ne peut pas faire `@apply` d'une classe custom (`.btn`). Il faut combiner dans le markup : `class="btn btn-rdv"`.
- Pour forcer une utilitaire, Tailwind 4 met le `!` en suffixe : `px-5!`, `max-w-7xl!`.
- Les éléments `sticky` apparaissent au mauvais endroit dans les captures Playwright pleine page. Le script de captures les neutralise, ce n'est pas un bug du site.
- Astro échappe `'` en `&#39;` dans les expressions : `typo-fr.mjs` gère les deux formes.

## Prise de rendez-vous

- **MVP1 (actuel) :** tous les boutons renvoient vers son profil **Medoucine** (lien tracé UTM). Avantages : calendrier, rappels, avis et données de santé (RGPD) déjà gérés, et visibilité de la marketplace conservée.
- **MVP2 (à évaluer) :** **Cal.com**, intégré au site. Il se synchronise avec Google Calendar, envoie les confirmations par e-mail et génère un lien Google Meet automatique pour la visio. À vérifier : rappels et paiement selon l'offre, et ne pas collecter le motif de consultation sans cadrage RGPD. Calendly gratuit est trop limité (un seul type de RDV). Ne quitter Medoucine qu'après avoir mesuré ce qu'il apporte (UTM).

## Infos de référence (aussi dans `site.ts`)

- Cabinet : 119 avenue de la République, 83210 La Farlède. Sur RDV, lundi, mercredi et samedi, de 9 h à 19 h
- Séance : 1 h, 80 €. Paiement par virement, CB, chèque ou espèces. Pas de remboursement Sécu, certaines mutuelles prennent en charge une partie
- Tél. 06 05 53 21 43 · paulinemartino.therapeute@gmail.com
- Medoucine : https://www.medoucine.com/consultation/la-farlede/pauline-martino/22723
- Communes ciblées : Toulon, La Garde, Solliès-Pont, Hyères, La Crau, Cuers
- Formations (Evidence Relationnelle) :
  - 2025 : PNL niveaux 1 et 2, NEMO-EMDR
  - 2024 : Coach holistique, Hypnose Transe Ericksonienne, Hypnose Conversationnelle

## Reste à faire (par priorité)

1. Retours de Pauline sur le draft (couleurs, textes, choix des photos)
2. **Page « Mes écrits »** : collection de contenu `ecrits` (Markdown), listing + page article (`Article` JSON-LD). Contenu de départ dans `brief-presentation-pauline.md` (section « Mes écrits »). Ajouter :
   - un formulaire « Être prévenu de la parution » (Brevo, liste gratuite)
   - un « Un mot sur vos lectures ? » (formulaire Web3Forms ou mailto)
   - la mention © du texte
3. **Keystatic** (CMS git-based gratuit) pour que Pauline publie ses écrits seule
4. Page dédiée « Accompagnement à deux voix » (avec Christophe Rodrik) + avis Google d'Evidence Relationnelle + vrai lien « Réserver un appel gratuit »
5. Section avis : widget Google ou sélection d'avis réels validée par Pauline
6. Page contact avec formulaire (Web3Forms) et carte
7. Logo définitif + favicon
8. Mentions légales : SIRET et hébergeur
9. Mise en ligne :
   - domaine, puis mettre à jour `astro.config.mjs` (`site`), `site.ts` (`url`) et `public/robots.txt`
   - Search Console + sitemap
   - lien depuis la fiche Google Business Profile
10. MVP2 : prise de RDV Cal.com (voir plus haut)
