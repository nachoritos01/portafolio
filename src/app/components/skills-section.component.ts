import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillData } from '../interfaces/skill-data.interface';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-24">
      <h3 class="text-3xl font-bold mb-12 text-center" data-aos="fade-up">
        <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ title }}</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (skill of skillsData; track skill.name) {
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
  `
})
export class SkillsSectionComponent implements AfterViewInit {
  @Input() skillsData: SkillData[] = [];
  @Input() title: string = '';
  
  private elementRef = inject(ElementRef);
  
  // Animation state
  animateSkills = signal(false);
  
  ngAfterViewInit() {
    this.setupSkillsAnimation();
  }
  
  private setupSkillsAnimation() {
    const skillsSection = this.elementRef.nativeElement;
    
    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setTimeout(() => {
                this.animateSkills.set(true);
              }, 500);
              
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