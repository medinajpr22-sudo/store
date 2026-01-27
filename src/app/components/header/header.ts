import {
  Component,
  HostListener,
  signal,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Home,
  ShoppingBag,
  Info,
  Phone,
  LogIn,
  Store,
  CircleDot,
} from 'lucide-angular';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],

  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnChanges, OnInit, OnDestroy {
  // Iconos
  StoreIcon = Store;
  CartIcon = ShoppingCart;
  CircleDotIcon = CircleDot;
  User = User;
  Search = Search;
  Menu = Menu;
  X = X;
  Home = Home;
  ShoppingBag = ShoppingBag;
  Info = Info;
  Phone = Phone;
  LogIn = LogIn;

  // Recibir color activo desde el hero-section
  @Input() activeColor: string = '#16a34a'; // Verde por defecto

  // Estado del header
  isScrolled = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  isSearchOpen = signal<boolean>(false);

  // Cart counter - conectado con el servicio
  cartItemCount: number = 0;
  private cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private viewportScroller: ViewportScroller,
  ) {}

  // Navegación
  navItems = [
    { path: '/home', label: 'Inicio', icon: this.Home },
    { path: '/productos', label: 'Productos', icon: this.ShoppingBag },
    { path: '/nosotros', label: 'Nosotros', icon: this.Info },
    { path: '/contacto', label: 'Contacto', icon: this.Phone },
  ];

  // Categorías
  categories = [
    { name: 'Fútbol', count: 12 },
    { name: 'Running', count: 8 },
    { name: 'Training', count: 15 },
    { name: 'Casual', count: 20 },
    { name: 'Ofertas', count: 5 },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeColor']) {
      console.log('Color actualizado en header:', this.activeColor);
    }
  }

  ngOnInit(): void {
    // Suscribirse a los cambios del carrito para actualizar el contador
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getTotalItemCount();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleSearch() {
    this.isSearchOpen.set(!this.isSearchOpen());
  }

  toggleCart() {
    // Navegar a la página del carrito
    window.location.href = '/home/cart';
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  // Función para scroll suave a una sección
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Función para aclarar el color (para hover effects)
  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

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

  // Función para oscurecer el color
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

  // Obtener color con opacidad
  getColorWithOpacity(color: string, opacity: number): string {
    // Convertir hex a rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
