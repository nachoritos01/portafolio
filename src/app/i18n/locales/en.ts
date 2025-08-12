import type { Translations } from '../translations.interface';

/**
 * English translations
 * Traducciones en inglés para el portafolio de Ignacio Navarrete
 */
export const en: Translations = {
  nav: {
    about: 'ABOUT',
    resume: 'RESUME',
    projects: 'PROJECTS',
    articles: 'ARTICLES',
    contact: 'CONTACT'
  },

  about: {
    greeting: 'Hello, I\'m',
    name: 'Ignacio',
    description: 'Senior Frontend Developer with over 8 years of experience, specialized in Angular and TypeScript, creating modern and scalable interfaces for companies like Procetti and Neoris.',
    viewProjects: 'View projects',
    letsTalk: 'Let\'s talk'
  },

  resume: {
    title: 'Experience',
    experience: 'Experience',
    educationTitle: 'Education',
    skills: 'Technical Skills',
    positions: {
      seniorFrontend: 'Sr. Frontend Developer'
    },
    companies: {
      procetti: 'Procetti | Remote, Mexico',
      neoris: 'Neoris | Mexico',
      nova: 'Nova Solutions Systems | Mexico'
    },
    descriptions: {
      procetti: 'Architecture reorganization, Angular 17→19 migration, NgRx Signals/RxJS, lazy loading and bundle optimization.',
      neoris: 'Rich UI with Angular Material and Tailwind; NgRx and advanced reactive patterns.',
      nova: 'Bursanet migration from AngularJS to Angular 12, modernization and stability.'
    },
    jobs: {
      procetti: {
        timePeriod: 'Aug 2024 - Present',
        title: 'Sr. Frontend Developer',
        descriptions: [
          'Architecture reorganization, Angular 17→19 migration, NgRx Signals/RxJS',
          'Lazy loading and bundle optimization for better performance',
          'Implementation of advanced reactive patterns'
        ]
      },
      neoris: {
        timePeriod: 'Apr 2022 - Mar 2024',
        title: 'Sr. Frontend Developer',
        descriptions: [
          'Rich UI with Angular Material and Tailwind CSS',
          'NgRx and advanced reactive patterns for state management'
        ]
      },
      nova: {
        timePeriod: 'Nov 2021 - Apr 2022',
        title: 'Sr. Frontend Developer',
        descriptions: [
          'Bursanet migration from AngularJS to Angular 12',
          'Modernization and application stabilization'
        ]
      },
      relappro: {
        timePeriod: 'Jul 2019 - Nov 2021',
        title: 'Full Stack Developer',
        descriptions: [
          'Web application development with Angular and Node.js'
        ]
      },
      simetrical: {
        timePeriod: 'Jan 2018 - Jul 2019',
        title: 'Backend Developer',
        descriptions: [
          'REST API development with Symfony framework',
          'Database management and backend architecture'
        ]
      },
      efisense: {
        timePeriod: 'Mar 2016 - Dec 2017',
        title: 'Web Developer',
        descriptions: [
          'Web development with PHP and CodeIgniter framework',
          'MVC architecture implementation and MySQL databases'
        ]
      }
    },
    education: {
      degree1: 'Associate Degree in Multimedia and E-Commerce',
      degree2: 'Associate Degree in Graphic Arts',
      university: 'Universidad Tecnológica Metropolitana',
      certificate: 'View Certificate',
      description1: 'Specialization in multimedia and e-commerce, foundation of modern web development.',
      description2: 'Fundamentals in design and visual communication applied to UI.'
    }
  },

  projects: {
    title: 'Projects',
    filters: {
      all: 'All',
      web: 'Web Apps',
      mobile: 'Mobile',
      data: 'Data'
    },
    list: [
      {
        title: 'Twilio WhatsApp Assistant',
        description: 'Conversational assistant integrating Twilio WhatsApp Business API and Google Calendar with serverless architecture.',
        category: 'API Integration'
      },
      {
        title: 'SIGADE System - Telcel',
        description: 'Warranty management with Angular and NgRx, state optimization and performance.',
        category: 'Enterprise System'
      },
      {
        title: 'AI Analytics Platform',
        description: 'Analytics platform with ML for BI and predictions.',
        category: 'Data Science'
      }
    ]
  },

  blog: {
    title: 'Articles',
    readMore: 'Read more',
    filters: {
      all: 'All',
      design: 'Design',
      code: 'Development',
      tech: 'Technology'
    },
    categories: {
      design: 'Design',
      development: 'Development',
      technology: 'Technology'
    },
    articles: [
      {
        title: 'Brand Identity with Code',
        excerpt: 'Digital representation of brand values through design and interactive experiences.',
        date: 'Apr 28, 2024'
      },
      {
        title: 'Modern Data Infrastructure',
        excerpt: 'Trends in data architecture, cloud and distributed systems.',
        date: 'Apr 25, 2024'
      },
      {
        title: 'Advanced React Patterns',
        excerpt: 'Advanced patterns, hooks and performance for scalable apps.',
        date: 'Apr 22, 2024'
      }
    ]
  },

  contact: {
    title: 'Let\'s work together',
    subtitle: 'Ready to start your project? Let\'s talk and create something amazing.',
    location: 'Location',
    email: 'Email',
    workMode: 'Work Mode',
    availability: 'Availability',
    remote: 'Remote Work',
    available: 'Available for new projects',
    socials: 'Socials',
    formTitle: 'Send me a message',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailLabel: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message'
  },

  services: {
    title: 'Services',
    frontend: {
      title: 'Frontend Development',
      description: 'Modern and scalable interfaces with Angular and TypeScript.'
    },
    architecture: {
      title: 'Scalable Architecture',
      description: 'Advanced patterns and Clean Architecture.'
    },
    optimization: {
      title: 'Optimization',
      description: 'Lazy loading, bundle optimization and efficient state management.'
    },
    backend: {
      title: 'Backend Integration',
      description: 'NestJS, Node.js and API integration.'
    }
  },

  profile: {
    location: 'Location',
    experience: 'Experience',
    workMode: 'Work Mode',
    locationValue: 'Mérida, Yucatán, México',
    experienceValue: '8+ Years',
    workModeValue: 'Remote'
  },

  footer: {
    description: 'Senior Frontend specialized in Angular and TypeScript. Available for remote work.',
    links: 'Links',
    services: 'Services',
    webDev: 'Web Development',
    mobileApps: 'Mobile Apps',
    dataScience: 'Data Science',
    consulting: 'Consulting',
    projectMgmt: 'Project Management',
    copyright: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    quickLinks: 'Quick Links',
    about: 'About',
    resume: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    legal: 'Legal',
    madeWith: 'Made with'
  },

  common: {
    downloadCV: 'DOWNLOAD CV',
    contactMe: 'CONTACT ME',
    hireMe: 'Hire me'
  }
};