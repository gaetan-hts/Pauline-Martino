# Illustrations du site : prompts de génération

Les illustrations sont à générer avec un outil d'image IA (ChatGPT, Midjourney…), puis à déposer dans
`src/assets/illustrations/` avec **exactement** le nom indiqué (`.png`, `.jpg` ou `.webp`).
Dès qu'un fichier est présent, il remplace le dessin SVG correspondant sur tout le site
(page thématique, cartes « Les autres accompagnements », accueil). Astro l'optimise tout seul.

**Format :** paysage 4:3 (par exemple 1600 × 1200 px).

## Style commun (à coller au début de chaque prompt)

> Editorial illustration in the style of modern conceptual magazine art. Soft, muted pastel palette:
> pastel salmon (#EFC3B6), warm cream (#FAF5EF), soft gold (#C9A25A), pale sky blue (#C9D8E0),
> sage green (#A9B8A2), warm brown hair (#6E4B3B). Flat shapes with very gentle shading and a subtle
> paper grain texture. A single young woman with brown hair tied in a low bun, natural adult
> proportions, calm and gentle, minimal facial features. Simple, airy scene with lots of negative
> space: a plain wall and floor. A light, poetic, slightly surreal visual metaphor. No text, no logo,
> no frame. Landscape 4:3.

Pour garder une série cohérente : générer les 10 dans la même conversation et demander
« same style, same character » à partir de la deuxième.

## Les 10 illustrations

| Fichier | Page | Prompt (après le style commun) |
|---|---|---|
| `hypnose` | Accueil, « L'hypnose, c'est quoi ? » | She sits cross-legged on the floor, eyes closed, relaxed; a soft white cloud gently surrounds her head, as if she were inside a daydream. |
| `nemo` | Accueil, « NEMO, c'est quoi ? » | She sits in a comfortable armchair, seen in profile, her eyes following a small golden light that moves from left to right, its path drawn as a soft dotted arc. |
| `stress-anxiete` | Stress et anxiété | She sits cross-legged and patiently untangles a knotted ball of pastel salmon thread on her lap; from her hands the thread becomes a smooth, straight line across the floor. |
| `gestion-des-emotions` | Émotions envahissantes | Seen from behind, shoulders and head, wearing a cream and sage striped sweater; small symbols float around her head: a heart, a tiny rain cloud, a spark, a spiral. |
| `souvenirs-douloureux-deuil-separation` | Souvenirs douloureux | Seen from behind, she stands in front of an open door that reveals a bright blue sky with soft clouds; light spills onto the floor. |
| `phobies-peurs-blocages` | Peurs et blocages | A hand and forearm reach up out of a dark round hole in the floor, toward the light, fingers open. |
| `confiance-en-soi` | Confiance et estime de soi | She stands facing a large round golden mirror; her reflection stands tall and confident with both arms raised. |
| `sommeil` | Sommeil | She sleeps peacefully on a soft white cloud under a crescent moon and a few stars, in pale night colors. |
| `arret-tabac-alimentation` | Habitudes à changer | She steps out of a circle drawn on the floor, whose inside is worn by repeated footprints, and walks calmly toward the light. |
| `ecrits` | Mes écrits | A tiny version of her sits on the page of a giant open notebook, holding an oversized pencil, writing. |

## Après génération

1. Vérifier : proportions des mains et du corps, pas de texte parasite, palette respectée.
2. Renommer (par exemple `sommeil.png`) et déposer dans `src/assets/illustrations/`.
3. `npm run build && npm run preview`, puis `npm run shots` pour vérifier.
4. Les images IA ne sont pas des photos du cabinet ni de Pauline : elles restent des illustrations.

## Continuer la série

**Toutes faites (23/10/2026)** : `hypnose`, `nemo`, `gestion-des-emotions` avec ChatGPT ; les 7 autres avec le générateur d'images de Figma (modèle gpt-image), fichier Figma « Pauline Martino - illustrations » (équipe personnelle de Gaëtan). La section ci-dessous reste utile pour en ajouter ou en refaire.

Pour garder exactement le même style dans un autre outil (Gemini, Microsoft Copilot / Designer,
ou ChatGPT quand la limite est levée), **joindre les 3 images déjà faites** (`src/assets/illustrations/`)
et coller ce message, puis demander les images une par une :

> Here are 3 illustrations from a series. Create new illustrations in exactly the same style:
> same young woman (brown hair in a low bun, gentle face, natural proportions), same soft
> watercolor-like pastel palette (warm cream background, pale sky blue, sage green, pastel salmon,
> soft gold), same paper grain texture, same airy composition with lots of empty space, a plain
> wall and floor. No text, no frame. Landscape 4:3. I will describe each scene; make one image per message.

Puis, une scène par message :

1. `stress-anxiete` : She sits cross-legged and patiently untangles a knotted ball of pastel salmon thread on her lap; from her hands the thread becomes a smooth, straight line across the floor.
2. `souvenirs-douloureux-deuil-separation` : Seen from behind, she stands in front of an open door that reveals a bright blue sky with soft clouds; light spills onto the floor.
3. `phobies-peurs-blocages` : A hand and forearm reach up out of a dark round hole in the floor, toward the light, fingers open.
4. `confiance-en-soi` : She stands facing a large round golden mirror; her reflection stands tall and confident with both arms raised.
5. `sommeil` : She sleeps peacefully on a soft white cloud under a crescent moon and a few stars, in pale night colors.
6. `arret-tabac-alimentation` : She steps out of a circle drawn on the floor, whose inside is worn by repeated footprints, and walks calmly toward the light.
7. `ecrits` : A tiny version of her sits on the page of a giant open notebook, holding an oversized pencil, writing.
