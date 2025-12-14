import { Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct {

  product = computed<Product | undefined>(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return undefined;
    return this.productService.getProductBySlug(slug)();
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
}
