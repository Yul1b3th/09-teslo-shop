import { Routes } from '@angular/router';

export const routes: Routes = [
  // loadchildren para cargar de manera perezosa la ruta auth.routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    // TODO: Guards para proteger las rutas de autenticación
  },
  {
    path: '',
    // loadchildren para cargar de manera perezosa la ruta store-front.routes
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];
