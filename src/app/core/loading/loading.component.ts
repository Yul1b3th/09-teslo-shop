import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-700">Cargando...</p>
        </div>
      </div>
    }
  `,
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
