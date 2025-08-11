import type { Translations } from '../translations.interface';

/**
 * Spanish translations
 * Traducciones en español para el portafolio de Ignacio Navarrete
 */
export const es: Translations = {
  nav: {
    about: 'ACERCA',
    resume: 'CURRÍCULUM',
    projects: 'PROYECTOS',
    articles: 'ARTÍCULOS',
    contact: 'CONTACTO'
  },

  about: {
    greeting: 'Hola, soy',
    name: 'Ignacio',
    description: 'Desarrollador Frontend Senior con más de 8 años de experiencia, especializado en Angular y TypeScript, creando interfaces modernas y escalables para empresas como Procetti y Neoris.',
    viewProjects: 'Ver proyectos',
    letsTalk: 'Hablemos'
  },

  resume: {
    title: 'Experiencia',
    experience: 'Experiencia',
    educationTitle: 'Educación',
    skills: 'Habilidades Técnicas',
    positions: {
      seniorFrontend: 'Desarrollador Sr. Frontend'
    },
    companies: {
      procetti: 'Procetti | Remoto, México',
      neoris: 'Neoris | México',
      nova: 'Nova Solutions Systems | México'
    },
    descriptions: {
      procetti: 'Reorganización de arquitectura, migración Angular 17→19, NgRx Signals/RxJS, lazy loading y optimización de bundles.',
      neoris: 'UI ricas con Angular Material y Tailwind; NgRx y patrones reactivos avanzados.',
      nova: 'Migración Bursanet de AngularJS a Angular 12, modernización y estabilidad.'
    },
    jobs: {
      procetti: {
        timePeriod: 'Ago 2024 - Actualidad',
        title: 'Desarrollador Sr. Frontend',
        descriptions: [
          'Reorganización de arquitectura, migración Angular 17→19, NgRx Signals/RxJS',
          'Lazy loading y optimización de bundles para mejor rendimiento',
          'Implementación de patrones reactivos avanzados'
        ]
      },
      neoris: {
        timePeriod: 'Abr 2022 - Mar 2024',
        title: 'Desarrollador Sr. Frontend',
        descriptions: [
          'UI ricas con Angular Material y Tailwind CSS',
          'NgRx y patrones reactivos avanzados para gestión de estado'
        ]
      },
      nova: {
        timePeriod: 'Nov 2021 - Abr 2022',
        title: 'Desarrollador Sr. Frontend',
        descriptions: [
          'Migración Bursanet de AngularJS a Angular 12',
          'Modernización y estabilización de la aplicación'
        ]
      },
      relappro: {
        timePeriod: 'Jul 2019 - Nov 2021',
        title: 'Desarrollador Full Stack',
        descriptions: [
          'Desarrollo de aplicaciones web con Angular y Node.js'
        ]
      },
      simetrical: {
        timePeriod: 'Ene 2018 - Jul 2019',
        title: 'Desarrollador Backend',
        descriptions: [
          'Desarrollo de APIs REST con Symfony framework',
          'Gestión de bases de datos y arquitectura backend'
        ]
      },
      efisense: {
        timePeriod: 'Mar 2016 - Dic 2017',
        title: 'Desarrollador Web',
        descriptions: [
          'Desarrollo web con PHP y CodeIgniter framework',
          'Implementación de arquitectura MVC y bases de datos MySQL'
        ]
      }
    },
    education: {
      degree1: 'TSU en Multimedia y Comercio Electrónico',
      degree2: 'TSU en Artes Gráficas',
      university: 'Universidad Tecnológica Metropolitana',
      certificate: 'Ver Certificado',
      description1: 'Especialización en multimedia y e-commerce, base del desarrollo web moderno.',
      description2: 'Fundamentos en diseño y comunicación visual aplicados al UI.'
    }
  },

  projects: {
    title: 'Proyectos',
    filters: {
      all: 'Todos',
      web: 'Web Apps',
      mobile: 'Mobile',
      data: 'Data'
    },
    list: [
      {
        title: 'Twilio WhatsApp Assistant',
        description: 'Asistente conversacional integrando Twilio WhatsApp Business API y Google Calendar con arquitectura serverless.',
        category: 'Integración de APIs'
      },
      {
        title: 'Sistema SIGADE - Telcel',
        description: 'Gestión de garantías con Angular y NgRx, optimización de estado y rendimiento.',
        category: 'Sistema Empresarial'
      },
      {
        title: 'AI Analytics Platform',
        description: 'Plataforma de analítica con ML para BI y predicciones.',
        category: 'Data Science'
      }
    ]
  },

  blog: {
    title: 'Artículos',
    readMore: 'Leer más',
    filters: {
      all: 'Todos',
      design: 'Diseño',
      code: 'Desarrollo',
      tech: 'Tecnología'
    },
    categories: {
      design: 'Design',
      development: 'Development', 
      technology: 'Technology'
    },
    articles: [
      {
        title: 'Brand Identity with Code',
        excerpt: 'Representación digital de valores de marca a través de diseño y experiencias interactivas.',
        date: 'Abr 28, 2024'
      },
      {
        title: 'Modern Data Infrastructure',
        excerpt: 'Tendencias en arquitectura de datos, cloud y sistemas distribuidos.',
        date: 'Abr 25, 2024'
      },
      {
        title: 'Advanced React Patterns',
        excerpt: 'Patrones avanzados, hooks y rendimiento para apps escalables.',
        date: 'Abr 22, 2024'
      }
    ]
  },

  contact: {
    title: 'Trabajemos juntos',
    subtitle: '¿Listo para iniciar tu proyecto? Hablemos y creemos algo increíble.',
    location: 'Ubicación',
    email: 'Email',
    workMode: 'Modalidad',
    availability: 'Disponibilidad',
    remote: 'Trabajo Remoto',
    available: 'Disponible para nuevos proyectos',
    socials: 'Redes',
    formTitle: 'Envíame un mensaje',
    firstName: 'Nombre',
    lastName: 'Apellido',
    emailLabel: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar mensaje'
  },

  services: {
    title: 'Servicios',
    frontend: {
      title: 'Desarrollo Frontend',
      description: 'Interfaces modernas y escalables con Angular y TypeScript.'
    },
    architecture: {
      title: 'Arquitectura Escalable',
      description: 'Patrones avanzados y Clean Architecture.'
    },
    optimization: {
      title: 'Optimización',
      description: 'Lazy loading, optimización de bundles y estado eficiente.'
    },
    backend: {
      title: 'Integración Backend',
      description: 'NestJS, Node.js e integración de APIs.'
    }
  },

  profile: {
    location: 'Ubicación',
    experience: 'Experiencia',
    workMode: 'Modalidad',
    locationValue: 'Mérida, Yucatán, México',
    experienceValue: '8+ Años',
    workModeValue: 'Remoto'
  },

  footer: {
    description: 'Frontend Senior especializado en Angular y TypeScript. Disponible para trabajo remoto.',
    links: 'Enlaces',
    services: 'Servicios',
    webDev: 'Desarrollo Web',
    mobileApps: 'Apps Móviles',
    dataScience: 'Data Science',
    consulting: 'Consultoría',
    projectMgmt: 'Gestión de Proyectos',
    copyright: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    cookies: 'Política de Cookies'
  },

  common: {
    downloadCV: 'DESCARGAR CV',
    contactMe: 'CONTÁCTAME',
    hireMe: 'Contrátame'
  }
};