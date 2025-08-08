import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ElementRef, inject, DOCUMENT, NgZone } from '@angular/core';

interface ParticleConfig {
  id: string;
  element: HTMLElement;
  cleanupTimer: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div id="particles" class="fixed inset-0 pointer-events-none z-0"></div>`,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class ParticlesComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);
  
  private particleInterval?: number;
  private activeParticles = new Map<string, ParticleConfig>();
  private particleCounter = 0;
  private isDestroyed = false;
  
  // Configuración optimizada para efecto "burbujas de refresco"
  private readonly config = {
    creationInterval: 2000, // Nueva partícula cada 2 segundos
    initialDelay: 500,      // Delay inicial reducido
    initialCount: 3,        // Partículas iniciales
    particleLifetime: 8000, // Duración de vida de cada partícula
    
    // Rangos aleatorios
    size: { min: 2, max: 6 },           // Tamaño más variado
    opacity: { min: 0.1, max: 0.6 },   // Opacidad mejorada
    duration: { min: 5, max: 8 },      // Duración de animación variable
    
    // Prevención de solapamientos
    minDistanceBetweenParticles: 50,    // Distancia mínima entre partículas
    spawnAreaMargin: 5                  // Margen para evitar partículas en los bordes
  };
  
  ngOnInit() {
    // Esperar a que el componente se renderice completamente
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.startParticleSystem();
        }
      }, this.config.initialDelay);
    });
  }
  
  ngOnDestroy() {
    this.isDestroyed = true;
    this.cleanup();
  }
  
  private startParticleSystem(): void {
    // Crear partículas iniciales con delay progresivo
    for (let i = 0; i < this.config.initialCount; i++) {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.createParticle();
        }
      }, i * 800); // Delay más espaciado para evitar solapamientos
    }
    
    // Crear nueva partícula cada X segundos
    this.particleInterval = window.setInterval(() => {
      if (!this.isDestroyed) {
        this.createParticle();
      }
    }, this.config.creationInterval);
  }
  
  private createParticle(): void {
    const particlesContainer = this.elementRef.nativeElement.querySelector('#particles');
    if (!particlesContainer || this.isDestroyed) return;
    
    // Generar ID único para la partícula
    const particleId = `particle-${this.particleCounter++}-${Date.now()}`;
    
    // Generar posición aleatoria evitando solapamientos
    const position = this.generateOptimalPosition();
    
    // Crear elemento de partícula
    const particle = this.document.createElement('div');
    particle.className = 'particle';
    particle.id = particleId;
    
    // Configurar propiedades aleatorias
    const size = this.randomBetween(this.config.size.min, this.config.size.max);
    const opacity = this.randomBetween(this.config.opacity.min, this.config.opacity.max);
    const duration = this.randomBetween(this.config.duration.min, this.config.duration.max);
    
    // Aplicar estilos
    particle.style.left = `${position.x}vw`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity.toString();
    particle.style.animationDuration = `${duration}s`;
    
    // Optimización para 60fps: usar will-change y transform3d
    particle.style.willChange = 'transform, opacity';
    particle.style.transform = 'translate3d(0, 0, 0)'; // Forzar aceleración por hardware
    
    // Agregar al DOM
    particlesContainer.appendChild(particle);
    
    // Programar limpieza automática
    const cleanupTimer = window.setTimeout(() => {
      this.removeParticle(particleId);
    }, this.config.particleLifetime);
    
    // Registrar partícula activa
    this.activeParticles.set(particleId, {
      id: particleId,
      element: particle,
      cleanupTimer
    });
  }
  
  private generateOptimalPosition(): { x: number } {
    const margin = this.config.spawnAreaMargin;
    const maxX = 100 - margin * 2;
    
    // Intentar hasta 10 veces encontrar una posición sin solapamientos
    for (let attempts = 0; attempts < 10; attempts++) {
      const x = margin + Math.random() * maxX;
      
      if (this.isPositionValid(x)) {
        return { x };
      }
    }
    
    // Si no encontramos posición óptima, usar una aleatoria
    return { x: margin + Math.random() * maxX };
  }
  
  private isPositionValid(x: number): boolean {
    // Verificar que no haya partículas cercanas
    for (const particle of this.activeParticles.values()) {
      const existingX = parseFloat(particle.element.style.left);
      const distance = Math.abs(x - existingX);
      
      if (distance < this.config.minDistanceBetweenParticles) {
        return false;
      }
    }
    
    return true;
  }
  
  private removeParticle(particleId: string): void {
    const particleConfig = this.activeParticles.get(particleId);
    if (!particleConfig) return;
    
    // Limpiar timer
    clearTimeout(particleConfig.cleanupTimer);
    
    // Remover del DOM de forma segura
    if (particleConfig.element.parentNode) {
      particleConfig.element.parentNode.removeChild(particleConfig.element);
    }
    
    // Remover del registro
    this.activeParticles.delete(particleId);
  }
  
  private cleanup(): void {
    // Limpiar intervalo principal
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
      this.particleInterval = undefined;
    }
    
    // Limpiar todas las partículas activas
    for (const [particleId] of this.activeParticles) {
      this.removeParticle(particleId);
    }
    
    this.activeParticles.clear();
  }
  
  private randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}