import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Footer -->
    <footer class="bg-dark-card border-t border-white/10 py-12 relative z-20">
      <div class="max-w-6xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ personalInfo().name }}</h3>
            <p class="text-text-secondary mb-6 leading-relaxed">
              {{ t().footer.description }}
            </p>
            <div class="flex space-x-4">
              <a [href]="personalInfo().socialMedia.linkedin" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="linkedin" class="w-5 h-5"></i>
              </a>
              <a [href]="personalInfo().socialMedia.github" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="github" class="w-5 h-5"></i>
              </a>
              <a [href]="personalInfo().socialMedia.twitter" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="twitter" class="w-5 h-5"></i>
              </a>
              <a [href]="personalInfo().socialMedia.instagram" target="_blank" rel="noopener" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="instagram" class="w-5 h-5"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4 text-text-primary">{{ t().footer.quickLinks }}</h4>
            <ul class="space-y-2">
              <li><a (click)="onNavigateToSection('about')" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.about }}</a></li>
              <li><a (click)="onNavigateToSection('resume')" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.resume }}</a></li>
              <li><a (click)="onNavigateToSection('projects')" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.projects }}</a></li>
              <li><a (click)="onNavigateToSection('contact')" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.contact }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4 text-text-primary">{{ t().footer.legal }}</h4>
            <ul class="space-y-2">
              <li><a routerLink="/privacy" target="_blank" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.privacy }}</a></li>
              <li><a routerLink="/terms" target="_blank" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.terms }}</a></li>
              <li><a routerLink="/cookies" target="_blank" class="text-text-secondary hover:text-accent text-sm transition-colors cursor-pointer">{{ t().footer.cookies }}</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-text-secondary text-sm">© {{ personalInfoService.currentYear() }} {{ personalInfo().name }}. {{ t().footer.copyright }}</p>
          <p class="text-text-secondary text-sm mt-4 md:mt-0">
            {{ t().footer.madeWith }} <span class="text-accent">Angular</span> & <span class="text-accent">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private translationService = inject(TranslationService);
  public personalInfoService = inject(PersonalInfoService);
  
  @Output() navigateToSection = new EventEmitter<string>();
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Personal info getter
  personalInfo = this.personalInfoService.info;

  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
  }
}