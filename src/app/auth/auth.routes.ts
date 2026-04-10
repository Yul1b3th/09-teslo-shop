import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page'),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;
