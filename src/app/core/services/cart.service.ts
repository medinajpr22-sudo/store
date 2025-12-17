import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<(Product & { cantidad?: number })[]>(
    this.loadCartFromStorage()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

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
    } else {
      items.push({ ...product, cantidad: 1 });
    }
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  removeFromCart(productId: number): void {
    const items = this.cartItemsSubject.value.filter((item) => item.id !== productId);
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
  }
}
