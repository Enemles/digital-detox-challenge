import type { Level, Badge, EcoTip, ProfileType } from '../types';

// === DONNÉES FACTUELLES SUR L'EMPREINTE CARBONE ===

// Empreinte carbone des emails (en grammes de CO2)
export const EMAIL_CARBON_IMPACT = {
  SIMPLE: 4, // Email simple sans pièce jointe
  WITH_ATTACHMENT: 50, // Email avec pièce jointe
  NEWSLETTER: 10, // Newsletter moyenne
  PROMOTIONAL: 15, // Email promotionnel
  SPAM: 0.3, // Email spam (traité automatiquement)
} as const;

// Empreinte carbone du stockage cloud (en kg CO2 par Go par an)
export const CLOUD_CARBON_IMPACT = {
  STANDARD: 0.5, // Stockage standard
  FREQUENTLY_ACCESSED: 0.8, // Stockage fréquemment accédé
  ARCHIVE: 0.2, // Stockage d'archivage
} as const;

// Empreinte carbone du streaming (en grammes CO2 par heure)
export const STREAMING_CARBON_IMPACT = {
  SD: 4.6, // Définition standard
  HD: 36, // Haute définition
  '4K': 97, // Ultra haute définition
} as const;

// === STATISTIQUES GLOBALES ===

export const DIGITAL_IMPACT_STATS = {
  GLOBAL_PERCENTAGE: 4, // % des émissions mondiales
  EMAILS_PER_DAY_AVERAGE: 121, // Moyenne mondiale
  CLOUD_STORAGE_AVERAGE: 15, // Go par utilisateur
  STREAMING_HOURS_AVERAGE: 3.2, // Heures par jour
  YEARLY_GROWTH: 8, // % de croissance annuelle
} as const;

// === CONFIGURATION DE L'APPLICATION ===

export const APP_CONFIG = {
  NAME: 'Digital Detox Challenge',
  VERSION: '1.0.0',
  DESCRIPTION: 'Défi de sensibilisation à l\'empreinte carbone numérique',
  LOCALE: 'fr-FR',
  CURRENCY: 'EUR',
  TIMEZONE: 'Europe/Paris',
} as const;

// === SYSTÈME DE PROGRESSION ===

export const XP_REWARDS = {
  EMAIL_DELETED: 2,
  NEWSLETTER_UNSUBSCRIBED: 10,
  FILE_DELETED: 5,
  CLOUD_CLEANED: 15,
  TAB_CLOSED: 1,
  STREAMING_HOUR_REDUCED: 20,
  CHALLENGE_COMPLETED: 50,
  DAILY_STREAK: 25,
  WEEKLY_STREAK: 100,
} as const;

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Débutant Numérique',
    description: 'Premiers pas vers un numérique plus vert',
    minXP: 0,
    maxXP: 100,
    color: '#22c55e',
    icon: '🌱',
    rewards: [],
  },
  {
    id: 2,
    name: 'Apprenti Éco-Tech',
    description: 'Tu commences à comprendre l\'impact du numérique',
    minXP: 100,
    maxXP: 300,
    color: '#16a34a',
    icon: '🌿',
    rewards: [],
  },
  {
    id: 3,
    name: 'Gardien du Cloud',
    description: 'Expert en nettoyage d\'emails et de fichiers',
    minXP: 300,
    maxXP: 600,
    color: '#15803d',
    icon: '☁️',
    rewards: [],
  },
  {
    id: 4,
    name: 'Maître du Streaming',
    description: 'Tu maîtrises l\'art de la consommation raisonnée',
    minXP: 600,
    maxXP: 1000,
    color: '#166534',
    icon: '📺',
    rewards: [],
  },
  {
    id: 5,
    name: 'Éco-Warrior',
    description: 'Champion de l\'écologie numérique',
    minXP: 1000,
    maxXP: 2000,
    color: '#14532d',
    icon: '🛡️',
    rewards: [],
  },
  {
    id: 6,
    name: 'Légende Verte',
    description: 'Modèle d\'inspiration pour tous',
    minXP: 2000,
    maxXP: Infinity,
    color: '#052e16',
    icon: '🏆',
    rewards: [],
  },
];

export const BADGES: Badge[] = [
  // Badges emails
  {
    id: 'email-cleaner-bronze',
    name: 'Nettoyeur d\'Emails',
    description: 'Supprimer 100 emails',
    icon: '📧',
    color: '#cd7f32',
    category: 'emails',
    maxProgress: 100,
  },
  {
    id: 'email-cleaner-silver',
    name: 'Maître des Emails',
    description: 'Supprimer 500 emails',
    icon: '📬',
    color: '#c0c0c0',
    category: 'emails',
    maxProgress: 500,
  },
  {
    id: 'email-cleaner-gold',
    name: 'Légende des Emails',
    description: 'Supprimer 1000 emails',
    icon: '📮',
    color: '#ffd700',
    category: 'emails',
    maxProgress: 1000,
  },
  // Badges cloud
  {
    id: 'cloud-cleaner-bronze',
    name: 'Organisateur Cloud',
    description: 'Libérer 1 Go d\'espace',
    icon: '☁️',
    color: '#cd7f32',
    category: 'cloud',
    maxProgress: 1,
  },
  {
    id: 'cloud-cleaner-silver',
    name: 'Maître du Cloud',
    description: 'Libérer 10 Go d\'espace',
    icon: '🌩️',
    color: '#c0c0c0',
    category: 'cloud',
    maxProgress: 10,
  },
  {
    id: 'cloud-cleaner-gold',
    name: 'Légende du Cloud',
    description: 'Libérer 50 Go d\'espace',
    icon: '⛅',
    color: '#ffd700',
    category: 'cloud',
    maxProgress: 50,
  },
  // Badges streaming
  {
    id: 'streaming-reducer-bronze',
    name: 'Modérateur Streaming',
    description: 'Réduire 10h de streaming',
    icon: '📺',
    color: '#cd7f32',
    category: 'streaming',
    maxProgress: 10,
  },
  {
    id: 'streaming-reducer-silver',
    name: 'Maître du Streaming',
    description: 'Réduire 50h de streaming',
    icon: '🎬',
    color: '#c0c0c0',
    category: 'streaming',
    maxProgress: 50,
  },
  {
    id: 'streaming-reducer-gold',
    name: 'Légende du Streaming',
    description: 'Réduire 100h de streaming',
    icon: '🎭',
    color: '#ffd700',
    category: 'streaming',
    maxProgress: 100,
  },
  // Badges généraux
  {
    id: 'first-challenge',
    name: 'Premier Défi',
    description: 'Compléter ton premier défi',
    icon: '🏁',
    color: '#22c55e',
    category: 'general',
    maxProgress: 1,
  },
  {
    id: 'streak-7',
    name: 'Une Semaine',
    description: 'Maintenir une série de 7 jours',
    icon: '🔥',
    color: '#f59e0b',
    category: 'general',
    maxProgress: 7,
  },
  {
    id: 'streak-30',
    name: 'Un Mois',
    description: 'Maintenir une série de 30 jours',
    icon: '⚡',
    color: '#ef4444',
    category: 'general',
    maxProgress: 30,
  },
  {
    id: 'eco-warrior',
    name: 'Éco-Warrior',
    description: 'Économiser 1 kg de CO2',
    icon: '🌍',
    color: '#10b981',
    category: 'eco-warrior',
    maxProgress: 1000, // en grammes
  },
];

// === CONSEILS ÉCOLOGIQUES ===

export const ECO_TIPS: EcoTip[] = [
  {
    id: 'unsubscribe-newsletters',
    title: 'Désabonne-toi des newsletters',
    description: 'Supprime les newsletters que tu ne lis jamais pour réduire ton empreinte email.',
    category: 'emails',
    impact: 'medium',
    difficulty: 'easy',
    estimatedCO2Saved: 50,
    icon: '📧',
  },
  {
    id: 'compress-files',
    title: 'Compresse tes fichiers',
    description: 'Utilise des formats compressés pour réduire l\'espace de stockage cloud.',
    category: 'cloud',
    impact: 'high',
    difficulty: 'medium',
    estimatedCO2Saved: 100,
    icon: '🗜️',
  },
  {
    id: 'reduce-streaming-quality',
    title: 'Réduis la qualité de streaming',
    description: 'Passe en HD au lieu de 4K pour diviser par 3 ton empreinte carbone.',
    category: 'streaming',
    impact: 'high',
    difficulty: 'easy',
    estimatedCO2Saved: 200,
    icon: '📺',
  },
  {
    id: 'close-unused-tabs',
    title: 'Ferme les onglets inutiles',
    description: 'Chaque onglet ouvert consomme de l\'énergie, même en arrière-plan.',
    category: 'general',
    impact: 'low',
    difficulty: 'easy',
    estimatedCO2Saved: 10,
    icon: '🌐',
  },
  {
    id: 'delete-duplicate-photos',
    title: 'Supprime les photos en double',
    description: 'Libère de l\'espace en supprimant les doublons et les photos floues.',
    category: 'cloud',
    impact: 'medium',
    difficulty: 'medium',
    estimatedCO2Saved: 75,
    icon: '📸',
  },
];

// === TYPES DE PROFILS ===

export const PROFILE_TYPES: Record<ProfileType, { description: string; icon: string; color: string }> = {
  'Streameur Intense': {
    description: 'Tu passes beaucoup de temps à regarder des vidéos en ligne',
    icon: '📺',
    color: '#ef4444',
  },
  'Email Collector': {
    description: 'Ta boîte mail déborde d\'emails non lus',
    icon: '📧',
    color: '#3b82f6',
  },
  'Cloud Addict': {
    description: 'Tu stockes tout dans le cloud sans jamais faire le tri',
    icon: '☁️',
    color: '#8b5cf6',
  },
  'Numérique Équilibré': {
    description: 'Tu as déjà de bonnes habitudes numériques',
    icon: '⚖️',
    color: '#10b981',
  },
  'Eco-Warrior': {
    description: 'Tu es déjà très conscient de ton impact numérique',
    icon: '🌍',
    color: '#059669',
  },
};

// === QUESTIONS ONBOARDING ===

export const ONBOARDING_QUESTIONS = [
  {
    id: 'daily-emails',
    question: 'Combien d\'emails reçois-tu par jour environ ?',
    type: 'slider',
    min: 0,
    max: 200,
    step: 5,
    unit: 'emails',
  },
  {
    id: 'cloud-storage',
    question: 'Combien de Go utilises-tu dans le cloud ?',
    type: 'slider',
    min: 0,
    max: 1000,
    step: 10,
    unit: 'Go',
  },
  {
    id: 'streaming-hours',
    question: 'Combien d\'heures de streaming par jour ?',
    type: 'slider',
    min: 0,
    max: 12,
    step: 0.5,
    unit: 'heures',
  },
  {
    id: 'email-habits',
    question: 'Quelle est ta relation avec les emails ?',
    type: 'choice',
    options: [
      'Je supprime régulièrement mes emails',
      'Je garde tout "au cas où"',
      'Je ne regarde que les emails importants',
      'Ma boîte mail est un chaos total',
    ],
  },
  {
    id: 'eco-awareness',
    question: 'Étais-tu conscient de l\'impact écologique du numérique ?',
    type: 'choice',
    options: [
      'Pas du tout',
      'Un peu',
      'Moyennement',
      'Tout à fait',
    ],
  },
];

// === DÉFIS TYPES ===

export const CHALLENGE_TEMPLATES = [
  {
    id: 'daily-email-cleanup',
    title: 'Nettoyage d\'emails quotidien',
    description: 'Supprime 20 emails aujourd\'hui',
    type: 'delete_emails',
    category: 'emails',
    target: 20,
    xpReward: 40,
    estimatedCO2Saved: 80,
    duration: 'daily',
  },
  {
    id: 'newsletter-unsubscribe',
    title: 'Désabonnement newsletter',
    description: 'Désabonne-toi de 5 newsletters cette semaine',
    type: 'unsubscribe',
    category: 'emails',
    target: 5,
    xpReward: 100,
    estimatedCO2Saved: 250,
    duration: 'weekly',
  },
  {
    id: 'cloud-spring-cleaning',
    title: 'Grand nettoyage de printemps',
    description: 'Libère 1 Go d\'espace cloud ce mois-ci',
    type: 'clean_cloud',
    category: 'cloud',
    target: 1,
    xpReward: 200,
    estimatedCO2Saved: 500,
    duration: 'monthly',
  },
  {
    id: 'streaming-diet',
    title: 'Régime streaming',
    description: 'Réduis ton streaming d\'1 heure aujourd\'hui',
    type: 'reduce_streaming',
    category: 'streaming',
    target: 1,
    xpReward: 30,
    estimatedCO2Saved: 36,
    duration: 'daily',
  },
];

// === CONFIGURATION INTERFACE ===

export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  PARTICLES_COUNT: 50,
  CHART_COLORS: {
    PRIMARY: '#16a34a',
    SECONDARY: '#0284c7',
    SUCCESS: '#22c55e',
    WARNING: '#f59e0b',
    DANGER: '#ef4444',
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
} as const;

// === MESSAGES D'ENCOURAGEMENT ===

export const ENCOURAGEMENT_MESSAGES = [
  'Bravo ! Chaque geste compte pour la planète ! 🌍',
  'Tu fais partie des héros du numérique responsable ! 💚',
  'Continue comme ça, la Terre te remercie ! 🌱',
  'Génial ! Tu inspires les autres à faire de même ! ✨',
  'Quelle belle action pour l\'environnement ! 🌿',
  'Tu montres l\'exemple parfait ! 👏',
  'Fantastique ! Ton impact positif grandit ! 🚀',
];

// === URLS ET LIENS ===

export const EXTERNAL_LINKS = {
  CARBON_CALCULATOR: 'https://www.carbontrust.com/our-work/category/carbon-footprint',
  DIGITAL_IMPACT_STUDY: 'https://www.ademe.fr/numerique-environnement',
  ECO_TIPS_GUIDE: 'https://www.ademe.fr/particuliers-eco-citoyens/habiter/bien-gerer-dechets/dossier/reduire-impact-numerique',
  SUPPORT_EMAIL: 'support@digital-detox-challenge.com',
  PRIVACY_POLICY: '/privacy',
  TERMS_OF_SERVICE: '/terms',
} as const; 