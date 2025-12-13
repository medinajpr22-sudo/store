import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private Products: Product[] = [
    {
      id: 1,
      nombre: 'Nike Mercurial Superfly',
      descripcion: 'Zapatillas ligeras para velocidad máxima.',
      precio: 120,
      imagen: 'assets/mercurial.jpg',
      talla: ['39', '40', '41', '42'],
      marca: 'Nike',
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Adidas Predator',
      descripcion: 'Control total del balón y comodidad.',
      precio: 110,
      imagen: 'assets/predator.jpg',
      talla: ['40', '41', '42', '43'],
      marca: 'Adidas',
      stock: 8,
    },
    {
      id: 3,
      nombre: 'Puma Future',
      descripcion: 'Diseño innovador y ajuste perfecto.',
      precio: 100,
      imagen: 'assets/future.jpg',
      talla: ['38', '39', '40', '41'],
      marca: 'Puma',
      stock: 5,
    },
  ];
  getProduct(): Product[] {
    return this.Products;
  }

  getProductById(id: number): Product | undefined {
    return this.Products.find((product) => product.id === id);
  }
}
