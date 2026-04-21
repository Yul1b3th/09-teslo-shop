import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Si el signal es null en ese microsegundo, lee del localStorage
  const authService = inject(AuthService);
  const token = authService.token() ?? localStorage.getItem('token');

  if (!token) return next(req);

  // lo ideal es clonar cuando vengan de algun "req.url" en particular,para añadir el token en los lugares respectivos
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
