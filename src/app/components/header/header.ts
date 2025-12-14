import { LucideAngularModule, ShoppingCart, Store } from 'lucide-angular';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
 
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   readonly StoreIcon = Store;
  readonly CartIcon = ShoppingCart;
}
