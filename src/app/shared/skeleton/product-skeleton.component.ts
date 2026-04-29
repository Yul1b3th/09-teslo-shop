import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-skeleton.component.html',
  styles: `
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      animation: shimmer 2s infinite;
    }
  `,
})
export class ProductSkeletonComponent {
  itemCount = input<number>(9); // Usar input signal con valor por defecto

  getSkeletonArray() {
    return Array.from({ length: this.itemCount() }, (_, i) => i);
  }
}
