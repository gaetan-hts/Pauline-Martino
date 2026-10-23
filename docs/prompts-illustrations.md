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
| `stress-anxiete` | Stress et anxiété | She sits on the floor hugging her knees, head resting on them; a thin cable runs from her back to a wall socket, as if she were recharging. |
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
