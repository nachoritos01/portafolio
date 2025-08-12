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
        title: 'TEC Sandbox - Modernización Angular Empresarial',
        description: 'Implementación de NgRx Signals Store para gestión de estado moderna con arquitectura de componentes standalone y sistema de temas dinámico.',
        image: '/projects-images/tec-sandbox.png',
        technologies: ['Angular 19', 'NgRx Signals', 'TypeScript', 'Tailwind CSS', 'Docker'],
        category: 'Desarrollo Web',
        type: 'web',
        liveUrl: 'sandbox.tec.mx',
        delay: 100
      },
      {
        id: 2,
        title: 'Sistema SIGADE - Telcel',
        description: 'Módulo de gestión de garantías procesando +10,000 transacciones mensuales con sistema de roles y permisos para 5 tipos de usuario diferentes.',
        image: '/projects-images/sigade.png',
        technologies: ['Angular 12+', 'Angular Material', 'NgRx', 'TypeScript'],
        category: 'Sistema Empresarial',
        type: 'web',
        delay: 200
      },
      {
        id: 3,
        title: 'Plataforma E-commerce Cemex Internacional',
        description: 'Plataforma multi-región (Reino Unido, Gran Bretaña, República Checa) procesando +50,000 pedidos anuales con configuraciones dinámicas.',
        image: '/projects-images/cemex-go.png',
        technologies: ['Angular 7', 'NgRx', 'RxJS', 'TypeScript', 'ERP Integration'],
        category: 'E-commerce Internacional',
        type: 'web',
        liveUrl: 'https://www.cemexgo.com/',
        delay: 300
      },
      {
        id: 4,
        title: 'Migración Bursanet - Actinver',
        description: 'Migración crítica del sistema Bursanet desde AngularJS a Angular 12 con mejora de 300% en velocidad de carga.',
        image: '/projects-images/bursanet.png',
        technologies: ['Angular 12', 'AngularJS Migration', 'TypeScript', 'Performance Optimization'],
        category: 'Migración Legacy',
        type: 'web',
        liveUrl: 'https://www.bursanet.mx/',
        delay: 400
      },
      {
        id: 5,
        title: 'Panel Publicitario Google Ads',
        description: 'Sistema de gestión de campañas publicitarias utilizado por +50 agencias con automatización que redujo 60% el tiempo de configuración.',
        image: '/projects-images/ads-app.png',
        technologies: ['Angular 8', 'Google Ads API', 'TypeScript', 'Automation Scripts'],
        category: 'Marketing Automation',
        type: 'web',
        delay: 500
      },
      {
        id: 6,
        title: 'Portafolio Angular Moderno',
        description: 'Portafolio profesional desarrollado con Angular 18, sistema de i18n ES/EN, componentes standalone y optimizaciones de performance.',
        image: '/projects-images/portafolio-cv.gif',
        technologies: ['Angular 18', 'Signals', 'TailwindCSS', 'i18n', 'Vercel'],
        category: 'Portafolio Personal',
        type: 'web',
        liveUrl: 'https://nachoritos01.github.io/resumen-cv/home',
        githubUrl: 'https://github.com/nachoritos01/resumen-cv',
        delay: 600
      }
    ]);
  }
}