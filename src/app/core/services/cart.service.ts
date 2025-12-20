import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<(Product & { cantidad?: number })[]>(
    this.loadCartFromStorage()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private toastService: ToastService) {}

  private saveCartToStorage(items: (Product & { cantidad?: number })[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadCartFromStorage(): (Product & { cantidad?: number })[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getCartItems(): (Product & { cantidad?: number })[] {
    return this.cartItemsSubject.value;
  }

  addToCart(product: Product): void {
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex((item) => item.id === product.id);
    if (index > -1) {
      items[index].cantidad = (items[index].cantidad || 1) + 1;
      this.toastService.show(`${product.nombre} actualizado en el carrito`, 'success');
    } else {
      items.push({ ...product, cantidad: 1 });
      this.toastService.show(`${product.nombre} agregado al carrito`, 'success');
    }
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  removeFromCart(productId: number): void {
    const items = this.cartItemsSubject.value.filter((item) => item.id !== productId);
    const removedItem = this.cartItemsSubject.value.find((item) => item.id === productId);
    if (removedItem) {
      this.toastService.show(`${removedItem.nombre} eliminado del carrito`, 'info');
    }
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  increaseQuantity(productId: number): void {
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex((item) => item.id === productId);
    if (index > -1) {
      items[index].cantidad = (items[index].cantidad || 1) + 1;
      this.cartItemsSubject.next(items);
      this.saveCartToStorage(items);
    }
  }

  decreaseQuantity(productId: number): void {
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex((item) => item.id === productId);
    if (index > -1 && (items[index].cantidad || 1) > 1) {
      items[index].cantidad = (items[index].cantidad || 1) - 1;
      this.cartItemsSubject.next(items);
      this.saveCartToStorage(items);
    } else if (index > -1) {
      // Si la cantidad es 1, eliminar el producto del carrito
      this.removeFromCart(productId);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage([]);
    this.toastService.show('Carrito vaciado', 'info');
  }

  // Obtener número total de items en el carrito
  getTotalItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      return total + (item.cantidad || 1);
    }, 0);
  }

  // Calcular subtotal
  getSubtotal(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => {
      return sum + item.precio * (item.cantidad || 1);
    }, 0);
  }

  // Calcular costo de envío (gratis si el subtotal es mayor a $100)
  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    return subtotal > 100 ? 0 : 10;
  }

  // Calcular total
  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost();
  }
}
