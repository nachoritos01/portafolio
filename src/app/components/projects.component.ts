import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { ProjectCardComponent } from './project-card.component';
import { ProjectData } from '../interfaces/project-data.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Projects -->
<section id="projects" class="min-h-screen p-8 lg:p-16">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().projects.title }}</span>
    </h2>

    <div class="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="200">
      @for (filter of filters(); track filter.value) {
        <button 
          (click)="setActiveFilter(filter.value)"
          [class]="filter.value === activeFilter() ? 'bg-accent text-white' : 'text-text-secondary hover:text-accent'"
          class="px-6 py-3 rounded-xl font-semibold transition-all duration-300">
          {{ filter.label }}
        </button>
      }
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (project of filteredProjects(); track project.id) {
        <app-project-card [projectData]="project" />
      }
    </div>
  </div>
</section>
  `
})
export class ProjectsComponent implements OnInit {
  private translationService = inject(TranslationService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  activeFilter = signal<string>('all');
  
  // Projects data
  projectsData = signal<ProjectData[]>([]);
  
  filters = computed(() => [
    { value: 'all', label: this.t().projects.filters.all },
    { value: 'web', label: this.t().projects.filters.web },
    { value: 'mobile', label: this.t().projects.filters.mobile },
    { value: 'data', label: this.t().projects.filters.data }
  ]);

  projects = computed(() => this.projectsData());

  filteredProjects = computed(() => {
    if (this.activeFilter() === 'all') {
      return this.projects();
    }
    return this.projects().filter(project => project.type === this.activeFilter());
  });
  
  ngOnInit() {
    this.updateProjectsData();
  }

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }
  
  private updateProjectsData() {
    const translatedProjects = this.t().projects.list;
    this.projectsData.set([
      {
        id: 1,
        title: translatedProjects[0].title,
        description: translatedProjects[0].description,
        image: '/placeholder.svg?height=250&width=400',
        technologies: ['NestJS', 'Twilio API', 'Google Calendar'],
        category: translatedProjects[0].category,
        type: 'web',
        liveUrl: '#',
        githubUrl: '#',
        delay: 100
      },
      {
        id: 2,
        title: translatedProjects[1].title,
        description: translatedProjects[1].description,
        image: '/placeholder.svg?height=250&width=400',
        technologies: ['Angular', 'NgRx', 'TypeScript'],
        category: translatedProjects[1].category,
        type: 'web',
        liveUrl: '#',
        githubUrl: '#',
        delay: 200
      },
      {
        id: 3,
        title: translatedProjects[2].title,
        description: translatedProjects[2].description,
        image: '/placeholder.svg?height=250&width=400',
        technologies: ['Python', 'TensorFlow', 'PostgreSQL'],
        category: translatedProjects[2].category,
        type: 'data',
        liveUrl: '#',
        githubUrl: '#',
        delay: 300
      }
    ]);
  }
}