import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';
import { ProductsService } from '@products/services/products.service';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from '@shared/form-error-label/form-error-label';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  // --- Inyecciones de dependencias ---
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  // --- Inputs ---
  public readonly product = input.required<Product>();

  // --- Signals mutables ---
  public wasSaved = signal<boolean>(false);
  public tempImages = signal<string[]>([]);

  // --- Computed signals ---
  public readonly imagesToCarousel = computed(() => {
    const currentProductImages = [...this.product().images, ...this.tempImages()];
    return currentProductImages;
  });

  // --- Form controls ---
  public readonly productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  // --- Propiedades públicas ---
  public readonly sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // --- Propiedades privadas ---
  private imageFileList: FileList | undefined = undefined;

  // ===== Lifecycle hooks ===================================================
  ngOnInit(): void {
    // Limpiar estados locales cuando el componente se inicializa
    // Esto se ejecuta también después del reload en actualizaciones
    this.tempImages.set([]);
    this.imageFileList = undefined;

    this.setFormValue(this.product());
  }

  // ===== Métodos públicos ===================================================
  public onSizeClicked(size: string): void {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  public async onSubmit(): Promise<void> {
    // Validar que el formulario sea válido
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;

    // Preparar el objeto del producto con los datos del formulario
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag: string) => tag.trim()) ?? [],
    };

    try {
      if (this.product().id === 'new') {
        // Crear producto
        // Con await firstValueFrom esperamos a tener el producto,
        // y que ese producto se cree con this.productsService.createProduct(productLike) y se continúa la ejecución
        const product = await firstValueFrom(
          this.productsService.createProduct(productLike, this.imageFileList),
        );

        // Esperamos a la creación del producto para redirigir al usuario al producto recién creado
        this.router.navigate(['/admin/products', product.id]);

        // Limpiar estados locales después de la creación
        this.tempImages.set([]);
        this.imageFileList = undefined;
      } else {
        // Actualizar producto existente
        // Esperamos a que la actualización termine antes de continuar
        await firstValueFrom(
          this.productsService.updateProduct(this.product().id, productLike, this.imageFileList),
        );

        // Recargar el componente para que el input se actualice con las nuevas imágenes
        await this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'preserve',
          onSameUrlNavigation: 'reload',
        });
      }

      // Mostrar mensaje de éxito
      this.wasSaved.set(true);

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.wasSaved.set(false);
      }, 3000);
    } catch (error) {
      // Manejar el error en caso de que falle la creación o actualización
      console.error('Error al guardar el producto:', error);
      // TODO: Mostrar un mensaje de error al usuario
    }
  }

  // Images
  public onFilesChanged(event: Event): void {
    const filesList = (event.target as HTMLInputElement).files;

    this.imageFileList = filesList ?? undefined;

    // Convierte filesList en un array real y por cada archivo genera una URL temporal del navegador.
    // El resultado es un array de URLs guardado en imageUrls.
    const imageUrls = Array.from(filesList ?? []).map((file) => URL.createObjectURL(file));

    this.tempImages.set(imageUrls);
  }

  // ===== Métodos privados ===================================================
  private setFormValue(formLike: Partial<Product>): void {
    // this.productForm.patchValue(formLike as any);
    this.productForm.reset(this.product() as any); // Mejor el reset para que el formulario sea pristine
    this.productForm.patchValue({ tags: formLike.tags?.join(',') }); // Convertir el array de tags a un string separado por comas
  }
}
