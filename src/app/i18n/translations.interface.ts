/**
 * Translation interface for type safety and structure consistency
 * Used across all language files to ensure proper translation keys
 */
export interface Translations {
  // Navigation section
  nav: {
    about: string;
    resume: string;
    projects: string;
    articles: string;
    contact: string;
  };

  // About section
  about: {
    greeting: string;
    name: string;
    description: string;
    viewProjects: string;
    letsTalk: string;
  };

  // Resume section
  resume: {
    title: string;
    experience: string;
    education: string;
    skills: string;
  };

  // Projects section
  projects: {
    title: string;
    filters: {
      all: string;
      web: string;
      mobile: string;
      data: string;
    };
  };

  // Blog section
  blog: {
    title: string;
  };

  // Contact section
  contact: {
    title: string;
    subtitle: string;
    location: string;
    email: string;
    workMode: string;
    availability: string;
    remote: string;
    available: string;
    socials: string;
    formTitle: string;
    firstName: string;
    lastName: string;
    emailLabel: string;
    subject: string;
    message: string;
    send: string;
  };

  // Common/shared translations
  common: {
    downloadCV: string;
    contactMe: string;
    hireMe: string;
  };
}

/**
 * Supported languages type
 * Add new languages here when expanding support
 */
export type Language = 'es' | 'en';

/**
 * Language metadata interface
 * Contains information about each supported language
 */
export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

/**
 * Language configuration
 * Metadata for each supported language
 */
export const LANGUAGES: Record<Language, LanguageInfo> = {
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  }
};

/**
 * Default language constant
 */
export const DEFAULT_LANGUAGE: Language = 'es';

/**
 * Storage key for language preference
 */
export const LANGUAGE_STORAGE_KEY = 'preferred-language';