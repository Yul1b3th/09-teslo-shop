import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService);

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
    params: () => ({}), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProducts({}); // Observable<Product[]>
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
