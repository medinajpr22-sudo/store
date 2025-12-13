import { ProductCardService } from './../../services/product-card.service';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/products.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() Product!:Product;
  constructor(private ProductCardService: ProductCardService){} 
  addToCart() {
    this.ProductCardService.addToCart(this.Product);
    alert('Producto agregado al carrito');
  }

}

 