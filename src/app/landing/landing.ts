import { Component } from '@angular/core';
import { Card } from '../shared/card/card';
import { HeroSection } from '../shared/hero-section/hero-section';
import { IntroSection } from "../shared/intro-section/intro-section";

@Component({
  selector: 'app-landing',
  imports: [Card, HeroSection, IntroSection],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  heroColor = '#16a34a';
  onColorChanged(color: string) {
    this.heroColor = color;
  }
}
