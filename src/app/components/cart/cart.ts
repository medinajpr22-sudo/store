import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';
import { Product } from '../../core/models/products.model';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  LucideAngularModule,
} from 'lucide-angular';
import { CartService } from '../../core/services/cart.service';

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
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getShippingCost(): number {
    return this.cartService.getShippingCost();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Generar mensaje para WhatsApp
    let mensaje = '🛒 *PEDIDO MICROSPORT*\n\n';
    mensaje += '📦 *PRODUCTOS:*\n';
    mensaje += '━━━━━━━━━━━━━━━━\n\n';

    // Agregar cada producto
    this.cartItems.forEach((item, index) => {
      const cantidad = item.cantidad || 1;
      const precioTotal = item.precio * cantidad;

      mensaje += `${index + 1}. *${item.nombre}*\n`;
      mensaje += `   Marca: ${item.marca}\n`;
      mensaje += `   Cantidad: ${cantidad}\n`;
      mensaje += `   Precio unitario: $${item.precio.toFixed(2)}\n`;
      mensaje += `   Subtotal: $${precioTotal.toFixed(2)}\n\n`;
    });

    // Agregar resumen
    const subtotal = this.getSubtotal();
    const envio = this.getShippingCost();
    const total = this.getTotal();

    mensaje += '━━━━━━━━━━━━━━━━\n';
    mensaje += '💰 *RESUMEN:*\n\n';
    mensaje += `Subtotal: $${subtotal.toFixed(2)}\n`;
    mensaje += `Envío: ${envio === 0 ? 'GRATIS ✅' : '$' + envio.toFixed(2)}\n`;
    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += `*TOTAL: $${total.toFixed(2)}*\n\n`;
    

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Número de WhatsApp (CAMBIA ESTE NÚMERO POR EL TUYO)
    const numeroWhatsApp = '3192575612'; // Formato: código país + número sin espacios ni signos

    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Opcional: Limpiar el carrito después de enviar
    // Si deseas que se limpie automáticamente, descomenta la siguiente línea:
     this.cartService.clearCart();
  }
}
