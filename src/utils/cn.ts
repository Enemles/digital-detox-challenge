import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilitaire pour combiner des classes CSS avec gestion des conflits Tailwind
 * @param inputs - Classes CSS à combiner
 * @returns String de classes CSS optimisées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 