import {
  LucideAngularModule,
  MessageCircle,
  ShoppingCart,
  Check,
  Zap,
  Shield,
  Truck,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronDown,
} from 'lucide-angular';
import {
  Component,
  OnInit,
  signal,
  HostListener,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/products.model';

@Component({
  selector: 'app-hero-section',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection implements OnInit {
  @Output() colorChanged = new EventEmitter<string>();

  // Exponer Math al template
  Math = Math;

  // Referencia al contenedor principal
  @ViewChild('heroContainer') heroContainer!: ElementRef;

  // Posición del cursor normalizada (0 a 1)
  cursorX = signal<number>(0.5);
  cursorY = signal<number>(0.5);

  // Control de visibilidad del efecto
  isMouseOver = signal<boolean>(false);

  // Iconos
  ShoppingCart = ShoppingCart;
  ZapIcon = Zap;
  ArrowRightIcon = ArrowRight;
  ChevronDownIcon = ChevronDown;
  MessageCircle = MessageCircle;
  Check = Check;
  Zap = Zap;
  Shield = Shield;
  Truck = Truck;
  RotateCw = RotateCw;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;

  // Características del producto
  features = [
    { icon: this.Zap, text: 'Respuesta inmediata' },
    { icon: this.Check, text: 'Material premium' },
    { icon: this.Shield, text: 'Garantía 2 años' },
    { icon: this.Truck, text: 'Envío en 24h' },
  ];

  // Usar productos destacados del servicio
  featuredProducts = signal<Product[]>([]);
  activeProduct = signal<Product | null>(null);
  activeIndex = signal<number>(0);
  particles = signal<any[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Obtener productos destacados
    const products = this.productService.featuredProducts();
    this.featuredProducts.set(products);

    if (products.length > 0) {
      this.activeProduct.set(products[0]);
      this.activeIndex.set(0);
      this.generateParticles(products[0].color || '#2563eb');
    }
  }

  // Escuchar movimiento del mouse en toda la ventana
  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent) {
    if (!this.heroContainer || !this.isMouseOver()) return;

    const rect = this.heroContainer.nativeElement.getBoundingClientRect();

    // Calcular posición normalizada (0-1)
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Suavizar el movimiento
    this.cursorX.set(Math.max(0, Math.min(1, x)));
    this.cursorY.set(Math.max(0, Math.min(1, y)));
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isMouseOver.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseOver.set(false);
  }

  // Obtener el estilo del efecto de iluminación
  getGlowStyle() {
    const color = this.getProductColor(this.activeProduct());
    const intensity = this.isMouseOver() ? 0.3 : 0.1; // 30% cuando hay mouse, 10% por defecto

    return {
      background: `
        radial-gradient(
          circle at ${this.cursorX() * 100}% ${this.cursorY() * 100}%,
          ${color}${Math.round(intensity * 255).toString(16)} 0%,
          transparent 70%
        )
      `,
      'pointer-events': 'none',
      opacity: this.isMouseOver() ? 1 : 0.7,
      transition: 'opacity 0.5s ease',
    };
  }

  setActiveProduct(product: Product, index: number) {
    this.activeProduct.set(product);
    this.activeIndex.set(index);
    this.generateParticles(product.color || '#2563eb');
  }

  // Obtener el box-shadow dinámico para el frame del producto
  getFrameBoxShadow(): string {
    const color = this.getProductColor(this.activeProduct());
    return `
      0 0 60px ${color}66,
      0 0 100px ${color}33,
      inset 0 0 80px rgba(255, 255, 255, 0.1)
    `;
  }

  nextProduct() {
    const currentIndex = this.activeIndex();
    const products = this.featuredProducts();
    const nextIndex = (currentIndex + 1) % products.length;
    this.setActiveProduct(products[nextIndex], nextIndex);
  }

  prevProduct() {
    const currentIndex = this.activeIndex();
    const products = this.featuredProducts();
    const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    this.setActiveProduct(products[prevIndex], prevIndex);
  }

  // Método para formatear precio
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  }

  // Obtener color dinámico o por defecto
  getProductColor(product: Product | null): string {
    if (!product) return '#2563eb';
    return product.color || '#2563eb';
  }

  // Generar partículas para el fondo
  generateParticles(color: string) {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        background: color,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: `${Math.random() * 0.2 + 0.1}`,
        '--duration': `${Math.random() * 10 + 10}s`,
        '--delay': `${Math.random() * 5}s`,
      });
    }
    this.particles.set(newParticles);
  }

  // Función para oscurecer colores
  darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
}
