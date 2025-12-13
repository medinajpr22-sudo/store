import { Component } from '@angular/core';
import { Card } from "../shared/card/card";

@Component({
  selector: 'app-landing',
  imports: [Card],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
