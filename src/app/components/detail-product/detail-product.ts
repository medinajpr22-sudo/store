import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/products.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct {
  selectedImage = signal<string | null>(null);

  selectImage(img: string) {
    this.selectedImage.set(img);
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
    private productService: ProductService
  ) {}
}
