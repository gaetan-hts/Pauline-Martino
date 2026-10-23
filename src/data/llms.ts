// Contenu de /llms.txt et /llms-full.txt (https://llmstxt.org) : un résumé en Markdown
// pour les assistants IA (ChatGPT, Claude, Perplexity…), généré à partir des mêmes
// données que le site pour ne jamais se désynchroniser.
import { site, formations, parkings, bookingUrl } from './site';
import { faq } from './faq';
import { platforms } from './avis';
import { getServices } from './services';
import { englishEnabled } from '../i18n/config';

const url = (path: string) => new URL(path, site.url).href;

const pages = async () => (await getServices('fr')).map((s) => ({ ...s.entry, url: s.url }));

function header() {
  const a = site.address;
  return `# ${site.name}, hypnothérapeute à ${site.city}

> ${site.name} est hypnothérapeute et praticienne NEMO-EMDR à ${site.city} (Var, ${a.postalCode}), à 15 minutes de Toulon. Elle accompagne enfants (dès 6-7 ans), adolescents, adultes, seniors et couples avec l’hypnose ericksonienne, la PNL et NEMO (nettoyage émotionnel par mouvements oculaires), au cabinet ou en visio.

- Cabinet : ${a.street}, ${a.postalCode} ${a.city}, France
- Horaires : ${site.hours}
- Séance : ${site.duration}, ${site.price}. Paiement par virement, carte bancaire, chèque ou espèces
- Remboursement : pas de prise en charge par l’Assurance maladie ; certaines mutuelles remboursent une partie au titre des médecines douces
- Zone desservie : ${site.city}, ${site.neighbours.join(', ')}, et partout en visio
- Téléphone : ${site.phone}
- E-mail : ${site.email}
- Prise de rendez-vous en ligne : [Medoucine](${bookingUrl('llms')})`;
}

export async function llmsTxt() {
  const en = (await getServices('en'))
    .map((p) => `- [${p.entry.data.title}](${url(p.url)}): ${p.entry.data.summary}.`)
    .join('\n');
  const list = (await pages())
    .map((p) => `- [${p.data.title}](${url(p.url)}) : ${p.data.menuLabel}. ${p.data.summary}.`)
    .join('\n');

  return `${header()}

## Accompagnements

${list}

## Pages principales

- [Accueil](${url('/')}) : présentation, approche, techniques, formations, informations pratiques et FAQ
- [Qui suis-je ?](${url('/#qui-suis-je')}) : parcours de Pauline Martino
- [L’hypnose et NEMO](${url('/#techniques')}) : en quoi consistent les deux approches
- [Ma formation](${url('/#formation')}) : formée par Christophe Rodrik, certifications, accompagnement à deux voix
- [Mes écrits](${url('/mes-ecrits/')}) : textes de Pauline Martino, pages de son premier livre en avant-première
- [Avis](${url('/#avis')}) : avis de personnes accompagnées (Google, Medoucine)
- [Informations pratiques](${url('/#infos-pratiques')}) : adresse, horaires, stationnement, tarif, annulation
- [Questions fréquentes](${url('/#faq')})

${englishEnabled ? `## English

The whole site is also available in English. Sessions take place at the practice in La Farlède (Var, France) or online by video.

- [Home (English)](${url('/en/')})
${en}

` : ''}## Optional

- [Version complète de ce fichier](${url('/llms-full.txt')}) : tous les textes du site en un seul document
- [Mentions légales](${url('/mentions-legales/')})
- [Instagram](${site.social.instagram})
- [Facebook](${site.social.facebook})
- [LinkedIn](${site.social.linkedin})
`;
}

export async function llmsFullTxt() {
  const all = await pages();

  const thematic = all
    .map((p) => {
      const d = p.data;
      return [
        `### ${d.title}`,
        `URL : ${url(p.url)}`,
        d.intro,
        d.extra ? `**${d.extra.title}**\n\n${d.extra.text}` : '',
        `**Vous vous reconnaissez ?**\n\n${d.signs.map((s) => `- ${s}`).join('\n')}`,
        (p.body ?? '').trim(),
        `**En pratique** : ${d.practice}`,
      ]
        .filter(Boolean)
        .join('\n\n');
    })
    .join('\n\n');

  const training = formations.map((f) => `- ${f.year} : ${f.items.join(' ; ')}`).join('\n');
  const parking = parkings.map(([name, time]) => `- ${name} (${time})`).join('\n');
  const reviewsLine = platforms
    .map((p) => `- ${p.source} : ${p.rating}/5, ${p.count} avis, [lire les avis](${p.url})`)
    .join('\n');
  const questions = faq.fr.map((f) => `### ${f.q}\n\n${f.a.join('\n\n')}`).join('\n\n');

  return `${header()}

## Approche

Sa spécialité, c’est l’écoute : une écoute active et réceptive, sans jugement, sans interprétation, sans analyse. Chaque personne a sa propre carte du monde ; les séances aident à comprendre la façon dont on voit le monde et à déprogrammer les croyances qui ne correspondent plus à qui l’on est aujourd’hui.

Passionnée par l’écriture et les comportements humains, Pauline Martino écrit elle-même toutes ses séances d’hypnose. Après un premier parcours tourné vers l’avocature, elle a choisi l’accompagnement ; tout ce qu’elle propose, elle l’a expérimenté sur elle-même.

Une séance commence par un échange d’une vingtaine de minutes, puis utilise l’hypnose ericksonienne, NEMO ou des questions de PNL selon la demande. L’approche est choisie avec la personne le jour de la séance.

- **L’hypnose** : un état naturel où l’attention se tourne vers l’intérieur. On ne dort pas, on entend tout et on garde le contrôle. Pauline Martino travaille principalement avec des protocoles de libération de liens.
- **NEMO** (nettoyage émotionnel par mouvements oculaires) : on suit une baguette du regard pour apaiser l’émotion attachée à un souvenir. Le souvenir reste, mais devient neutre. Pas besoin de tout raconter en détail.

## Formation

Pauline Martino a été formée par Christophe Rodrik, hypnothérapeute depuis 20 ans, lors d’une formation immersive : 15 jours d’enseignement en hypnose, PNL et NEMO-EMDR, puis 4 mois d’accompagnement. Elle a assisté à de nombreuses séances à ses côtés avant de s’installer, et exerce depuis presque trois ans.

Certifications Evidence Relationnelle :

${training}

## Accompagnement à deux voix et formation de thérapeutes

Avec son associé Christophe Rodrik, Pauline Martino propose des accompagnements à deux voix, deux générations, pour aider à passer à l’action. Ensemble, ils forment aussi de futurs thérapeutes : une formation immersive en hypnose et PNL, puis un accompagnement pour s’installer et développer son activité.

## Avis

${reviewsLine}

## Accompagnements

${thematic}

## Stationnement près du cabinet

${parking}

## Annulation

Un imprévu ? Il suffit de prévenir le plus tôt possible, pour que le créneau profite à quelqu’un d’autre.

## Questions fréquentes

${questions}
`;
}
