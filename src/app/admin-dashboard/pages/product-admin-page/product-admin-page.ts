import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductDetails } from './product-details/product-details';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetails],
  templateUrl: './product-admin-page.html',
})
export default class ProductAdminPage {
  activatedRoute = inject(ActivatedRoute); // Tomar la ruta activa
  router = inject(Router); // Hacer una redirección
  productsService = inject(ProductsService); // Servicio para obtener el producto

  // Convertir el observable de los parámetros de la ruta en una señal reactiva
  productId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])));

  productResource = rxResource({
    params: () => ({ id: this.productId() }), // dispara la carga al crear el componente
    stream: ({ params }) => {
      return this.productsService.getProductById(params.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      console.log('Producto no encontrado');
      this.router.navigate(['/admin/products']);
    }
  });
}
