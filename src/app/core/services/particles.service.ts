import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  opacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParticlesService {
  private readonly document = inject(DOCUMENT);
  
  // Signal para controlar si las partículas están activas
  private readonly _isActive = signal<boolean>(true);
  readonly isActive = this._isActive.asReadonly();
  
  // Signal para las partículas activas
  private readonly _particles = signal<Particle[]>([]);
  readonly particles = this._particles.asReadonly();
  
  private particleInterval?: number;
  private readonly maxParticles = 10;
  private readonly creationInterval = 2000; // 2 segundos

  constructor() {
    // Effect para iniciar/detener la creación de partículas
    effect(() => {
      if (this._isActive()) {
        this.startParticleCreation();
      } else {
        this.stopParticleCreation();
      }
    });
  }

  /**
   * Activar/desactivar partículas
   */
  toggleParticles(): void {
    this._isActive.update(active => !active);
  }

  /**
   * Iniciar la creación de partículas
   */
  private startParticleCreation(): void {
    // Limpiar intervalo existente
    this.stopParticleCreation();
    
    // Crear partículas iniciales
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.createParticle(), i * 400);
    }
    
    // Configurar intervalo para crear partículas
    this.particleInterval = window.setInterval(() => {
      if (this._particles().length < this.maxParticles) {
        this.createParticle();
      }
    }, this.creationInterval);
  }

  /**
   * Detener la creación de partículas
   */
  private stopParticleCreation(): void {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
      this.particleInterval = undefined;
    }
  }

  /**
   * Crear una nueva partícula
   */
  private createParticle(): void {
    const particle: Particle = {
      id: this.generateParticleId(),
      x: Math.random() * 100, // Porcentaje del viewport width
      y: 100, // Empezar desde abajo
      size: Math.random() * 4 + 2, // Entre 2px y 6px
      duration: Math.random() * 3 + 5, // Entre 5s y 8s
      opacity: Math.random() * 0.5 + 0.1 // Entre 0.1 y 0.6
    };

    // Añadir partícula al array
    this._particles.update(particles => [...particles, particle]);

    // Eliminar partícula después de su duración
    setTimeout(() => {
      this.removeParticle(particle.id);
    }, particle.duration * 1000);
  }

  /**
   * Eliminar partícula por ID
   */
  private removeParticle(id: string): void {
    this._particles.update(particles => 
      particles.filter(particle => particle.id !== id)
    );
  }

  /**
   * Generar ID único para partícula
   */
  private generateParticleId(): string {
    return `particle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Limpiar todas las partículas
   */
  clearAllParticles(): void {
    this._particles.set([]);
  }

  /**
   * Destruir el servicio
   */
  ngOnDestroy(): void {
    this.stopParticleCreation();
    this.clearAllParticles();
  }
}