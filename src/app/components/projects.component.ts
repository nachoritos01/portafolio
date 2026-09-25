import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
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
        <h2
          class="text-4xl lg:text-5xl font-bold text-center mb-16"
          data-aos="fade-up"
        >
          <span
            class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent"
            >{{ t().projects.title }}</span
          >
        </h2>

        <div
          class="flex flex-wrap justify-center gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          @for (filter of filters(); track filter.value) {
          <button
            (click)="setActiveFilter(filter.value)"
            [class]="
              filter.value === activeFilter()
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:text-accent'
            "
            class="px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
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
  `,
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
    { value: 'data', label: this.t().projects.filters.data },
  ]);

  projects = computed(() => this.projectsData());

  filteredProjects = computed(() => {
    if (this.activeFilter() === 'all') {
      return this.projects();
    }
    return this.projects().filter(
      (project) => project.type === this.activeFilter()
    );
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
        description:
          'Implementación de NgRx Signals Store para gestión de estado moderna con arquitectura de componentes standalone y sistema de temas dinámico.',
        image: '/projects-images/tec-sandbox.png',
        technologies: [
          'Angular 19',
          'NgRx Signals',
          'TypeScript',
          'Tailwind CSS',
          'Docker',
        ],
        category: 'Desarrollo Web',
        type: 'web',
        liveUrl: 'sandbox.tec.mx',
        delay: 100,
      },
      {
        id: 2,
        title: 'Sistema SIGADE - Telcel',
        description:
          'Módulo de gestión de garantías procesando +10,000 transacciones mensuales con sistema de roles y permisos para 5 tipos de usuario diferentes.',
        image: '/projects-images/sigade.png',
        technologies: ['Angular 12+', 'Angular Material', 'NgRx', 'TypeScript'],
        category: 'Sistema Empresarial',
        type: 'web',
        delay: 200,
      },
      {
        id: 3,
        title: 'Plataforma E-commerce Cemex Internacional',
        description:
          'Plataforma multi-región (Reino Unido, Gran Bretaña, República Checa) procesando +50,000 pedidos anuales con configuraciones dinámicas.',
        image: '/projects-images/cemex-go.png',
        technologies: [
          'Angular 7',
          'NgRx',
          'RxJS',
          'TypeScript',
          'ERP Integration',
        ],
        category: 'E-commerce Internacional',
        type: 'web',
        liveUrl: 'https://www.cemexgo.com/',
        delay: 300,
      },
      {
        id: 4,
        title: 'Migración Bursanet - Actinver',
        description:
          'Migración crítica del sistema Bursanet desde AngularJS a Angular 12 con mejora de 300% en velocidad de carga.',
        image: '/projects-images/bursanet.png',
        technologies: [
          'Angular 12',
          'AngularJS Migration',
          'TypeScript',
          'Performance Optimization',
        ],
        category: 'Migración Legacy',
        type: 'web',
        liveUrl: 'https://www.bursanet.mx/',
        delay: 400,
      },
      {
        id: 5,
        title: 'Panel Publicitario Google Ads',
        description:
          'Sistema de gestión de campañas publicitarias utilizado por +50 agencias con automatización que redujo 60% el tiempo de configuración.',
        image: '/projects-images/ads-app.png',
        technologies: [
          'Angular 8',
          'Google Ads API',
          'TypeScript',
          'Automation Scripts',
        ],
        category: 'Marketing Automation',
        type: 'web',
        delay: 500,
      },
      {
        id: 6,
        title: 'Portafolio Angular Moderno',
        description:
          'Portafolio profesional desarrollado con Angular 18, sistema de i18n ES/EN, componentes standalone y optimizaciones de performance.',
        image: '/projects-images/portafolio-cv.gif',
        technologies: [
          'Angular 18',
          'Signals',
          'TailwindCSS',
          'i18n',
          'Vercel',
        ],
        category: 'Portafolio Personal',
        type: 'web',
        liveUrl: 'https://nachoritos01.github.io/resumen-cv/home',
        githubUrl: 'https://github.com/nachoritos01/resumen-cv',
        delay: 600,
      },
      {
        id: 7,
        title: 'Dra. Asunción Martín - Pediatra Neonatóloga',
        description:
          'Sitio web profesional con Angular 20 para consultorio pediátrico en Mérida, Yucatán. Incluye sistema de citas, blog de consejos de salud y arquitectura standalone components con deployment en Google Cloud Run.',
        image: '/projects-images/pediatra-neonatologia.png',
        technologies: [
          'Angular 20',
          'TypeScript',
          'Tailwind CSS',
          'Font Awesome',
          'Google Cloud Run',
          'Docker',
        ],
        category: 'Sitio Web Profesional',
        type: 'web',
        liveUrl: 'https://pediatra-neonatologia.com',
        delay: 700,
      },
      {
        id: 8,
        title: 'ClaraMente - Servicios de Salud Mental',
        description:
          'Sitio web corporativo para clínica de salud mental en Mérida, Yucatán. Diseño moderno enfocado en accesibilidad y experiencia de usuario con paleta de colores clínica profesional y tipografía optimizada para legibilidad.',
        image: '/projects-images/claramente.png',
        technologies: [
          'HTML5',
          'Tailwind CSS',
          'JavaScript',
          'Google Fonts',
          'Responsive Design',
          'Vercel',
        ],
        category: 'Sitio Web Médico',
        type: 'web',
        liveUrl: 'https://mental-health-services-website.vercel.app/',
        delay: 800,
      },
      {
        id: 9,
        title: 'Hanal Pixán - La Ceiba y el Pib Familiar',
        description:
          'Aplicación cultural Angular 20 que documenta tradiciones del Día de Muertos maya. Incluye experiencia immersiva con parallax storytelling, calculadora interactiva de recetas, memorial digital en Xibalbá y sistema de partículas canvas con design tokens culturales.',
        image: '/projects-images/hanal-pixan.png',
        technologies: [
          'Angular 20',
          'Signals',
          'Tailwind CSS',
          'Canvas API',
          'Reactive Forms',
          'Vercel',
        ],
        category: 'Sitio Cultural',
        type: 'web',
        liveUrl: 'https://hanal-pixan.vercel.app/',
        delay: 900,
      },
      {
        id: 10,
        title: 'VectorSensei - Tienda de Diseños Digitales',
        description:
          'Tienda en línea de diseños listos para imprimir y vender. La construí desde el diseño hasta el cobro: pagos con tarjeta y MercadoPago, membresías, descargas protegidas, inicio de sesión con Google y un programa de puntos para clientes frecuentes.',
        image: '/projects-images/vectorsensei.png',
        technologies: [
          'Next.js 16',
          'React 19',
          'TypeScript',
          'Tailwind CSS',
          'Neon Postgres',
          'Drizzle ORM',
          'Stripe',
          'Cloudflare R2',
          'Vercel',
        ],
        category: 'E-commerce',
        type: 'web',
        liveUrl: 'https://vectorsensei.com',
        delay: 1000,
      },
      {
        id: 11,
        title: 'Godinoterapia - Playeras Personalizadas',
        description:
          'Tienda de playeras personalizadas donde el cliente cotiza en línea, hace su pedido y deja su anticipo.',
        image: '/projects-images/godinoterapia.png',
        technologies: [
          'Laravel 12',
          'Livewire',
          'PostgreSQL',
          'Tailwind CSS',
          'Conekta',
          'Railway',
        ],
        category: 'E-commerce',
        type: 'web',
        liveUrl: 'https://www.godinoterapia.com/',
        delay: 1100,
      },
      {
        id: 12,
        title: 'PrintFlow - SaaS para Imprentas',
        description:
          'Sistema para imprentas que ya usan varios negocios en su día a día. Cada uno lleva ahí sus pedidos, su producción, sus precios, sus cobros y sus envíos, y sus clientes pueden revisar cómo va su pedido. Lo diseñé, lo construí y lo mantengo yo, apoyándome en LLMs y cuidando que cada cambio esté probado antes de salir.',
        image: '/projects-images/printflow.png',
        technologies: [
          'Laravel 12',
          'Filament',
          'Multi-tenancy',
          'Stripe Billing',
          'PostgreSQL',
          'LLMs',
          'GitHub Actions',
          'Docker',
        ],
        category: 'SaaS',
        type: 'web',
        liveUrl: 'https://www.godinoterapia.com/printflow',
        delay: 1200,
      },
      {
        id: 14,
        title: 'Godinoterapia E-shop - Tienda Headless',
        description:
          'La tienda en línea que se conecta con PrintFlow. El cliente busca productos, sube su diseño y lo acomoda sobre la prenda, cotiza, paga y después sigue sus pedidos desde su cuenta. Está en español e inglés y tiene modo oscuro.',
        image: '/projects-images/godinoterapia-eshop.png',
        technologies: [
          'Next.js 16',
          'React 19',
          'TypeScript',
          'Tailwind CSS',
          'shadcn/ui',
          'Zustand',
          'next-intl',
          'Framer Motion',
          'Vercel',
        ],
        category: 'E-commerce Headless',
        type: 'web',
        liveUrl: 'https://godinoterapia-laravel.vercel.app/',
        delay: 1250,
      },
      {
        id: 13,
        title: 'Invitación Digital XV Años',
        description:
          'Invitación digital para una fiesta de XV años. Cada invitado recibe su propio enlace con su nombre y sus pases, confirma por WhatsApp y encuentra la galería de fotos, la cuenta regresiva y cómo llegar. La familia genera los enlaces desde un panel privado. Pensada para abrirse rápido desde el celular.',
        image: '/projects-images/invitacion-xv.png',
        technologies: [
          'HTML5',
          'CSS3',
          'JavaScript',
          'Web Components',
          'WhatsApp',
          'Vercel',
        ],
        category: 'Sitio de Evento',
        type: 'web',
        liveUrl: 'https://liat-fernanda-xv.vercel.app/',
        delay: 1300,
      },
    ]);
  }
}
