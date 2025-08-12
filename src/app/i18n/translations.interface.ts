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
    educationTitle: string;
    skills: string;
    positions: {
      seniorFrontend: string;
    };
    companies: {
      procetti: string;
      neoris: string;
      nova: string;
    };
    descriptions: {
      procetti: string;
      neoris: string;
      nova: string;
    };
    jobs: {
      procetti: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
      neoris: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
      nova: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
      relappro: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
      simetrical: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
      efisense: {
        timePeriod: string;
        title: string;
        descriptions: string[];
      };
    };
    education: {
      degree1: string;
      degree2: string;
      university: string;
      certificate: string;
      description1: string;
      description2: string;
    };
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
    list: Array<{
      title: string;
      description: string;
      category: string;
    }>;
  };

  // Blog section
  blog: {
    title: string;
    readMore: string;
    filters: {
      all: string;
      design: string;
      code: string;
      tech: string;
    };
    categories: {
      design: string;
      development: string;
      technology: string;
    };
    articles: Array<{
      title: string;
      excerpt: string;
      date: string;
    }>;
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

  // Services section
  services: {
    title: string;
    frontend: {
      title: string;
      description: string;
    };
    architecture: {
      title: string;
      description: string;
    };
    optimization: {
      title: string;
      description: string;
    };
    backend: {
      title: string;
      description: string;
    };
  };

  // Profile/personal info
  profile: {
    location: string;
    experience: string;
    workMode: string;
    locationValue: string;
    experienceValue: string;
    workModeValue: string;
  };

  // Footer section
  footer: {
    description: string;
    links: string;
    services: string;
    webDev: string;
    mobileApps: string;
    dataScience: string;
    consulting: string;
    projectMgmt: string;
    copyright: string;
    privacy: string;
    terms: string;
    cookies: string;
    quickLinks: string;
    about: string;
    resume: string;
    projects: string;
    contact: string;
    legal: string;
    madeWith: string;
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