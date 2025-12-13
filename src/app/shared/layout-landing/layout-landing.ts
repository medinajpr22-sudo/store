import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-layout-landing',
  imports: [Header,Footer, RouterOutlet ],
  templateUrl: './layout-landing.html',
  styleUrl: './layout-landing.css',
})
export class LayoutLanding {

}
