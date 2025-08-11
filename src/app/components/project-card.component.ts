import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectData } from '../interfaces/project-data.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (project of projectsData; track project.id) {
      <div class="glass rounded-2xl overflow-hidden hover-lift" data-aos="fade-up" [attr.data-aos-delay]="project.delay">
        <div class="relative overflow-hidden">
          <img [src]="project.image" [alt]="project.title" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div class="p-6">
              <div class="flex space-x-4">
                <a [href]="project.liveUrl" class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <i data-lucide="external-link" class="w-5 h-5"></i>
                </a>
                <a [href]="project.githubUrl" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <i data-lucide="github" class="w-5 h-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <h4 class="text-xl font-bold mb-3">{{ project.title }}</h4>
          <p class="text-text-secondary mb-4 leading-relaxed">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            @for (tech of project.technologies; track tech) {
              <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{{ tech }}</span>
            }
          </div>
          <span class="text-accent text-sm font-medium">{{ project.category }}</span>
        </div>
      </div>
    }
  `
})
export class ProjectCardComponent {
  @Input() projectsData: ProjectData[] = [];
}