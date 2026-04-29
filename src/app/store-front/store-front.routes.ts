import { Routes } from '@angular/router';
import { StoreFrontLayout } from './layouts/store-front-layout';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page'),
      },
      {
        path: 'gender/:gender',
        loadComponent: () => import('./pages/gender-page/gender-page'),
      },
      {
        path: 'product/:idSLug', // el slug es un URL friendly
        loadComponent: () => import('./pages/product-page/product-page'),
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page'),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

export default storeFrontRoutes;
