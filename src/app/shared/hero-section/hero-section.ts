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
  ChevronRight
} from 'lucide-angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css']
})
export class HeroSection implements OnInit {
  // Iconos
  ShoppingCart = ShoppingCart;
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
    { icon: this.Truck, text: 'Envío en 24h' }
  ];

  // Variantes del producto
  variants = [
    {
      image: '/assets/images/adidas/1.jpg',
      thumb: '/assets/images/adidas/1.jpg',
      color: '#dc2626',
      accent: 'from-red-600 to-black',
      title: 'Velocidad sin límites'
    },
    {
      image: '/assets/images/adidas/2.jpg',
      thumb: '/assets/images/adidas/2.jpg',
      color: '#16a34a',
      accent: 'from-green-600 to-black',
      title: 'Control absoluto'
    },
    {
      image: '/assets/images/3.jpg',
      thumb: '/assets/images/3.jpg',
      color: '#2563eb',
      accent: 'from-blue-600 to-black',
      title: 'Dominio total'
    },
    {
      image: '/assets/images/4.jpg',
      thumb: '/assets/images/4.jpg',
      color: '#7c3aed',
      accent: 'from-purple-600 to-black',
      title: 'Elegancia extrema'
    }
  ];

  active = this.variants[0];
  particles: any[] = [];

  ngOnInit() {
    this.generateParticles();
  }

  setVariant(v: any) {
    this.active = v;
    this.generateParticles();
  }

  nextVariant() {
    const currentIndex = this.variants.indexOf(this.active);
    const nextIndex = (currentIndex + 1) % this.variants.length;
    this.setVariant(this.variants[nextIndex]);
  }

  prevVariant() {
    const currentIndex = this.variants.indexOf(this.active);
    const prevIndex = currentIndex === 0 ? this.variants.length - 1 : currentIndex - 1;
    this.setVariant(this.variants[prevIndex]);
  }

  // Generar partículas para el fondo
  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        'width': `${Math.random() * 4 + 1}px`,
        'height': `${Math.random() * 4 + 1}px`,
        'background': this.active.color,
        'left': `${Math.random() * 100}%`,
        'top': `${Math.random() * 100}%`,
        'opacity': `${Math.random() * 0.3 + 0.1}`,
        '--duration': `${Math.random() * 10 + 10}s`,
        '--delay': `${Math.random() * 5}s`
      });
    }
  }

  // Función para oscurecer colores
  darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    
    return "#" + (
      0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  }
}