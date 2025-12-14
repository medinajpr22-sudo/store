import { Component, Input } from '@angular/core';
import { Product } from '../../models/products.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() Product!: Product;
  constructor(private cartService: CartService) {}
  addToCart() {
    this.cartService.addToCart(this.Product);
    alert('Producto agregado al carrito');
  }
}
