import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService, ProductCard } from '@products';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.servive';
import { ProductSkeletonComponent } from '@shared';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination, ProductSkeletonComponent],
  templateUrl: './gender-page.html',
})
export default class GenderPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  private readonly ITEMS_PER_PAGE = 9;

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, gender: this.gender() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * this.ITEMS_PER_PAGE,
        gender: params.gender,
      });
    },
  });

  getSkeletonCount(): number {
    return this.ITEMS_PER_PAGE;
  }
}
