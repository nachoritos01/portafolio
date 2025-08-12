import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent {
  private translationService = inject(TranslationService);
  private personalInfoService = inject(PersonalInfoService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Personal info getter
  personalInfo = this.personalInfoService.info;
}