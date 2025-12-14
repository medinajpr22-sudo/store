import { Component, inject } from '@angular/core';


import { ProductService } from '../../services/product.service';
import { ProductCard } from "../../components/product-card/product-card";

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
