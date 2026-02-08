import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    params: () => ({ gender: this.gender() }), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProducts({ gender: params.gender }); // Observable<Product[]>
    },
  });
}
