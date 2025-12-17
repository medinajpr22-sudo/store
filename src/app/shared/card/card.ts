import { Component, inject } from '@angular/core';


import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-card',
  imports: [ProductCard],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
private productService = inject(ProductService);

  products = this.productService.products;



}
