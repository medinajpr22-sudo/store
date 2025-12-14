import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

import { Subscription } from 'rxjs';
import { Product } from '../../models/products.model';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Trash2, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule], // Añadí RouterModule para routerLink
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export default class Cart implements OnInit, OnDestroy {
  readonly CartIcon = ShoppingCart;
  readonly TrashIcon = Trash2;
  readonly PlusIcon = Plus;
  readonly MinusIcon = Minus;
  readonly BackIcon = ArrowLeft;
  readonly NextIcon = ArrowRight;
  cartItems: Product[] = [];
  showQuantityControls: boolean = true;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  increaseQuantity(id: number): void {
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number): void {
    this.cartService.decreaseQuantity(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + item.precio * (item.cantidad || 1);
    }, 0);
  }

  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    // Envío gratis si el subtotal es mayor a $100
    return subtotal > 100 ? 0 : 10;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Aquí puedes implementar la lógica de checkout
    console.log('Procediendo al checkout:', this.cartItems);
    alert(`Total a pagar: $${this.getTotal().toFixed(2)}`);

    // Ejemplo: Redirigir a página de checkout
    // this.router.navigate(['/checkout']);

    // O limpiar el carrito después del checkout simulado
    // this.cartService.clearCart();
  }
}
