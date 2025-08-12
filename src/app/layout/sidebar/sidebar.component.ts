import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { PersonalInfoService } from '../../services/personal-info.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="fixed lg:relative w-80 h-screen bg-gray-900 backdrop-blur-xl border-r border-gray-700 p-6 flex flex-col items-center overflow-y-auto z-40 transition-transform duration-300">
      
      <!-- Perfil -->
      <div class="text-center mb-8">
        <div class="relative w-32 h-32 mx-auto mb-6">
          <div class="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 to-green-500/5 p-1">
            <img 
              [src]="personalInfo().profileImage" 
              [alt]="personalInfo().name" 
              class="w-full h-full object-cover rounded-xl"
              loading="lazy">
          </div>
        </div>
        
        <h1 class="text-2xl font-bold mb-2 text-white">
          {{ personalInfo().name }}
        </h1>
        
        <p class="text-green-500 font-mono text-sm">{{ personalInfo().title }}</p>
      </div>

      <!-- Navegación -->
      <nav class="w-full mb-8">
        <ul class="space-y-2">
          <li *ngFor="let item of navigationItems; trackBy: trackByFn">
            <button
              (click)="navigateTo(item.id)"
              class="w-full flex items-center p-3 rounded-xl transition-all duration-300 text-left text-gray-300 hover:text-green-500 hover:bg-gray-800"
              type="button">
              
              <span class="text-sm font-medium">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Theme Toggle -->
      <div class="mt-auto">
        <app-theme-toggle />
      </div>
    </aside>
  `
})
export class SidebarComponent {
  readonly navigationService = inject(NavigationService);
  private personalInfoService = inject(PersonalInfoService);
  
  // Personal info getter
  personalInfo = this.personalInfoService.info;

  readonly navigationItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'resume', label: 'RESUME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'blog', label: 'ARTICLES' },
    { id: 'contact', label: 'CONTACT' }
  ];

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  navigateTo(sectionId: string): void {
    this.navigationService.navigateToSection(sectionId);
  }
}