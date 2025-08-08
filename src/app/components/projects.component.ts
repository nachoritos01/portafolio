import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Projects -->
<section id="projects" class="min-h-screen p-8 lg:p-16">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">Proyectos</span>
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
    </div>
  </div>
</section>
  `
})
export class ProjectsComponent {
  activeFilter = signal<string>('all');
  
  filters = signal([
    { value: 'all', label: 'Todos' },
    { value: 'web', label: 'Web Apps' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'data', label: 'Data' }
  ]);

  projects = signal([
    {
      id: 1,
      title: 'Twilio WhatsApp Assistant',
      description: 'Asistente conversacional integrando Twilio WhatsApp Business API y Google Calendar con arquitectura serverless.',
      image: '/placeholder.svg?height=250&width=400',
      technologies: ['NestJS', 'Twilio API', 'Google Calendar'],
      category: 'Integración de APIs',
      type: 'web',
      liveUrl: '#',
      githubUrl: '#',
      delay: 100
    },
    {
      id: 2,
      title: 'Sistema SIGADE - Telcel',
      description: 'Gestión de garantías con Angular y NgRx, optimización de estado y rendimiento.',
      image: '/placeholder.svg?height=250&width=400',
      technologies: ['Angular', 'NgRx', 'TypeScript'],
      category: 'Sistema Empresarial',
      type: 'web',
      liveUrl: '#',
      githubUrl: '#',
      delay: 200
    },
    {
      id: 3,
      title: 'AI Analytics Platform',
      description: 'Plataforma de analítica con ML para BI y predicciones.',
      image: '/placeholder.svg?height=250&width=400',
      technologies: ['Python', 'TensorFlow', 'PostgreSQL'],
      category: 'Data Science',
      type: 'data',
      liveUrl: '#',
      githubUrl: '#',
      delay: 300
    }
  ]);

  filteredProjects = computed(() => {
    if (this.activeFilter() === 'all') {
      return this.projects();
    }
    return this.projects().filter(project => project.type === this.activeFilter());
  });

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}