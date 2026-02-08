import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from '@shared/components/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  // Tomar la ruta activa de forma dinámica y suscribirnos a los cambios que eso tenga
  // al toSignal lo podemos inicializar con un  valor iniccial
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page)),
    ),
    {
      initialValue: 1, // valor inicial mientras se resuelve el observable
    },
  );

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
    params: () => ({ page: this.currentPage() - 1 }), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProducts({ offset: params.page * 9 }); // Observable<Product[]>
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
}
