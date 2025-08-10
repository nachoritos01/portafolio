import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, Language } from './translations.interface';
import { isValidLanguage } from './locales';

/**
 * Translation utilities
 * Helper functions for language detection and management
 */

/**
 * Detect user's preferred language from browser settings
 * Returns the best match from supported languages
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  // Get browser languages in order of preference
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Find first supported language
  for (const browserLang of browserLanguages) {
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (isValidLanguage(langCode)) {
      return langCode as Language;
    }
  }

  // Fallback to default language
  return DEFAULT_LANGUAGE;
}

/**
 * Load language preference from localStorage
 * Returns null if no preference is stored or if invalid
 */
export function getStoredLanguage(): Language | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isValidLanguage(stored)) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to read language preference from localStorage:', error);
  }

  return null;
}

/**
 * Save language preference to localStorage
 * Handles errors gracefully
 */
export function storeLanguage(language: Language): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Failed to save language preference to localStorage:', error);
  }
}

/**
 * Initialize language based on stored preference and browser detection
 * Priority: localStorage > browser detection > default
 */
export function initializeLanguage(): Language {
  // First priority: stored preference
  const stored = getStoredLanguage();
  if (stored) {
    return stored;
  }

  // Second priority: browser detection
  return detectBrowserLanguage();
}

/**
 * Format language display name
 * Returns native name with optional English translation
 */
export function formatLanguageName(language: Language, includeEnglish = false): string {
  const languageNames: Record<Language, { native: string; english: string }> = {
    es: { native: 'Español', english: 'Spanish' },
    en: { native: 'English', english: 'English' }
  };

  const names = languageNames[language];
  if (!names) return language;

  return includeEnglish && names.native !== names.english 
    ? `${names.native} (${names.english})`
    : names.native;
}

/**
 * Get language direction (LTR/RTL)
 * Useful for CSS and layout adjustments
 */
export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  // Currently all supported languages are LTR
  // Add RTL languages here when needed (Arabic, Hebrew, etc.)
  const rtlLanguages: Language[] = [];
  
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
}

/**
 * Validate translation completeness
 * Development utility to ensure all keys are translated
 */
export function validateTranslations(translations: Record<string, any>, path = ''): string[] {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(translations)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (value === null || value === undefined) {
      errors.push(`Missing translation at path: ${currentPath}`);
    } else if (typeof value === 'string' && value.trim() === '') {
      errors.push(`Empty translation at path: ${currentPath}`);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      errors.push(...validateTranslations(value, currentPath));
    }
  }

  return errors;
}