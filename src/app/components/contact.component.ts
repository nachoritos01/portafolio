import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      <span class="bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">Trabajemos juntos</span>
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div data-aos="fade-right" data-aos-duration="800">
        <h3 class="text-3xl font-bold mb-8">Contacto</h3>
        <p class="text-text-secondary text-lg mb-12 leading-relaxed">¿Listo para iniciar tu proyecto? Hablemos y creemos algo increíble.</p>

        <div class="space-y-6">
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="map-pin" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">Ubicación</h4>
              <p class="text-text-secondary">Mérida, Yucatán, México</p>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="mail" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">Email</h4>
              <a href="mailto:ignacionavarretedev@gmail.com" class="text-text-secondary hover:text-accent transition-colors">ignacionavarretedev&#64;gmail.com</a>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="globe" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">Modalidad</h4>
              <p class="text-accent">Trabajo Remoto</p>
            </div>
          </div>
          <div class="flex items-center group">
            <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-accent/20 transition-colors">
              <i data-lucide="clock" class="w-6 h-6 text-accent"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-1">Disponibilidad</h4>
              <p class="text-accent">Disponible para nuevos proyectos</p>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <h4 class="font-semibold mb-6">Redes</h4>
          <div class="flex space-x-4">
            <a href="https://www.linkedin.com/in/ignacionavarrete-front-end-developer-angular/" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="linkedin" class="w-5 h-5"></i>
            </a>
            <a href="https://github.com/nachoritos01" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="github" class="w-5 h-5"></i>
            </a>
            <a href="https://x.com/ignacionavarrete" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="x" class="w-5 h-5"></i>
            </a>
            <a href="https://instagram.com/ignacionavarrete" target="_blank" rel="noopener" class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
              <i data-lucide="instagram" class="w-5 h-5"></i>
            </a>
          </div>
        </div>
      </div>

      <div data-aos="fade-left" data-aos-duration="800">
        <div class="glass rounded-3xl p-8">
          <h3 class="text-2xl font-bold mb-8">Envíame un mensaje</h3>
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium mb-2">Nombre</label>
                <input 
                  id="firstName" 
                  formControlName="firstName" 
                  class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium mb-2">Apellido</label>
                <input 
                  id="lastName" 
                  formControlName="lastName" 
                  class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-2">Email</label>
              <input 
                id="email" 
                type="email" 
                formControlName="email" 
                class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium mb-2">Asunto</label>
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
              <label for="message" class="block text-sm font-medium mb-2">Mensaje</label>
              <textarea 
                id="message" 
                formControlName="message" 
                rows="6" 
                placeholder="Cuéntame sobre tu proyecto..." 
                class="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:outline-none resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              [disabled]="contactForm.invalid || isSubmitting()"
              class="w-full bg-accent hover:bg-accent-dark px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:transform-none"
            >
              <i data-lucide="send" class="w-5 h-5 mr-2"></i> 
              {{ isSubmitting() ? 'Enviando...' : 'Enviar' }}
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
  isSubmitting = signal(false);
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
      
      // Simular envío de formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Formulario enviado:', this.contactForm.value);
      this.contactForm.reset();
      this.isSubmitting.set(false);
    }
  }
}