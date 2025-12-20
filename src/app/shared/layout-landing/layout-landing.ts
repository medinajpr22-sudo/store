import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";
import { Toast } from "../../components/toast/toast";
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-layout-landing',
  imports: [  HeaderComponent, Footer, RouterOutlet, Toast],
  templateUrl: './layout-landing.html',
  styleUrl: './layout-landing.css',
})
export class LayoutLanding {
    heroColor = '#16a34a'; // Color por defecto

 

}
