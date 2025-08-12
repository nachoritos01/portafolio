import { Routes } from '@angular/router';

export const routes: Routes = [
  // Legal pages
  { 
    path: 'privacy', 
    loadComponent: () => import('./pages/privacy.component').then(m => m.PrivacyComponent)
  },
  { 
    path: 'terms', 
    loadComponent: () => import('./pages/terms.component').then(m => m.TermsComponent)
  },
  { 
    path: 'cookies', 
    loadComponent: () => import('./pages/cookies.component').then(m => m.CookiesComponent)
  },
  
  // Main portfolio route (single page app) - after legal pages
  { 
    path: '', 
    loadComponent: () => import('./app').then(m => m.App)
  },
  
  // 404 Not Found - must be last (wildcard route)
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found.component').then(m => m.NotFoundComponent)
  }
];
