import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { PortfolioService } from './services/portfolio.service';

// Components  
import { ResumeComponent } from './components/resume.component';
import { ProjectsComponent } from './components/projects.component';
import { BlogComponent } from './components/blog.component';
import { ContactComponent } from './components/contact.component';
import { ParticlesComponent } from './components/particles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ResumeComponent,
    ProjectsComponent,
    BlogComponent,
    ContactComponent,
    ParticlesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  
  // Expose service signals to template
  currentTheme = this.portfolioService.currentTheme;
  isMobileMenuOpen = this.portfolioService.isMobileMenuOpen;
  scrollProgress = this.portfolioService.scrollProgress;
  activeSection = this.portfolioService.activeSection;
  typingText = this.portfolioService.typingText;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Initialize libraries after view is ready
    setTimeout(() => {
      this.portfolioService.initializeLibraries();
    }, 100);
  }

  ngOnDestroy() {
    this.portfolioService.destroy();
  }

  // Template methods
  toggleTheme() {
    this.portfolioService.toggleTheme();
  }

  toggleMobileMenu() {
    this.portfolioService.toggleMobileMenu();
  }

  closeMobileMenu() {
    this.portfolioService.closeMobileMenu();
  }

  navigateToSection(sectionId: string) {
    this.portfolioService.navigateToSection(sectionId);
  }

  onOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (sidebar && mobileMenuBtn && 
        !sidebar.contains(target) && 
        !mobileMenuBtn.contains(target)) {
      this.closeMobileMenu();
    }
  }
}
