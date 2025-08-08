import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-0 left-0 w-full h-1 bg-dark-lighter z-50">
      <div 
        class="h-full bg-accent-dynamic transition-all duration-300 ease-out"
        [style.width]="scrollService.scrollProgress() + '%'">
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  readonly scrollService = inject(ScrollService);
}