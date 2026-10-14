// Données centrales du site : à modifier ici, elles sont réutilisées partout
// (header, footer, page contact, données structurées Google).

export const site = {
  name: 'Pauline Martino',
  job: 'Hypnothérapeute et praticienne NEMO',
  city: 'La Farlède',
  url: 'https://www.pauline-martino-hypnose.fr', // TODO domaine définitif
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
  hours: 'Lundi, mercredi et samedi, de 9 h à 19 h, sur rendez-vous',
  price: '80 €',
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
