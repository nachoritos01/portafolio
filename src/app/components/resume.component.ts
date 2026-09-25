import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { JobCardComponent } from './job-card.component';
import { EducationCardComponent } from './education-card.component';
import { SkillsSectionComponent } from './skills-section.component';
import { JobData } from '../interfaces/job-data.interface';
import { EducationData } from '../interfaces/education-data.interface';
import { SkillData } from '../interfaces/skill-data.interface';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, JobCardComponent, EducationCardComponent, SkillsSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Resume -->
<section id="resume" class="min-h-screen p-8 lg:p-16 bg-dark-lighter/50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().resume.title }}</span>
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Experiencia -->
      <div data-aos="fade-right" data-aos-duration="800">
        <div class="flex items-center mb-12">
          <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-dark rounded-2xl flex items-center justify-center mr-6">
            <i data-lucide="briefcase" class="w-8 h-8 text-white"></i>
          </div>
          <h3 class="text-3xl font-bold">{{ t().resume.experience }}</h3>
        </div>

        <div>
          @for (job of jobsData(); track job.companyName; let i = $index) {
            <app-job-card [jobData]="job" [isFirst]="i === 0" />
          }
        </div>
      </div>

      <!-- Educación -->
      <div data-aos="fade-left" data-aos-duration="800">
        <div class="flex items-center mb-12">
          <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-dark rounded-2xl flex items-center justify-center mr-6">
            <i data-lucide="graduation-cap" class="w-8 h-8 text-white"></i>
          </div>
          <h3 class="text-3xl font-bold">{{ t().resume.educationTitle }}</h3>
        </div>

        <div>
          @for (education of educationData(); track education.degree; let i = $index) {
            <app-education-card [educationData]="education" [isFirst]="i === 0" />
          }
        </div>
      </div>
    </div>

    <!-- Skills -->
    <app-skills-section [skillsData]="skillsData()" [title]="t().resume.skills" />
  </div>
</section>
  `
})
export class ResumeComponent implements OnInit {
  private translationService = inject(TranslationService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Jobs data
  jobsData = signal<JobData[]>([]);
  
  // Education data
  educationData = signal<EducationData[]>([]);
  
  // Skills data
  skillsData = signal<SkillData[]>([]);
  
  ngOnInit() {
    this.updateJobsData();
    this.updateEducationData();
    this.updateSkillsData();
  }
  
  private updateJobsData() {
    this.jobsData.set([
      {
        skillSets: ['Laravel 12', 'Next.js 16', 'PostgreSQL', 'Stripe', 'LLMs'],
        companyName: this.t().resume.jobs.independent.company,
        timePeriod: this.t().resume.jobs.independent.timePeriod,
        title: this.t().resume.jobs.independent.title,
        description: this.t().resume.jobs.independent.descriptions,
        socialMedia: ['https://www.godinoterapia.com/printflow'],
        image: 'printflow_logo.svg'
      },
      {
        skillSets: ['Angular 19', 'NgRx Signals', 'RxJS', 'Tailwind CSS'],
        companyName: this.t().resume.companies.procetti,
        timePeriod: this.t().resume.jobs.procetti.timePeriod,
        title: this.t().resume.jobs.procetti.title,
        description: this.t().resume.jobs.procetti.descriptions,
        socialMedia: ['https://www.linkedin.com/company/proceti'],
        image: 'proceti_logo.jpg'
      },
      {
        skillSets: ['Angular Material', 'Tailwind CSS', 'NgRx'],
        companyName: this.t().resume.companies.neoris,
        timePeriod: this.t().resume.jobs.neoris.timePeriod,
        title: this.t().resume.jobs.neoris.title,
        description: this.t().resume.jobs.neoris.descriptions,
        socialMedia: ['https://www.linkedin.com/company/neoris'],
        image: 'neoris_logo.jpg' // Placeholder hasta tener logo de Neoris
      },
      {
        skillSets: ['Angular 12', 'Migration', 'AngularJS'],
        companyName: this.t().resume.companies.nova,
        timePeriod: this.t().resume.jobs.nova.timePeriod,
        title: this.t().resume.jobs.nova.title,
        description: this.t().resume.jobs.nova.descriptions,
        socialMedia: ['https://www.linkedin.com/company/novasolutionsystems/'],
        image: 'novasolutionsystems_logo.jpg'
      },
      {
        skillSets: ['Angular', 'Angular Material', 'Express.js', 'Node.js'],
        companyName: 'Relappro',
        timePeriod: this.t().resume.jobs.relappro.timePeriod,
        title: this.t().resume.jobs.relappro.title,
        description: this.t().resume.jobs.relappro.descriptions,
        socialMedia: ['https://www.linkedin.com/company/relap'],
        image: 'relap_logo.jpg'
      },
      {
        skillSets: ['PHP', 'Symfony Framework', 'Jira', 'Twig'],
        companyName: 'Simetrical',
        timePeriod: this.t().resume.jobs.simetrical.timePeriod,
        title: this.t().resume.jobs.simetrical.title,
        description: this.t().resume.jobs.simetrical.descriptions,
        socialMedia: ['https://www.linkedin.com/company/simdatagroup/'],
        image: 'simdatagroup_logo.jpg'
      },
      {
        skillSets: ['PHP', 'CodeIgniter Framework', 'MySQL', 'MVC', 'AngularJS'],
        companyName: 'Efisense Interactive',
        timePeriod: this.t().resume.jobs.efisense.timePeriod,
        title: this.t().resume.jobs.efisense.title,
        description: this.t().resume.jobs.efisense.descriptions,
        socialMedia: ['https://www.linkedin.com/company/efisense/'],
        image: 'efisense_logo.jpg'
      }
    ]);
  }
  
  private updateEducationData() {
    this.educationData.set([
      {
        timePeriod: '2011 - 2013',
        degree: this.t().resume.education.degree1,
        university: this.t().resume.education.university,
        credentialNumber: 'Cédula No.: 09179779',
        description: this.t().resume.education.description1,
        certificate: this.t().resume.education.certificate
      },
      {
        timePeriod: '2008 - 2010',
        degree: this.t().resume.education.degree2,
        university: this.t().resume.education.university,
        credentialNumber: 'Cédula No.: 6997154',
        description: this.t().resume.education.description2,
        certificate: this.t().resume.education.certificate
      }
    ]);
  }
  
  private updateSkillsData() {
    this.skillsData.set([
      { name: 'Angular', percentage: 95, delay: 100 },
      { name: 'TypeScript', percentage: 92, delay: 200 },
      { name: 'Desarrollo con LLMs (Claude Code, Codex, Kimi)', percentage: 90, delay: 400 },
      { name: 'NgRx & RxJS', percentage: 88, delay: 500 },
      { name: 'Laravel & PHP', percentage: 85, delay: 600 },
      { name: 'Next.js & React', percentage: 82, delay: 700 },
      { name: 'Node.js & NestJS', percentage: 85, delay: 800 },
      { name: 'PostgreSQL', percentage: 82, delay: 900 }
    ]);
  }
}