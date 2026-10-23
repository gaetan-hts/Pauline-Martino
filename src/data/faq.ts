// Questions fréquentes : affichées sur la home ET envoyées à Google (FAQPage).
// Chaque réponse est un tableau de paragraphes (texte brut).
type Faq = { q: string; a: string[] }[];

const fr: Faq = [
  {
    q: 'Qu’est-ce que l’hypnose ?',
    a: [
      'L’hypnose est un état modifié de conscience que l’on vit naturellement chaque jour sans s’en rendre compte : lorsqu’on conduit d’un point A à un point B et qu’on oublie le chemin parcouru, ou lorsqu’on regarde un film et qu’on est pris dedans.',
      'À la différence de l’hypnose de spectacle, directive, l’hypnose que j’utilise est permissive. Il n’y a aucun test pour savoir si vous êtes réceptif : on l’est tous, à des degrés différents. Je suggère des chemins à votre inconscient et ensemble nous créons votre propre séance.',
    ],
  },
  {
    q: 'Qu’est-ce que la PNL ?',
    a: [
      'La programmation neurolinguistique regroupe des techniques de communication et de développement personnel qui visent à identifier, comprendre et modifier nos comportements et nos façons de penser.',
      'Une phrase de Grinder et Bandler, les pères de la PNL, résume à merveille la pratique : « Un problème est une solution qui a mal vieilli. »',
    ],
  },
  {
    q: 'Qu’est-ce que le nettoyage émotionnel par les mouvements oculaires (NEMO-EMDR) ?',
    a: [
      'Les mouvements oculaires sont naturellement présents chez nous, notamment pendant le sommeil, lorsque le cerveau range les informations reçues au cours de la journée.',
      'NEMO s’appuie sur des stimulations bilatérales alternées pour aider le cerveau à « digérer » un souvenir resté bloqué. C’est l’émotion qui marque la mémoire : on agit sur l’émotion, on range le souvenir associé. Il perd sa charge émotionnelle et l’on peut y repenser sans être submergé.',
    ],
  },
  {
    q: 'Comment se déroule une séance ?',
    a: [
      'Une séance commence par un échange d’une vingtaine de minutes pour comprendre vos besoins. J’utilise ensuite l’hypnose ericksonienne, NEMO ou des questions de PNL. Chaque séance est personnalisée et adaptée à votre rythme.',
    ],
  },
  {
    q: 'Combien de séances sont nécessaires ?',
    a: [
      'Il est impossible de le déterminer à l’avance, c’est propre à chacun. Certaines problématiques peuvent être abordées en une séance, d’autres en une à trois séances, voire un suivi plus long.',
    ],
  },
  {
    q: 'Est-ce que l’hypnose et NEMO sont adaptés aux enfants ?',
    a: [
      'Oui. Ces thérapies brèves peuvent aider les enfants à partir de 6-7 ans à gérer le stress et la phobie scolaire, les difficultés d’attention, les difficultés émotionnelles ou les troubles du sommeil, de manière ludique et bienveillante.',
    ],
  },
  {
    q: 'Est-ce que les séances fonctionnent en visio ?',
    a: [
      'Oui. Ma voix vous guide de la même façon qu’au cabinet, et les mouvements oculaires se font en suivant la baguette que je déplace devant la caméra. Beaucoup de personnes apprécient de vivre la séance chez elles, dans un cadre familier.',
      'Il vous faut simplement un endroit calme, un fauteuil ou un canapé confortable, un ordinateur, une tablette ou un téléphone posé de façon stable, une bonne connexion et, si possible, des écouteurs. Le lien de connexion vous est envoyé avant le rendez-vous.',
    ],
  },
  {
    q: 'Les séances sont-elles remboursées ?',
    a: [
      'Les séances ne sont pas prises en charge par l’Assurance maladie. Certaines mutuelles remboursent une partie des séances au titre des médecines douces : renseignez-vous auprès de la vôtre. Une facture vous est remise sur demande.',
    ],
  },
];

const en: Faq = [
  {
    q: 'What is hypnosis?',
    a: [
      'Hypnosis is an altered state of consciousness that we all experience naturally every day without realising it: when you drive from A to B and forget the journey, or when you are completely absorbed in a film.',
      'Unlike stage hypnosis, which is directive, the hypnosis I use is permissive. There is no test to see whether you are receptive: we all are, to different degrees. I suggest paths to your unconscious mind and together we create your own session.',
    ],
  },
  {
    q: 'What is NLP?',
    a: [
      'Neuro-linguistic programming brings together communication and personal development techniques that aim to identify, understand and change our behaviours and ways of thinking.',
      'A phrase from Grinder and Bandler, the founders of NLP, sums up the practice beautifully: “A problem is a solution that has aged badly.”',
    ],
  },
  {
    q: 'What is emotional cleansing through eye movements (NEMO-EMDR)?',
    a: [
      'Eye movements happen naturally, especially during sleep, when the brain sorts the information received during the day.',
      'NEMO uses alternating bilateral stimulation to help the brain “digest” a memory that has stayed stuck. It is emotion that marks the memory: we work on the emotion and the related memory is filed away. It loses its emotional charge, and you can think about it again without being overwhelmed.',
    ],
  },
  {
    q: 'How does a session work?',
    a: [
      'A session starts with a conversation of about twenty minutes to understand your needs. I then use Ericksonian hypnosis, NEMO or NLP questions. Each session is personalised and adapted to your pace.',
    ],
  },
  {
    q: 'How many sessions will I need?',
    a: [
      'It is impossible to say in advance: it is different for everyone. Some issues can be addressed in a single session, others in one to three sessions, or with longer support.',
    ],
  },
  {
    q: 'Are hypnosis and NEMO suitable for children?',
    a: [
      'Yes. These brief therapies can help children from the age of 6 or 7 with stress and school anxiety, attention difficulties, emotional difficulties or sleep problems, in a playful and caring way.',
    ],
  },
  {
    q: 'Do sessions work online?',
    a: [
      'Yes. My voice guides you just as it does at the practice, and for eye movements you follow the wand I move in front of the camera. Many people enjoy experiencing the session at home, in familiar surroundings.',
      'All you need is a quiet place, a comfortable armchair or sofa, a computer, tablet or phone set up so it stays still, a good connection and, if possible, headphones. The video link is sent to you before the appointment.',
    ],
  },
  {
    q: 'Are sessions reimbursed?',
    a: [
      'Sessions are not covered by the French state health insurance (Assurance maladie). Some complementary health insurers (mutuelles) reimburse part of the cost under alternative medicine: check with yours. An invoice is provided on request.',
    ],
  },
];

export const faq = { fr, en };
