import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private _products = signal<Product[]>([
    {
      id: 1,
      nombre: 'Nike Mercurial Superfly',
      slug: 'nike-mercurial-superfly-micro-neiva',
      descripcion: 'Zapatillas ligeras para velocidad máxima.',
      precio: 120000,
      imagen: 'assets/mercurial.jpg',
      marca: 'Nike',
      tipo: 'micro',
      tallas: ['39', '40', '41', '42'],
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Adidas Predator',
      slug: 'adidas-predator-sintetica-neiva',
      descripcion: 'Control total del balón y comodidad.',
      precio: 110000,
      imagen: 'assets/predator.jpg',
      marca: 'Adidas',
      tipo: 'sintetica',
      tallas: ['40', '41', '42', '43'],
      stock: 8,
    },
    {
      id: 3,
      nombre: 'Puma Future',
      slug: 'puma-future-micro-neiva',
      descripcion: 'Diseño innovador y ajuste perfecto.',
      precio: 100000,
      imagen: 'assets/future.jpg',
      marca: 'Puma',
      tipo: 'micro',
      tallas: ['38', '39', '40', '41'],
      stock: 5,
    },
  ]);

  products = computed(() => this._products());

  getProductBySlug(slug: string) {
    return computed(() =>
      this._products().find(product => product.slug === slug)
    );
  }
}
  