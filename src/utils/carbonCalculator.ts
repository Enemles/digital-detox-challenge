import {
  EMAIL_CARBON_IMPACT,
  CLOUD_CARBON_IMPACT,
  STREAMING_CARBON_IMPACT,
} from '../constants';
import type { CarbonCalculator, StreamingQuality } from '../types';

/**
 * Calculateur d'empreinte carbone numérique
 * Utilise les données factuelles pour calculer l'impact environnemental
 */
export class DigitalCarbonCalculator implements CarbonCalculator {
  private totalEmailImpact = 0;
  private totalCloudImpact = 0;
  private totalStreamingImpact = 0;

  /**
   * Calcule l'empreinte carbone d'un email
   * @param size - Taille de l'email en KB (optionnel)
   * @param recipients - Nombre de destinataires
   * @param hasAttachment - Si l'email contient des pièces jointes
   * @returns Empreinte carbone en grammes de CO2
   */
  emailImpact(size: number = 0, recipients: number = 1, hasAttachment: boolean = false): number {
    // Calcul de base selon le type d'email
    let baseImpact = hasAttachment 
      ? EMAIL_CARBON_IMPACT.WITH_ATTACHMENT 
      : EMAIL_CARBON_IMPACT.SIMPLE;

    // Ajustement selon la taille si spécifiée
    if (size > 0) {
      // Facteur de multiplication pour les emails volumineux
      const sizeFactor = Math.max(1, size / 25); // 25KB = taille email moyenne
      baseImpact *= sizeFactor;
    }

    // Multiplication par le nombre de destinataires
    const totalImpact = baseImpact * recipients;
    
    this.totalEmailImpact += totalImpact;
    return Math.round(totalImpact * 100) / 100; // Arrondi à 2 décimales
  }

  /**
   * Calcule l'empreinte carbone du stockage cloud
   * @param gigabytes - Nombre de Go stockés
   * @param storageType - Type de stockage (standard, frequent, archive)
   * @returns Empreinte carbone en grammes de CO2 par an
   */
  cloudStorageImpact(gigabytes: number, storageType: 'standard' | 'frequent' | 'archive' = 'standard'): number {
    const impactPerGb = {
      standard: CLOUD_CARBON_IMPACT.STANDARD,
      frequent: CLOUD_CARBON_IMPACT.FREQUENTLY_ACCESSED,
      archive: CLOUD_CARBON_IMPACT.ARCHIVE,
    }[storageType];

    // Conversion kg -> grammes (* 1000)
    const totalImpact = gigabytes * impactPerGb * 1000;
    
    this.totalCloudImpact += totalImpact;
    return Math.round(totalImpact * 100) / 100;
  }

  /**
   * Calcule l'empreinte carbone du streaming
   * @param hours - Nombre d'heures de streaming
   * @param quality - Qualité du streaming (SD, HD, 4K)
   * @returns Empreinte carbone en grammes de CO2
   */
  streamingImpact(hours: number, quality: StreamingQuality = 'HD'): number {
    const impactPerHour = STREAMING_CARBON_IMPACT[quality];
    const totalImpact = hours * impactPerHour;
    
    this.totalStreamingImpact += totalImpact;
    return Math.round(totalImpact * 100) / 100;
  }

  /**
   * Calcule l'empreinte carbone totale
   * @returns Empreinte carbone totale en grammes de CO2
   */
  calculateTotal(): number {
    return Math.round((this.totalEmailImpact + this.totalCloudImpact + this.totalStreamingImpact) * 100) / 100;
  }

  /**
   * Remet à zéro tous les compteurs
   */
  reset(): void {
    this.totalEmailImpact = 0;
    this.totalCloudImpact = 0;
    this.totalStreamingImpact = 0;
  }

  /**
   * Obtient le détail des impacts par catégorie
   * @returns Objet contenant les impacts par catégorie
   */
  getDetailedImpact() {
    return {
      email: Math.round(this.totalEmailImpact * 100) / 100,
      cloud: Math.round(this.totalCloudImpact * 100) / 100,
      streaming: Math.round(this.totalStreamingImpact * 100) / 100,
      total: this.calculateTotal(),
    };
  }
}

/**
 * Fonctions utilitaires pour les calculs rapides
 */

/**
 * Calcule l'empreinte carbone d'une boîte mail
 * @param emailCount - Nombre d'emails
 * @param averageSize - Taille moyenne des emails en KB
 * @param attachmentRatio - Ratio d'emails avec pièces jointes (0-1)
 * @returns Empreinte carbone en grammes de CO2
 */
export function calculateMailboxImpact(
  emailCount: number,
  averageSize: number = 25,
  attachmentRatio: number = 0.2
): number {
  const calculator = new DigitalCarbonCalculator();
  
  const emailsWithAttachments = Math.floor(emailCount * attachmentRatio);
  const emailsWithoutAttachments = emailCount - emailsWithAttachments;
  
  // Calcul des emails avec pièces jointes
  for (let i = 0; i < emailsWithAttachments; i++) {
    calculator.emailImpact(averageSize * 2, 1, true);
  }
  
  // Calcul des emails sans pièces jointes
  for (let i = 0; i < emailsWithoutAttachments; i++) {
    calculator.emailImpact(averageSize, 1, false);
  }
  
  return calculator.getDetailedImpact().email;
}

/**
 * Calcule l'empreinte carbone annuelle d'un utilisateur
 * @param profile - Profil utilisateur avec habitudes numériques
 * @returns Empreinte carbone annuelle en kg de CO2
 */
export function calculateAnnualImpact(profile: {
  dailyEmails: number;
  cloudStorageGB: number;
  dailyStreamingHours: number;
  streamingQuality: StreamingQuality;
}): number {
  const calculator = new DigitalCarbonCalculator();
  
  // Impact annuel des emails
  const yearlyEmails = profile.dailyEmails * 365;
  const emailImpact = calculateMailboxImpact(yearlyEmails);
  
  // Impact annuel du cloud
  const cloudImpact = calculator.cloudStorageImpact(profile.cloudStorageGB);
  
  // Impact annuel du streaming
  const yearlyStreamingHours = profile.dailyStreamingHours * 365;
  const streamingImpact = calculator.streamingImpact(yearlyStreamingHours, profile.streamingQuality);
  
  // Conversion en kg (diviser par 1000)
  return Math.round((emailImpact + cloudImpact + streamingImpact) / 1000 * 100) / 100;
}

/**
 * Calcule l'économie de CO2 pour une action donnée
 * @param action - Type d'action écologique
 * @param quantity - Quantité (nombre d'emails, heures, Go, etc.)
 * @returns CO2 économisé en grammes
 */
export function calculateCO2Saved(
  action: 'email_deleted' | 'file_deleted' | 'streaming_reduced' | 'newsletter_unsubscribed',
  quantity: number,
  metadata?: { quality?: StreamingQuality; size?: number }
): number {
  const calculator = new DigitalCarbonCalculator();
  
  switch (action) {
    case 'email_deleted':
      return calculator.emailImpact(metadata?.size || 25, 1, false);
    
    case 'file_deleted':
      // Approximation : 1 fichier = 10MB = 0.01 Go
      return calculator.cloudStorageImpact(quantity * 0.01);
    
    case 'streaming_reduced':
      return calculator.streamingImpact(quantity, metadata?.quality || 'HD');
    
    case 'newsletter_unsubscribed':
      // Approximation : 1 newsletter = 4 emails/mois pendant 1 an
      return calculator.emailImpact(30, 1, false) * 4 * 12;
    
    default:
      return 0;
  }
}

/**
 * Convertit les grammes de CO2 en équivalents compréhensibles
 * @param grams - Grammes de CO2
 * @returns Objet avec différents équivalents
 */
export function convertCO2ToEquivalents(grams: number) {
  return {
    // Équivalent en kilomètres en voiture (120g CO2/km)
    carKilometers: Math.round(grams / 120 * 100) / 100,
    
    // Équivalent en arbres plantés (1 arbre absorbe ~22kg CO2/an)
    treesEquivalent: Math.round(grams / 22000 * 100) / 100,
    
    // Équivalent en temps de charge d'un smartphone (8g CO2/charge)
    phoneCharges: Math.round(grams / 8 * 100) / 100,
    
    // Équivalent en tasses de café (37g CO2/tasse)
    coffeeCups: Math.round(grams / 37 * 100) / 100,
    
    // Équivalent en ampoules LED allumées (4.5g CO2/h)
    ledHours: Math.round(grams / 4.5 * 100) / 100,
  };
}

/**
 * Détermine le type de profil utilisateur selon ses habitudes
 * @param habits - Habitudes numériques de l'utilisateur
 * @returns Type de profil
 */
export function determineProfileType(habits: {
  dailyEmails: number;
  cloudStorageGB: number;
  dailyStreamingHours: number;
}): string {
  const { dailyEmails, cloudStorageGB, dailyStreamingHours } = habits;
  
  // Seuils pour déterminer le profil
  const highEmailThreshold = 100;
  const highCloudThreshold = 50;
  const highStreamingThreshold = 4;
  
  // Calcul des scores
  const emailScore = dailyEmails >= highEmailThreshold ? 1 : 0;
  const cloudScore = cloudStorageGB >= highCloudThreshold ? 1 : 0;
  const streamingScore = dailyStreamingHours >= highStreamingThreshold ? 1 : 0;
  
  const totalScore = emailScore + cloudScore + streamingScore;
  
  // Détermination du profil principal
  if (dailyStreamingHours >= highStreamingThreshold && streamingScore >= Math.max(emailScore, cloudScore)) {
    return 'Streameur Intense';
  } else if (dailyEmails >= highEmailThreshold && emailScore >= Math.max(cloudScore, streamingScore)) {
    return 'Email Collector';
  } else if (cloudStorageGB >= highCloudThreshold && cloudScore >= Math.max(emailScore, streamingScore)) {
    return 'Cloud Addict';
  } else if (totalScore === 0) {
    return 'Eco-Warrior';
  } else {
    return 'Numérique Équilibré';
  }
}

// Instance globale pour usage simple
export const carbonCalculator = new DigitalCarbonCalculator(); 