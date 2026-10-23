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

## Déploiement (Cloudflare Workers, gratuit)

Le site est servi par un Worker Cloudflare (`wrangler.jsonc`) : les fichiers de `dist/` sont servis tels quels, et `worker/index.js` passe avant chacun pour demander le mot de passe de préversion. Le domaine `pauline-martino-hypnose.fr` est déjà celui du code (URL canonique `https://www.pauline-martino-hypnose.fr`).

### 1. Projet Cloudflare (fait)

Workers & Pages → `pauline-martino`, relié au repo GitHub, branche `master` : build `npm run build`, déploiement `npx wrangler deploy`. Chaque `git push` sur `master` redéploie. Le site répond sur `https://pauline-martino.<sous-domaine>.workers.dev` avec le mot de passe : nom d'utilisateur libre, mot de passe `Paupau1337`.

### 2. Brancher le domaine (acheté chez IONOS)

1. Cloudflare → **Add a domain** → `pauline-martino-hypnose.fr` → offre **Free**. Cloudflare importe les enregistrements DNS existants : vérifier les MX si une adresse e-mail IONOS utilise le domaine, et supprimer les enregistrements A/AAAA/CNAME de la page de parking IONOS.
2. Cloudflare affiche **2 serveurs de noms** (`xxx.ns.cloudflare.com`). Chez IONOS : **Domaines & SSL** → le domaine → **DNS** / **Serveurs de noms** → *Utiliser des serveurs de noms personnalisés* → coller les deux serveurs Cloudflare. Si DNSSEC est activé chez IONOS, le désactiver avant.
3. Attendre l'activation (quelques minutes à 24 h, Cloudflare envoie un e-mail).
4. Worker `pauline-martino` → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `www.pauline-martino-hypnose.fr`, puis recommencer avec `pauline-martino-hypnose.fr`. Cloudflare crée les enregistrements DNS et le certificat HTTPS tout seul.
5. Rediriger l'apex vers www : Cloudflare → le domaine → **Rules** → **Redirect Rules** → modèle *Redirect from root to WWW* (301).

### 3. Ouvrir le site au public

1. Compléter les mentions légales : SIRET, et hébergeur = Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA
2. Worker → **Settings** → **Variables and Secrets** → ajouter `SITE_PUBLIC` = `true` → redéployer. Le mot de passe disparaît.
3. [Google Search Console](https://search.google.com/search-console) → propriété **Domaine** `pauline-martino-hypnose.fr` (validation par enregistrement TXT dans Cloudflare) → **Sitemaps** → `https://www.pauline-martino-hypnose.fr/sitemap-index.xml`
4. Fiche Google Business Profile de Pauline → champ **Site web** → `https://www.pauline-martino-hypnose.fr`

## À faire avant la mise en ligne

- [ ] Mentions légales : médiateur de la consommation (`src/pages/mentions-legales.astro`, constante `mediateur`)
- [ ] Logo définitif (cerveau + rameau d'olivier) à la place de `OliveMark.astro` et `public/favicon.svg`
- [ ] Avis Google : widget ou sélection validée par Pauline (section `#avis` de la home)
- [ ] Lien « Réserver un appel gratuit » de l'accompagnement à deux voix
- [ ] Page « Mes écrits » (blog) + inscription « être prévenu de la parution » (Brevo)
- [ ] Mettre à jour la fiche Google Business Profile pour pointer vers le site
- [ ] Déclarer le site dans Google Search Console et soumettre le sitemap
