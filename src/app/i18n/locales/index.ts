/**
 * Translation files index
 * Centralizes all language imports for easy management
 */
import { es } from './es';
import { en } from './en';
import type { Language, Translations } from '../translations.interface';

/**
 * All translations organized by language code
 * Add new language imports here when expanding support
 */
export const TRANSLATIONS: Record<Language, Translations> = {
  es,
  en
};

/**
 * Dynamic translation loader
 * Lazy loads translation files for better performance
 * 
 * @param language - Language code to load
 * @returns Promise with the translation object
 */
export async function loadTranslations(language: Language): Promise<Translations> {
  try {
    switch (language) {
      case 'es':
        return (await import('./es')).es;
      case 'en':
        return (await import('./en')).en;
      default:
        // Fallback to Spanish
        return (await import('./es')).es;
    }
  } catch (error) {
    console.error(`Failed to load translations for language: ${language}`, error);
    // Fallback to Spanish
    return (await import('./es')).es;
  }
}

/**
 * Get available languages from translations
 * Useful for building language selector components
 */
export function getAvailableLanguages(): Language[] {
  return Object.keys(TRANSLATIONS) as Language[];
}

/**
 * Validate if a language is supported
 * Type guard function for language validation
 */
export function isValidLanguage(lang: string): lang is Language {
  return Object.keys(TRANSLATIONS).includes(lang);
}