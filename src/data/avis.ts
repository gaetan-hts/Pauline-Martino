// Avis clients : uniquement des données réelles, relevées à la main sur les plateformes.
// Ne jamais inventer ni reformuler un avis (voir CLAUDE.md).
import { bookingUrl } from './site';

export type Platform = {
  source: 'Google' | 'Medoucine';
  rating: number; // note moyenne sur 5
  count: number; // nombre d'avis
  url: string;
  checkedAt: string; // date du relevé (AAAA-MM-JJ) : mettre à jour avec les chiffres
  note?: string;
};

export const platforms: Platform[] = [
  {
    source: 'Google',
    rating: 5,
    count: 106,
    // TODO : remplacer par le lien direct de la fiche Google Business Profile
    url: 'https://www.google.com/maps/search/?api=1&query=Pauline+Martino+hypnoth%C3%A9rapeute+La+Farl%C3%A8de',
    checkedAt: '2026-10-16',
  },
  {
    source: 'Medoucine',
    rating: 4.9,
    count: 59,
    url: bookingUrl('avis'),
    checkedAt: '2026-10-16',
    note: 'Avis vérifiés : seules les personnes ayant réellement consulté peuvent en laisser un.',
  },
];

// Avis choisis par Pauline (oct. 2026), copiés mot pour mot depuis Google et Medoucine,
// fautes comprises ; seuls les emojis sont retirés. Les retours à la ligne (\n) sont conservés.
// `date` : mois de la visite tel qu'affiché par la plateforme (AAAA-MM).
// Ordre = ordre d'affichage (colonnes en maçonnerie).
export const reviews: { text: string; author: string; date: string; source: Platform['source']; topic: { fr: string; en: string } }[] = [
  {
    topic: { fr: 'Rapport à la nourriture', en: 'Relationship with food' },
    text: 'J\'ai pris rdv pour une addiction à la nourriture.  Après la séance tous cest mis en place dans la tête du pourquoi et comment . Une prise de conscience qui m\'a redonné une volonté et ceci sans pression,  une alimentation normale cest mis en œuvre.  En un mois jai perdu 8kg sans lutter .Aujourd\'hui je recommencerai l\'expérience si le besoin se faisait sentir .\nUne grande écoute,  pas de jugement , une thérapeute efficace , merci !',
    author: 'Toul M.',
    date: '2026-09',
    source: 'Google',
  },
  {
    topic: { fr: 'Peurs', en: 'Fears' },
    text: 'Une très belle rencontre, presque par hasard en voyant une publication sur Facebook. Après avoir vu psychiatre et psychologue, je n\'avais jamais essayé l\'hypnose, alors j\'ai tenté le coup et je ne regrette pas du tout. Pauline est une thérapeute douce, gentille, à l\'écoute, bienveillante et ça fait un bien fou !! Grâce à plusieurs seances, elle a réussi à cibler mes failles et mes peurs et à travailler dessus, avec beaucoup de douceur, sans me brusquer et ça a fonctionné, je me sens beaucoup mieux dans ma tête. Un grand merci à elle, je la recommande à 200% !!',
    author: 'Sophie M.',
    date: '2026-07',
    source: 'Google',
  },
  {
    topic: { fr: 'Arrêt du tabac', en: 'Quitting smoking' },
    text: 'Je suis venue pour arrêter de fumer, et la deuxième séance a été énorme, incroyable au niveau du résultat. Cela fait un mois et aucune envie de cigarette. Je suis impressionnée par les résultats, j’en parle autour de moi, aux fumeurs et recommande vivement Pauline. Je la remercie encore, elle a été magique',
    author: 'Sabine F.',
    date: '2025-11',
    source: 'Medoucine',
  },
  {
    topic: { fr: 'Phobie de l’avion', en: 'Fear of flying' },
    text: 'J’ai consulté Pauline pour une séance d’hypnose liée à ma phobie de l’avion et tout s’est très bien passé. Pauline est d’une grande douceur et met tout de suite en confiance, ce qui rend la séance très agréable. Les effets ont été bien réels et je me sens aujourd’hui beaucoup plus sereine à l’idée de prendre l’avion. Je recommande vivement de passer le cap pour plus de sérénité.',
    author: 'Cassandra C.',
    date: '2025-12',
    source: 'Google',
  },
  {
    topic: { fr: 'Prises de conscience', en: 'Insights' },
    text: 'Pauline est une professionnelle avec une très belle énergie ! Sa douceur et sa bienveillance mettent immédiatement en confiance. Elle a une façon très juste de poser les bonnes questions, celles qui amènent de vrais déclics sans jamais forcer quoi que ce soit. On se sent écouté, compris et guidé avec beaucoup de finesse. Je la recommande les yeux fermés',
    author: 'Mélanie Z.',
    date: '2025-11',
    source: 'Google',
  },
  {
    topic: { fr: 'Séance en visio', en: 'Online session' },
    text: 'Première séance d’hypnose avec Pauline et très bonne expérience !\nElle sait mettre en confiance, on a eu un vrai bon échange avant l’hypnose à proprement parler et j’en suis ressorti totalement apaisé.\n(gros + : la qualité sonore malgré le fait que la séance soit à distance)\nJe la recommande vivement !\nMerci encore :)',
    author: 'Léon M.',
    date: '2025-09',
    source: 'Google',
  },
  {
    topic: { fr: 'Confiance en soi', en: 'Self-confidence' },
    text: 'Merci Pauline pour cette expérience\nJe ne connaissais pas et j\'étais plutôt septique au départ mais je recommande à tous de faire cette expérience\nPauline est une très belle personne et elle m\'a énormément aidé\nElle m\'a donné les clés pour la suite et confiance en moi\nMerci merci énormément',
    author: 'Christine O.',
    date: '2025-05',
    source: 'Google',
  },
];
