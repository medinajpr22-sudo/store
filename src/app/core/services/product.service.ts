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
      imagen: [
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80&fit=crop',
      ],
      marca: 'Nike',
      tipo: 'micro',
      tallas: ['39', '40', '41', '42'],
      stock: 10,
      color: '#dc2626',
      tagline: 'Velocidad sin límites',
      destacado: true,
    },
    {
      id: 2,
      nombre: 'Adidas Predator',
      slug: 'adidas-predator-sintetica-neiva',
      descripcion: 'Control total del balón.',
      precio: 110000,
      imagen: [
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&fit=crop',
      ],
      marca: 'Adidas',
      tipo: 'sintetica',
      tallas: ['40', '41'],
      stock: 8,
      color: '#16a34a',
      tagline: 'Control absoluto',
      destacado: true,
    },
    {
      id: 3,
      nombre: 'Puma Future Z',
      slug: 'puma-future-z-sintetica',
      descripcion: 'Agilidad extrema y ajuste adaptativo.',
      precio: 115000,
      imagen: [
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80',
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80&fit=crop',
      ],
      marca: 'Puma',
      tipo: 'sintetica',
      tallas: ['39', '40', '41', '42', '43'],
      stock: 12,
      color: '#eab308',
      tagline: 'Agilidad suprema',
      destacado: true,
    },
    {
      id: 4,
      nombre: 'Nike Phantom GT',
      slug: 'nike-phantom-gt-micro',
      descripcion: 'Precisión de toque incomparable.',
      precio: 125000,
      imagen: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80&fit=crop',
      ],
      marca: 'Nike',
      tipo: 'micro',
      tallas: ['39', '40', '41', '42'],
      stock: 7,
      color: '#8b5cf6',
      tagline: 'Toque perfecto',
      destacado: true,
    },
    {
      id: 5,
      nombre: 'Adidas X Speedportal',
      slug: 'adidas-x-speedportal-sintetica',
      descripcion: 'Velocidad explosiva en cada paso.',
      precio: 118000,
      imagen: [
        'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80',
        'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80&fit=crop',
      ],
      marca: 'Adidas',
      tipo: 'sintetica',
      tallas: ['40', '41', '42', '43'],
      stock: 9,
      color: '#06b6d4',
      tagline: 'Velocidad extrema',
      destacado: false,
    },
    {
      id: 6,
      nombre: 'Puma Ultra',
      slug: 'puma-ultra-micro',
      descripcion: 'Ultra ligeras para máxima velocidad.',
      precio: 112000,
      imagen: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop',
      ],
      marca: 'Puma',
      tipo: 'micro',
      tallas: ['39', '40', '41', '42'],
      stock: 11,
      color: '#f97316',
      tagline: 'Ultra rápido',
      destacado: false,
    },
  ]);

  products = computed(() => this._products());

  getProductBySlug(slug: string) {
    return computed(() => this._products().find((product) => product.slug === slug));
  }
  featuredProducts = computed(() => this._products().filter((p) => p.destacado));
}
