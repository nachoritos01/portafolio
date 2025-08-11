import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Resume -->
<section id="resume" class="min-h-screen p-8 lg:p-16 bg-dark-lighter/50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().resume.title }}</span>
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Experiencia -->
      <div data-aos="fade-right" data-aos-duration="800">
        <div class="flex items-center mb-12">
          <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-dark rounded-2xl flex items-center justify-center mr-6">
            <i data-lucide="briefcase" class="w-8 h-8 text-white"></i>
          </div>
          <h3 class="text-3xl font-bold">{{ t().resume.experience }}</h3>
        </div>

        <div class="space-y-8">
          <div class="relative pl-8 border-l-2 border-accent">
            <div class="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
            <div class="glass rounded-2xl p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">Ago 2024 - Actualidad</span>
                <img src="/placeholder.svg?height=24&width=60" alt="Procetti" class="h-6 opacity-70"/>
              </div>
              <h4 class="text-xl font-bold mb-2">{{ t().resume.positions.seniorFrontend }}</h4>
              <p class="text-accent text-sm mb-4">{{ t().resume.companies.procetti }}</p>
              <p class="text-text-secondary leading-relaxed mb-4">{{ t().resume.descriptions.procetti }}</p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Angular 19</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">NgRx Signals</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">RxJS</span>
              </div>
            </div>
          </div>

          <div class="relative pl-8 border-l-2 border-text-muted">
            <div class="absolute -left-3 top-0 w-6 h-6 bg-text-muted rounded-full"></div>
            <div class="glass rounded-2xl p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">Abr 2022 - Mar 2024</span>
                <img src="/placeholder.svg?height=24&width=60" alt="Neoris" class="h-6 opacity-70"/>
              </div>
              <h4 class="text-xl font-bold mb-2">{{ t().resume.positions.seniorFrontend }}</h4>
              <p class="text-accent text-sm mb-4">{{ t().resume.companies.neoris }}</p>
              <p class="text-text-secondary leading-relaxed mb-4">{{ t().resume.descriptions.neoris }}</p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Angular Material</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Tailwind CSS</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">NgRx</span>
              </div>
            </div>
          </div>

          <div class="relative pl-8 border-l-2 border-text-muted">
            <div class="absolute -left-3 top-0 w-6 h-6 bg-text-muted rounded-full"></div>
            <div class="glass rounded-2xl p-6">
              <div class="flex justify-between items-start mb-4">
                <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">Nov 2021 - Abr 2022</span>
                <img src="/placeholder.svg?height=24&width=60" alt="Nova Solutions Systems" class="h-6 opacity-70"/>
              </div>
              <h4 class="text-xl font-bold mb-2">{{ t().resume.positions.seniorFrontend }}</h4>
              <p class="text-accent text-sm mb-4">{{ t().resume.companies.nova }}</p>
              <p class="text-text-secondary leading-relaxed mb-4">{{ t().resume.descriptions.nova }}</p>
              <div class="flex flex-wrap gap-2">
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Angular 12</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Migration</span>
                <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">AngularJS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educación -->
      <div data-aos="fade-left" data-aos-duration="800">
        <div class="flex items-center mb-12">
          <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-dark rounded-2xl flex items-center justify-center mr-6">
            <i data-lucide="graduation-cap" class="w-8 h-8 text-white"></i>
          </div>
          <h3 class="text-3xl font-bold">{{ t().resume.education }}</h3>
        </div>

        <div class="space-y-8">
          <div class="relative pl-8 border-l-2 border-accent">
            <div class="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
            <div class="glass rounded-2xl p-6">
              <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">2011 - 2013</span>
              <h4 class="text-xl font-bold mt-4 mb-2">{{ t().resume.education.degree1 }}</h4>
              <p class="text-accent text-sm mb-2">{{ t().resume.education.university }}</p>
              <p class="text-text-muted text-sm mb-4">Cédula No.: 09179779</p>
              <p class="text-text-secondary leading-relaxed mb-4">{{ t().resume.education.description1 }}</p>
              <div class="text-accent text-sm font-medium flex items-center"><i data-lucide="award" class="w-4 h-4 mr-2"></i>{{ t().resume.education.certificate }}</div>
            </div>
          </div>

          <div class="relative pl-8 border-l-2 border-text-muted">
            <div class="absolute -left-3 top-0 w-6 h-6 bg-text-muted rounded-full"></div>
            <div class="glass rounded-2xl p-6">
              <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">2008 - 2010</span>
              <h4 class="text-xl font-bold mt-4 mb-2">{{ t().resume.education.degree2 }}</h4>
              <p class="text-accent text-sm mb-2">{{ t().resume.education.university }}</p>
              <p class="text-text-muted text-sm mb-4">Cédula No.: 6997154</p>
              <p class="text-text-secondary leading-relaxed mb-4">{{ t().resume.education.description2 }}</p>
              <div class="text-accent text-sm font-medium flex items-center"><i data-lucide="award" class="w-4 h-4 mr-2"></i>{{ t().resume.education.certificate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="mt-24">
      <h3 class="text-3xl font-bold mb-12 text-center" data-aos="fade-up">
        <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().resume.skills }}</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (skill of skills(); track skill.name) {
          <div class="glass rounded-2xl p-6" data-aos="fade-up" [attr.data-aos-delay]="skill.delay">
            <div class="flex items-center justify-between mb-4">
              <span class="font-semibold">{{ skill.name }}</span>
              <span class="text-accent font-mono text-sm">{{ skill.percentage }}%</span>
            </div>
            <div class="bg-dark-lighter rounded-full h-3 overflow-hidden">
              <div class="bg-accent h-full rounded-full transition-all duration-1000 ease-out" 
                   [style.width.%]="animateSkills() ? skill.percentage : 0">
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>
  `
})
export class ResumeComponent implements OnInit, AfterViewInit {
  private elementRef = inject(ElementRef);
  private translationService = inject(TranslationService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Animation state
  animateSkills = signal(false);
  
  // Skills data
  skills = signal([
    { name: 'Angular', percentage: 95, delay: 100 },
    { name: 'TypeScript', percentage: 92, delay: 200 },
    { name: 'JavaScript', percentage: 90, delay: 300 },
    { name: 'NgRx & RxJS', percentage: 88, delay: 400 },
    { name: 'Node.js', percentage: 85, delay: 500 },
    { name: 'MySQL', percentage: 80, delay: 600 }
  ]);
  
  ngOnInit() {
    // Component initialization
  }
  
  ngAfterViewInit() {
    // Set up intersection observer for skills animation
    this.setupSkillsAnimation();
  }
  
  private setupSkillsAnimation() {
    const skillsSection = this.elementRef.nativeElement.querySelector('#resume');
    
    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              // Start animation when skills section is visible
              setTimeout(() => {
                this.animateSkills.set(true);
              }, 500); // Delay to make it more dramatic
              
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0.3]
        }
      );
      
      observer.observe(skillsSection);
    }
  }
}