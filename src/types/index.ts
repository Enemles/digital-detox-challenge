// Types pour l'utilisateur et son profil
export interface User {
  id: string;
  name?: string;
  email?: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  profileType: ProfileType;
  dailyEmails: number;
  cloudStorageGB: number;
  streamingHours: number;
  currentLevel: number;
  totalXP: number;
  totalCO2Saved: number;
  joinedAt: Date;
  lastUpdated: Date;
}

export type ProfileType = 
  | 'Streameur Intense'
  | 'Email Collector'
  | 'Cloud Addict'
  | 'Numérique Équilibré'
  | 'Eco-Warrior';

// Types pour les calculs d'empreinte carbone
export interface CarbonCalculation {
  emailImpact: number;
  cloudStorageImpact: number;
  streamingImpact: number;
  totalImpact: number;
  calculatedAt: Date;
}

export interface CarbonCalculator {
  emailImpact: (size: number, recipients: number) => number;
  cloudStorageImpact: (gigabytes: number) => number;
  streamingImpact: (hours: number, quality: StreamingQuality) => number;
  calculateTotal: () => number;
}

export type StreamingQuality = 'SD' | 'HD' | '4K';

// Types pour le système de progression
export interface Level {
  id: number;
  name: string;
  description: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
  rewards: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: BadgeCategory;
  earnedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export type BadgeCategory = 
  | 'emails'
  | 'cloud'
  | 'streaming'
  | 'general'
  | 'eco-warrior';

// Types pour les défis
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  category: BadgeCategory;
  target: number;
  currentProgress: number;
  xpReward: number;
  co2Saved: number;
  duration: ChallengeDuration;
  status: ChallengeStatus;
  createdAt: Date;
  completedAt?: Date;
}

export type ChallengeType = 
  | 'delete_emails'
  | 'unsubscribe'
  | 'clean_cloud'
  | 'reduce_streaming'
  | 'close_tabs';

export type ChallengeDuration = 'daily' | 'weekly' | 'monthly';

export type ChallengeStatus = 'active' | 'completed' | 'failed' | 'pending';

// Types pour les actions utilisateur
export interface UserAction {
  id: string;
  userId: string;
  type: ActionType;
  description: string;
  xpGained: number;
  co2Saved: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export type ActionType = 
  | 'email_deleted'
  | 'newsletter_unsubscribed'
  | 'file_deleted'
  | 'cloud_cleaned'
  | 'tab_closed'
  | 'streaming_reduced'
  | 'challenge_completed'
  | 'level_up';

// Types pour les statistiques
export interface UserStats {
  totalCO2Saved: number;
  totalXP: number;
  currentLevel: number;
  emailsDeleted: number;
  filesDeleted: number;
  streamingHoursReduced: number;
  challengesCompleted: number;
  currentStreak: number;
  longestStreak: number;
}

// Types pour les données de l'onboarding
export interface OnboardingData {
  step: number;
  totalSteps: number;
  responses: OnboardingResponse[];
  isCompleted: boolean;
}

export interface OnboardingResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

// Types pour les données de leaderboard
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalCO2Saved: number;
  totalXP: number;
  level: number;
  profileType: ProfileType;
  isAnonymous: boolean;
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'achievement'
  | 'challenge'
  | 'level_up'
  | 'streak'
  | 'tip'
  | 'reminder';

// Types pour les conseils
export interface EcoTip {
  id: string;
  title: string;
  description: string;
  category: BadgeCategory;
  impact: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedCO2Saved: number;
  icon: string;
}

// Types pour les données de simulation
export interface SimulationData {
  emailsToDelete: number;
  filesToDelete: number;
  subscriptionsToCancel: number;
  estimatedCO2Saved: number;
  estimatedXP: number;
}

// Types pour les paramètres de l'application
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  notifications: boolean;
  soundEffects: boolean;
  animations: boolean;
  dataCollection: boolean;
}

// Types pour les erreurs
export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
}

// Types pour les analytics
export interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  properties: Record<string, unknown>;
  timestamp: Date;
}

export interface AnalyticsData {
  sessionId: string;
  userId?: string;
  events: AnalyticsEvent[];
  sessionStartedAt: Date;
  sessionEndedAt?: Date;
} 