import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { LanguageToggleComponent } from './language-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LanguageToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Sidebar -->
    <aside id="sidebar" [class]="'fixed lg:relative w-80 h-screen bg-dark-card/90 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col items-center overflow-y-auto mobile-menu lg:translate-x-0 z-40' + (isMobileMenuOpen ? ' active' : '')">
      <button id="close-sidebar" (click)="onCloseMobileMenu()" class="absolute top-6 right-6 lg:hidden text-text-secondary hover:text-accent">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>

      <!-- Perfil -->
      <div class="text-center mb-8" data-aos="fade-down" data-aos-delay="100">
        <div class="relative w-32 h-32 mx-auto mb-6">
          <div class="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 p-1 animate-glow">
            <img src="/placeholder.svg?height=128&width=128" alt="Ignacio Navarrete" class="w-full h-full object-cover rounded-xl"/>
          </div>
          <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
            <i data-lucide="check" class="w-4 h-4 text-white"></i>
          </div>
        </div>
        <h1 class="text-2xl font-bold mb-2 bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">Ignacio Navarrete</h1>
        <p class="text-accent font-mono typing-text" id="typing-text">{{ typingText }}</p>
      </div>

      <!-- Navegación -->
      <nav class="w-full mb-8" data-aos="fade-up" data-aos-delay="200">
        <ul class="space-y-2">
          <li><a (click)="onNavigateToSection('about')" [class]="'nav-link flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer ' + (activeSection === 'about' ? 'bg-white/10 text-accent' : 'text-text-secondary hover:text-accent')"><i data-lucide="user" class="w-5 h-5 mr-3"></i><span class="text-sm font-medium">{{ t().nav.about }}</span></a></li>
          <li><a (click)="onNavigateToSection('resume')" [class]="'nav-link flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer ' + (activeSection === 'resume' ? 'bg-white/10 text-accent' : 'text-text-secondary hover:text-accent')"><i data-lucide="file-text" class="w-5 h-5 mr-3"></i><span class="text-sm font-medium">{{ t().nav.resume }}</span></a></li>
          <li><a (click)="onNavigateToSection('projects')" [class]="'nav-link flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer ' + (activeSection === 'projects' ? 'bg-white/10 text-accent' : 'text-text-secondary hover:text-accent')"><i data-lucide="folder" class="w-5 h-5 mr-3"></i><span class="text-sm font-medium">{{ t().nav.projects }}</span></a></li>
          <li><a (click)="onNavigateToSection('blog')" [class]="'nav-link flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer ' + (activeSection === 'blog' ? 'bg-white/10 text-accent' : 'text-text-secondary hover:text-accent')"><i data-lucide="newspaper" class="w-5 h-5 mr-3"></i><span class="text-sm font-medium">{{ t().nav.articles }}</span></a></li>
          <li><a (click)="onNavigateToSection('contact')" [class]="'nav-link flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer ' + (activeSection === 'contact' ? 'bg-white/10 text-accent' : 'text-text-secondary hover:text-accent')"><i data-lucide="mail" class="w-5 h-5 mr-3"></i><span class="text-sm font-medium">{{ t().nav.contact }}</span></a></li>
        </ul>
      </nav>

      <!-- Social -->
      <div class="flex space-x-4 mb-8" data-aos="fade-up" data-aos-delay="300">
        <a href="https://www.linkedin.com/in/ignacionavarrete-front-end-developer-angular/" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
        <a href="https://github.com/nachoritos01" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"><i data-lucide="github" class="w-5 h-5"></i></a>
        <a href="https://x.com/ignacionavarrete" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"><i data-lucide="x" class="w-5 h-5"></i></a>
        <a href="https://instagram.com/ignacionavarrete" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"><i data-lucide="instagram" class="w-5 h-5"></i></a>
      </div>

      <!-- Acciones -->
      <div class="space-y-3 w-full" data-aos="fade-up" data-aos-delay="400">
        <a (click)="onNavigateToSection('contact')" class="w-full bg-accent hover:bg-accent-dark py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer">
          <i data-lucide="phone" class="w-5 h-5 mr-2"></i> {{ t().common.contactMe }}
        </a>
        <a href="/cv.pdf" download="Ignacio_Navarrete_Dzul_CV_2025.pdf" class="w-full border border-white/20 text-text-secondary hover:text-accent hover:border-accent py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center hover:bg-white/5">
          <i data-lucide="download" class="w-5 h-5 mr-2"></i> {{ t().common.downloadCV }}
        </a>
      </div>

      <!-- Controls -->
      <div class="mt-auto space-y-4" data-aos="fade-up" data-aos-delay="500">
        <!-- Language toggle -->
        <app-language-toggle></app-language-toggle>
        
        <!-- Theme toggle -->
        <div class="flex justify-center">
          <button id="theme-toggle" (click)="onToggleTheme()" class="p-3 rounded-xl text-text-secondary hover:text-accent hover:bg-white/5 transition-all duration-300" aria-label="Cambiar tema">
            <i [attr.data-lucide]="currentTheme === 'dark' ? 'sun' : 'moon'" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private translationService = inject(TranslationService);
  
  @Input() isMobileMenuOpen: boolean = false;
  @Input() activeSection: string = 'about';
  @Input() typingText: string = '';
  @Input() currentTheme: string = 'dark';
  
  @Output() closeMobileMenu = new EventEmitter<void>();
  @Output() navigateToSection = new EventEmitter<string>();
  @Output() toggleTheme = new EventEmitter<void>();
  
  // Translation getter
  t = () => this.translationService.t;
  
  onCloseMobileMenu() {
    this.closeMobileMenu.emit();
  }
  
  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
  }
  
  onToggleTheme() {
    this.toggleTheme.emit();
  }
}