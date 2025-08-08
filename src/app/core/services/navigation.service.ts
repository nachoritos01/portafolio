import { Injectable, signal, effect } from '@angular/core';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  // Signal para el item activo
  private readonly _activeSection = signal<string>('about');
  
  // Signal readonly para exponer el estado
  readonly activeSection = this._activeSection.asReadonly();
  
  // Signal para controlar si el sidebar móvil está abierto
  private readonly _isMobileSidebarOpen = signal<boolean>(false);
  readonly isMobileSidebarOpen = this._isMobileSidebarOpen.asReadonly();
  
  // Configuración de navegación
  readonly navigationItems: NavigationItem[] = [
    { id: 'about', label: 'ABOUT', href: '#about', icon: 'person' },
    { id: 'resume', label: 'RESUME', href: '#resume', icon: 'description' },
    { id: 'projects', label: 'PROJECTS', href: '#projects', icon: 'folder' },
    { id: 'blog', label: 'ARTICLES', href: '#blog', icon: 'article' },
    { id: 'contact', label: 'CONTACT', href: '#contact', icon: 'mail' }
  ];

  constructor() {
    // Effect para cerrar sidebar móvil cuando cambie la sección activa
    effect(() => {
      const activeSection = this._activeSection();
      if (activeSection && this._isMobileSidebarOpen()) {
        this.closeMobileSidebar();
      }
    });
  }

  /**
   * Establecer la sección activa
   */
  setActiveSection(sectionId: string): void {
    this._activeSection.set(sectionId);
  }

  /**
   * Abrir sidebar móvil
   */
  openMobileSidebar(): void {
    this._isMobileSidebarOpen.set(true);
  }

  /**
   * Cerrar sidebar móvil
   */
  closeMobileSidebar(): void {
    this._isMobileSidebarOpen.set(false);
  }

  /**
   * Alternar sidebar móvil
   */
  toggleMobileSidebar(): void {
    this._isMobileSidebarOpen.update(isOpen => !isOpen);
  }

  /**
   * Navegar a una sección específica con scroll suave
   */
  navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      this.setActiveSection(sectionId);
    }
  }
}