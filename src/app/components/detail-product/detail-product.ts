import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.product = this.productService.getProductById(id);
      }
    });
  }
}
