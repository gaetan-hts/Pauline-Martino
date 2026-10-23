# CLAUDE.md : site de Pauline Martino

Contexte de travail pour Claude Code. À lire avant toute modification.

## Le projet

Site vitrine de **Pauline Martino, hypnothérapeute et praticienne NEMO** à La Farlède (Var, 83210), à 15 min de Toulon. Elle consulte au cabinet et en visio.
Développeur : Gaëtan Honthaas. Cliente : Pauline.

**Objectif n°1 : le référencement local.** Apparaître sur « hypnose La Farlède / Toulon / La Garde / Hyères… » et faire cliquer sur « Prendre rendez-vous ».
**Public :** des particuliers (adultes, parents d'enfants dès 5 ans, ados, seniors, couples), souvent en situation de fragilité. Le ton est doux, rassurant, sans jargon et sans promesse.

## Stack et commandes

- **Astro 5.18** (volontairement pas Astro 7 : API v5 connue et stable), génération 100 % statique, `build.format: 'directory'` + `trailingSlash: 'always'` (une page = `dossier/index.html`, les URL marchent sur n'importe quel hébergeur ou serveur local ; **tous les liens internes finissent par `/`**)
- **Tailwind CSS 4** via `@tailwindcss/vite`. Les tokens sont dans `src/styles/global.css` (`@theme`)
- `@astrojs/sitemap`, `sharp` (images), polices auto-hébergées via Fontsource
- Zéro framework JS côté client. Seul script : le toggle du menu mobile dans `Header.astro`
- Hébergement : **Cloudflare Workers** (projet `pauline-martino`, Workers Builds depuis GitHub `master` : `npm run build` puis `npx wrangler deploy`, config `wrangler.jsonc`). Domaine `pauline-martino-hypnose.fr` (registrar IONOS, DNS à passer chez Cloudflare), URL canonique `https://www.pauline-martino-hypnose.fr`. Procédure dans le README.
- **Mot de passe de préversion :** `worker/index.js` (Basic Auth devant tous les fichiers grâce à `run_worker_first`, mot de passe en dur `Paupau1337`, `X-Robots-Tag: noindex`). Ouvrir au public : variable `SITE_PUBLIC=true` sur le Worker, puis redéployer. Ne pas recréer de dossier `functions/` : c'est une fonctionnalité Cloudflare Pages, ignorée par un Worker.

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
  data/avis.ts            ← avis choisis par Pauline (mot pour mot) + liens vers Google / Medoucine
  content/ecrits/*.md     ← Mes écrits : les textes de Pauline (page /mes-ecrits/)
  data/llms.ts            ← contenu de /llms.txt et /llms-full.txt, généré depuis site.ts, faq.ts
                            et la collection (pages/llms.txt.ts, pages/llms-full.txt.ts)
  content.config.ts       ← schéma Zod de la collection « accompagnements »
  content/accompagnements/*.md     ← les 7 pages thématiques FR (nom de fichier = URL)
  content/accompagnements-en/*.md  ← leur traduction EN (champ `fr` = slug français, pour hreflang)
  data/services.ts        ← getServices(lang) : pages thématiques triées + URL + URL de la traduction
  i18n/config.ts          ← langues, chemins (homePath, legalPath, servicePath, anchor)
  i18n/ui.ts              ← textes d'interface FR/EN (header, footer, boutons, gabarit, avis)
  i18n/home.ts            ← textes de la home FR (texte de Pauline) / EN (traduction)
  components/pages/       ← HomePage, ServicePage : gabarits communs aux deux langues
  pages/index.astro, pages/en/index.astro ← <HomePage lang=…/> : home (one-page longue, ancres #accompagnements #qui-suis-je
                            #techniques #formation #infos-pratiques #avis #faq)
  pages/[slug].astro, pages/en/[slug].astro ← <ServicePage/> : pages thématiques
  pages/en/legal-notice.astro ← mentions légales EN
  pages/mentions-legales.astro
  layouts/Layout.astro    ← <head> SEO, OG, JSON-LD LocalBusiness commun, header/footer
  components/             ← Header, Footer, BookingButton, Quote, Logo, SocialIcons,
                            Reviews (section avis), Illustration (SVG hypnose / nemo dans l'arche)
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

## Version anglaise (désactivée)

- **Désactivée** (`englishEnabled = false` dans `i18n/config.ts`) : Pauline ne fait pas de séances en anglais. Aucune page `/en/`, pas de sélecteur ni de hreflang. Tout le code et les traductions restent en place ; passer le flag à `true` suffit à tout réactiver.

- Le français est la langue principale (racine `/`), l'anglais est sous `/en/` avec des slugs anglais. Chaque page déclare ses `alternates` → balises hreflang (fr, en, x-default = fr) + sélecteur FR/EN.
- Toute modification de texte se fait **dans les deux langues** : `i18n/home.ts`, `i18n/ui.ts`, `data/faq.ts` (`faq.fr` / `faq.en`), `siteEn` dans `site.ts`, et le `.md` correspondant dans `accompagnements-en/`.
- La traduction anglaise est à faire relire par Pauline. Les avis restent en français (`lang="fr"`, mention « Reviews are shown in their original French »).
- `typo-fr.mjs` ignore les pages `<html lang="en">` (pas d'espace avant « ? ! : ; » en anglais).
- Campagnes UTM des pages EN préfixées `en-` (`en-home-hero`, `en-sleep-pratique`…).

## Contenu : règles

1. **Les textes viennent de Pauline** (`docs/brief-*.md`). On garde sa voix et ses formulations, en se limitant à corriger l'orthographe et la ponctuation, et à couper les paragraphes trop longs. Pas de réécriture marketing.
2. **Ne jamais inventer d'avis, de témoignages, de chiffres ou de résultats.** La section `#avis` affiche une carte par plateforme (note + **palier** d'avis « 100+ », « 50+ », jamais un chiffre exact qui serait vite faux) et les 7 avis choisis par Pauline (6 Google, 1 Medoucine) copiés mot pour mot, fautes comprises (`avis.ts`). Un avis Google s'affiche « avis Google », seul Medoucine est « avis vérifié ». Pas d'API : relever note et palier de temps en temps dans `avis.ts`.
3. **Pas d'allégations thérapeutiques.** La liste « Accroches par problématique » / « Mots clés » en fin de `brief-presentation-pauline.md` (cancer, épilepsie, endométriose, allergies, AVC, troubles sexuels, etc.) **ne doit pas être utilisée** dans le site. Raisons : risque DGCCRF / exercice illégal de la médecine, pénalité Google sur les sujets santé (YMYL), et une liste de mots-clés n'a aucun effet SEO. Gaëtan a validé ce point. Le SEO passe par les 7 pages thématiques.
4. La mention « ne remplace pas un suivi médical ou psychologique » a été retirée partout à la demande de Gaëtan (oct. 2026). Ne pas la remettre sans qu'il le demande ; les règles 2 et 3 (rien d'inventé, aucune allégation thérapeutique) restent d'autant plus importantes.
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
- **SEO pour les IA (GEO) :** `/llms.txt` (résumé + liens, format llmstxt.org) et `/llms-full.txt` (tous les textes) sont générés au build. Le texte « Approche » de `llms.ts` reprend la home : le mettre à jour si celle-ci change. Mêmes règles que le site : rien d'inventé, pas d'allégation thérapeutique.
- Le levier SEO externe le plus fort reste la **fiche Google Business Profile** de Pauline, qui doit pointer vers le site une fois en ligne.

## Charte graphique

Palette **sobre, pastel saumon et doré** (oct. 2026). Aucun bloc sombre : fonds clairs, texte encre (gris chaud) partout. Photos phares en arche (`.arch`), le reste en `rounded-2xl/3xl`.

| Token | Hex | Rôle |
|---|---|---|
| `creme` | `#faf5ef` | fond principal |
| `sable` | `#f3e8dc` | sections alternées, fonds de cartes |
| `cuivre` | `#a5513f` | saumon profond : accents texte, titres H3, liens (5:1 sur crème) |
| `miel` | `#c9a25a` | doré : **boutons « Prendre rendez-vous »** (texte encre, 6,4:1), bandeau final, étoiles des avis |
| `champagne` | `#eedfc0` | doré pâle : encarts « En pratique » / RDV |
| `saumon` | `#efc3b6` | saumon pastel : footer, bandeau de citation |
| `peche`, `sauge`, `ciel` | `#f5dccb`, `#a9b8a2`, `#c9d8e0` | illustrations |
| `encre` | `#3d3431` | texte, contour de focus |

- Sur un bloc coloré (champagne, miel), le bouton RDV prend la classe `btn-on-color` (fond crème) pour ressortir.
- **Typo :** `Young Serif` pour les titres et les citations (`font-serif`), `Figtree Variable` pour le texte (`font-sans`). Corps 17 px, interligne 1,65.
- **À éviter :** labels en MAJUSCULES espacées, mot isolé en couleur ou en italique dans un titre, numérotation 01/02/03 décorative, animations d'entrée sur chaque section, cartes identiques avec ombre grise.
- **Logo :** `Logo.astro` (cerveau dont l'intérieur est un arbre en feuilles, vectorisé depuis le fichier de Pauline, en `currentColor`) + `public/favicon.svg` (même tracé en pivoine).
- **Footer :** fond doré (`miel`), texte encre, bouton RDV `btn-on-color`. Pas de liste de communes dans le texte (elles restent dans le JSON-LD `areaServed`).
- **Header :** 4 entrées seulement (« Accompagnements » avec menu déroulant CSS des 7 pages au survol / focus, Qui suis-je, Mes écrits, Infos pratiques). « Hypnose et NEMO » et la FAQ sont dans le menu mobile et le footer. Téléphone en icône, bouton « Rendez-vous ». Réseaux sociaux en icônes dans le footer (`SocialIcons.astro`).
- **Responsive :** la nav desktop apparaît à partir de `xl` (1280 px). En dessous, bouton menu (pages thématiques + sections + FAQ + langue) + icône téléphone. Le header utilise `max-w-7xl`, le contenu `max-w-6xl` (`.wrap`).
- **Accessibilité :** focus visible (outline argile), lien d'évitement « Aller au contenu », `prefers-reduced-motion` respecté.

### Photos (`src/assets/photos/`)

| Fichier | Contenu | Utilisée sur |
|---|---|---|
| `pauline-portrait.jpg` | portrait, veste taupe, fond sculpté blanc | hero home, image OG par défaut (et OG de confiance-en-soi) |
| `pauline-bord-de-mer.jpg` | Pauline souriante, coucher de soleil | qui suis-je (OG de phobies) |
| `coucher-soleil-coeur.jpg` | mains en cœur autour du soleil | OG de souvenirs douloureux uniquement |
| `cabinet-fauteuil-hypnose.jpg` | fauteuil gris, niche vert olive | section #cabinet (grande photo) |
| `cabinet-salle.jpg` | vue de la salle, suspensions rotin | section #cabinet |
| `cabinet-bureau-lampe.jpg` | bureau, lampe de sel | section #cabinet |
| `cabinet-bureau-jour.jpg` | bureau en lumière naturelle | section #cabinet |
| `cabinet-vue-ensemble.jpg` | salle, fauteuil vintage, lampe | bandeau final home |
| `pauline-christophe.jpg` | Pauline et Christophe Rodrik | section « Ma formation » (#formation) |

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
2. ~~Page « Mes écrits »~~ **faite** (`/mes-ecrits/`, collection `src/content/ecrits/`, un texte = un .md, « --- » = ornement entre passages, `pullQuote` = exergue placée automatiquement après le passage qui la contient ; texte sur deux colonnes en desktop, l'exergue traverse les colonnes, l'ornement entre passages n'est affiché qu'en une colonne (mobile)). Reste : formulaire Brevo pour « Être prévenu de la parution » (aujourd'hui un lien mailto), Keystatic. Ancien plan : collection de contenu `ecrits` (Markdown), listing + page article (`Article` JSON-LD). Contenu de départ dans `brief-presentation-pauline.md` (section « Mes écrits »). Ajouter :
   - un formulaire « Être prévenu de la parution » (Brevo, liste gratuite)
   - un « Un mot sur vos lectures ? » (formulaire Web3Forms ou mailto)
   - la mention © du texte
3. **Keystatic** (CMS git-based gratuit) pour que Pauline publie ses écrits seule
4. Page dédiée « Accompagnement à deux voix » (avec Christophe Rodrik) + avis Google d'Evidence Relationnelle + vrai lien « Réserver un appel gratuit »
5. Avis : faire valider les 6 extraits par Pauline, remplacer le lien Google par celui de sa fiche
6. Page contact avec formulaire (Web3Forms) et carte
7. Logo définitif + favicon
8. Mentions légales : SIRET et hébergeur
9. Mise en ligne :
   - domaine, puis mettre à jour `astro.config.mjs` (`site`), `site.ts` (`url`) et `public/robots.txt`
   - Search Console + sitemap
   - lien depuis la fiche Google Business Profile
10. MVP2 : prise de RDV Cal.com (voir plus haut)

## Images

- Les pages thématiques n'ont plus de photo : une illustration par thème (`Illustration.astro`, clé = slug FR), aussi dans les cartes « Les autres accompagnements ». Le champ `image` des `.md` ne sert plus qu'à l'image de partage (OG).
- Style des illustrations : **éditorial** (références Pinterest de Gaëtan) : petites scènes douces (mur + sol, grain de papier léger via un filtre SVG), un personnage simple sans visage détaillé, une métaphore (tête dans un nuage, porte ouverte sur le ciel, main qui sort d'un trou, reflet dans le miroir…). Palette pastel propre aux illustrations dans l'objet `c` de `Illustration.astro`.
- **Personnages** : jamais dessinés à main levée. Ils sont générés par `src/components/illustration/figure.ts` à partir d'un squelette (tête, épaules, coudes, poignets, hanches, genoux, chevilles) aux proportions d'adulte (`standing(x, haut, échelle)` donne une pose debout de base, que l'on modifie). On place les articulations, `figure()` dessine buste, membres, mains, chaussures et cheveux (vue de face, de dos ou de profil).
- **Illustrations définitives (prévu)** : images générées par IA par Gaëtan à partir de `docs/prompts-illustrations.md`, déposées dans `src/assets/illustrations/<clé>.png|jpg|webp`. Une image présente remplace automatiquement le SVG de même clé (`Illustration.astro`). Pas de Figma.

- Pas d'images générées façon « photo » (faux cabinet, fausses personnes) : sur un site de thérapeute, l'authenticité compte. Là où une image manque, on dessine une illustration SVG dans la charte (`Illustration.astro` : arche, olive, argile, lin).
- Hors bandeaux photo, les illustrations animées respectent `prefers-reduced-motion` (règle globale dans `global.css`).
