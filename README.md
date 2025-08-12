# 🎭 Portfolio Angular 20 - Ignacio Navarrete

**Portafolio personal profesional de Ignacio Navarrete** - Frontend Developer Senior especializado en Angular y TypeScript. Migrado exitosamente desde HTML estático a **Angular 20** con **Standalone Components**, **Signals**, **Sistema de Internacionalización** y **TailwindCSS**.

## 🌐 Ver en Vivo

**🚀 [Ver Portfolio en Vivo](https://portfolio-angular-rosy-seven.vercel.app/)**

[![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Signals](https://img.shields.io/badge/Angular%20Signals-✅-green?style=flat-square)](https://angular.dev/guide/signals)
[![i18n](https://img.shields.io/badge/i18n-ES%2FEN-orange?style=flat-square)](https://angular.dev/guide/i18n)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

## ✨ Características

### 🏗 **Arquitectura Moderna**
- **Standalone Components** - Sin NgModules, arquitectura moderna
- **Angular Signals** - Estado reactivo con change detection optimizada
- **inject()** - Inyección de dependencias funcional
- **OnPush Detection** - Performance optimizada
- **TypeScript Strict** - Tipado fuerte y seguro

### 🌍 **Internacionalización**
- **Sistema Bilingüe ES/EN** - Cambio dinámico entre idiomas
- **Detección Automática** - Idioma del navegador como preferencia inicial
- **Persistencia LocalStorage** - Mantiene preferencia del usuario
- **Traducciones Reactivas** - Powered by Angular Signals
- **Interfaz Completamente Traducida** - Navigation, contenido y formularios

### 🎨 **Diseño & UX**
- **Tema Dark/Light** - Cambio reactivo con Signals
- **Responsive Design** - Mobile-first con TailwindCSS  
- **Glassmorphism** - Efectos modernos de vidrio
- **Animaciones Suaves** - Transiciones CSS optimizadas
- **Typing Animation** - Efecto de escritura dinámico
- **Scroll Progress** - Barra de progreso visual
- **Smooth Scrolling** - Navegación fluida entre secciones

### ⚡ **Performance**
- **Bundle Size**: ~90KB (gzipped) 
- **Tree Shaking** - Solo código usado
- **OnPush Strategy** - Detección de cambios optimizada
- **Hot Reload** - Desarrollo instantáneo
- **Intersection Observer** - Animaciones de scroll optimizadas

### 📱 **Secciones Implementadas**
- **About** - Información personal con datos reales
- **Resume** - Experiencia laboral real (Procetti, Neoris, Nova Solutions)
- **Projects** - Proyectos reales con filtros dinámicos
- **Blog** - Artículos categorizados
- **Contact** - Formulario reactivo con EmailJS integrado
- **Skills** - Barras de progreso animadas con tecnologías reales

## 👨‍💻 **Información Personal Integrada**

### **Datos Profesionales Reales**
- **Nombre:** Ignacio Navarrete Dzul
- **Email:** ignacionavarretedev@gmail.com
- **Ubicación:** Mérida, Yucatán, México
- **Experiencia:** 3+ años como Frontend Developer Senior
- **CV Descargable:** PDF integrado con datos reales

### **Experiencia Laboral Actualizada**
1. **Procetti** (Ago 2024 - Actualidad) - Desarrollador Sr. Frontend
   - Migración Angular 17→19, NgRx Signals, optimización bundles
2. **Neoris** (Abr 2022 - Mar 2024) - Desarrollador Sr. Frontend  
   - Angular Material, Tailwind CSS, NgRx, patrones reactivos
3. **Nova Solutions Systems** (Nov 2021 - Abr 2022) - Desarrollador Sr. Frontend
   - Migración AngularJS a Angular 12, modernización Bursanet

### **Proyectos Destacados Reales**
- **Twilio WhatsApp Assistant** - Integración NestJS + Twilio API + Google Calendar
- **Sistema SIGADE - Telcel** - Gestión de garantías con Angular + NgRx

### **Redes Sociales Integradas**
- **LinkedIn:** https://www.linkedin.com/in/ignacionavarrete-front-end-developer-angular/
- **GitHub:** https://github.com/nachoritos01
- **X (Twitter):** https://x.com/ignacionavarrete
- **Instagram:** https://instagram.com/ignacionavarrete

## 🛠 Comandos Principales

```bash
# 🚀 Desarrollo
npm start                    # Servidor local: http://localhost:4200

# 📦 Build
npm run build               # Build de producción optimizado

# 🧪 Testing & Quality  
npm test                    # Tests unitarios con Karma/Jasmine
npm run lint               # ESLint + Prettier

# 📊 GitHub Stats API (servidor adicional)
cd server                   # Cambiar al directorio del servidor
npm install                 # Instalar dependencias Node.js
npm start                   # Iniciar servidor: http://localhost:3000
npm run dev                 # Desarrollo con nodemon

# 🔍 Información
npm run ng version          # Versión de Angular CLI
```

## 🏗 Arquitectura del Proyecto

```
src/app/
├── components/               # 🧩 Componentes principales
│   ├── resume.component.ts      # 📄 Experiencia y educación con datos reales
│   ├── projects.component.ts    # 💼 Proyectos reales con filtros
│   ├── blog.component.ts        # 📝 Artículos y categorías
│   ├── contact.component.ts     # 📧 Formulario con EmailJS integrado
│   ├── sidebar.component.ts     # 🧭 Sidebar configurable (fijo/relativo)
│   ├── footer.component.ts      # 🦶 Footer con año dinámico
│   └── language-toggle.component.ts # 🌍 Selector de idioma ES/EN
├── services/
│   ├── portfolio.service.ts     # 🎛 Estado global con Signals
│   ├── translation.service.ts   # 🌐 Sistema de internacionalización
│   ├── personal-info.service.ts # 👤 Información personal centralizada
│   └── email.service.ts         # 📧 EmailJS para formulario de contacto
├── interfaces/
│   └── personal-info.interface.ts # 🏷 Tipado para información personal
├── pages/                    # 📄 Páginas legales
│   ├── privacy.component.ts     # 🔒 Política de privacidad
│   ├── terms.component.ts       # 📋 Términos y condiciones
│   ├── cookies.component.ts     # 🍪 Política de cookies
│   └── not-found.component.ts   # ❌ Página 404 con efectos
├── app.ts                   # 🏠 Componente principal
├── app.html                 # 📄 Template principal (réplica exacta HTML)
└── styles.css              # 🎨 Estilos globales (CSS original preservado)

server/                      # 📊 GitHub Stats API
├── app.js                   # 🚀 Express.js + GitHub API
├── package.json             # 📦 Dependencias Node.js
├── README.md                # 📖 Documentación API
└── public/
    └── portfolio.html       # 📈 Frontend Chart.js
```

## 🧩 Componentes Implementados

| Componente | Descripción | Tecnologías |
|-----------|-------------|-------------|
| `App` | Layout principal con sidebar, navegación e i18n | Standalone + Signals + OnPush |
| `SidebarComponent` | Navegación lateral configurable (fijo/relativo) | Signals + Input Properties + Z-index |
| `FooterComponent` | Footer con año dinámico y navegación | PersonalInfoService + RouterModule |
| `ContactComponent` | Formulario funcional con EmailJS | ReactiveFormsModule + EmailJS |
| `PersonalInfoService` | Información centralizada con año dinámico | Signals + Computed + Interface |
| `EmailService` | Integración EmailJS para formulario | Gmail API + Axios + Cache |
| `LanguageToggleComponent` | Selector bilingüe ES/EN | Signals + LocalStorage |
| `ResumeComponent` | Experiencia laboral real y skills | Signals + Intersection Observer |
| `ProjectsComponent` | Proyectos reales con filtros dinámicos | Computed Signals + CommonModule |
| `BlogComponent` | Artículos categorizados | Signals + Filtros reactivos |

## 📧 Sistema de Contacto con EmailJS

### **Formulario Funcional Integrado**
- ✅ **EmailJS Integration** - Envío real de emails a través de Gmail
- ✅ **Validación Reactiva** - Angular ReactiveFormsModule con validadores
- ✅ **Notificaciones UX** - Feedback visual de éxito/error
- ✅ **Información Centralizada** - PersonalInfoService como single source of truth
- ✅ **Configuración Segura** - Keys públicas en frontend, sin backend requerido

### **GitHub Stats API (Node.js)**
```typescript
// Aplicación completa Node.js + Chart.js
server/
├── app.js                   # Express API con GitHub integration
├── public/portfolio.html    # Frontend con Chart.js
└── README.md               # Documentación completa

// Características principales:
- 📊 Visualización de commits mensuales con Chart.js
- 🔄 Cache automático (10 minutos) para performance
- 📄 Paginación para repositorios grandes
- 🔑 Soporte para tokens GitHub (evita rate limits)
- 💾 Descarga de datos en JSON
- 📱 Responsive design acorde al portafolio
```

### **PersonalInfoService - Centralización de Datos**
```typescript
@Injectable({ providedIn: 'root' })
export class PersonalInfoService {
  private personalInfo = signal<PersonalInfo>({
    name: 'Ignacio Navarrete Dzul',
    shortName: 'Ignacio',
    title: 'Desarrollador Sr. Frontend | Especialista en Angular',
    email: 'ignacio_navarrete_dzul@outlook.com',
    location: 'Mérida, Yucatán, México',
    cvFileName: 'Ignacio_Navarrete_Dzul_CV',
    // ... más datos centralizados
  });

  // Computed signals para fácil acceso
  currentYear = computed(() => new Date().getFullYear());
  
  // Elimina texto hardcodeado en toda la app
  info = computed(() => this.personalInfo());
}
```

### **Sidebar Configurable**
```typescript
// Input property para controlar comportamiento
@Input() isFixed: boolean = true;

getSidebarClasses(): string {
  if (this.isFixed) {
    // Modo fijo: siempre visible en desktop
    return 'fixed -translate-x-full lg:translate-x-0 z-50';
  } else {
    // Modo relativo: comportamiento original
    return 'fixed lg:relative z-50';
  }
}
```

## 🌍 Sistema de Internacionalización

### **TranslationService - i18n con Signals**
```typescript
@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLanguage = signal<'es' | 'en'>('es');
  
  get t(): Translations {
    return this.translations[this.currentLanguage()];
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.currentLanguage.set(newLang);
  }

  initializeLanguage(): void {
    // 1. Check localStorage preference
    // 2. Detect browser language
    // 3. Default to detected language
  }
}
```

### **Características del Sistema i18n**
- ✅ **Traducciones Completas**: Navigation, About, Resume, Projects, Contact
- ✅ **Detección Automática**: Idioma del navegador como preferencia inicial
- ✅ **Persistencia**: Mantiene selección en localStorage
- ✅ **Reactividad**: Cambios instantáneos con Angular Signals
- ✅ **Selector Visual**: Toggle ES/EN en sidebar con animaciones

## 🌟 PortfolioService - Estado Centralizado

### **Funcionalidades con Signals**
```typescript
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // 🌓 Gestión de temas
  currentTheme = signal<'dark' | 'light'>('dark');
  
  // 📱 Estado del menú móvil
  isMobileMenuOpen = signal(false);
  
  // 📊 Progreso de scroll
  scrollProgress = signal(0);
  
  // 🧭 Sección activa
  activeSection = signal<string>('about');
  
  // ⌨️ Animación de escritura
  typingText = signal('Frontend Developer');

  // 🎛 Métodos de control
  toggleTheme() { /* Cambio reactivo de tema */ }
  navigateToSection(id: string) { /* Scroll suave + estado */ }
  toggleMobileMenu() { /* Control menú móvil */ }
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
3. **Deploy** - Build command: `npm run build`

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
| **Bundle Size** | ~90KB (gzipped) | ✅ Excelente |
| **First Paint** | < 1s | ✅ Rápido |
| **Build Time** | ~10s | ✅ Óptimo |
| **Hot Reload** | < 500ms | ✅ Instantáneo |
| **Lighthouse** | Performance A+ | ✅ Excelente |

## 🔄 Roadmap de Desarrollo

### ✅ **Completado**
- [x] Migración completa desde HTML estático
- [x] Arquitectura Angular 20 con Standalone Components
- [x] Estado centralizado con Signals
- [x] **Sistema de internacionalización ES/EN completo**
- [x] **Integración de datos personales reales del CV**
- [x] **CV descargable con datos reales**
- [x] **Redes sociales y enlaces reales integrados**
- [x] Layout responsivo con sidebar y navegación
- [x] Todas las secciones implementadas con datos reales
- [x] Sistema de temas dark/light reactivo
- [x] **Formulario de contacto funcional con EmailJS**
- [x] **GitHub Stats API con Node.js + Chart.js**
- [x] **PersonalInfoService centralizado con año dinámico**
- [x] **Sidebar configurable (fijo/relativo) con z-index optimizado**
- [x] Animaciones y transiciones CSS
- [x] Build optimizado para producción
- [x] Ready para deploy en Vercel
- [x] **Arquitectura componentizada** con componentes reutilizables
- [x] **Sidebar y Footer** extraídos como componentes autónomos

### 🎯 **Roadmap Detallado de Mejoras**

#### **Fase 1: Optimizaciones de Performance** (Próxima)
**Prioridad: Alta** | **Tiempo estimado: 2-3 semanas**

- [ ] Implementar lazy loading para componentes grandes (Resume, Projects, Blog)
- [ ] Agregar virtual scrolling para listas largas de proyectos/artículos
- [ ] Optimizar bundle size con tree shaking mejorado
- [ ] Implementar preloading strategies para rutas
- [ ] Configurar OnPush ChangeDetection en componentes faltantes

**Beneficios**: Mejora significativa en tiempo de carga y performance general

#### **Fase 2: Mejoras de Funcionalidad**
**Prioridad: Alta** | **Tiempo estimado: 3-4 semanas**

- [ ] Agregar filtros dinámicos desde archivos de traducción
- [ ] Implementar búsqueda en proyectos y artículos
- [ ] Crear servicio de analytics para tracking de navegación
- [ ] Agregar paginación para proyectos y blog
- [ ] Implementar sistema de favoritos/bookmarks

**Beneficios**: Mejor experiencia de usuario y funcionalidad más rica

#### **Fase 3: Experiencia de Usuario**
**Prioridad: Media** | **Tiempo estimado: 2-3 semanas**

- [ ] Mejorar animaciones con Angular Animations API
- [ ] Implementar temas múltiples (dark/light/auto/custom)
- [ ] Agregar keyboard navigation para accesibilidad
- [ ] Implementar scroll to top button
- [ ] Crear breadcrumbs para navegación
- [ ] Agregar loading skeletons

**Beneficios**: UX más pulida y accesibilidad mejorada

#### **Fase 4: Arquitectura Avanzada**
**Prioridad: Media** | **Tiempo estimado: 4-5 semanas**

- [ ] Crear feature modules (about, resume, projects, blog, contact)
- [ ] Implementar estado global con NgRx Signals
- [ ] Crear interceptors para manejo de errores HTTP
- [ ] Agregar guards para navegación y autenticación
- [ ] Implementar patrón Repository para datos

**Beneficios**: Código más mantenible y escalable

#### **Fase 5: Contenido Dinámico**
**Prioridad: Media** | **Tiempo estimado: 3-4 semanas**

- [ ] Conectar API real para proyectos y artículos del blog
- [ ] Implementar CMS headless (Strapi/Contentful)
- [ ] Agregar sistema de comentarios en blog
- [ ] Crear dashboard admin para gestión de contenido
- [ ] Implementar sistema de tags y categorías

**Beneficios**: Gestión de contenido más eficiente y dinámica

#### **Fase 6: SEO y Rendimiento Web**
**Prioridad: Alta para producción** | **Tiempo estimado: 2-3 semanas**

- [ ] Implementar SSR con Angular Universal
- [ ] Agregar meta tags dinámicos por sección
- [ ] Optimizar imágenes con lazy loading y WebP
- [ ] Implementar structured data (JSON-LD)
- [ ] Configurar sitemap.xml dinámico
- [ ] Agregar robots.txt optimizado

**Beneficios**: Mejor posicionamiento en buscadores y métricas Core Web Vitals

#### **Fase 7: Testing y Calidad**
**Prioridad: Alta** | **Tiempo estimado: 3-4 semanas**

- [ ] Agregar tests unitarios para componentes críticos (80%+ cobertura)
- [ ] Implementar tests e2e con Cypress o Playwright
- [ ] Configurar ESLint rules más estrictas
- [ ] Agregar pre-commit hooks con Husky
- [ ] Implementar tests de accesibilidad automatizados
- [ ] Configurar CI/CD con GitHub Actions

**Beneficios**: Mayor confiabilidad y mantenibilidad del código

#### **Fase 8: PWA y Experiencia Mobile**
**Prioridad: Media** | **Tiempo estimado: 2-3 semanas**

- [ ] Configurar PWA con manifest y service worker
- [ ] Implementar modo offline con cache strategies
- [ ] Optimizar gestos y interacciones táctiles
- [ ] Agregar push notifications para nuevos artículos
- [ ] Implementar app install prompt
- [ ] Optimizar para diferentes densidades de pantalla

**Beneficios**: Experiencia nativa en móviles y funcionalidad offline

### 🎯 **Objetivos por Trimestre**

#### **Q1 2025**: Fundación Sólida
- ✅ Arquitectura componentizada completada
- 🎯 Performance optimizada (Fases 1-2)
- 🎯 Testing básico implementado

#### **Q2 2025**: Experiencia Premium
- 🎯 UX/UI avanzada (Fase 3)
- 🎯 SEO y SSR implementado (Fase 6)
- 🎯 Contenido dinámico (Fase 5)

#### **Q3 2025**: Escalabilidad
- 🎯 Arquitectura enterprise (Fase 4)
- 🎯 PWA completa (Fase 8)
- 🎯 Testing completo (Fase 7)

### 📈 **Métricas de Éxito**

#### Performance
- **Core Web Vitals**: > 90 puntos en Lighthouse
- **Bundle Size**: < 500kb inicial
- **Time to Interactive**: < 3 segundos

#### Funcionalidad
- **Test Coverage**: > 80%
- **Accessibility Score**: > 95
- **SEO Score**: > 95

#### Experiencia
- **Mobile Usability**: 100%
- **PWA Score**: > 90
- **User Engagement**: Métricas de analytics

### 🚦 **Estado Actual del Proyecto**

```
🟢 Completado    🟡 En progreso    🔴 Pendiente

🟢 Arquitectura base
🟢 Componentes reutilizables  
🟢 Sistema de traducciones
🟢 Diseño responsive
🟢 Sidebar y Footer componentizados
🟡 Optimizaciones de performance
🔴 Testing automatizado
🔴 PWA implementation
🔴 SSR/SEO optimization
```

### 🤝 **Contribuciones**

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### 📝 **Convenciones de Commit**

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `refactor:` Refactorización de código
- `perf:` Mejoras de performance
- `test:` Adición o modificación de tests
- `docs:` Cambios en documentación

## 🧪 Testing (Preparado)

```typescript
// Ejemplo estructura para testing
describe('TranslationService', () => {
  it('should toggle language reactively', () => {
    const service = TestBed.inject(TranslationService);
    expect(service.currentLanguage()).toBe('es');
    
    service.toggleLanguage();
    expect(service.currentLanguage()).toBe('en');
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

- 🏗 [Angular 20 Docs](https://angular.dev) - Documentación oficial
- 🎨 [TailwindCSS](https://tailwindcss.com) - Framework de estilos
- 🌍 [Angular i18n](https://angular.dev/guide/i18n) - Internacionalización
- ⚡ [Angular Signals](https://angular.dev/guide/signals) - Estado reactivo

---

## 🎭 **Portfolio de Ignacio Navarrete**

**Frontend Developer Senior** especializado en Angular y TypeScript

- 🏢 **Experiencia:** 8+ años desarrollando interfaces modernas
- 🛠 **Especialización:** Angular, TypeScript, NgRx, RxJS, JavaScript, Node.js, MySQL
- 📍 **Ubicación:** Mérida, Yucatán, México  
- 💼 **Modalidad:** Trabajo remoto
- 🌟 **Estado:** Disponible para nuevos proyectos

### **Migración Exitosa HTML → Angular 20 + i18n**
*Este proyecto es una demostración práctica de migración moderna desde HTML estático a Angular 20 con sistema de internacionalización completo, que implementan las mejores prácticas de desarrollo 2025.*

**🔗 Tecnologías utilizadas:**
- Angular 20 + Standalone Components
- Signals para estado reactivo  
- Sistema de internacionalización ES/EN
- TailwindCSS 3.4 + CSS Variables
- TypeScript estricto + OnPush
- Formularios reactivos + Validación
- CV descargable integrado

**📧 Contacto profesional:** [ignacionavarretedev@gmail.com](mailto:ignacionavarretedev@gmail.com)

**🔗 Enlaces profesionales:**
- [LinkedIn](https://www.linkedin.com/in/ignacionavarrete-front-end-developer-angular/)
- [GitHub](https://github.com/nachoritos01)