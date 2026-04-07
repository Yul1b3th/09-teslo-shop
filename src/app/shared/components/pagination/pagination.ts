import { Component, computed, input, linkedSignal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {
  pages = input(0);
  currentPage = input<number>(1);

  // linkedSignal nos permite inicializar una Signal
  activePage = linkedSignal(this.currentPage);

  // Arreglo basado en las paginas
  getPagesList: Signal<number[]> = computed(() => {
    // callback para inicializar valores (_, i) => i + 1
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
