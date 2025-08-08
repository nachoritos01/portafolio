import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <!-- Partículas estáticas por ahora -->
      <div class="absolute w-2 h-2 bg-green-500 rounded-full opacity-20 animate-pulse" 
           style="top: 10%; left: 20%; animation-delay: 0s;"></div>
      <div class="absolute w-3 h-3 bg-green-500 rounded-full opacity-30 animate-pulse" 
           style="top: 30%; left: 80%; animation-delay: 1s;"></div>
      <div class="absolute w-1 h-1 bg-green-500 rounded-full opacity-40 animate-pulse" 
           style="top: 60%; left: 10%; animation-delay: 2s;"></div>
      <div class="absolute w-2 h-2 bg-green-500 rounded-full opacity-25 animate-pulse" 
           style="top: 80%; left: 70%; animation-delay: 0.5s;"></div>
    </div>
  `
})
export class ParticlesComponent {}