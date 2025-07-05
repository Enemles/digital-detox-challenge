import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  UserProfile, 
  UserStats, 
  Challenge, 
  Badge, 
  OnboardingData,
  AppSettings,
  EcoTip,
  Notification,
  UserAction,
  CarbonCalculation 
} from '../types';
import { 
  LEVELS, 
  BADGES, 
  ECO_TIPS, 
  CHALLENGE_TEMPLATES,
  ENCOURAGEMENT_MESSAGES 
} from '../constants';
import { calculateAnnualImpact, determineProfileType } from '../utils/carbonCalculator';

interface AppState {
  // État utilisateur
  user: UserProfile | null;
  userStats: UserStats;
  isFirstVisit: boolean;
  
  // Onboarding
  onboarding: OnboardingData;
  
  // Défis et progression
  challenges: Challenge[];
  completedChallenges: Challenge[];
  badges: Badge[];
  
  // Conseils écologiques
  ecoTips: EcoTip[];
  
  // Notifications
  notifications: Notification[];
  
  // Paramètres
  settings: AppSettings;
  
  // Calculs carbone
  carbonCalculation: CarbonCalculation | null;
  
  // Actions utilisateur récentes
  recentActions: UserAction[];
}

interface AppActions {
  // Actions utilisateur
  initializeUser: (onboardingData: OnboardingData) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  // Actions onboarding
  updateOnboarding: (step: number, response?: { questionId: string; answer: string | number }) => void;
  completeOnboarding: () => void;
  
  // Actions défis
  createChallenge: (templateId: string) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  
     // Actions XP et niveaux
   addXP: (amount: number) => void;
  checkLevelUp: () => boolean;
  
  // Actions badges
  unlockBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
  
  // Actions utilisateur
  recordAction: (action: Omit<UserAction, 'id' | 'timestamp'>) => void;
  
  // Actions carbone
  updateCarbonCalculation: (calculation: CarbonCalculation) => void;
  
  // Actions notifications
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  
  // Actions paramètres
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // Actions utilitaires
  resetApp: () => void;
  getRandomEncouragementMessage: () => string;
}

const initialState: AppState = {
  user: null,
  userStats: {
    totalCO2Saved: 0,
    totalXP: 0,
    currentLevel: 1,
    emailsDeleted: 0,
    filesDeleted: 0,
    streamingHoursReduced: 0,
    challengesCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  isFirstVisit: true,
  
  onboarding: {
    step: 0,
    totalSteps: 5,
    responses: [],
    isCompleted: false,
  },
  
  challenges: [],
  completedChallenges: [],
  badges: [...BADGES],
  
  ecoTips: [...ECO_TIPS],
  
  notifications: [],
  
  settings: {
    theme: 'system',
    language: 'fr',
    notifications: true,
    soundEffects: true,
    animations: true,
    dataCollection: true,
  },
  
  carbonCalculation: null,
  recentActions: [],
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions utilisateur
      initializeUser: (onboardingData) => {
        const responses = onboardingData.responses;
        const dailyEmails = responses.find(r => r.questionId === 'daily-emails')?.answer as number || 50;
        const cloudStorageGB = responses.find(r => r.questionId === 'cloud-storage')?.answer as number || 15;
        const streamingHours = responses.find(r => r.questionId === 'streaming-hours')?.answer as number || 2;
        
        const profileType = determineProfileType({
          dailyEmails,
          cloudStorageGB,
          dailyStreamingHours: streamingHours,
        });
        
        const annualImpact = calculateAnnualImpact({
          dailyEmails,
          cloudStorageGB,
          dailyStreamingHours: streamingHours,
          streamingQuality: 'HD',
        });
        
                 const newUser: UserProfile = {
           id: crypto.randomUUID(),
           userId: crypto.randomUUID(),
           profileType: profileType as UserProfile['profileType'],
          dailyEmails,
          cloudStorageGB,
          streamingHours,
          currentLevel: 1,
          totalXP: 0,
          totalCO2Saved: 0,
          joinedAt: new Date(),
          lastUpdated: new Date(),
        };
        
        set((state) => ({
          user: newUser,
          isFirstVisit: false,
          carbonCalculation: {
            emailImpact: dailyEmails * 4 * 365, // emails par an
            cloudStorageImpact: cloudStorageGB * 500, // impact annuel cloud
            streamingImpact: streamingHours * 36 * 365, // streaming par an
            totalImpact: annualImpact * 1000, // conversion kg->g
            calculatedAt: new Date(),
          },
        }));
      },
      
      updateUserProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates, lastUpdated: new Date() } : null,
        }));
      },
      
      // Actions onboarding
      updateOnboarding: (step, response) => {
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            step,
            responses: response 
              ? [...state.onboarding.responses.filter(r => r.questionId !== response.questionId), 
                 { ...response, timestamp: new Date() }]
              : state.onboarding.responses,
          },
        }));
      },
      
      completeOnboarding: () => {
        set((state) => ({
          onboarding: { ...state.onboarding, isCompleted: true },
        }));
      },
      
      // Actions défis
      createChallenge: (templateId) => {
        const template = CHALLENGE_TEMPLATES.find(t => t.id === templateId);
        if (!template) return;
        
                 const newChallenge: Challenge = {
           id: crypto.randomUUID(),
           title: template.title,
           description: template.description,
           type: template.type as Challenge['type'],
           category: template.category as Challenge['category'],
           target: template.target,
           currentProgress: 0,
           xpReward: template.xpReward,
           co2Saved: template.estimatedCO2Saved,
           duration: template.duration as Challenge['duration'],
           status: 'active',
           createdAt: new Date(),
         };
        
        set((state) => ({
          challenges: [...state.challenges, newChallenge],
        }));
      },
      
      updateChallengeProgress: (challengeId, progress) => {
        set((state) => ({
          challenges: state.challenges.map(challenge =>
            challenge.id === challengeId
              ? { ...challenge, currentProgress: Math.min(progress, challenge.target) }
              : challenge
          ),
        }));
        
        // Vérifier si le défi est complété
        const challenge = get().challenges.find(c => c.id === challengeId);
        if (challenge && challenge.currentProgress >= challenge.target) {
          get().completeChallenge(challengeId);
        }
      },
      
      completeChallenge: (challengeId) => {
        const challenge = get().challenges.find(c => c.id === challengeId);
        if (!challenge) return;
        
        const completedChallenge = {
          ...challenge,
          status: 'completed' as const,
          completedAt: new Date(),
        };
        
        set((state) => ({
          challenges: state.challenges.filter(c => c.id !== challengeId),
          completedChallenges: [...state.completedChallenges, completedChallenge],
          userStats: {
            ...state.userStats,
            challengesCompleted: state.userStats.challengesCompleted + 1,
            totalCO2Saved: state.userStats.totalCO2Saved + challenge.co2Saved,
          },
        }));
        
                 // Ajouter XP
         get().addXP(challenge.xpReward);
        
        // Enregistrer l'action
        get().recordAction({
          userId: get().user?.userId || '',
          type: 'challenge_completed',
          description: `Défi complété: ${challenge.title}`,
          xpGained: challenge.xpReward,
          co2Saved: challenge.co2Saved,
        });
      },
      
             // Actions XP et niveaux
       addXP: (amount) => {
        set((state) => ({
          userStats: {
            ...state.userStats,
            totalXP: state.userStats.totalXP + amount,
          },
        }));
        
        // Vérifier montée de niveau
        if (get().checkLevelUp()) {
          get().addNotification({
            userId: get().user?.userId || '',
            type: 'level_up',
            title: 'Niveau supérieur !',
            message: `Félicitations ! Tu as atteint le niveau ${get().userStats.currentLevel}`,
            isRead: false,
          });
        }
      },
      
             checkLevelUp: () => {
         const { userStats } = get();
         const nextLevel = LEVELS.find(l => l.id === userStats.currentLevel + 1);
        
        if (nextLevel && userStats.totalXP >= nextLevel.minXP) {
          set((state) => ({
            userStats: {
              ...state.userStats,
              currentLevel: nextLevel.id,
            },
          }));
          
          // Enregistrer l'action
          get().recordAction({
            userId: get().user?.userId || '',
            type: 'level_up',
            description: `Niveau ${nextLevel.id} atteint: ${nextLevel.name}`,
            xpGained: 0,
            co2Saved: 0,
          });
          
          return true;
        }
        
        return false;
      },
      
      // Actions badges
      unlockBadge: (badgeId) => {
        set((state) => ({
          badges: state.badges.map(badge =>
            badge.id === badgeId
              ? { ...badge, earnedAt: new Date() }
              : badge
          ),
        }));
        
        const badge = get().badges.find(b => b.id === badgeId);
        if (badge) {
          get().addNotification({
            userId: get().user?.userId || '',
            type: 'achievement',
            title: 'Nouveau badge !',
            message: `Tu as débloqué: ${badge.name}`,
            isRead: false,
          });
        }
      },
      
      updateBadgeProgress: (badgeId, progress) => {
        set((state) => ({
          badges: state.badges.map(badge =>
            badge.id === badgeId
              ? { ...badge, progress: Math.min(progress, badge.maxProgress || 100) }
              : badge
          ),
        }));
        
        // Vérifier si le badge est débloqué
        const badge = get().badges.find(b => b.id === badgeId);
        if (badge && badge.progress === badge.maxProgress && !badge.earnedAt) {
          get().unlockBadge(badgeId);
        }
      },
      
      // Actions utilisateur
      recordAction: (action) => {
        const fullAction: UserAction = {
          ...action,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };
        
        set((state) => ({
          recentActions: [fullAction, ...state.recentActions.slice(0, 49)], // Garder les 50 dernières
          userStats: {
            ...state.userStats,
            totalXP: state.userStats.totalXP + action.xpGained,
            totalCO2Saved: state.userStats.totalCO2Saved + action.co2Saved,
          },
        }));
      },
      
      // Actions carbone
      updateCarbonCalculation: (calculation) => {
        set({ carbonCalculation: calculation });
      },
      
      // Actions notifications
      addNotification: (notification) => {
        const fullNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          notifications: [fullNotification, ...state.notifications],
        }));
      },
      
      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          ),
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // Actions paramètres
      updateSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
      
      // Actions utilitaires
      resetApp: () => {
        set(initialState);
      },
      
      getRandomEncouragementMessage: () => {
        const messages = ENCOURAGEMENT_MESSAGES;
        return messages[Math.floor(Math.random() * messages.length)];
      },
    }),
    {
      name: 'digital-detox-storage',
      version: 1,
    }
  )
); 