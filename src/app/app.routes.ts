import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // loadchildren para cargar de manera perezosa la ruta store-front.routes
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];
