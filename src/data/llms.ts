// Contenu de /llms.txt et /llms-full.txt (https://llmstxt.org) : un résumé en Markdown
// pour les assistants IA (ChatGPT, Claude, Perplexity…), généré à partir des mêmes
// données que le site pour ne jamais se désynchroniser.
import { getCollection } from 'astro:content';
import { site, formations, parkings, bookingUrl } from './site';
import { faq } from './faq';

const url = (path: string) => new URL(path, site.url).href;

async function pages() {
  return (await getCollection('accompagnements')).sort((a, b) => a.data.order - b.data.order);
}

function header() {
  const a = site.address;
  return `# ${site.name}, hypnothérapeute à ${site.city}

> ${site.name} est hypnothérapeute et praticienne NEMO-EMDR à ${site.city} (Var, ${a.postalCode}), à 15 minutes de Toulon. Elle accompagne enfants (dès 5 ans), adolescents, adultes, seniors et couples avec l’hypnose ericksonienne, la PNL et NEMO (nettoyage émotionnel par mouvements oculaires), au cabinet ou en visio.

- Cabinet : ${a.street}, ${a.postalCode} ${a.city}, France
- Horaires : ${site.hours}
- Séance : ${site.duration}, ${site.price}. Paiement par virement, carte bancaire, chèque ou espèces
- Remboursement : pas de prise en charge par l’Assurance maladie ; certaines mutuelles remboursent une partie au titre des médecines douces
- Zone desservie : ${site.city}, ${site.neighbours.join(', ')}, et partout en visio
- Téléphone : ${site.phone}
- E-mail : ${site.email}
- Prise de rendez-vous en ligne : [Medoucine](${bookingUrl('llms')})

Les séances d’hypnose et de NEMO ne remplacent pas un suivi médical ou psychologique et ne dispensent d’aucun traitement en cours.`;
}

export async function llmsTxt() {
  const list = (await pages())
    .map((p) => `- [${p.data.title}](${url(`/${p.id}`)}) : ${p.data.menuLabel}. ${p.data.summary}.`)
    .join('\n');

  return `${header()}

## Accompagnements

${list}

## Pages principales

- [Accueil](${url('/')}) : présentation, approche, techniques, formations, informations pratiques et FAQ
- [Qui suis-je ?](${url('/#qui-suis-je')}) : parcours de Pauline Martino
- [L’hypnose et NEMO](${url('/#techniques')}) : en quoi consistent les deux approches
- [Informations pratiques](${url('/#infos-pratiques')}) : adresse, horaires, stationnement, tarif, annulation
- [Questions fréquentes](${url('/#faq')})

## Optional

- [Version complète de ce fichier](${url('/llms-full.txt')}) : tous les textes du site en un seul document
- [Mentions légales](${url('/mentions-legales')})
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
        `URL : ${url(`/${p.id}`)}`,
        d.intro,
        d.extra ? `**${d.extra.title}**\n\n${d.extra.text}` : '',
        `**Vous vous reconnaissez ?**\n\n${d.signs.map((s) => `- ${s}`).join('\n')}`,
        (p.body ?? '').trim(),
        `**En pratique** : ${d.practice}`,
        `_${d.disclaimer}_`,
      ]
        .filter(Boolean)
        .join('\n\n');
    })
    .join('\n\n');

  const training = formations.map((f) => `- ${f.year} : ${f.items.join(' ; ')}`).join('\n');
  const parking = parkings.map(([name, time]) => `- ${name} (${time})`).join('\n');
  const questions = faq.map((f) => `### ${f.q}\n\n${f.a.join('\n\n')}`).join('\n\n');

  return `${header()}

## Approche

Sa spécialité, c’est l’écoute : une écoute active et réceptive, sans jugement, sans interprétation, sans analyse. Chaque personne a sa propre carte du monde ; les séances aident à comprendre la façon dont on voit le monde et à déprogrammer les croyances qui ne correspondent plus à qui l’on est aujourd’hui.

Passionnée par l’écriture et les comportements humains, Pauline Martino écrit elle-même toutes ses séances d’hypnose. Après un premier parcours tourné vers l’avocature, elle a choisi l’accompagnement ; tout ce qu’elle propose, elle l’a expérimenté sur elle-même.

Une séance commence par un échange d’une vingtaine de minutes, puis utilise l’hypnose ericksonienne, NEMO ou des questions de PNL selon la demande. L’approche est choisie avec la personne le jour de la séance.

- **L’hypnose** : un état naturel où l’attention se tourne vers l’intérieur. On ne dort pas, on entend tout et on garde le contrôle. Pauline Martino travaille principalement avec des protocoles de libération de liens.
- **NEMO** (nettoyage émotionnel par mouvements oculaires) : on suit une baguette du regard pour apaiser l’émotion attachée à un souvenir. Le souvenir reste, mais devient neutre. Pas besoin de tout raconter en détail.

## Formations (Evidence Relationnelle)

${training}

## Accompagnement à deux voix

Avec son associé Christophe Rodrik, Pauline Martino propose un accompagnement à deux voix (clarté, confiance et passage à l’action). Tous deux enseignent aussi l’hypnose, la PNL et la philosophie de l’évidence relationnelle.

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
