import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@store-front/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
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
      return this.productsService.getProducts({
        limit: 1,
        gender: 'women',
      }); // Observable<Product[]>
    },
  });
  // productsResource tiene isLoading, isError, etc
}
