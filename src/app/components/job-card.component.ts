import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobData } from '../interfaces/job-data.interface';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative pl-8 border-l-2 mb-8" [class]="isFirst ? 'border-accent' : 'border-text-muted'">
      <div class="absolute -left-3 top-0 w-6 h-6 rounded-full" 
           [class]="isFirst ? 'bg-accent animate-pulse' : 'bg-text-muted'"></div>
      <div class="glass rounded-2xl p-6">
        <div class="flex justify-between items-start mb-4">
          <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">
            {{ jobData.timePeriod }}
          </span>
          <div class="flex items-center gap-2">
            <img [src]="'/jobs-logos/' + jobData.image" [alt]="jobData.companyName" class="h-8 opacity-80 rounded"/>
            @if (jobData.socialMedia.length > 0) {
              <a [href]="jobData.socialMedia[0]" target="_blank" rel="noopener" 
                 class="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            }
          </div>
        </div>
        <h4 class="text-xl font-bold mb-2">{{ jobData.title }}</h4>
        <p class="text-accent text-sm mb-4">{{ jobData.companyName }}</p>
        @for (desc of jobData.description; track desc) {
          <p class="text-text-secondary leading-relaxed mb-4">{{ desc }}</p>
        }
        <div class="flex flex-wrap gap-2">
          @for (skill of jobData.skillSets; track skill) {
            <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{{ skill }}</span>
          }
        </div>
      </div>
    </div>
  `
})
export class JobCardComponent {
  @Input() jobData!: JobData;
  @Input() isFirst: boolean = false;
}