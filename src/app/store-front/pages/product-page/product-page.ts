import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  // Para tomar la ruta activa
  activateRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug: string = this.activateRoute.snapshot.params['idSLug'];
  // productIdSlug = this.activateRoute.snapshot.paramMap.get('idSLug') || '';

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProductByIdSlug(params.idSlug);
    },
  });
}
