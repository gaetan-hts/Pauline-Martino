// Textes de la page d'accueil. Le français est le texte de Pauline (docs/brief-presentation-pauline.md) :
// garder sa voix. L'anglais en est la traduction, à faire relire par Pauline.
import type { Lang } from './config';

export const home = {
  fr: {
    title: 'Hypnothérapeute à La Farlède, près de Toulon | Pauline Martino',
    description:
      'Pauline Martino, hypnothérapeute et praticienne NEMO à La Farlède, à 15 min de Toulon. Stress, émotions, phobies, sommeil, tabac. Au cabinet ou en visio.',
    hero: {
      kicker: 'Hypnose et NEMO à La Farlède, à 15 min de Toulon, et en visio',
      h1: 'Pauline Martino, hypnothérapeute et praticienne NEMO à La Farlède',
      lead: 'Ici, on prend soin de ce qui se passe en vous, par l’écoute, l’accompagnement et les mots.',
      note: (price: string) => `Séance d’une heure, ${price}. Enfants dès 5 ans, adolescents et adultes.`,
      portraitAlt: 'Portrait de Pauline Martino, hypnothérapeute à La Farlède',
    },
    why: {
      title: 'Pourquoi vient-on me consulter ?',
      paras: [
        'On me demande souvent : « C’est quoi votre spécialité ? ». Ma spécialité, c’est l’écoute, la véritable écoute, sans jugement, sans interprétation, sans analyse. Une écoute active et réceptive.',
        'Chaque personne a sa propre carte du monde. L’objectif des séances est de vous accompagner à comprendre la façon dont vous voyez le monde, et à déprogrammer les croyances qui ne correspondent plus à qui vous êtes aujourd’hui.',
      ],
      forWhoLabel: 'Pour qui ?',
      forWho: 'Les adultes, les femmes enceintes et jeunes mamans, les enfants à partir de 5 ans, les adolescents, les seniors et les couples.',
    },
    about: {
      title: 'Qui suis-je ?',
      photoAlt: 'Pauline Martino au bord de la mer, au coucher du soleil',
      paras: [
        'Pauline Martino, passionnée par l’écriture et les comportements humains. Vous allez me dire : mais quel rapport ? De cette conjugaison est née ma rencontre avec l’hypnose, car toutes mes séances d’hypnose sont issues de ma plume.',
        'Ma vocation est d’aider les gens, à tout âge. Tout ce que je propose, je l’expérimente sur moi. En l’espace de quelque temps, ma vie a pris un tournant : je suis sortie de mon brouillard mental, de mes ruminations, et j’ai emprunté un chemin en dehors des sentiers battus. C’est ce que je vous transmets en séance, pour que vous puissiez devenir votre propre thérapeute et avancer sereinement.',
        'J’utilise des outils puissants et rapides, la PNL, l’hypnose et les mouvements oculaires (NEMO-EMDR), que j’ai adaptés à ma pratique. Les clients me disent souvent : « J’ai déjà fait de l’hypnose, mais je n’ai jamais vécu ça ! »',
      ],
      pathTitle: 'Mon parcours',
      path: [
        'Depuis mon adolescence, je suis animée par le désir d’aider mon prochain. J’ai d’abord transformé ce désir en vocation en suivant la voie de l’avocature. Au fil des années, je m’éloignais pourtant de mon essence profonde et de mes émotions.',
        'Lorsque j’ai accepté d’écouter le message de ma tristesse et celui de mon corps, j’ai pu reprendre ma vie en main. En quête de sens, j’ai choisi un chemin qui fait sens avec qui je suis. L’hypnose s’est naturellement frayé une voie jusqu’à moi : c’est maintenant un choix de vie, qui allie deux de mes passions, l’être humain et l’écriture.',
      ],
    },
    office: {
      title: 'Le cabinet',
      text: (street: string, city: string) =>
        `Au ${street} à ${city}, un lieu calme et lumineux. Les séances ont aussi lieu en visio, avec des résultats tout aussi rapides.`,
      alt: {
        fauteuil: 'Le fauteuil d’hypnose du cabinet, devant la niche vert olive',
        salle: 'La salle du cabinet à La Farlède, avec ses suspensions en rotin',
        bureauLampe: 'Le bureau d’accueil, avec une lampe de sel et une plante',
        bureauJour: 'Le bureau du cabinet en lumière naturelle',
        vue: 'Vue d’ensemble de la salle, avec le fauteuil vintage et la lampe',
      },
    },
    techniques: {
      title: 'L’hypnose et NEMO, deux approches qui se complètent',
      hypnosisTitle: 'L’hypnose, c’est quoi ?',
      hypnosis: [
        'Un état naturel que vous vivez déjà plusieurs fois par jour, lorsque vous êtes absorbé par un film ou que vous conduisez sans vous souvenir du trajet. Votre attention se tourne vers l’intérieur et votre inconscient devient plus accessible.',
        'Vous ne dormez pas : vous entendez tout, vous vous souvenez de tout et vous gardez le contrôle à chaque instant. Je travaille principalement avec des protocoles de libération de liens, qui vous aident à vous détacher de ce qui vous retient.',
      ],
      nemoTitle: 'NEMO, c’est quoi ?',
      nemo: [
        'NEMO signifie « nettoyage émotionnel par mouvements oculaires ». Lorsqu’un événement nous marque, l’émotion peut rester attachée au souvenir, parfois des années plus tard.',
        'En séance, vous suivez ma baguette du regard. Ces mouvements aident votre cerveau à apaiser l’émotion : le souvenir reste, mais il devient neutre. Vous restez pleinement conscient et n’avez pas besoin de tout raconter en détail.',
      ],
      summary:
        'NEMO apaise une émotion liée à un souvenir ou à une situation précise. L’hypnose permet de comprendre ce qui se joue en vous et de vous libérer des liens qui vous retiennent. Je choisis avec vous, le jour de la séance, l’approche la plus adaptée.',
    },
    training: {
      title: 'Ma formation',
      photoAlt: 'Pauline Martino et Christophe Rodrik, son formateur et associé, en discussion',
      paras: [
        'J’ai été formée par Christophe Rodrik, hypnothérapeute depuis 20 ans, lors d’une formation immersive : 15 jours d’enseignement en hypnose, PNL et NEMO-EMDR, puis 4 mois d’accompagnement pour devenir une thérapeute « tout terrain ».',
        'J’ai assisté à de nombreuses séances à ses côtés, avec ses clients, avant de m’installer. J’exerce depuis presque trois ans.',
      ],
      certTitle: 'Certifications Evidence Relationnelle',
      duoTitle: 'À deux voix, avec Christophe',
      duo: [
        'Avec Christophe, mon associé, nous proposons aussi des accompagnements à deux voix, deux générations, pour vous aider à passer à l’action.',
        'Et si vous rêvez de devenir thérapeute, nous transmettons ce que j’ai moi-même vécu : une formation immersive en hypnose et PNL, puis un accompagnement pour vous installer et développer votre activité.',
      ],
      duoCta: 'Réserver un appel gratuit',
    },
    practical: {
      title: 'Informations pratiques',
      office: 'Le cabinet',
      directions: 'Voir l’itinéraire',
      hours: 'Horaires',
      parking: 'Où stationner',
      sessions: 'Les séances',
      sessionsText: (duration: string) =>
        `Hypnose, PNL ou NEMO, pour les enfants, les adolescents et les adultes, au cabinet ou en visio. Durée : ${duration}.`,
      price: 'Tarif',
      perSession: 'la séance. Virement, carte bancaire, chèque ou espèces.',
      refund: 'Remboursement',
      refundText:
        'Les séances ne sont pas prises en charge par l’Assurance maladie. Certaines mutuelles en remboursent une partie au titre des médecines douces. Une facture vous est remise sur demande.',
      cancel: 'Annulation',
      cancelText:
        'Ici, le mot d’ordre est la liberté. Un imprévu ? Prévenez-moi simplement le plus tôt possible, pour que le créneau profite à quelqu’un d’autre.',
      bookTitle: 'Prendre rendez-vous',
      bookText: 'En ligne sur Medoucine, ou directement par téléphone.',
      byEmail: 'Par e-mail :',
    },
    faqTitle: 'Vos questions',
    final: {
      title: 'Envie d’en parler ?',
      text: 'Réservez une séance au cabinet à La Farlède ou en visio. Vous pouvez aussi m’appeler pour poser vos questions avant de vous lancer.',
    },
    knowsAbout: ['Hypnose ericksonienne', 'Hypnose conversationnelle', 'PNL', 'NEMO-EMDR', 'Thérapies brèves'],
  },

  en: {
    title: 'Hypnotherapist in La Farlède, near Toulon | Pauline Martino',
    description:
      'Pauline Martino, hypnotherapist and NEMO practitioner in La Farlède, 15 min from Toulon. Stress, emotions, phobias, sleep, smoking. In person or online.',
    hero: {
      kicker: 'Hypnosis and NEMO in La Farlède, 15 minutes from Toulon, and online',
      h1: 'Pauline Martino, hypnotherapist and NEMO practitioner in La Farlède',
      lead: 'Here, we take care of what is happening inside you, through listening, support and words.',
      note: (price: string) => `One-hour session, ${price}. Children from age 5, teenagers and adults.`,
      portraitAlt: 'Portrait of Pauline Martino, hypnotherapist in La Farlède',
    },
    why: {
      title: 'Why do people come to see me?',
      paras: [
        'People often ask me: “What is your speciality?” My speciality is listening, real listening, without judgement, without interpretation, without analysis. Active, receptive listening.',
        'Everyone has their own map of the world. The aim of the sessions is to help you understand the way you see the world, and to deprogram the beliefs that no longer match who you are today.',
      ],
      forWhoLabel: 'Who is it for?',
      forWho: 'Adults, pregnant women and new mothers, children from age 5, teenagers, seniors and couples.',
    },
    about: {
      title: 'About me',
      photoAlt: 'Pauline Martino by the sea at sunset',
      paras: [
        'I’m Pauline Martino, passionate about writing and human behaviour. You may ask: what’s the connection? That combination is what led me to hypnosis, because I write every one of my hypnosis sessions myself.',
        'My calling is to help people, at any age. Everything I offer, I have tried on myself. Within a short time, my life took a turn: I came out of my mental fog and my rumination, and took a path off the beaten track. That is what I pass on in sessions, so that you can become your own therapist and move forward calmly.',
        'I use powerful, fast-acting tools, NLP, hypnosis and eye movements (NEMO-EMDR), which I have adapted to my practice. Clients often tell me: “I’ve done hypnosis before, but I’ve never experienced anything like this!”',
      ],
      pathTitle: 'My journey',
      path: [
        'Ever since I was a teenager, I have been driven by the wish to help others. I first turned that wish into a vocation by pursuing a career in law. Over the years, though, I was drifting away from my true self and my emotions.',
        'When I agreed to listen to what my sadness and my body were telling me, I was able to take my life back in hand. Looking for meaning, I chose a path that fits who I am. Hypnosis found its way to me naturally: it is now a life choice that brings together two of my passions, people and writing.',
      ],
    },
    office: {
      title: 'The practice',
      text: (street: string, city: string) =>
        `At ${street}, ${city}: a calm, bright space. Sessions also take place online by video, with results that are just as fast.`,
      alt: {
        fauteuil: 'The hypnosis armchair at the practice, in front of the olive-green alcove',
        salle: 'The consulting room in La Farlède, with its rattan pendant lights',
        bureauLampe: 'The reception desk, with a salt lamp and a plant',
        bureauJour: 'The practice desk in natural light',
        vue: 'View of the room, with the vintage armchair and the lamp',
      },
    },
    techniques: {
      title: 'Hypnosis and NEMO, two approaches that work together',
      hypnosisTitle: 'What is hypnosis?',
      hypnosis: [
        'A natural state you already experience several times a day, when you are absorbed in a film or drive without remembering the journey. Your attention turns inwards and your unconscious becomes more accessible.',
        'You are not asleep: you hear everything, remember everything and stay in control at every moment. I work mainly with tie-release protocols, which help you let go of what holds you back.',
      ],
      nemoTitle: 'What is NEMO?',
      nemo: [
        'NEMO stands for “emotional cleansing through eye movements” (nettoyage émotionnel par mouvements oculaires). When an event affects us deeply, the emotion can stay attached to the memory, sometimes for years.',
        'In a session, you follow my wand with your eyes. These movements help your brain soothe the emotion: the memory stays, but it becomes neutral. You remain fully conscious and don’t need to go into every detail.',
      ],
      summary:
        'NEMO soothes an emotion linked to a specific memory or situation. Hypnosis helps you understand what is going on inside you and frees you from the ties that hold you back. On the day of the session, we choose together the approach that suits you best.',
    },
    training: {
      title: 'My training',
      photoAlt: 'Pauline Martino and Christophe Rodrik, her trainer and partner, in conversation',
      paras: [
        'I was trained by Christophe Rodrik, a hypnotherapist for 20 years, through an immersive programme: 15 days of teaching in hypnosis, NLP and NEMO-EMDR, followed by 4 months of mentoring to become an all-round therapist.',
        'I sat in on many sessions alongside him, with his clients, before setting up my own practice. I have been practising for almost three years.',
      ],
      certTitle: 'Evidence Relationnelle certifications',
      duoTitle: 'Two voices, with Christophe',
      duo: [
        'With Christophe, my partner, we also offer two-voice support, two generations, to help you take action.',
        'And if you dream of becoming a therapist, we pass on what I went through myself: immersive training in hypnosis and NLP, followed by mentoring to set up and grow your practice.',
      ],
      duoCta: 'Book a free call',
    },
    practical: {
      title: 'Practical information',
      office: 'The practice',
      directions: 'Get directions',
      hours: 'Opening hours',
      parking: 'Parking',
      sessions: 'Sessions',
      sessionsText: (duration: string) =>
        `Hypnosis, NLP or NEMO, for children, teenagers and adults, at the practice or online. Length: ${duration}.`,
      price: 'Fee',
      perSession: 'per session. Bank transfer, card, cheque or cash.',
      refund: 'Reimbursement',
      refundText:
        'Sessions are not covered by the French state health insurance (Assurance maladie). Some complementary health insurers (mutuelles) reimburse part of the cost under alternative medicine. An invoice is provided on request.',
      cancel: 'Cancellation',
      cancelText:
        'Freedom is the rule here. Something came up? Just let me know as early as possible, so someone else can have the slot.',
      bookTitle: 'Book a session',
      bookText: 'Online on Medoucine (in French), or directly by phone.',
      byEmail: 'By email:',
    },
    faqTitle: 'Your questions',
    final: {
      title: 'Would you like to talk about it?',
      text: 'Book a session at the practice in La Farlède or online. You can also call me with any questions before you decide.',
    },
    knowsAbout: ['Ericksonian hypnosis', 'Conversational hypnosis', 'NLP', 'NEMO-EMDR', 'Brief therapy'],
  },
} satisfies Record<Lang, unknown>;
