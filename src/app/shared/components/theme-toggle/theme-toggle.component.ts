import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="toggleTheme()"
      class="p-3 rounded-xl text-text-secondary hover:text-accent-dynamic hover:bg-white/5 transition-all duration-300 transform hover:scale-105 active:scale-95"
      [attr.aria-label]="'Cambiar a tema ' + (themeService.isDarkTheme() ? 'claro' : 'oscuro')"
      type="button">
      <svg 
        class="w-6 h-6 transition-transform duration-300"
        [class.rotate-180]="!themeService.isDarkTheme()"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2">
        @if (themeService.isDarkTheme()) {
          <!-- Sol (para tema claro) -->
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        } @else {
          <!-- Luna (para tema oscuro) -->
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        }
      </svg>
    </button>
  `
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}