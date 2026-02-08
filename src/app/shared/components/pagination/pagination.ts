import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  getPagesList = computed(() => {
    // callback para inicializar valores (_, i) => i + 1
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
