/**
 * i18n Module - Main export file
 * Provides a clean API for the translation system
 */

// Core interfaces and types
export type { Language, Translations, LanguageInfo } from './translations.interface';
export { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './translations.interface';

// Translation data and loaders
export { TRANSLATIONS, loadTranslations, getAvailableLanguages, isValidLanguage } from './locales';

// Utility functions
export {
  detectBrowserLanguage,
  getStoredLanguage,
  storeLanguage,
  initializeLanguage,
  formatLanguageName,
  getLanguageDirection,
  validateTranslations
} from './translation.utils';

// Individual language files (for direct imports if needed)
export { es } from './locales/es';
export { en } from './locales/en';