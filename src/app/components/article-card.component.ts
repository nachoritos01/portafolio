import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleData } from '../interfaces/article-data.interface';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="glass rounded-2xl overflow-hidden hover-lift" data-aos="fade-up" [attr.data-aos-delay]="articleData.delay">
      <div class="relative overflow-hidden">
        <img [src]="articleData.image" [alt]="articleData.title" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"/>
        <div class="absolute top-4 left-4">
          <span class="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">{{ articleData.categoryLabel }}</span>
        </div>
      </div>
      <div class="p-6">
        <time class="text-accent text-sm font-mono">{{ articleData.date }}</time>
        <h3 class="text-xl font-bold mb-3 mt-2 hover:text-accent transition-colors cursor-pointer">{{ articleData.title }}</h3>
        <p class="text-text-secondary leading-relaxed mb-4">{{ articleData.excerpt }}</p>
        <a [href]="articleData.url" class="text-accent font-medium hover:underline flex items-center">
          {{ readMoreText }} <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
        </a>
      </div>
    </article>
  `
})
export class ArticleCardComponent {
  @Input() articleData!: ArticleData;
  @Input() readMoreText: string = 'Read More';
}