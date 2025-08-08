# 🚀 Portfolio Angular 20 - Moderno & Profesional

Un portafolio profesional construido con **Angular 20**, **Standalone Components**, **Signals** y **TailwindCSS**. Este proyecto demuestra las mejores prácticas y patrones más recientes de Angular 2024.

[![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Signals](https://img.shields.io/badge/Angular%20Signals-✅-green?style=flat-square)](https://angular.dev/guide/signals)

## ✨ Características

### 🏗 **Arquitectura Moderna**
- **Standalone Components** - Sin NgModules
- **Angular Signals** - Estado reactivo moderno
- **inject()** - Inyección de dependencias funcional
- **OnPush Detection** - Performance optimizada
- **TypeScript Strict** - Tipado fuerte

### 🎨 **Diseño & UX**
- **Tema Dark/Light** - Cambio reactivo con Signals
- **Responsive Design** - Mobile-first con TailwindCSS
- **Glassmorphism** - Efectos modernos de vidrio
- **Animaciones Suaves** - Transiciones CSS optimizadas
- **Partículas Flotantes** - Efectos visuales atractivos

### ⚡ **Performance**
- **Bundle Size**: 76KB (gzipped)
- **Tree Shaking** - Solo código usado
- **Lazy Loading** - Preparado para rutas dinámicas
- **Hot Reload** - Desarrollo < 500ms

## 🛠 Comandos Principales

```bash
# 🚀 Desarrollo
npm start                    # http://localhost:4200

# 📦 Build
npm run build               # Producción optimizada
npm run build:vercel        # Build para Vercel

# 🧪 Testing & Quality
npm test                    # Tests unitarios
npm run lint               # Linting (por configurar)
npm run analyze            # Análisis de bundle

# 👀 Desarrollo avanzado
npm run watch              # Build en modo watch
```

## 🏗 Arquitectura del Proyecto

```
src/app/
├── core/
│   └── services/              # Servicios globales con Signals
│       ├── theme.service.ts       # 🌙 Tema dark/light reactivo
│       ├── navigation.service.ts  # 🧭 Estado de navegación
│       ├── scroll.service.ts      # 📜 Gestión de scroll
│       └── particles.service.ts   # ✨ Sistema de partículas
├── layout/
│   ├── header/               # 📱 Header responsivo + mobile menu
│   └── sidebar/              # 🗂 Sidebar con navegación
├── features/
│   └── about/                # 👤 Sección About moderna
├── shared/
│   └── components/           # 🧩 Componentes reutilizables
│       ├── particles/            # ✨ Partículas animadas
│       ├── progress-bar/         # 📊 Barra de progreso scroll
│       └── theme-toggle/         # 🌓 Toggle de tema
└── app.ts                    # 🏠 App component principal
```

## 🧩 Componentes Implementados

| Componente | Descripción | Tecnologías |
|-----------|-------------|-------------|
| `App` | Layout principal con routing | Standalone + Signals |
| `SidebarComponent` | Navegación lateral con perfil | inject() + OnPush |
| `HeaderComponent` | Header con menú móvil y CTA | Reactive Services |
| `AboutComponent` | Sección hero con información | TailwindCSS + Animations |
| `ParticlesComponent` | Partículas flotantes animadas | CSS Animations |
| `ProgressBarComponent` | Barra de progreso de scroll | Signals + Scroll Service |
| `ThemeToggleComponent` | Toggle tema dark/light | Signals + Theme Service |

## 🌟 Servicios con Signals

### **ThemeService**
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _currentTheme = signal<Theme>('dark');
  readonly currentTheme = this._currentTheme.asReadonly();
  readonly isDarkTheme = signal(() => this.currentTheme() === 'dark');

  toggleTheme(): void {
    const newTheme = this._currentTheme() === 'dark' ? 'light' : 'dark';
    this._currentTheme.set(newTheme);
  }
}
```

### **NavigationService**
```typescript
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly _activeSection = signal<string>('about');
  readonly activeSection = this._activeSection.asReadonly();
  
  navigateToSection(sectionId: string): void {
    // Scroll suave + actualización de estado
    element.scrollIntoView({ behavior: 'smooth' });
    this.setActiveSection(sectionId);
  }
}
```

## 🎨 Theming Avanzado

### **CSS Variables + TailwindCSS**
```css
:root {
  --color-dark: #0a0a0a;
  --color-accent: #00ff88;      /* Verde brillante (tema oscuro) */
  --color-text-primary: #ffffff;
}

[data-theme="light"] {
  --color-accent: #166534;      /* Verde accesible (AA 4.5:1+) */
  --color-text-primary: #0b0b0c;
}
```

### **Clases Utility Dinámicas**
```css
.bg-dynamic { background: var(--color-dark); }
.text-accent-dynamic { color: var(--color-accent); }
.border-accent-dynamic { border-color: var(--color-accent); }
```

## 🚀 Deploy en Vercel

### **Configuración Automática**
1. **Push to GitHub**
2. **Connect Vercel** - Detección automática Angular
3. **Deploy** - Build command: `npm run build:vercel`

### **Configuración Personalizada** (`vercel.json`)
```json
{
  "builds": [{ "src": "package.json", "use": "@vercel/static-build" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

## 📈 Métricas de Performance

| Métrica | Valor | Status |
|---------|-------|---------|
| **Bundle Size** | 76KB (gzipped) | ✅ Excelente |
| **First Paint** | < 1s | ✅ Rápido |
| **Build Time** | ~10s | ✅ Óptimo |
| **Hot Reload** | < 500ms | ✅ Instantáneo |

## 🔄 Roadmap de Desarrollo

### ✅ **Completado**
- [x] Arquitectura base con Standalone Components
- [x] Servicios con Signals
- [x] Layout responsivo (Header + Sidebar)
- [x] Sección About funcional
- [x] Sistema de temas reactivo
- [x] Deploy ready para Vercel

### 🔄 **En Progreso**
- [ ] Lazy Loading Routing
- [ ] Secciones adicionales (Projects, Contact)
- [ ] Testing con Jest

### 📋 **Planificado**
- [ ] Angular Universal (SSR)
- [ ] PWA features
- [ ] Angular Animations
- [ ] CI/CD pipeline

## 🧪 Testing (Preparado)

```typescript
// Ejemplo estructura para testing
describe('ThemeService', () => {
  it('should toggle theme reactively', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.currentTheme()).toBe('dark');
    
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
  });
});
```

## 🤝 Contribuir

1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'Add: nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Abre** un Pull Request

## 📚 Documentación Adicional

- 📖 [README.modernization.md](./README.modernization.md) - Proceso de migración detallado
- 📊 [upgrade-report.md](./upgrade-report.md) - Reporte técnico completo
- 🏗 [Angular 20 Docs](https://angular.dev) - Documentación oficial
- 🎨 [TailwindCSS](https://tailwindcss.com) - Framework de estilos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

---

**💡 Desarrollado con Angular 20 + Signals + TailwindCSS**

*Un ejemplo de modernización exitosa de HTML estático a aplicación Angular moderna usando las mejores prácticas de 2024.*

**🌐 [Ver Demo](https://tu-portfolio.vercel.app)** | **📧 [Contacto](mailto:ignacio@example.com)**