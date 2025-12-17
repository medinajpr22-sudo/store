import { Component } from '@angular/core';
import { Card } from "../shared/card/card";
import { HeroSection } from "../shared/hero-section/hero-section";

@Component({
  selector: 'app-landing',
  imports: [Card, HeroSection],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
