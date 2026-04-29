import { Routes } from '@angular/router';
import { IsAdminGuard } from '@auth/guard/is-admin.guard';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    canMatch: [IsAdminGuard],
    children: [
      {
        path: 'products',
        loadComponent: () => import('./pages/products-admin-page/products-admin-page'),
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-admin-page/product-admin-page'),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default adminDashboardRoutes;
