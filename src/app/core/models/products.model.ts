export interface Product {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  imagen: string[];
  marca: string;

  tipo: 'micro' | 'sintetica' | 'natural';

  tallas: string[]; // simple por ahora

  stock: number;

  // para carrito / pedido (aunque sea por WhatsApp)
  cantidad?: number;
}
