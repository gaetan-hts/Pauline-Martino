// Données centrales du site : à modifier ici, elles sont réutilisées partout
// (header, footer, page contact, données structurées Google).

export const site = {
  name: 'Pauline Martino',
  job: 'Hypnothérapeute et praticienne NEMO',
  city: 'La Farlède',
  url: 'https://www.pauline-martino-hypnose.fr',
  phone: '06 05 53 21 43',
  phoneHref: 'tel:+33605532143',
  email: 'paulinemartino.therapeute@gmail.com',
  address: {
    street: '119 avenue de la République',
    postalCode: '83210',
    city: 'La Farlède',
    region: 'Provence-Alpes-Côte d’Azur',
    country: 'FR',
  },
  geo: { lat: 43.168027, lng: 6.043109 }, // Base Adresse Nationale
  hours: 'Lundi, mercredi et samedi, de 9 h à 19 h, sur rendez-vous',
  price: '80 €',
  priceValue: '80', // pour les données structurées (Offer)
  duration: '1 heure',
  social: {
    instagram: 'https://www.instagram.com/pauline_martino_hypno/',
    facebook: 'https://www.facebook.com/pauline.martino.hypnotherapeute/',
    linkedin: 'https://www.linkedin.com/in/pauline-martino-544a01174/',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=119+avenue+de+la+R%C3%A9publique+83210+La+Farl%C3%A8de',
  neighbours: ['Toulon', 'La Garde', 'Solliès-Pont', 'Hyères', 'La Crau', 'Cuers'],
};

const MEDOUCINE = 'https://www.medoucine.com/consultation/la-farlede/pauline-martino/22723';

/** Lien Medoucine tracé : `campaign` permet de savoir quelle page amène les réservations. */
export function bookingUrl(campaign = 'site') {
  const p = new URLSearchParams({
    utm_source: 'site-pauline-martino',
    utm_medium: 'referral',
    utm_campaign: campaign,
  });
  return `${MEDOUCINE}?${p.toString()}`;
}

// Formations et parkings : affichés sur la home et repris dans /llms.txt
export const formations = [
  { year: '2025', items: ['Enseignement Evidence® PNL niveaux 1 et 2', 'Enseignement Evidence® NEMO-EMDR'] },
  {
    year: '2024',
    items: [
      'Enseignement Evidence® Coach en développement personnel et en accompagnement holistique',
      'Enseignement Evidence® Hypnose Transe Ericksonienne',
      'Enseignement Evidence® Hypnose Conversationnelle',
    ],
  },
];

export const parkings = [
  ['Parking des anciens combattants d’Indochine, 34 avenue de la Libération', '2 min à pied'],
  ['Parking de la Salle des fêtes, rue de la Font des Fabre', '3 min à pied'],
  ['Parking Capitaine Claude Lepine', '4 min à pied'],
  ['Parking Carnot, rue Carnot', '5 min à pied'],
];

export const quotes = [
  {
    text: 'Tant que vous n’aurez pas rendu l’inconscient conscient, il dirigera votre vie et vous appellerez cela le destin.',
    author: 'Carl Gustav Jung',
  },
  {
    text: 'Quand une fleur ne fleurit pas, on corrige l’environnement dans lequel elle pousse. Pas la fleur.',
    author: 'Paulo Amaro',
  },
  {
    text: 'Ce que tu nies te soumet. Ce que tu acceptes te transforme.',
    author: 'Carl Gustav Jung',
  },
  {
    text: 'Tout le chemin de la vie, c’est de passer de l’ignorance à la connaissance, de l’obscurité à la lumière, de l’inaccompli à l’accompli, de l’inconscience à la conscience, de la peur à l’amour.',
    author: 'Frédéric Lenoir',
  },
];

// Version anglaise des données affichées (le reste de `site` est commun aux deux langues)
export const siteEn = {
  job: 'Hypnotherapist and NEMO practitioner',
  hours: 'Monday, Wednesday and Saturday, 9 am to 7 pm, by appointment',
  duration: 'one hour',
  formations: [
    { year: '2025', items: ['Evidence® training: NLP levels 1 and 2', 'Evidence® training: NEMO-EMDR'] },
    {
      year: '2024',
      items: [
        'Evidence® training: personal development and holistic coaching',
        'Evidence® training: Ericksonian trance hypnosis',
        'Evidence® training: conversational hypnosis',
      ],
    },
  ],
  parkings: parkings.map(([name, time]) => [name, time.replace('à pied', 'walk')]),
  quotes: [
    {
      text: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      author: 'Carl Gustav Jung',
    },
    {
      text: 'When a flower doesn’t bloom, you fix the environment in which it grows, not the flower.',
      author: 'Paulo Amaro',
    },
    {
      text: 'What you deny submits you. What you accept transforms you.',
      author: 'Carl Gustav Jung',
    },
    {
      text: 'The whole path of life is to move from ignorance to knowledge, from darkness to light, from the unaccomplished to the accomplished, from unconsciousness to consciousness, from fear to love.',
      author: 'Frédéric Lenoir',
    },
  ],
};

/** Données affichées dans la langue demandée */
export function siteText(lang: 'fr' | 'en') {
  return lang === 'en'
    ? siteEn
    : { job: site.job, hours: site.hours, duration: site.duration, formations, parkings, quotes };
}
