import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  imports: [],
  templateUrl: './hero-header.html',
  styleUrl: './hero-header.css',
})
export class HeroHeader {
  heroHeaderText = input.required<string>();
}
