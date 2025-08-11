import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobData } from '../interfaces/job-data.interface';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (job of lastJobs; track job.companyName; let i = $index) {
      <div class="relative pl-8 border-l-2" [class]="i === 0 ? 'border-accent' : 'border-text-muted'">
        <div class="absolute -left-3 top-0 w-6 h-6 rounded-full" 
             [class]="i === 0 ? 'bg-accent animate-pulse' : 'bg-text-muted'"></div>
        <div class="glass rounded-2xl p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">
              {{ job.timePeriod }}
            </span>
            <img src="/placeholder.svg?height=24&width=60" [alt]="job.companyName" class="h-6 opacity-70"/>
          </div>
          <h4 class="text-xl font-bold mb-2">{{ job.title }}</h4>
          <p class="text-accent text-sm mb-4">{{ job.companyName }}</p>
          @for (desc of job.description; track desc) {
            <p class="text-text-secondary leading-relaxed mb-4">{{ desc }}</p>
          }
          <div class="flex flex-wrap gap-2">
            @for (skill of job.skillSets; track skill) {
              <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{{ skill }}</span>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class JobCardComponent {
  @Input() lastJobs: JobData[] = [];
}