# 🌍 Internationalization (i18n) System

## 📁 Structure

```
i18n/
├── locales/               # Translation files by language
│   ├── es.ts             # Spanish translations
│   ├── en.ts             # English translations
│   └── index.ts          # Locale exports and loaders
├── translations.interface.ts  # Type definitions and constants
├── translation.utils.ts       # Utility functions
├── index.ts              # Main exports
└── README.md            # This documentation
```

## 🚀 Usage

### Basic Component Usage

```typescript
import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  template: `
    <h1>{{ t().nav.about }}</h1>
    <p>{{ t().common.contactMe }}</p>
    
    <!-- Language selector -->
    <button (click)="translationService.toggleLanguage()">
      {{ t().currentLanguage() === 'es' ? 'EN' : 'ES' }}
    </button>
  `
})
export class MyComponent {
  private translationService = inject(TranslationService);
  
  // Reactive translations
  t = computed(() => this.translationService.translations());
  currentLanguage = this.translationService.currentLanguage;
}
```

### Service Methods

```typescript
// Change language
translationService.setLanguage('en');

// Toggle between languages
translationService.toggleLanguage();

// Get translation by key path
translationService.getTranslation('nav.about'); // Returns: 'ACERCA'

// Check language support
translationService.isValidLanguage('fr'); // Returns: false

// Get language display name
translationService.getLanguageDisplayName('es'); // Returns: 'Español'
```

## 🔧 Adding New Languages

### 1. Create Language File

```typescript
// src/app/i18n/locales/fr.ts
import type { Translations } from '../translations.interface';

export const fr: Translations = {
  nav: {
    about: 'À PROPOS',
    resume: 'CV',
    projects: 'PROJETS',
    articles: 'ARTICLES',
    contact: 'CONTACT'
  },
  // ... rest of translations
};
```

### 2. Update Type Definition

```typescript
// src/app/i18n/translations.interface.ts
export type Language = 'es' | 'en' | 'fr';

export const LANGUAGES: Record<Language, LanguageInfo> = {
  // ... existing languages
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  }
};
```

### 3. Add to Exports

```typescript
// src/app/i18n/locales/index.ts
import { fr } from './fr';

export const TRANSLATIONS: Record<Language, Translations> = {
  es,
  en,
  fr
};
```

## 🎛️ Advanced Features

### Lazy Loading (Future)

```typescript
// For large translation files, use dynamic imports
async loadLanguage(language: Language) {
  const translations = await this.translationService.loadLanguageAsync(language);
  return translations;
}
```

### Validation (Development)

```typescript
// Automatic validation in development mode
// Checks for missing translations and empty strings
// Logs warnings to console
```

### Language Events

```typescript
// Listen to language change events
window.addEventListener('language-changed', (event) => {
  console.log('Language changed to:', event.detail.language);
});
```

### RTL Support

```typescript
// Get language direction
const direction = translationService.languageDirection(); // 'ltr' | 'rtl'

// Applied automatically to document.documentElement.dir
```

## 📝 Translation Keys Structure

```typescript
interface Translations {
  nav: {
    about: string;
    resume: string;
    projects: string;
    articles: string;
    contact: string;
  };
  
  about: {
    greeting: string;
    name: string;
    description: string;
    viewProjects: string;
    letsTalk: string;
  };
  
  resume: {
    title: string;
    experience: string;
    education: string;
    skills: string;
  };
  
  projects: {
    title: string;
    filters: {
      all: string;
      web: string;
      mobile: string;
      data: string;
    };
  };
  
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
  
  common: {
    downloadCV: string;
    contactMe: string;
    hireMe: string;
  };
}
```

## 🛠️ Development Tips

1. **Type Safety**: All translation keys are fully typed for IntelliSense support
2. **Validation**: Missing translations are automatically detected in development
3. **Hot Reload**: Changes to translation files trigger hot reloads
4. **Performance**: Translations are loaded synchronously for optimal performance
5. **Scalability**: File structure supports unlimited languages
6. **Storage**: User language preference is automatically persisted

## 🧪 Testing

```typescript
describe('TranslationService', () => {
  it('should load correct translations', () => {
    const service = TestBed.inject(TranslationService);
    service.setLanguage('es');
    expect(service.translations().nav.about).toBe('ACERCA');
  });
});
```