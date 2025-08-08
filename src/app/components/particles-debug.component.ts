import { Component, ChangeDetectionStrategy, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './particles.component';

@Component({
  selector: 'app-particles-debug',
  standalone: true,
  imports: [CommonModule, ParticlesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 bg-dark text-white overflow-hidden">
      <!-- Partículas Component -->
      <app-particles></app-particles>
      
      <!-- Debug Panel -->
      <div class="fixed top-4 left-4 z-50 bg-dark-card/90 backdrop-blur-sm border border-accent/20 rounded-lg p-4 font-mono text-sm">
        <h3 class="text-accent font-bold mb-3">🎭 Particles Debug</h3>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-text-secondary">Status:</span>
            <span class="text-accent">{{ debugInfo().status }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-text-secondary">Active Particles:</span>
            <span class="text-accent">{{ debugInfo().activeCount }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-text-secondary">Total Created:</span>
            <span class="text-accent">{{ debugInfo().totalCreated }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-text-secondary">FPS:</span>
            <span [class]="debugInfo().fps >= 55 ? 'text-green-400' : debugInfo().fps >= 30 ? 'text-yellow-400' : 'text-red-400'">
              {{ debugInfo().fps }}
            </span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-text-secondary">Next Spawn:</span>
            <span class="text-accent">{{ debugInfo().nextSpawn }}s</span>
          </div>
        </div>
        
        <div class="mt-4 pt-3 border-t border-accent/20">
          <button 
            (click)="togglePause()"
            class="w-full bg-accent/20 hover:bg-accent/30 text-accent px-3 py-2 rounded text-sm transition-colors">
            {{ isPaused() ? '▶️ Resume' : '⏸️ Pause' }}
          </button>
        </div>
        
        <div class="mt-2">
          <button 
            (click)="forceSpawn()"
            class="w-full bg-accent/10 hover:bg-accent/20 text-accent px-3 py-2 rounded text-sm transition-colors">
            ✨ Force Spawn
          </button>
        </div>
      </div>
      
      <!-- Performance Monitor -->
      <div class="fixed top-4 right-4 z-50 bg-dark-card/90 backdrop-blur-sm border border-accent/20 rounded-lg p-4 font-mono text-xs">
        <h4 class="text-accent font-bold mb-2">⚡ Performance</h4>
        <div class="w-48 h-24 bg-dark-lighter rounded border border-accent/10 relative overflow-hidden">
          @for (frame of fpsHistory(); track $index) {
            <div 
              class="absolute bottom-0 w-1 transition-all duration-100"
              [style.left.px]="$index * 2"
              [style.height.px]="frame"
              [style.background-color]="frame >= 55 ? '#00ff88' : frame >= 30 ? '#fbbf24' : '#ef4444'">
            </div>
          }
        </div>
        <div class="mt-2 text-center text-text-secondary">
          FPS History (60fps = {{ 24 }}px height)
        </div>
      </div>
      
      <!-- Instructions -->
      <div class="fixed bottom-4 left-4 z-50 bg-dark-card/80 backdrop-blur-sm border border-accent/20 rounded-lg p-4 max-w-md">
        <h4 class="text-accent font-bold mb-2">🧪 Test Instructions</h4>
        <ul class="text-sm text-text-secondary space-y-1">
          <li>• Watch particles spawn every 2 seconds</li>
          <li>• Particles should float up like bubbles</li>
          <li>• No overlapping at spawn</li>
          <li>• Smooth 60fps animation</li>
          <li>• Auto-cleanup after 8 seconds</li>
        </ul>
      </div>
    </div>
  `
})
export class ParticlesDebugComponent implements OnInit {
  // Debug state
  isPaused = signal(false);
  private debugData = signal({
    status: 'Running',
    activeCount: 0,
    totalCreated: 0,
    fps: 60,
    nextSpawn: 2.0
  });
  
  // FPS monitoring
  fpsHistory = signal<number[]>([]);
  private fpsCounter = 0;
  private fpsStartTime = 0;
  private animationFrame?: number;
  
  // Computed values
  debugInfo = computed(() => this.debugData());
  
  ngOnInit() {
    this.startFPSMonitoring();
    this.startDebugUpdates();
  }
  
  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  
  togglePause() {
    this.isPaused.update(paused => !paused);
    this.debugData.update(data => ({
      ...data,
      status: this.isPaused() ? 'Paused' : 'Running'
    }));
  }
  
  forceSpawn() {
    // Trigger manual particle spawn
    const event = new CustomEvent('forceSpawn');
    window.dispatchEvent(event);
  }
  
  private startFPSMonitoring() {
    this.fpsStartTime = performance.now();
    
    const measureFPS = () => {
      this.fpsCounter++;
      const currentTime = performance.now();
      const elapsed = currentTime - this.fpsStartTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((this.fpsCounter * 1000) / elapsed);
        
        // Update FPS history
        this.fpsHistory.update(history => {
          const newHistory = [...history, Math.min(fps / 60 * 24, 24)]; // Scale to 24px max
          return newHistory.length > 120 ? newHistory.slice(-120) : newHistory;
        });
        
        // Update debug data
        this.debugData.update(data => ({ ...data, fps }));
        
        // Reset counters
        this.fpsCounter = 0;
        this.fpsStartTime = currentTime;
      }
      
      this.animationFrame = requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
  }
  
  private startDebugUpdates() {
    setInterval(() => {
      // Simulate debug data updates
      const particleElements = document.querySelectorAll('.particle');
      
      this.debugData.update(data => ({
        ...data,
        activeCount: particleElements.length,
        totalCreated: data.totalCreated + (Math.random() > 0.8 ? 1 : 0),
        nextSpawn: Math.max(0, data.nextSpawn - 0.1)
      }));
      
      // Reset next spawn counter
      if (this.debugData().nextSpawn <= 0) {
        this.debugData.update(data => ({ ...data, nextSpawn: 2.0 }));
      }
    }, 100);
  }
}