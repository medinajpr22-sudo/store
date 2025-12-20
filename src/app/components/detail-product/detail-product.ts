import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/products.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { SkeletonComponent } from '../../shared/skeleton/skeleton';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, SkeletonComponent],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct {
  selectedImage = signal<string | null>(null);
  selectedSize = signal<string | null>(null);
  quantity = signal<number>(1);

  selectImage(img: string) {
    this.selectedImage.set(img);
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  increaseQuantity() {
    this.quantity.update((val) => val + 1);
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((val) => val - 1);
    }
  }

  addToCart() {
    const prod = this.product();
    if (!prod) return;

    if (!this.selectedSize()) {
      this.toastService.show('Por favor selecciona una talla', 'error');
      return;
    }

    this.cartService.addToCart({ ...prod, cantidad: this.quantity() });
    this.toastService.show('Producto agregado al carrito', 'success');
  }

  product = computed<Product | undefined>(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return undefined;
    return this.productService.getProductBySlug(slug)();
  });

  buyByWhatsapp() {
    const phone = '573192575612';
    const prod = this.product();
    if (!prod) return;
    const message = `Hola 👋 estoy interesado en la zapatilla ${prod.nombre}
Precio: ${prod.precio} COP`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}
}
