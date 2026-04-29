import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export default class LoginPage {
  fb: FormBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);

  // Crear el formulario reactivo con FormBuilder
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Método para manejar el submit del formulario
  onSubmit() {
    if (this.isPosting()) return; // ⛔ evita doble submit

    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 3000); // Ocultar el error después de 3 segundos
      return;
    }

    this.isPosting.set(true); // 🔄 empieza loading

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      this.isPosting.set(false); // ✅ siempre apagar loading

      if (isAuthenticated) {
        // Redirigir a la página principal o dashboard después del login exitoso
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 3000); // Ocultar el error después de 3 segundos
    });
  }
}
