import { inject, Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  
  // Signal para el tema actual
  private readonly _currentTheme = signal<Theme>('dark');
  
  // Signal readonly para exponer el estado
  readonly currentTheme = this._currentTheme.asReadonly();
  
  // Signal computed para determinar si es tema oscuro
  readonly isDarkTheme = signal(() => this.currentTheme() === 'dark');

  constructor() {
    // Cargar tema desde localStorage al iniciar
    this.loadThemeFromStorage();
    
    // Effect para aplicar el tema al DOM y guardarlo
    effect(() => {
      const theme = this._currentTheme();
      this.applyTheme(theme);
      this.saveThemeToStorage(theme);
    });
  }

  /**
   * Alternar entre tema claro y oscuro
   */
  toggleTheme(): void {
    const newTheme: Theme = this._currentTheme() === 'dark' ? 'light' : 'dark';
    this._currentTheme.set(newTheme);
  }

  /**
   * Establecer tema específico
   */
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
  }

  /**
   * Aplicar tema al DOM
   */
  private applyTheme(theme: Theme): void {
    const body = this.document.body;
    const html = this.document.documentElement;
    
    // Remover clases anteriores
    body.classList.remove('dark', 'light');
    html.removeAttribute('data-theme');
    
    // Aplicar nuevas clases
    body.classList.add(theme);
    html.setAttribute('data-theme', theme);
  }

  /**
   * Guardar tema en localStorage
   */
  private saveThemeToStorage(theme: Theme): void {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      console.warn('No se pudo guardar el tema en localStorage:', error);
    }
  }

  /**
   * Cargar tema desde localStorage
   */
  private loadThemeFromStorage(): void {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
      if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
        this._currentTheme.set(savedTheme);
      }
    } catch (error) {
      console.warn('No se pudo cargar el tema desde localStorage:', error);
    }
  }
}