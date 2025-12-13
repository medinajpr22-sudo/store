import { Component } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-card',
  imports: [ProductCard],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  product: Product[] = [];

  constructor(private productService: ProductService) {
    this.product = this.productService.getProduct();
  }
}
