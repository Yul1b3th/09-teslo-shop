import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // por defevto checking porrque no sabemos si el usuario esta autenticado o no,
  // sabremos si esta autenticacdo o no si el token que este en la sesión, en la cookie, en localstorage es válido, es un proceso asíncrono que no es instateno
  private _authStatus = signal<AuthStatus>('checking');
  // al inicio cuando el servicio se inicialice va a ser null porque no tenemos a ese usuario, es algo que es temporal o esta en memoria
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    // Quin va a determinar si estoy autenticado o no Si tengo un usuario
    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());

  token = computed<string | null>(() => this._token());
}
