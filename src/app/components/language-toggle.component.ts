import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center space-x-2 p-2 rounded-xl bg-white/5 backdrop-blur-sm">
      <button
        (click)="translationService.setLanguage('es')"
        [class]="translationService.currentLanguage() === 'es' ? 
          'px-3 py-2 bg-accent text-white rounded-lg font-medium text-sm transition-all duration-300' :
          'px-3 py-2 text-text-secondary hover:text-accent rounded-lg font-medium text-sm transition-all duration-300'"
      >
        ES
      </button>
      <div class="w-px h-6 bg-white/20"></div>
      <button
        (click)="translationService.setLanguage('en')"
        [class]="translationService.currentLanguage() === 'en' ? 
          'px-3 py-2 bg-accent text-white rounded-lg font-medium text-sm transition-all duration-300' :
          'px-3 py-2 text-text-secondary hover:text-accent rounded-lg font-medium text-sm transition-all duration-300'"
      >
        EN
      </button>
    </div>
  `
})
export class LanguageToggleComponent {
  translationService = inject(TranslationService);
}