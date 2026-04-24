import { Component } from '@angular/core';
import { homePageText } from '../../text/text';

@Component({
  selector: 'app-hero-header',
  imports: [],
  templateUrl: './hero-header.html',
  styleUrl: './hero-header.css',
})
export class HeroHeader {
  readonly homePageText = homePageText;
}
