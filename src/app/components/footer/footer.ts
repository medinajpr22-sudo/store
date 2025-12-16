import { Component } from '@angular/core';
import { Facebook, Github, Twitter, LucideAngularModule, ShoppingCart, Instagram } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
readonly FacebookIcon = Facebook;
readonly InstagramIcon = Instagram;
readonly TwitterIcon = Twitter;

readonly ShoppingCartIcon = ShoppingCart

}
