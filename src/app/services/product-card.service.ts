
import { Injectable } from "@angular/core";
import { Product } from "../models/products.model";

@Injectable({  providedIn: 'root' })
export class ProductCardService {

private items: Array<{ product: Product; cantidad: number }> = [];

  getItems() {
    return this.items;
  }

  addToCart(product: Product, cantidad: number = 1) {
    const found = this.items.find((item) => item.product.id === product.id);
    if (found) {
      found.cantidad += cantidad;
    } else {
      this.items.push({ 
        product, cantidad });
    }
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  clearCart() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.product.precio * item.cantidad, 0);
  }
}