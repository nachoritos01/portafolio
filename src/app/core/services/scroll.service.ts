import { Injectable, signal, effect, inject, DestroyRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  
  // Signal para el progreso de scroll (0-100)
  private readonly _scrollProgress = signal<number>(0);
  readonly scrollProgress = this._scrollProgress.asReadonly();
  
  // Signal para la posición Y del scroll
  private readonly _scrollY = signal<number>(0);
  readonly scrollY = this._scrollY.asReadonly();
  
  // Signal para determinar si estamos en el top de la página
  readonly isAtTop = signal(() => this.scrollY() === 0);
  
  // Signal para determinar la dirección del scroll
  private readonly _scrollDirection = signal<'up' | 'down'>('down');
  readonly scrollDirection = this._scrollDirection.asReadonly();
  
  private lastScrollY = 0;

  constructor() {
    this.initScrollListener();
  }

  /**
   * Inicializar listener del scroll
   */
  private initScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(16), // ~60fps
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.updateScrollValues();
      });
  }

  /**
   * Actualizar valores del scroll
   */
  private updateScrollValues(): void {
    const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
    const docHeight = this.document.body.scrollHeight - window.innerHeight;
    
    // Actualizar posición Y
    this._scrollY.set(scrollTop);
    
    // Calcular progreso (0-100)
    const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    this._scrollProgress.set(progress);
    
    // Determinar dirección del scroll
    const direction = scrollTop > this.lastScrollY ? 'down' : 'up';
    this._scrollDirection.set(direction);
    this.lastScrollY = scrollTop;
  }

  /**
   * Scroll hasta un elemento específico
   */
  scrollToElement(elementId: string, offset: number = 0): void {
    const element = this.document.getElementById(elementId);
    if (element) {
      const elementTop = element.offsetTop - offset;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Scroll hasta el top de la página
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Observar intersección de secciones para navegación activa
   */
  observeSections(sectionIds: string[], callback: (sectionId: string) => void): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            callback(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sectionIds.forEach(id => {
      const element = this.document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup al destruir el componente que lo use
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
    });
  }
}