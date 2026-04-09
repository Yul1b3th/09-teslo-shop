import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export default class RegisterPage {
  fb: FormBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);

  // Crear el formulario reactivo con FormBuilder
  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required]],
  });

  // Método para manejar el submit del formulario
  onSubmit() {
    if (this.isPosting()) return; // ⛔ evita doble submit

    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 3000); // Ocultar el error después de 3 segundos
      return;
    }

    this.isPosting.set(true); // 🔄 empieza loading

    const { email, password, fullName } = this.registerForm.getRawValue();

    this.authService.register(email, password, fullName).subscribe((isAuthenticated) => {
      this.isPosting.set(false); // ✅ siempre apagar loading

      if (isAuthenticated) {
        // Redirigir a la página principal o dashboard después del registro exitoso
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 3000);
    });
  }
}
