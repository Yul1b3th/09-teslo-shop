import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  // Es un lugar donde voy a consultar la información
  private productsCache = new Map<string, ProductsResponse>(); // llave: '9-0-'' -> valor: ProductsResponse
  private productCache = new Map<string, Product>(); // llave: 'id-slug' -> valor: Product

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    console.log(this.productsCache.entries());

    const key = `${limit}-${offset}-${gender}`; // 9-0-''

    // Verifico si la respuesta ya está en el cache
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp)), // Guardo la respuesta en el cache
        tap((resp) => console.log(this.productsCache.entries())),
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    // Verifico si el producto ya está en el cache
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap((product) => this.productCache.set(idSlug, product))); // Guardo el producto en el cache
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    // Verifico si el producto ya está en el cache
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product))); // Guardo el producto en el cache
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList,
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    // imageNames es el producto de uploadImages
    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...productLike,
        images: [...currentImages, ...imageNames],
      })),
      tap((product) => console.log(product)),
      switchMap((updatedProduct) =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct),
      ),
      tap((product) => this.updateProductCache(product)),
    );
  }

  createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product) {
    const productId = product.id;
    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((currentProduct) => {
        return currentProduct.id === productId ? product : currentProduct;
      });
    });

    console.log('Caché actualizado');
  }

  // Tome un fileList y lo suba
  // Subir varias imágenes
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    // Estamos creando un array de observables y tareas de carga para esperar después que todas terminen para indicar que siga con el siguiente paso
    const uploadObservables = Array.from(images).map((imageFile) => this.uploadImage(imageFile));

    return forkJoin(uploadObservables).pipe(tap((imageNames) => console.log({ imageNames })));
  }

  // Subir una sola imagen
  uploadImage(imageFile: File): Observable<string> {
    if (!imageFile) return of('');

    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<{ fileName: string }>(`${baseUrl}/files/product`, formData).pipe(
      tap((resp) => console.log(resp)),
      map((resp) => resp.fileName),
      tap((resp) => console.log(resp)),
    );
  }
}
