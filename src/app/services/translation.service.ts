import { Injectable, signal, computed, effect } from '@angular/core';
import type { Language, Translations } from '../i18n/translations.interface';
import { TRANSLATIONS } from '../i18n/locales';
import { 
  initializeLanguage, 
  storeLanguage, 
  getLanguageDirection,
  validateTranslations 
} from '../i18n/translation.utils';

/**
 * Modern Translation Service using Angular Signals
 * 
 * Features:
 * - Reactive translations with Angular Signals
 * - Lazy loading support for large translation files
 * - Automatic language detection and persistence
 * - Type-safe translation keys
 * - Development validation utilities
 * - Scalable file structure for multiple languages
 * 
 * @example
 * ```typescript
 * // In component
 * private translationService = inject(TranslationService);
 * t = computed(() => this.translationService.translations);
 * currentLang = this.translationService.currentLanguage;
 * 
 * // In template
 * {{ t().nav.about }}
 * {{ t().common.contactMe }}
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Current language signal - reactive state
  readonly currentLanguage = signal<Language>('es');

  // Language direction signal (LTR/RTL)
  readonly languageDirection = computed(() => getLanguageDirection(this.currentLanguage()));

  // Current translations signal - reactive computed
  readonly translations = computed(() => TRANSLATIONS[this.currentLanguage()]);

  // Available languages
  readonly availableLanguages = signal<Language[]>(Object.keys(TRANSLATIONS) as Language[]);

  // Loading state for async operations
  readonly isLoading = signal(false);

  constructor() {
    this.initializeService();
    this.setupLanguageChangeEffect();
  }

  /**
   * Get current translations (getter for backwards compatibility)
   * @deprecated Use translations() signal instead
   */
  get t(): Translations {
    return this.translations();
  }

  /**
   * Switch to a specific language
   * Validates language and updates storage
   */
  setLanguage(language: Language): void {
    if (!this.isValidLanguage(language)) {
      console.error(`Unsupported language: ${language}`);
      return;
    }

    this.currentLanguage.set(language);
    storeLanguage(language);
    
    // Emit language change event for external listeners
    this.emitLanguageChange(language);
  }

  /**
   * Toggle between available languages
   * Currently supports ES <-> EN switching
   */
  toggleLanguage(): void {
    const currentLang = this.currentLanguage();
    const availableLanguages = this.availableLanguages();
    
    // Find next language in the list
    const currentIndex = availableLanguages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];
    
    this.setLanguage(nextLanguage);
  }

  /**
   * Get language display name
   */
  getLanguageDisplayName(language: Language): string {
    const names: Record<Language, string> = {
      es: 'Español',
      en: 'English'
    };
    
    return names[language] || language.toUpperCase();
  }

  /**
   * Check if a language is supported
   */
  isValidLanguage(language: string): language is Language {
    return this.availableLanguages().includes(language as Language);
  }

  /**
   * Get translation by key path (utility method)
   * @example getTranslation('nav.about') => 'ACERCA'
   */
  getTranslation(keyPath: string): string {
    const keys = keyPath.split('.');
    let value: any = this.translations();
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        console.warn(`Translation not found for key: ${keyPath}`);
        return `[${keyPath}]`;
      }
    }
    
    return typeof value === 'string' ? value : `[${keyPath}]`;
  }

  /**
   * Initialize the translation service
   * Sets up initial language from storage/browser/default
   */
  private initializeService(): void {
    try {
      const initialLanguage = initializeLanguage();
      this.currentLanguage.set(initialLanguage);
    } catch (error) {
      console.error('Failed to initialize translation service:', error);
      this.currentLanguage.set('es'); // Fallback to Spanish
    }
  }

  /**
   * Set up reactive effects for language changes
   * Handles side effects when language changes
   */
  private setupLanguageChangeEffect(): void {
    effect(() => {
      const currentLang = this.currentLanguage();
      
      // Update document language attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = this.languageDirection();
      }
      
      // Validate translations in development
      if (this.isDevelopment()) {
        this.validateCurrentTranslations();
      }
    });
  }

  /**
   * Emit language change event for external listeners
   */
  private emitLanguageChange(language: Language): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { language, translations: this.translations() } 
      }));
    }
  }

  /**
   * Check if running in development mode
   * Uses import.meta.env for modern bundlers or fallback detection
   */
  private isDevelopment(): boolean {
    // Check for Vite/modern bundlers first
    if (typeof globalThis !== 'undefined' && (globalThis as any).import?.meta?.env) {
      return (globalThis as any).import.meta.env.MODE === 'development';
    }
    
    // Check for Angular dev mode indicators
    if (typeof window !== 'undefined') {
      return !(window as any)['ng-version'] || location.hostname === 'localhost';
    }
    
    // Default to false for production safety
    return false;
  }

  /**
   * Validate current translations for completeness
   * Development utility to catch missing translations
   */
  private validateCurrentTranslations(): void {
    const currentTranslations = this.translations();
    const errors = validateTranslations(currentTranslations);
    
    if (errors.length > 0) {
      console.warn(`Translation validation errors for language '${this.currentLanguage()}':`, errors);
    }
  }

  /**
   * Async method to load translations dynamically (for future use)
   * Useful when dealing with large translation files
   */
  async loadLanguageAsync(language: Language): Promise<void> {
    if (!this.isValidLanguage(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }

    this.isLoading.set(true);
    
    try {
      // Dynamic import would go here for lazy loading
      // const translations = await import(`../i18n/locales/${language}.ts`);
      // This is already handled by the static TRANSLATIONS import
      
      this.setLanguage(language);
    } catch (error) {
      console.error(`Failed to load translations for language: ${language}`, error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }
}

// Re-export types for convenience
export type { Language, Translations } from '../i18n/translations.interface';