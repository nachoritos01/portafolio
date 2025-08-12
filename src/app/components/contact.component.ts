import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { PersonalInfoService } from '../services/personal-info.service';
import { EmailService, ContactFormData } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- Contacto -->
<section id="contact" class="min-h-screen p-8 lg:p-16 bg-dark-lighter/50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16" data-aos="fade-up">
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">{{ t().contact.title }}</span>
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div data-aos="fade-right" data-aos-duration="800">
        <h3 class="text-3xl font-bold mb-8">{{ t().nav.contact }}</h3>
        <p class="text-text-secondary text-lg mb-12 leading-relaxed">{{ t().contact.subtitle }}</p>

        <div class="space-y-6">
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="map-pin" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ t().contact.location }}</h4>
              <p class="text-text-secondary">{{ personalInfo().location }}</p>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="mail" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ t().contact.email }}</h4>
              <a [href]="'mailto:' + personalInfo().email" class="text-text-secondary hover:text-accent transition-colors">{{ personalInfo().email }}</a>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="globe" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ t().contact.workMode }}</h4>
              <p class="text-accent">{{ t().contact.remote }}</p>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="clock" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">{{ t().contact.availability }}</h4>
              <p class="text-accent">{{ t().contact.available }}</p>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <h4 class="font-semibold mb-6">{{ t().contact.socials }}</h4>
          <div class="flex space-x-4">
            <a [href]="personalInfo().socialMedia.linkedin" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="linkedin" class="w-5 h-5"></i>
            </a>
            <a [href]="personalInfo().socialMedia.github" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="github" class="w-5 h-5"></i>
            </a>
            <a [href]="personalInfo().socialMedia.twitter" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="x" class="w-5 h-5"></i>
            </a>
            <a [href]="personalInfo().socialMedia.instagram" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="instagram" class="w-5 h-5"></i>
            </a>
          </div>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-duration="800">
        <div class="glass rounded-3xl p-8">
          <h3 class="text-2xl font-bold mb-8">{{ t().contact.formTitle }}</h3>
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium mb-2">{{ t().contact.firstName }}</label>
                <input 
                  id="firstName" 
                  formControlName="firstName" 
                  class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium mb-2">{{ t().contact.lastName }}</label>
                <input 
                  id="lastName" 
                  formControlName="lastName" 
                  class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-2">{{ t().contact.emailLabel }}</label>
              <input 
                id="email" 
                type="email" 
                formControlName="email" 
                class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium mb-2">{{ t().contact.subject }}</label>
              <select 
                id="subject" 
                formControlName="subject" 
                class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
              >
                <option value="">Selecciona un asunto</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="data-science">Data Science Project</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label for="message" class="block text-sm font-medium mb-2">{{ t().contact.message }}</label>
              <textarea 
                id="message" 
                formControlName="message" 
                rows="6" 
                placeholder="Cuéntame sobre tu proyecto..." 
                class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none resize-none"
              ></textarea>
            </div>
            <!-- Mensaje de respuesta -->
            <div *ngIf="submitMessage()" class="mb-4 p-4 rounded-xl" 
                 [class]="submitSuccess() ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'">
              <div class="flex items-center">
                <i [attr.data-lucide]="submitSuccess() ? 'check-circle' : 'alert-circle'" class="w-5 h-5 mr-2"></i>
                {{ submitMessage() }}
              </div>
            </div>

            <button 
              type="submit" 
              [disabled]="contactForm.invalid || isSubmitting()"
              class="w-full bg-accent hover:bg-accent-dark px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:transform-none"
            >
              <div class="flex items-center">
                <i *ngIf="isSubmitting()" data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i>
                <i *ngIf="!isSubmitting()" data-lucide="send" class="w-5 h-5 mr-2"></i>
                {{ isSubmitting() ? 'Enviando...' : t().contact.send }}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
  `
})
export class ContactComponent {
  private translationService = inject(TranslationService);
  private personalInfoService = inject(PersonalInfoService);
  private emailService = inject(EmailService);
  
  // Translation getter
  t = () => this.translationService.t;
  
  // Personal info getter
  personalInfo = this.personalInfoService.info;
  
  isSubmitting = signal(false);
  submitMessage = signal<string>('');
  submitSuccess = signal<boolean | null>(null);
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.submitMessage.set('');
      this.submitSuccess.set(null);
      
      try {
        // Preparar datos del formulario
        const formData: ContactFormData = {
          firstName: this.contactForm.value.firstName,
          lastName: this.contactForm.value.lastName,
          email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message
        };

        console.log('Enviando formulario de contacto:', formData);

        // Enviar email usando EmailJS
        const result = await this.emailService.sendContactEmail(formData);
        
        if (result.success) {
          this.submitMessage.set(result.message);
          this.submitSuccess.set(true);
          this.contactForm.reset();
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.submitMessage.set('');
            this.submitSuccess.set(null);
          }, 5000);
        } else {
          this.submitMessage.set(result.message);
          this.submitSuccess.set(false);
        }

      } catch (error) {
        console.error('Error inesperado al enviar formulario:', error);
        this.submitMessage.set('Error inesperado. Por favor contacta directamente: ' + this.personalInfo().email);
        this.submitSuccess.set(false);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}