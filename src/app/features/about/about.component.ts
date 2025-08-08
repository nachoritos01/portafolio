import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="min-h-screen p-8 lg:p-16 flex items-center">
      <div class="max-w-6xl mx-auto w-full">
        
        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <!-- Texto principal -->
          <div>
            <h2 class="text-5xl lg:text-7xl font-bold mb-6">
              <span class="bg-gradient-to-r from-white via-green-500 to-white bg-clip-text text-transparent">
                Hola, soy
              </span>
              <br>
              <span class="text-green-500">Ignacio</span>
            </h2>
            
            <p class="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Desarrollador Frontend Senior con más de 
              <span class="text-green-500 font-semibold">8 años</span> 
              de experiencia, especializado en 
              <span class="text-green-500 font-semibold">Angular</span> y 
              <span class="text-green-500 font-semibold">TypeScript</span>, 
              creando interfaces modernas y escalables.
            </p>
            
            <!-- Skills badges -->
            <div class="flex flex-wrap gap-4 mb-8">
              <span *ngFor="let skill of mainSkills" 
                    class="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-medium border border-green-500/20">
                {{ skill }}
              </span>
            </div>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-white"
                type="button">
                Ver proyectos
              </button>
              
              <button
                class="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                type="button">
                Hablemos
              </button>
            </div>
          </div>

          <!-- Imagen/Card profesional -->
          <div class="relative">
            <div class="relative w-full max-w-md mx-auto">
              <div class="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700">
                <div class="text-center">
                  <div class="w-48 h-48 mx-auto mb-6 relative">
                    <img 
                      src="/placeholder.svg?height=192&width=192" 
                      alt="Foto de Ignacio Navarrete" 
                      class="w-full h-full object-cover rounded-full relative z-10"
                      loading="lazy">
                  </div>
                  
                  <div class="space-y-4">
                    <div *ngFor="let info of personalInfo" class="flex items-center justify-between">
                      <span class="text-gray-300">{{ info.label }}:</span>
                      <span class="text-green-500 font-medium">{{ info.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  readonly mainSkills = ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'NestJS'];

  readonly personalInfo = [
    { label: 'Ubicación', value: 'Mérida, Yucatán, México' },
    { label: 'Experiencia', value: '8+ Años' },
    { label: 'Modalidad', value: 'Remoto' }
  ];
}