import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ProductTable, ProductsService } from '@products';
import { PaginationService } from '@shared/components/pagination/pagination.servive';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export default class ProductsAdminPage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  router = inject(Router);
  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * params.limit,
        limit: params.limit,
      }); // Observable<Product[]>
    },
  });

  onLimitChange(newLimit: number): void {
    this.productsPerPage.set(newLimit);
    this.router.navigate([], { queryParams: { page: 1 } });
  }
}
