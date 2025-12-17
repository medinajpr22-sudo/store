import { Component, Input } from '@angular/core';
import { Product } from '../../core/models/products.model';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../core/services/toast.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() Product!: Product;
  constructor(private cartService: CartService, private toastService: ToastService) {}
  addToCart() {
    this.cartService.addToCart(this.Product);

    this.toastService.show('Producto agregado al carrito', 'success');
  }

  buyByWhatsapp() {
    const phone = '573192575612';
    const message = `Hola 👋 estoy interesado en la zapatilla ${this.Product.nombre}
Precio: ${this.Product.precio} COP`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
