import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Barra de progreso -->
    <app-progress-bar />

    <!-- Botón menú móvil -->
    <button 
      (click)="navigationService.toggleMobileSidebar()"
      class="fixed top-6 left-6 z-50 lg:hidden bg-gray-800/90 backdrop-blur-xl p-3 rounded-xl hover:scale-105 transform transition-all duration-200"
      type="button">
      
      <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <!-- CTA flotante -->
    <a 
      href="#contact"
      (click)="navigateToContact($event)"
      class="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 no-underline text-white flex items-center space-x-2">
      
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"></path>
      </svg>
      <span>Contrátame</span>
    </a>
  `
})
export class HeaderComponent {
  readonly navigationService = inject(NavigationService);

  navigateToContact(event: Event): void {
    event.preventDefault();
    this.navigationService.navigateToSection('contact');
  }
}