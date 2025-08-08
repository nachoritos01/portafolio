import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Blog -->
<section id="blog" class="min-h-screen p-8 lg:p-16">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">Artículos</span>
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
      @for (article of filteredArticles(); track article.id) {
        <article class="glass rounded-2xl overflow-hidden hover-lift" data-aos="fade-up" [attr.data-aos-delay]="article.delay">
          <div class="relative overflow-hidden">
            <img [src]="article.image" [alt]="article.title" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"/>
            <div class="absolute top-4 left-4">
              <span class="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">{{ article.categoryLabel }}</span>
            </div>
          </div>
          <div class="p-6">
            <time class="text-accent text-sm font-mono">{{ article.date }}</time>
            <h3 class="text-xl font-bold mb-3 mt-2 hover:text-accent transition-colors cursor-pointer">{{ article.title }}</h3>
            <p class="text-text-secondary leading-relaxed mb-4">{{ article.excerpt }}</p>
            <a [href]="article.url" class="text-accent font-medium hover:underline flex items-center">
              Leer más <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
            </a>
          </div>
        </article>
      }
    </div>
  </div>
</section>
  `
})
export class BlogComponent {
  activeFilter = signal<string>('all');
  
  filters = signal([
    { value: 'all', label: 'Todos' },
    { value: 'design', label: 'Diseño' },
    { value: 'code', label: 'Desarrollo' },
    { value: 'tech', label: 'Tecnología' }
  ]);

  articles = signal([
    {
      id: 1,
      title: 'Brand Identity with Code',
      excerpt: 'Representación digital de valores de marca a través de diseño y experiencias interactivas.',
      image: '/placeholder.svg?height=250&width=400',
      date: 'Abr 28, 2024',
      category: 'design',
      categoryLabel: 'Design',
      url: '#',
      delay: 100
    },
    {
      id: 2,
      title: 'Modern Data Infrastructure',
      excerpt: 'Tendencias en arquitectura de datos, cloud y sistemas distribuidos.',
      image: '/placeholder.svg?height=250&width=400',
      date: 'Abr 25, 2024',
      category: 'tech',
      categoryLabel: 'Technology',
      url: '#',
      delay: 200
    },
    {
      id: 3,
      title: 'Advanced React Patterns',
      excerpt: 'Patrones avanzados, hooks y rendimiento para apps escalables.',
      image: '/placeholder.svg?height=250&width=400',
      date: 'Abr 22, 2024',
      category: 'code',
      categoryLabel: 'Development',
      url: '#',
      delay: 300
    }
  ]);

  filteredArticles = computed(() => {
    if (this.activeFilter() === 'all') {
      return this.articles();
    }
    return this.articles().filter(article => article.category === this.activeFilter());
  });

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}