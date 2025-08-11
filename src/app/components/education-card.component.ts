import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationData } from '../interfaces/education-data.interface';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (education of educationData; track education.degree; let i = $index) {
      <div class="relative pl-8 border-l-2" [class]="i === 0 ? 'border-accent' : 'border-text-muted'">
        <div class="absolute -left-3 top-0 w-6 h-6 rounded-full" 
             [class]="i === 0 ? 'bg-accent animate-pulse' : 'bg-text-muted'"></div>
        <div class="glass rounded-2xl p-6">
          <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">
            {{ education.timePeriod }}
          </span>
          <h4 class="text-xl font-bold mt-4 mb-2">{{ education.degree }}</h4>
          <p class="text-accent text-sm mb-2">{{ education.university }}</p>
          <p class="text-text-muted text-sm mb-4">{{ education.credentialNumber }}</p>
          <p class="text-text-secondary leading-relaxed mb-4">{{ education.description }}</p>
          <div class="text-accent text-sm font-medium flex items-center">
            <i data-lucide="award" class="w-4 h-4 mr-2"></i>
            {{ education.certificate }}
          </div>
        </div>
      </div>
    }
  `
})
export class EducationCardComponent {
  @Input() educationData: EducationData[] = [];
}