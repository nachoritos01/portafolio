import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Footer -->
    <footer class="bg-dark-card border-t border-white/10 py-12">
      <div class="max-w-6xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">Ignacio Navarrete</h3>
            <p class="text-text-secondary leading-relaxed mb-6">{{ t().footer.description }}</p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="linkedin" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="github" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="twitter" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="instagram" class="w-5 h-5"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-semibold mb-4">{{ t().footer.links }}</h4>
            <ul class="space-y-2">
              <li><a (click)="onNavigateToSection('about')" class="text-text-secondary hover:text-accent transition-colors cursor-pointer">{{ t().nav.about }}</a></li>
              <li><a (click)="onNavigateToSection('resume')" class="text-text-secondary hover:text-accent transition-colors cursor-pointer">{{ t().nav.resume }}</a></li>
              <li><a (click)="onNavigateToSection('projects')" class="text-text-secondary hover:text-accent transition-colors cursor-pointer">{{ t().nav.projects }}</a></li>
              <li><a (click)="onNavigateToSection('blog')" class="text-text-secondary hover:text-accent transition-colors cursor-pointer">{{ t().nav.articles }}</a></li>
              <li><a (click)="onNavigateToSection('contact')" class="text-text-secondary hover:text-accent transition-colors cursor-pointer">{{ t().nav.contact }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">{{ t().footer.services }}</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-text-secondary hover:text-accent transition-colors">{{ t().footer.webDev }}</a></li>
              <li><a href="#" class="text-text-secondary hover:text-accent transition-colors">{{ t().footer.mobileApps }}</a></li>
              <li><a href="#" class="text-text-secondary hover:text-accent transition-colors">{{ t().footer.dataScience }}</a></li>
              <li><a href="#" class="text-text-secondary hover:text-accent transition-colors">{{ t().footer.consulting }}</a></li>
              <li><a href="#" class="text-text-secondary hover:text-accent transition-colors">{{ t().footer.projectMgmt }}</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-text-secondary text-sm">© 2025 Ignacio Navarrete. {{ t().footer.copyright }}</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-text-secondary hover:text-accent text-sm transition-colors">{{ t().footer.privacy }}</a>
            <a href="#" class="text-text-secondary hover:text-accent text-sm transition-colors">{{ t().footer.terms }}</a>
            <a href="#" class="text-text-secondary hover:text-accent text-sm transition-colors">{{ t().footer.cookies }}</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private translationService = inject(TranslationService);
  
  @Output() navigateToSection = new EventEmitter<string>();
  
  // Translation getter
  t = () => this.translationService.t;
  
  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
  }
}