import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const image = value.at(0); // accede al primer elemento del array si es -1 es acceder al ultimo elemento del array

    if (!image) {
      return './assets/images/no-image.jpg';
    }

    return `${baseUrl}/files/product/${image}`;

    // array > 1 = primer elemento
    // string = string
    // value vacio regresa un placeholder ./assets/images/no-image.jpg
  }
}
