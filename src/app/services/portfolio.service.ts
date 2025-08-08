import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private document = inject(DOCUMENT);
  
  // Theme management
  currentTheme = signal<'dark' | 'light'>('dark');
  
  // Mobile menu state
  isMobileMenuOpen = signal(false);
  
  // Scroll progress
  scrollProgress = signal(0);
  
  // Active section
  activeSection = signal<string>('about');
  
  // Typing animation
  typingText = signal('Frontend Developer');
  private typingTexts = ['Frontend Developer', 'Angular Specialist', 'TypeScript Expert', 'UI/UX Enthusiast'];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  
  // Particles system (handled by ParticlesComponent)
  
  constructor() {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      this.currentTheme.set(savedTheme || systemTheme);
      
      // Set up scroll listener
      this.setupScrollListener();
      
      // Start typing animation
      this.startTypingAnimation();
      
      // Progress bars are handled by components
      
      // Set up intersection observer for sections
      this.setupSectionObserver();
    }
    
    // Theme effect
    effect(() => {
      if (typeof window !== 'undefined') {
        const theme = this.currentTheme();
        this.document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    });
  }
  
  // Theme methods
  toggleTheme() {
    this.currentTheme.set(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }
  
  // Mobile menu methods
  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
  
  // Navigation methods
  navigateToSection(sectionId: string) {
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMobileMenu();
      this.activeSection.set(sectionId);
    }
  }
  
  // Scroll progress setup
  private setupScrollListener() {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = this.document.body.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      this.scrollProgress.set(progress);
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
  }
  
  // Section observer setup
  private setupSectionObserver() {
    const sections = this.document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.5, 1]
      }
    );
    
    sections.forEach(section => observer.observe(section));
  }
  
  // Typing animation
  private startTypingAnimation() {
    const typeNextChar = () => {
      const currentText = this.typingTexts[this.currentTextIndex];
      
      if (!this.isDeleting && this.currentCharIndex < currentText.length) {
        // Typing forward
        this.currentCharIndex++;
        this.typingText.set(currentText.substring(0, this.currentCharIndex));
        setTimeout(typeNextChar, 100);
      } else if (this.isDeleting && this.currentCharIndex > 0) {
        // Deleting
        this.currentCharIndex--;
        this.typingText.set(currentText.substring(0, this.currentCharIndex));
        setTimeout(typeNextChar, 50);
      } else if (!this.isDeleting && this.currentCharIndex === currentText.length) {
        // Finished typing, wait then start deleting
        this.isDeleting = true;
        setTimeout(typeNextChar, 2000);
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        // Finished deleting, move to next text
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
        setTimeout(typeNextChar, 500);
      }
    };
    
    typeNextChar();
  }
  
  // Progress bars animation
  animateProgressBars() {
    const progressBars = this.document.querySelectorAll('.progress-bar[data-width]');
    
    progressBars.forEach((bar, index) => {
      const element = bar as HTMLElement;
      const width = element.getAttribute('data-width');
      
      setTimeout(() => {
        if (width) {
          element.style.width = width + '%';
        }
      }, index * 200);
    });
  }
  
  // Initialize Lucide icons and AOS
  initializeLibraries() {
    // Initialize Lucide icons
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
    
    // Initialize AOS
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
      });
    }
  }
  
  // Cleanup
  destroy() {
    // Cleanup handled by individual components
  }
}