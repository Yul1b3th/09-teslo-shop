import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import type { AuthResponse, User } from '@auth';
import { environment } from '@env/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  // por defevto checking porrque no sabemos si el usuario esta autenticado o no,
  // sabremos si esta autenticacdo o no si el token que este en la sesión, en la cookie, en localstorage es válido, es un proceso asíncrono que no es instateno
  private _authStatus = signal<AuthStatus>('checking');
  // al inicio cuando el servicio se inicialice va a ser null porque no tenemos a ese usuario, es algo que es temporal o esta en memoria
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    // Quin va a determinar si estoy autenticado o no Si tengo un usuario
    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  token = computed<string | null>(() => this._token());

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        // delay(3000), // TODO Eliminar en Producción
        map((resp) => {
          const result = this.handleAuthSuccess(resp);
          // console.log('Valor del map en login:', result);
          return result;
        }),
        catchError((Error: any) => this.handleAuthError(Error)),
      );
  }

  register(email: string, password: string, fullName: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        email,
        password,
        fullName,
      })
      .pipe(
        // delay(3000), // TODO Eliminar en Producción
        map((resp) => {
          const result = this.handleAuthSuccess(resp);
          // console.log('Valor del map en register:', result);
          return result;
        }),
        catchError((Error: any) => this.handleAuthError(Error)),
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    // Si ya sabemos el estado, no llamamos al backend
    if (this._authStatus() !== 'checking') {
      return of(this._authStatus() === 'authenticated');
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((Error: any) => this.handleAuthError(Error)),
    );
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse): boolean {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any): Observable<boolean> {
    console.log(error);
    this.logout();
    return of(false);
  }
}
