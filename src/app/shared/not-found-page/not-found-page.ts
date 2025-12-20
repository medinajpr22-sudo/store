import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  CircleDot,
  AlertTriangle,
  Search,
  Home,
  ShoppingCart,
  ArrowRight,
} from 'lucide-angular';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {
  // Iconos de Lucide
  readonly CircleDotIcon = CircleDot;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly SearchIcon = Search;
  readonly HomeIcon = Home;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly ArrowRightIcon = ArrowRight;
}
