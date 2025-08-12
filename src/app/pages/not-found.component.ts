import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  private router = inject(Router);
  private location = inject(Location);
  private translationService = inject(TranslationService);
  private personalInfoService = inject(PersonalInfoService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Personal info getter
  personalInfo = this.personalInfoService.info;

  ngOnInit() {
    // Initialize AOS if available
    this.initializeAnimations();
  }

  goHome() {
    // Since this is a single page app, navigate to root and scroll to top
    window.location.href = '/';
  }

  goBack() {
    this.location.back();
  }

  navigateToSection(sectionId: string) {
    // Navigate to home and scroll to section
    window.location.href = `/#${sectionId}`;
  }

  private initializeAnimations() {
    // Initialize AOS animations if library is available
    setTimeout(() => {
      if (typeof (window as any).AOS !== 'undefined') {
        (window as any).AOS.init({
          duration: 800,
          once: true,
          offset: 100
        });
      }
    }, 100);
  }
}