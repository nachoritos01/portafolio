import { Component, OnInit, OnDestroy, ElementRef, inject, DOCUMENT } from '@angular/core';

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `<div id="particles" class="fixed inset-0 pointer-events-none z-0"></div>`
})
export class ParticlesComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private document = inject(DOCUMENT);
  private particleInterval?: number;
  
  ngOnInit() {
    setTimeout(() => {
      this.startParticleSystem();
    }, 100);
  }
  
  ngOnDestroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }
  
  private startParticleSystem() {
    // Código exacto del HTML original
    const createParticle = () => {
      const particlesContainer = this.document.getElementById('particles');
      if (!particlesContainer) return;
      
      const particle = this.document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.animationDuration = Math.random() * 3 + 5 + 's';
      particle.style.opacity = String(Math.random() * 0.5 + 0.1);
      particlesContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 8000);
    };
    
    this.particleInterval = window.setInterval(createParticle, 2000);
  }
}