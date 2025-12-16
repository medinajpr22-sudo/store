import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";
import { Toast } from "../../components/toast/toast";

@Component({
  selector: 'app-layout-landing',
  imports: [Header, Footer, RouterOutlet, Toast],
  templateUrl: './layout-landing.html',
  styleUrl: './layout-landing.css',
})
export class LayoutLanding {

}
