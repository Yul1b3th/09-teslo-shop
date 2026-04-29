import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsService, ProductCard } from '@products';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.servive';
import { ProductSkeletonComponent } from '@shared';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination, ProductSkeletonComponent],
  templateUrl: './home-page.html',
})
export default class HomePage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  private readonly ITEMS_PER_PAGE = 9;
  // activatedRoute = inject(ActivatedRoute);

  // Tomar la ruta activa de forma dinámica y suscribirnos a los cambios que eso tenga
  // al toSignal lo podemos inicializar con un  valor iniccial
  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map((page) => (isNaN(page) ? 1 : page)),
  //   ),
  //   {
  //     initialValue: 1, // valor inicial mientras se resuelve el observable
  //   },
  // );

  // Para hacer la petición http tan pronto ingrese, nos conectamos a un observable
  // ANTES
  // productsResource = rxResource({
  //   request: () => ({}),
  //   loader: ({ request }) => {
  //     return this.productsService.getProducts();
  //   }
  // })
  // AHORA
  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({ offset: params.page * this.ITEMS_PER_PAGE });
    },
  });
  // productsResource tiene isLoading, isError, etc
  // Con parametros
  //   stream: ({ params }) => {
  //   return this.productsService.getProducts({
  //     limit: 1,
  //     gender: 'women',
  //   }); // Observable<Product[]>
  // },

  getSkeletonCount(): number {
    return this.ITEMS_PER_PAGE;
  }
}
