import { Component, OnInit, OnDestroy, ElementRef, inject, DOCUMENT } from '@angular/core';

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `
    <div id="particles" class="fixed inset-0 pointer-events-none" style="z-index: 5;">
      <!-- Static particles for visual effect -->
      <div class="particle" style="left: 10%; animation-delay: 0s; width: 4px; height: 4px;"></div>
      <div class="particle" style="left: 20%; animation-delay: 2s; width: 2px; height: 2px;"></div>
      <div class="particle" style="left: 30%; animation-delay: 4s; width: 3px; height: 3px;"></div>
      <div class="particle" style="left: 40%; animation-delay: 1s; width: 2px; height: 2px;"></div>
      <div class="particle" style="left: 50%; animation-delay: 3s; width: 4px; height: 4px;"></div>
      <div class="particle" style="left: 60%; animation-delay: 5s; width: 2px; height: 2px;"></div>
      <div class="particle" style="left: 70%; animation-delay: 0.5s; width: 3px; height: 3px;"></div>
      <div class="particle" style="left: 80%; animation-delay: 2.5s; width: 2px; height: 2px;"></div>
      <div class="particle" style="left: 90%; animation-delay: 4.5s; width: 4px; height: 4px;"></div>
    </div>
  `
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
    // Sistema de partículas dinámicas
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