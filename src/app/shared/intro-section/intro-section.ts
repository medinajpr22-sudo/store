import { Component } from '@angular/core';
import { LucideAngularModule, Trophy, Star, Zap, Heart } from 'lucide-angular';

@Component({
  selector: 'app-intro-section',
  imports: [LucideAngularModule],
  templateUrl: './intro-section.html',
  styleUrl: './intro-section.css',
})
export class IntroSection {
  readonly Trophy = Trophy;
  readonly Star = Star;
  readonly Zap = Zap;
  readonly Heart = Heart;
}
