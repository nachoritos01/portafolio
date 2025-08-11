import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { ArticleCardComponent } from './article-card.component';
import { ArticleData } from '../interfaces/article-data.interface';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Blog -->
<section id="blog" class="min-h-screen p-8 lg:p-16">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().blog.title }}</span>
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
        <app-article-card [articleData]="article" [readMoreText]="t().blog.readMore" />
      }
    </div>
  </div>
</section>
  `
})
export class BlogComponent implements OnInit {
  private translationService = inject(TranslationService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  activeFilter = signal<string>('all');
  
  // Articles data
  articlesData = signal<ArticleData[]>([]);
  
  filters = computed(() => [
    { value: 'all', label: this.t().blog.filters.all },
    { value: 'design', label: this.t().blog.filters.design },
    { value: 'code', label: this.t().blog.filters.code },
    { value: 'tech', label: this.t().blog.filters.tech }
  ]);

  articles = computed(() => this.articlesData());

  filteredArticles = computed(() => {
    if (this.activeFilter() === 'all') {
      return this.articles();
    }
    return this.articles().filter(article => article.category === this.activeFilter());
  });
  
  ngOnInit() {
    this.updateArticlesData();
  }

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }
  
  private updateArticlesData() {
    const translatedArticles = this.t().blog.articles;
    const categories = this.t().blog.categories;
    this.articlesData.set([
      {
        id: 1,
        title: translatedArticles[0].title,
        excerpt: translatedArticles[0].excerpt,
        image: '/placeholder.svg?height=250&width=400',
        date: translatedArticles[0].date,
        category: 'design',
        categoryLabel: categories.design,
        url: '#',
        delay: 100
      },
      {
        id: 2,
        title: translatedArticles[1].title,
        excerpt: translatedArticles[1].excerpt,
        image: '/placeholder.svg?height=250&width=400',
        date: translatedArticles[1].date,
        category: 'tech',
        categoryLabel: categories.technology,
        url: '#',
        delay: 200
      },
      {
        id: 3,
        title: translatedArticles[2].title,
        excerpt: translatedArticles[2].excerpt,
        image: '/placeholder.svg?height=250&width=400',
        date: translatedArticles[2].date,
        category: 'code',
        categoryLabel: categories.development,
        url: '#',
        delay: 300
      }
    ]);
  }
}