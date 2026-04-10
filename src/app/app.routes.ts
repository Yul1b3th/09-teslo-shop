import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '@auth/guard/not-authenticated.guard';

export const routes: Routes = [
  // loadchildren para cargar de manera perezosa la ruta auth.routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      NotAuthenticatedGuard,
      // () => {
      //   return false; // si retorna false la ruta no se carga, debe retornar true, o null o undefined para que se cargue la ruta
      //   // console.log('Guard global');
      // },
    ],
  },
  {
    path: '',
    // loadchildren para cargar de manera perezosa la ruta store-front.routes
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];
