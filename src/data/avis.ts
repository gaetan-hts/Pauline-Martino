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

// Extraits copiés mot pour mot depuis Medoucine (emojis retirés), relevés le 16/10/2026.
// À faire valider par Pauline. `date` : approximative, telle qu'affichée par la plateforme.
export const reviews: { text: string; author: string; date: string; source: Platform['source']; topic: string }[] = [
  {
    topic: 'Phobie de l’avion',
    text: 'J’ai consulté Pauline pour une séance d’hypnose liée à ma phobie de l’avion et tout s’est très bien passé. Pauline est d’une grande douceur et met tout de suite en confiance, ce qui rend la séance très agréable. Les effets ont été bien réels et je me sens aujourd’hui beaucoup plus sereine à l’idée de prendre l’avion. Je recommande vivement de passer le cap pour plus de sérénité.',
    author: 'Cassandra C.',
    date: 'janvier 2026',
    source: 'Medoucine',
  },
  {
    topic: 'Gestion des émotions',
    text: 'Une thérapeute très à l\'écoute, attentive, bienveillante, douce, qui m\'a rassuré et bien expliqué comment allait se dérouler la séance d\'hypnose. Elle prend le temps et c\'est très agréable. Je suis allée la voir pour la gestion des émotions. J\'y retourne la semaine prochaine',
    author: 'Sophie M.',
    date: 'août 2026',
    source: 'Medoucine',
  },
  {
    topic: 'Appétit',
    text: 'Très agréablement surprise ! Professionnelle vraiment bienveillante, très à l\'écoute, et surtout investie dans son métier. Je suis venue la voir pour un problème d\'appétit démesuré, et j\'ai été bluffée de me rendre compte à quoi était lié ce "problème". Séance d\'hypnose très agréable, et efficace puisque mon appétit à fort diminué à la suite. Alors merci infiniment ! Je la recommande chaleureusement.',
    author: 'Coline D.',
    date: 'avril 2026',
    source: 'Medoucine',
  },
  {
    topic: 'Sommeil',
    text: 'Je remercie Pauline pour son accompagnement très professionnel, son écoute , son empathie, sa bienveillance J\'ai trouvé grâce à ses soins un apaisement et une meilleure qualité de sommeil Je la recommande vivement',
    author: 'Chantal S.',
    date: '2025',
    source: 'Medoucine',
  },
  {
    topic: 'Adolescente',
    text: 'Un accueil chaleureux et adapté (discrétion, prise de contact et implication et juste distance) Professionnelle rassurante pour une adolescente néophyte. Un chemin spirituel et réel de l\'entree à la sortie...Pauline nous guide vers le bien-être. MERCI',
    author: 'Sandrine B.',
    date: '2025',
    source: 'Medoucine',
  },
  {
    topic: 'Première expérience',
    text: 'Pauline est très professionnelle, elle fait preuve de bienveillance, d’écoute, de douceur. C’était pour moi une première expérience et je ne pensais pas pouvoir me libérer de certains maux. Le pouvoir de l’hypnose dépend de la confiance que l’on a envers son thérapeute et c’est cette confiance que Pauline sait nous transmettre. On a un sentiment de liberté et de légèreté quand la séance est terminée. Merci Pauline',
    author: 'Esterina',
    date: '2025',
    source: 'Medoucine',
  },
];
